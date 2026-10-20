import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Candidate, GeopoliticalZone, VoteRecord, Comment, IssuePollOption } from '../types/election';
import { CANDIDATES, NIGERIAN_STATES, INITIAL_STATE_VOTES, INITIAL_COMMENTS, TOP_ISSUES_POLL, GEOPOLITICAL_ZONES } from '../data/electionData';

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
  resetAllVotes: () => void;
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
  isAdminAuthenticated: boolean;
  adminAuthModalOpen: boolean;
  setAdminAuthModalOpen: (open: boolean) => void;
  verifyAdminPassword: (password: string) => boolean;
  lockAdmin: () => void;
}

const ElectionContext = createContext<ElectionContextType | undefined>(undefined);

const LOCAL_STORAGE_VOTE_KEY = 'naija_votes_2027_user_vote';
const LOCAL_STORAGE_TALLIES_KEY = 'naija_votes_2027_tallies_v2';
const LOCAL_STORAGE_COMMENTS_KEY = 'naija_votes_2027_comments';
const LOCAL_STORAGE_ISSUES_KEY = 'naija_votes_2027_issues';

export const ElectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state votes from storage or initial
  const [stateVotes, setStateVotes] = useState<Record<string, Record<string, number>>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_TALLIES_KEY);
      if (saved) return JSON.parse(saved);
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
  const [isSimulationActive, setIsSimulationActive] = useState<boolean>(false);
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

  // Visitor Telemetry State
  const [analytics, setAnalytics] = useState<VisitorAnalytics>(() => {
    let allTime = 284910;
    let voters = 194530;
    try {
      const savedAllTime = localStorage.getItem('naija_votes_analytics_all_time');
      if (savedAllTime) allTime = parseInt(savedAllTime, 10);
      const savedVoters = localStorage.getItem('naija_votes_analytics_voters');
      if (savedVoters) voters = parseInt(savedVoters, 10);
    } catch {
      // fallback
    }

    return {
      votersVisited: voters,
      allTimeVisits: allTime,
      currentlyOnline: 1742,
      turnoutPercentage: 0
    };
  });

  const [visitorLogs, setVisitorLogs] = useState<VisitorLogEntry[]>([
    {
      id: 'log-1',
      action: 'Voter authenticated in Lagos & viewed Presidential Ballot',
      state: 'Lagos',
      timestamp: 'Just now',
      device: 'Mobile',
      isVoter: true
    },
    {
      id: 'log-2',
      action: 'Diaspora citizen reviewed INEC constitutional thresholds',
      state: 'Diaspora Voters',
      timestamp: '2 mins ago',
      device: 'Desktop',
      isVoter: false
    },
    {
      id: 'log-3',
      action: 'Voter in Abuja FCT cast mock ballot for Peter Obi',
      state: 'FCT Abuja',
      timestamp: '3 mins ago',
      device: 'Mobile',
      isVoter: true
    },
    {
      id: 'log-4',
      action: 'Visitor in Oyo inspected Governor Seyi Makinde manifesto',
      state: 'Oyo',
      timestamp: '4 mins ago',
      device: 'Mobile',
      isVoter: false
    },
    {
      id: 'log-5',
      action: 'Voter in Cross River reviewed Sandy Onor & Donald Duke policies',
      state: 'Cross River',
      timestamp: '5 mins ago',
      device: 'Desktop',
      isVoter: true
    },
    {
      id: 'log-6',
      action: 'Voter in Benue viewed Arc. Peter Ada Agada Direct Labor plan',
      state: 'Benue',
      timestamp: '6 mins ago',
      device: 'Mobile',
      isVoter: true
    },
    {
      id: 'log-7',
      action: 'Visitor in Kano completed Candidate Matchmaker Quiz',
      state: 'Kano',
      timestamp: '8 mins ago',
      device: 'Mobile',
      isVoter: false
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

  const updateCandidatePhoto = useCallback((candidateId: string, photoDataUrl: string) => {
    setCustomPhotos(prev => {
      const updated = { ...prev, [candidateId]: photoDataUrl };
      try {
        localStorage.setItem('naija_votes_custom_photos', JSON.stringify(updated));
      } catch {
        // quota
      }
      return updated;
    });
  }, []);

  const candidates = useMemo(() => {
    return CANDIDATES.map(c => ({
      ...c,
      photoUrl: customPhotos[c.id] || c.photoUrl
    }));
  }, [customPhotos]);

  // Sync stateVotes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_TALLIES_KEY, JSON.stringify(stateVotes));
    } catch {
      // storage quota or error
    }
  }, [stateVotes]);

  // Sync comments
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(comments));
    } catch {
      // fallback
    }
  }, [comments]);

  // Sync issues
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ISSUES_KEY, JSON.stringify(issuePolls));
    } catch {
      // fallback
    }
  }, [issuePolls]);

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
    let topCand: Candidate | null = null;
    let maxVotes = -1;

    CANDIDATES.forEach(cand => {
      const votes = candidateTotals[cand.id] || 0;
      if (votes > maxVotes) {
        maxVotes = votes;
        topCand = cand;
      }
    });

    return topCand;
  }, [candidateTotals]);

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

    // Update tallies immediately: add 1 vote to the chosen candidate
    setStateVotes(prev => {
      const stateVotesObj = { ...prev };
      const targetState = { ...(stateVotesObj[votingState] || {}) };
      const currentCount = targetState[candidateId] || 0;
      targetState[candidateId] = currentCount + 1;
      stateVotesObj[votingState] = targetState;
      return stateVotesObj;
    });

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

    // If reason provided, add as a verified comment in townhall
    if (reason && reason.trim().length > 5) {
      const newComment: Comment = {
        id: 'c_' + Date.now(),
        author: name?.trim() || 'Verified Voter',
        state: votingState,
        candidateId,
        content: reason.trim(),
        timestamp: 'Just now',
        likes: 1,
        isVerifiedVoter: true
      };
      setComments(prev => [newComment, ...prev]);
    }

    setShowVoterSlipModal(true);
    return newVote;
  }, []);

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
    setComments(prev => [newComment, ...prev]);
  }, []);

  const likeComment = useCallback((commentId: string) => {
    setComments(prev => prev.map(c => c.id === commentId ? { ...c, likes: c.likes + 1 } : c));
  }, []);

  const voteIssuePoll = useCallback((issueId: string) => {
    setIssuePolls(prev => prev.map(i => i.id === issueId ? { ...i, votes: i.votes + 1 } : i));
    setHasVotedIssue(true);
    localStorage.setItem('naija_votes_issue_voted', 'true');
  }, []);

  // Background realistic simulation: every 3.5 seconds, random state casts 1-3 votes
  useEffect(() => {
    if (!isSimulationActive) return;

    const interval = setInterval(() => {
      // Pick random state
      const randomStateObj = NIGERIAN_STATES[Math.floor(Math.random() * NIGERIAN_STATES.length)];
      const stateName = randomStateObj.name;

      // Weighted random candidate selection based roughly on real tendencies
      let candId = 'tinubu';
      const rand = Math.random();

      if (['Anambra', 'Enugu', 'Imo', 'Abia', 'Ebonyi', 'FCT Abuja', 'Diaspora Voters'].includes(stateName)) {
        candId = rand < 0.65 ? 'obi' : rand < 0.78 ? 'tinubu' : rand < 0.88 ? 'technocrat' : 'atiku';
      } else if (['Kano', 'Jigawa'].includes(stateName)) {
        candId = rand < 0.55 ? 'kwankwaso' : rand < 0.78 ? 'tinubu' : rand < 0.90 ? 'atiku' : 'obi';
      } else if (['Lagos', 'Ogun', 'Oyo', 'Ondo', 'Osogbo', 'Ekiti', 'Borno'].includes(stateName)) {
        candId = rand < 0.52 ? 'tinubu' : rand < 0.78 ? 'obi' : rand < 0.88 ? 'atiku' : rand < 0.94 ? 'sowore' : 'technocrat';
      } else if (['Adamawa', 'Bauchi', 'Taraba', 'Yobe', 'Gombe'].includes(stateName)) {
        candId = rand < 0.48 ? 'atiku' : rand < 0.76 ? 'tinubu' : rand < 0.88 ? 'kwankwaso' : 'obi';
      } else {
        // South South or North Central general
        candId = rand < 0.38 ? 'obi' : rand < 0.68 ? 'tinubu' : rand < 0.86 ? 'atiku' : rand < 0.94 ? 'technocrat' : 'sowore';
      }

      const voteInc = Math.floor(Math.random() * 2) + 1;

      setStateVotes(prev => {
        const stateRec = prev[stateName] || {};
        return {
          ...prev,
          [stateName]: {
            ...stateRec,
            [candId]: (stateRec[candId] || 0) + voteInc
          }
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
    }, 3800);

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

  // Track unique voter visits and cumulative all-time page visits
  useEffect(() => {
    try {
      const sessionKey = 'naija_votes_session_recorded_v1';
      const hasSession = sessionStorage.getItem(sessionKey);
      const uniqueVoterKey = 'naija_votes_unique_voter_tracked_v1';
      const isExistingVoter = localStorage.getItem(uniqueVoterKey);

      setAnalytics(prev => {
        const newAllTime = hasSession ? prev.allTimeVisits : prev.allTimeVisits + 1;
        const newVoters = isExistingVoter ? prev.votersVisited : prev.votersVisited + 1;

        if (!hasSession) {
          sessionStorage.setItem(sessionKey, 'true');
          localStorage.setItem('naija_votes_analytics_all_time', newAllTime.toString());
        }
        if (!isExistingVoter) {
          localStorage.setItem(uniqueVoterKey, 'true');
          localStorage.setItem('naija_votes_analytics_voters', newVoters.toString());
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

  // Heartbeat fluctuation for "Currently Online" visitors (1,620 - 1,890 active range)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => {
        const delta = Math.floor(Math.random() * 11) - 5;
        const nextOnline = Math.min(2650, Math.max(1540, prev.currentlyOnline + delta));
        return {
          ...prev,
          currentlyOnline: nextOnline
        };
      });
    }, 4500);

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
    }, 6500);

    return () => clearInterval(interval);
  }, []);

  const resetAnalytics = useCallback(() => {
    localStorage.removeItem('naija_votes_analytics_all_time');
    localStorage.removeItem('naija_votes_analytics_voters');
    setAnalytics({
      votersVisited: 194530,
      allTimeVisits: 284910,
      currentlyOnline: 1742,
      turnoutPercentage: 0
    });
    setVisitorLogs(prev => [
      {
        id: 'log-' + Date.now(),
        action: 'Admin reset visitor analytics telemetry',
        state: 'INEC Control Room',
        timestamp: 'Just now',
        device: 'Desktop',
        isVoter: true
      },
      ...prev
    ]);
  }, []);

  const toggleSimulation = useCallback(() => {
    setIsSimulationActive(prev => !prev);
  }, []);

  const resetAllVotes = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_VOTE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_TALLIES_KEY);
    setUserVote(null);
    setStateVotes(INITIAL_STATE_VOTES);
    setLiveFeed([]);
  }, []);

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
