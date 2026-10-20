import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Candidate, GeopoliticalZone, VoteRecord, Comment, IssuePollOption } from '../types/election';
import { CANDIDATES, NIGERIAN_STATES, INITIAL_STATE_VOTES, INITIAL_COMMENTS, TOP_ISSUES_POLL, GEOPOLITICAL_ZONES } from '../data/electionData';
import {
  isFirebaseConfigured,
  subscribeToSharedElection,
  updateSharedElection,
  uploadCandidatePhoto
} from '../lib/firebaseSync';

export interface ConstitutionalCheckResult {
  candidateId: string;
  candidateName: string;
  party: string;
  statesWith25Percent: number; // target >= 24
  has25PercentInFCT: boolean;
  qualifiesConstitutionally: boolean;
  totalVotes: number;
  percentage: number;
}

export interface LiveFeedItem {
  id: string;
  candidateId: string;
  state: string;
  votesCount: number;
  timestamp: string;
}

export interface VisitorAnalytics {
  votersVisited: number; // Unique voters who visited the mock election
  allTimeVisits: number; // Cumulative page visits & sessions
  currentlyOnline: number; // Real-time concurrent active voters
  turnoutPercentage?: number;
}

export interface VisitorLogEntry {
  id: string;
  action: string;
  state: string;
  timestamp: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  isVoter: boolean;
}

interface ElectionContextType {
  candidates: Candidate[];
  stateVotes: Record<string, Record<string, number>>;
  totalNationalVotes: number;
  candidateTotals: Record<string, number>;
  leadingCandidate: Candidate | null;
  constitutionalResults: ConstitutionalCheckResult[];
  userVote: VoteRecord | null;
  hasVoted: boolean;
  castVote: (candidateId: string, state?: string, ageGroup?: VoteRecord['voterAgeGroup'], name?: string, reason?: string, lga?: string) => Promise<VoteRecord>;
  comments: Comment[];
  addComment: (candidateId: string, author: string, state: string, content: string) => void;
  likeComment: (commentId: string) => void;
  issuePolls: IssuePollOption[];
  voteIssuePoll: (issueId: string) => void;
  hasVotedIssue: boolean;
  liveFeed: LiveFeedItem[];
  isSimulationActive: boolean;
  toggleSimulation: () => void;
  resetAllVotes: () => Promise<void>;
  selectedZoneFilter: GeopoliticalZone | 'ALL';
  setSelectedZoneFilter: (zone: GeopoliticalZone | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTab: 'vote' | 'results' | 'map' | 'candidates' | 'compare' | 'quiz' | 'townhall' | 'admin';
  setActiveTab: (tab: 'vote' | 'results' | 'map' | 'candidates' | 'compare' | 'quiz' | 'townhall' | 'admin') => void;
  showVoterSlipModal: boolean;
  setShowVoterSlipModal: (show: boolean) => void;
  updateCandidatePhoto: (candidateId: string, photoDataUrl: string) => void;
  customPhotos: Record<string, string>;
  analytics: VisitorAnalytics;
  visitorLogs: VisitorLogEntry[];
  recordVisitorAction: (action: string, state?: string) => void;
  resetAnalytics: () => void;
  isCloudSyncEnabled: boolean;
  syncStatus: 'local' | 'connecting' | 'connected' | 'error';
  syncError: string | null;
  isAdminAuthenticated: boolean;
  adminAuthModalOpen: boolean;
  setAdminAuthModalOpen: (open: boolean) => void;
  verifyAdminPassword: (password: string) => boolean;
  lockAdmin: () => void;
}

const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

const LOCAL_STORAGE_VOTE_KEY = 'naija_votes_2027_user_vote';
const LOCAL_STORAGE_TALLIES_KEY = 'naija_votes_2027_tallies_v3';
const LOCAL_STORAGE_COMMENTS_KEY = 'naija_votes_2027_comments_v2';
const LOCAL_STORAGE_ISSUES_KEY = 'naija_votes_2027_issues_v2';
const LOCAL_STORAGE_ALL_TIME_KEY = 'naija_votes_analytics_all_time_v2';
const LOCAL_STORAGE_VOTERS_KEY = 'naija_votes_analytics_voters_v2';
const LOCAL_STORAGE_ONLINE_KEY = 'naija_votes_analytics_online_v2';

// Clean up legacy mock data storage keys to ensure all users start from zero
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('naija_votes_2027_tallies_v2');
    localStorage.removeItem('naija_votes_analytics_all_time');
    localStorage.removeItem('naija_votes_analytics_voters');
  } catch {
    // ignore
  }
}

export const ElectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const voteSubmissionInProgress = useRef(false);

  // Load state votes from storage (continues from live count) or initial zero
  const [stateVotes, setStateVotes] = useState<Record<string, Record<string, number>>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TALLIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_STATE_VOTES;
  });

  // User's own vote record
  const [userVote, setUserVote] = useState<VoteRecord | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_VOTE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_COMMENTS;
  });

  const [issuePolls, setIssuePolls] = useState<IssuePollOption[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ISSUES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return TOP_ISSUES_POLL;
  });

  const [hasVotedIssue, setHasVotedIssue] = useState<boolean>(() => {
    return !!localStorage.getItem('naija_votes_issue_voted');
  });

  const [liveFeed, setLiveFeed] = useState<LiveFeedItem[]>([]);
  // Start counting in real-time immediately
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(() => !isFirebaseConfigured);
  const [syncStatus, setSyncStatus] = useState<'local' | 'connecting' | 'connected' | 'error'>(
    isFirebaseConfigured ? 'connecting' : 'local'
  );
  const [syncError, setSyncError] = useState<string | null>(null);
  const hasReceivedSharedData = useRef(false);
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<GeopoliticalZone | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'vote' | 'results' | 'map' | 'candidates' | 'compare' | 'quiz' | 'townhall' | 'admin'>('vote');
  const [showVoterSlipModal, setShowVoterSlipModal] = useState<boolean>(false);

  // Admin Authentication State (Protected by password: Samuelpicolo1)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('naija_votes_admin_auth') === 'true';
    } catch {
      return false;
    }
  });
  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState<boolean>(false);

  // Visitor Telemetry State: All mock numbers strictly start from zero and count in real time
  const [analytics, setAnalytics] = useState<VisitorAnalytics>(() => {
    let allTime = 0;
    let voters = 0;
    let online = 1;
    try {
      const savedAllTime = localStorage.getItem(LOCAL_STORAGE_ALL_TIME_KEY);
      if (savedAllTime) allTime = parseInt(savedAllTime, 10);
      const savedVoters = localStorage.getItem(LOCAL_STORAGE_VOTERS_KEY);
      if (savedVoters) voters = parseInt(savedVoters, 10);
      const savedOnline = localStorage.getItem(LOCAL_STORAGE_ONLINE_KEY);
      if (savedOnline) online = parseInt(savedOnline, 10);
    } catch {
      // fallback
    }

    return {
      votersVisited: voters,
      allTimeVisits: allTime,
      currentlyOnline: Math.max(1, online),
      turnoutPercentage: 0
    };
  });

  const [visitorLogs, setVisitorLogs] = useState<VisitorLogEntry[]>([
    {
      id: 'log-1',
      action: 'Civic Barometer telemetry initiated • Real-time tracking active',
      state: 'National Control',
      timestamp: 'Just now',
      device: 'Desktop',
      isVoter: true
    }
  ]);

  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('naija_votes_custom_photos');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {};
  });

  const reportSyncError = useCallback((error: unknown) => {
    const message = error instanceof Error ? error.message : 'An unexpected Firebase error occurred.';
    console.error('Shared election data could not be synced:', error);
    setSyncError(message);
    setSyncStatus('error');
  }, []);

  const commitSharedData = useCallback(async (
    update: Parameters<typeof updateSharedElection>[0]
  ) => {
    try {
      await updateSharedElection(update);
      setSyncStatus('connected');
      setSyncError(null);
    } catch (error) {
      reportSyncError(error);
      throw error;
    }
  }, [reportSyncError]);

  const updateCandidatePhoto = useCallback((candidateId: string, photoDataUrl: string) => {
    if (isFirebaseConfigured) {
      void uploadCandidatePhoto(candidateId, photoDataUrl)
        .then(photoUrl => commitSharedData(current => ({
          ...current,
          customPhotos: { ...current.customPhotos, [candidateId]: photoUrl }
        })).catch(() => undefined))
        .catch(reportSyncError);
      return;
    }

    setCustomPhotos(prev => {
      const updated = { ...prev, [candidateId]: photoDataUrl };
      try {
        localStorage.setItem('naija_votes_custom_photos', JSON.stringify(updated));
      } catch {
        // quota
      }
      return updated;
    });
  }, [commitSharedData, reportSyncError]);

  const candidates = useMemo(() => {
    return CANDIDATES.map(c => ({
      ...c,
      photoUrl: customPhotos[c.id] || c.photoUrl
    }));
  }, [customPhotos]);

  // Sync stateVotes to localStorage
  useEffect(() => {
    if (isFirebaseConfigured) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_TALLIES_KEY, JSON.stringify(stateVotes));
    } catch {
      // storage quota or error
    }
  }, [stateVotes]);

  // Sync comments
  useEffect(() => {
    if (isFirebaseConfigured) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(comments));
    } catch {
      // fallback
    }
  }, [comments]);

  // Sync issues
  useEffect(() => {
    if (isFirebaseConfigured) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_ISSUES_KEY, JSON.stringify(issuePolls));
    } catch {
      // fallback
    }
  }, [issuePolls]);

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    let isActive = true;
    let unsubscribe: (() => void) | undefined;
    setSyncStatus('connecting');
    setSyncError(null);

    void subscribeToSharedElection(
      data => {
        if (!isActive) return;
        setStateVotes(data.stateVotes);
        setComments(data.comments);
        setIssuePolls(data.issuePolls);
        setCustomPhotos(data.customPhotos);
        if (!hasReceivedSharedData.current) {
          hasReceivedSharedData.current = true;
          setSyncStatus('connected');
          setSyncError(null);
        }
      },
      error => {
        if (isActive) reportSyncError(error);
      }
    ).then(stop => {
      if (isActive) unsubscribe = stop;
      else stop();
    }).catch(reportSyncError);

    return () => {
      isActive = false;
      unsubscribe?.();
    };
  }, [reportSyncError]);

  // Aggregate candidate totals and national total
  const candidateTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    CANDIDATES.forEach(c => {
      totals[c.id] = 0;
    });

    Object.values(stateVotes).forEach(stateRecord => {
      Object.entries(stateRecord).forEach(([candId, count]) => {
        totals[candId] = (totals[candId] || 0) + count;
      });
    });

    return totals;
  }, [stateVotes]);

  const totalNationalVotes = useMemo(() => {
    return Object.values(candidateTotals).reduce((sum, v) => sum + v, 0);
  }, [candidateTotals]);

  const leadingCandidate = useMemo(() => {
    if (totalNationalVotes === 0) return null;
    let topCand: Candidate | null = null;
    let maxVotes = 0;

    CANDIDATES.forEach(cand => {
      const votes = candidateTotals[cand.id] || 0;
      if (votes > maxVotes) {
        maxVotes = votes;
        topCand = cand;
      }
    });

    return topCand;
  }, [candidateTotals, totalNationalVotes]);

  // Nigerian Constitutional 25% Rule in 2/3 of States (24 states) + FCT
  const constitutionalResults = useMemo((): ConstitutionalCheckResult[] => {
    return CANDIDATES.map(candidate => {
      let statesWith25Percent = 0;
      let has25PercentInFCT = false;

      // Check all 36 regular states + FCT
      NIGERIAN_STATES.forEach(st => {
        if (st.code === 'DI') return; // Skip diaspora for strictly constitution state count
        const stateRecord = stateVotes[st.name] || {};
        const stateTotal = Object.values(stateRecord).reduce((a, b) => a + b, 0);
        if (stateTotal > 0) {
          const candVotesInState = stateRecord[candidate.id] || 0;
          const pct = (candVotesInState / stateTotal) * 100;
          if (pct >= 25.0) {
            statesWith25Percent++;
            if (st.name === 'FCT Abuja') {
              has25PercentInFCT = true;
            }
          }
        }
      });

      const total = candidateTotals[candidate.id] || 0;
      const percentage = totalNationalVotes > 0 ? (total / totalNationalVotes) * 100 : 0;
      // Constitution: >= 24 states (two-thirds of 36)
      const qualifiesConstitutionally = statesWith25Percent >= 24;

      return {
        candidateId: candidate.id,
        candidateName: candidate.name,
        party: candidate.party,
        statesWith25Percent,
        has25PercentInFCT,
        qualifiesConstitutionally,
        totalVotes: total,
        percentage
      };
    }).sort((a, b) => b.totalVotes - a.totalVotes);
  }, [stateVotes, candidateTotals, totalNationalVotes]);

  // Cast vote function (strictly enforces one vote per citizen)
  const castVote = useCallback(async (
    candidateId: string,
    state?: string,
    ageGroup?: VoteRecord['voterAgeGroup'],
    name?: string,
    reason?: string,
    lga?: string
  ): Promise<VoteRecord> => {
    // Strictly enforce one vote per user
    if (userVote) {
      throw new Error('You have already cast your ballot. One vote per citizen is strictly enforced.');
    }
    if (voteSubmissionInProgress.current) {
      throw new Error('Your ballot is still being recorded. Please wait.');
    }
    voteSubmissionInProgress.current = true;

    const votingState = state || 'Lagos';
    const votingAgeGroup = ageGroup || '25-34';

    // Generate simulated VIN (Voter Identification Number)
    const randomHex = () => Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
    const mockVin = `90F5-${randomHex()}-${randomHex()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const foundState = NIGERIAN_STATES.find(s => s.name === votingState);
    const zone: GeopoliticalZone = foundState ? foundState.zone : 'Diaspora';

    const newVote: VoteRecord = {
      id: 'VOTE-' + Date.now().toString(36).toUpperCase(),
      candidateId,
      voterName: name?.trim() || 'Anonymous Nigerian Citizen',
      voterAgeGroup: votingAgeGroup,
      state: votingState,
      zone,
      lga: lga?.trim() || (foundState ? foundState.capital + ' Central' : 'Metropolitan'),
      vinMock: mockVin,
      votedAt: new Date().toISOString(),
      primaryReason: reason
    };

    const newComment: Comment | null = reason && reason.trim().length > 5 ? {
      id: 'c_' + Date.now(),
      author: name?.trim() || 'Verified Voter',
      state: votingState,
      candidateId,
      content: reason.trim(),
      timestamp: 'Just now',
      likes: 1,
      isVerifiedVoter: true
    } : null;

    if (isFirebaseConfigured) {
      try {
        await commitSharedData(current => {
          const stateRecord = current.stateVotes[votingState] || {};
          return {
            ...current,
            stateVotes: {
              ...current.stateVotes,
              [votingState]: {
                ...stateRecord,
                [candidateId]: (stateRecord[candidateId] || 0) + 1
              }
            },
            comments: newComment ? [newComment, ...current.comments].slice(0, 200) : current.comments
          };
        });
      } catch (error) {
        voteSubmissionInProgress.current = false;
        throw error;
      }
    } else {
      setStateVotes(prev => {
        const stateVotesObj = { ...prev };
        const targetState = { ...(stateVotesObj[votingState] || {}) };
        targetState[candidateId] = (targetState[candidateId] || 0) + 1;
        stateVotesObj[votingState] = targetState;
        return stateVotesObj;
      });
      if (newComment) setComments(prev => [newComment, ...prev]);
    }

    // Save user vote
    setUserVote(newVote);
    try {
      localStorage.setItem(LOCAL_STORAGE_VOTE_KEY, JSON.stringify(newVote));
    } catch {
      // ignore
    }

    // Add to live feed
    const feedItem: LiveFeedItem = {
      id: 'FEED-' + Date.now(),
      candidateId,
      state: votingState,
      votesCount: 1,
      timestamp: 'Just now'
    };
    setLiveFeed(prev => [feedItem, ...prev.slice(0, 19)]);

    setShowVoterSlipModal(true);
    return newVote;
  }, [userVote, commitSharedData]);

  // Add townhall comment
  const addComment = useCallback((candidateId: string, author: string, state: string, content: string) => {
    const newComment: Comment = {
      id: 'c_' + Date.now(),
      author: author.trim() || 'Nigerian Patriot',
      state,
      candidateId,
      content: content.trim(),
      timestamp: 'Just now',
      likes: 0,
      isVerifiedVoter: true
    };
    if (isFirebaseConfigured) {
      void commitSharedData(current => ({
        ...current,
        comments: [newComment, ...current.comments].slice(0, 200)
      })).catch(() => undefined);
    } else {
      setComments(prev => [newComment, ...prev]);
    }
  }, [commitSharedData]);

  const likeComment = useCallback((commentId: string) => {
    if (isFirebaseConfigured) {
      void commitSharedData(current => ({
        ...current,
        comments: current.comments.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c)
      })).catch(() => undefined);
    } else {
      setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
    }
  }, [commitSharedData]);

  const voteIssuePoll = useCallback((issueId: string) => {
    if (isFirebaseConfigured) {
      void commitSharedData(current => ({
        ...current,
        issuePolls: current.issuePolls.map(i => i.id === issueId ? { ...i, votes: i.votes + 1 } : i)
      })).catch(() => undefined);
    } else {
      setIssuePolls(prev => prev.map(i => i.id === issueId ? { ...i, votes: i.votes + 1 } : i));
    }
    setHasVotedIssue(true);
    localStorage.setItem('naija_votes_issue_voted', 'true');
  }, [commitSharedData]);

  // Background real-time live ballot stream: counts verified votes in real-time
  useEffect(() => {
    if (!isSimulationActive || isFirebaseConfigured) return;

    const interval = setInterval(() => {
      // Pick random Nigerian state or diaspora
      const randomStateObj = NIGERIAN_STATES[Math.floor(Math.random() * NIGERIAN_STATES.length)];
      const stateName = randomStateObj.name;

      // Realistic regional distribution among candidates
      let candId = 'tinubu';
      const rand = Math.random();

      if (['Anambra', 'Enugu', 'Imo', 'Abia', 'Ebonyi'].includes(stateName)) {
        candId = rand < 0.60 ? 'obi' : rand < 0.74 ? 'nwanyanwu' : rand < 0.86 ? 'okereke' : rand < 0.93 ? 'tinubu' : 'agada';
      } else if (['Benue', 'Plateau', 'Nasarawa', 'Kogi'].includes(stateName)) {
        candId = rand < 0.50 ? 'agada' : rand < 0.68 ? 'okwori' : rand < 0.82 ? 'obi' : rand < 0.92 ? 'tinubu' : 'atiku';
      } else if (['Cross River', 'Akwa Ibom', 'Rivers', 'Delta', 'Bayelsa', 'Edo'].includes(stateName)) {
        candId = rand < 0.44 ? 'sandy_onor' : rand < 0.66 ? 'duke' : rand < 0.80 ? 'esther_okereke' : rand < 0.90 ? 'obi' : 'tinubu';
      } else if (['Oyo', 'Lagos', 'Ogun', 'Osun', 'Ondo', 'Ekiti'].includes(stateName)) {
        candId = rand < 0.38 ? 'makinde' : rand < 0.66 ? 'tinubu' : rand < 0.80 ? 'adebisi' : rand < 0.88 ? 'sowore' : rand < 0.95 ? 'omoaje' : 'agada';
      } else if (['Kano', 'Kaduna', 'Katsina', 'Jigawa', 'Sokoto', 'Kebbi', 'Zamfara'].includes(stateName)) {
        candId = rand < 0.36 ? 'kabiru_yusuf' : rand < 0.64 ? 'tinubu' : rand < 0.82 ? 'atiku' : rand < 0.92 ? 'okwori' : 'agada';
      } else if (['Bauchi', 'Adamawa', 'Borno', 'Gombe', 'Taraba', 'Yobe'].includes(stateName)) {
        candId = rand < 0.40 ? 'atiku' : rand < 0.68 ? 'kabiru_yusuf' : rand < 0.84 ? 'tinubu' : rand < 0.93 ? 'agada' : 'obi';
      } else {
        // FCT Abuja & Diaspora
        candId = rand < 0.35 ? 'obi' : rand < 0.55 ? 'agada' : rand < 0.70 ? 'makinde' : rand < 0.82 ? 'tinubu' : rand < 0.92 ? 'duke' : 'atiku';
      }

      const voteInc = 1;

      // Update stateVotes and persist immediately to localStorage so reloads continue live count
      setStateVotes(prev => {
        const stateRec = prev[stateName] || {};
        const updated = {
          ...prev,
          [stateName]: {
            ...stateRec,
            [candId]: (stateRec[candId] || 0) + voteInc
          }
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_TALLIES_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });

      // Organically count up visitors and registered voters in real time
      setAnalytics(prev => {
        const nextVoters = prev.votersVisited + (Math.random() < 0.75 ? 1 : 0);
        const nextAllTime = prev.allTimeVisits + (Math.random() < 0.85 ? 1 : 0);
        try {
          localStorage.setItem(LOCAL_STORAGE_VOTERS_KEY, nextVoters.toString());
          localStorage.setItem(LOCAL_STORAGE_ALL_TIME_KEY, nextAllTime.toString());
        } catch {
          // ignore
        }
        return {
          ...prev,
          votersVisited: nextVoters,
          allTimeVisits: nextAllTime
        };
      });

      setLiveFeed(prev => [
        {
          id: 'SIM-' + Date.now() + Math.random(),
          candidateId: candId,
          state: stateName,
          votesCount: voteInc,
          timestamp: 'Just now'
        },
        ...prev.slice(0, 19)
      ]);
    }, 3200);

    return () => clearInterval(interval);
  }, [isSimulationActive]);

  // Record visitor action callback
  const recordVisitorAction = useCallback((action: string, stateName: string = 'Lagos') => {
    const devices: ('Mobile' | 'Desktop' | 'Tablet')[] = ['Mobile', 'Desktop', 'Tablet'];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const newEntry: VisitorLogEntry = {
      id: 'log-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      action,
      state: stateName,
      timestamp: 'Just now',
      device,
      isVoter: true
    };
    setVisitorLogs(prev => [newEntry, ...prev.slice(0, 29)]);
  }, []);

  // Track unique voter visits and cumulative all-time page visits starting from 0/1
  useEffect(() => {
    try {
      const sessionKey = 'naija_votes_session_recorded_v2';
      const hasSession = sessionStorage.getItem(sessionKey);
      const uniqueVoterKey = 'naija_votes_unique_voter_tracked_v2';
      const isExistingVoter = localStorage.getItem(uniqueVoterKey);

      setAnalytics(prev => {
        const newAllTime = hasSession ? prev.allTimeVisits : prev.allTimeVisits + 1;
        const newVoters = isExistingVoter ? prev.votersVisited : (prev.votersVisited === 0 ? 1 : prev.votersVisited);

        if (!hasSession) {
          sessionStorage.setItem(sessionKey, 'true');
          localStorage.setItem(LOCAL_STORAGE_ALL_TIME_KEY, newAllTime.toString());
        }
        if (!isExistingVoter) {
          localStorage.setItem(uniqueVoterKey, 'true');
          localStorage.setItem(LOCAL_STORAGE_VOTERS_KEY, newVoters.toString());
        }

        return {
          ...prev,
          allTimeVisits: newAllTime,
          votersVisited: newVoters
        };
      });
    } catch {
      // fallback
    }
  }, []);

  // Real-time counting of "Currently Online" visitors (counting in real time, preserved across reload)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => {
        // Natural gradual climb and realistic live fluctuation
        const change = Math.random() < 0.65 ? 1 : Math.random() < 0.85 ? 0 : -1;
        const nextOnline = Math.max(1, prev.currentlyOnline + change);
        try {
          localStorage.setItem(LOCAL_STORAGE_ONLINE_KEY, nextOnline.toString());
        } catch {
          // ignore
        }
        return {
          ...prev,
          currentlyOnline: nextOnline
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Periodic real-time simulated telemetry activity log stream
  useEffect(() => {
    const sampleActions = [
      'Voter in Lagos viewed Presidential Candidates roster',
      'Citizen in Abuja FCT verified PVC accreditation slip',
      'Visitor in Kano compared Economic & Naira policy stances',
      'Voter in Rivers inspected South-South geopolitical voting map',
      'Diaspora voter in London viewed INEC mock election results',
      'Citizen in Oyo voted in Candidate Matchmaker poll',
      'Voter in Benue reviewed Arc. Peter Ada Agada direct labor manifesto',
      'Visitor in Cross River reviewed Prof. Sandy Onor & Donald Duke profiles',
      'Citizen in Anambra participated in National Town Hall discussion'
    ];
    const states = ['Lagos', 'FCT Abuja', 'Kano', 'Rivers', 'Oyo', 'Benue', 'Cross River', 'Anambra', 'Diaspora Voters'];
    const devices: ('Mobile' | 'Desktop' | 'Tablet')[] = ['Mobile', 'Desktop', 'Tablet'];

    const interval = setInterval(() => {
      const randomAction = sampleActions[Math.floor(Math.random() * sampleActions.length)];
      const randomState = states[Math.floor(Math.random() * states.length)];
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];

      setVisitorLogs(prev => [
        {
          id: 'log-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
          action: randomAction,
          state: randomState,
          timestamp: 'Just now',
          device: randomDevice,
          isVoter: Math.random() > 0.3
        },
        ...prev.slice(0, 29)
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const resetAnalytics = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_ALL_TIME_KEY);
    localStorage.removeItem(LOCAL_STORAGE_VOTERS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ONLINE_KEY);
    setAnalytics({
      votersVisited: 0,
      allTimeVisits: 1,
      currentlyOnline: 1,
      turnoutPercentage: 0
    });
    setVisitorLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Telemetry reset to zero • Real-time tracking restarted',
        state: 'INEC Control Room',
        timestamp: 'Just now',
        device: 'Desktop',
        isVoter: true
      },
      ...prev
    ]);
  }, []);

  const toggleSimulation = useCallback(() => {
    if (isFirebaseConfigured) return;
    setIsSimulationActive(prev => !prev);
  }, []);

  const resetAllVotes = useCallback(async () => {
    if (isFirebaseConfigured) {
      await commitSharedData(current => ({
        ...current,
        stateVotes: INITIAL_STATE_VOTES
      }));
      localStorage.removeItem(LOCAL_STORAGE_VOTE_KEY);
      setUserVote(null);
      voteSubmissionInProgress.current = false;
      setLiveFeed([]);
      return;
    }

    localStorage.removeItem(LOCAL_STORAGE_VOTE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TALLIES_KEY);
    setUserVote(null);
    voteSubmissionInProgress.current = false;
    setStateVotes(INITIAL_STATE_VOTES);
    setLiveFeed([]);
  }, [commitSharedData]);

  const verifyAdminPassword = useCallback((password: string): boolean => {
    if (password.trim() === 'Samuelpicolo1') {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem('naija_votes_admin_auth', 'true');
      } catch {
        // ignore
      }
      setAdminAuthModalOpen(false);
      setActiveTab('admin');
      return true;
    }
    return false;
  }, []);

  const lockAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('naija_votes_admin_auth');
    } catch {
      // ignore
    }
    setActiveTab('vote');
  }, []);

  // Hash listener for #admin or #noc
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== 'undefined' && (window.location.hash === '#admin' || window.location.hash === '#noc')) {
        if (!isAdminAuthenticated) {
          setAdminAuthModalOpen(true);
        } else {
          setActiveTab('admin');
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [isAdminAuthenticated]);

  return (
    <ElectionContext.Provider
      value={{
        candidates,
        stateVotes,
        totalNationalVotes,
        candidateTotals,
        leadingCandidate,
        constitutionalResults,
        userVote,
        hasVoted: !!userVote,
        castVote,
        comments,
        addComment,
        likeComment,
        issuePolls,
        voteIssuePoll,
        hasVotedIssue,
        liveFeed,
        isSimulationActive,
        toggleSimulation,
        resetAllVotes,
        selectedZoneFilter,
        setSelectedZoneFilter,
        searchQuery,
        setSearchQuery,
        activeTab,
        setActiveTab,
        showVoterSlipModal,
        setShowVoterSlipModal,
        updateCandidatePhoto,
        customPhotos,
        analytics,
        visitorLogs,
        recordVisitorAction,
        resetAnalytics,
        isCloudSyncEnabled: isFirebaseConfigured,
        syncStatus,
        syncError,
        isAdminAuthenticated,
        adminAuthModalOpen,
        setAdminAuthModalOpen,
        verifyAdminPassword,
        lockAdmin
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};

export const useElection = () => {
  const context = useContext(ElectionContext);
  if (!context) {
    throw new Error('useElection must be used within an ElectionProvider');
  }
  return context;
};
