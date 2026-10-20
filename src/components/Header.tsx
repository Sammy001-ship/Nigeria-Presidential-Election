import React, { useState, useEffect } from 'react';
import { useElection } from '../context/ElectionContext';
import { 
  Vote, 
  BarChart3, 
  MapPin, 
  Users, 
  Scale, 
  HelpCircle, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  Radio, 
  RefreshCw,
  Award,
  FileCheck,
  Activity,
  Lock,
  Unlock
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    totalNationalVotes, 
    leadingCandidate, 
    activeTab, 
    setActiveTab, 
    hasVoted, 
    userVote,
    setShowVoterSlipModal,
    isSimulationActive,
    toggleSimulation,
    candidates,
    analytics,
    isAdminAuthenticated,
    lockAdmin,
    setAdminAuthModalOpen
  } = useElection();

  // Countdown to Election Day (89 days from now)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; mins: number; secs: number }>(() => {
    return {
      days: 89,
      hours: 14,
      mins: 0,
      secs: 0
    };
  });

  useEffect(() => {
    const STORAGE_KEY = 'naija_votes_2027_election_target_89d_v1';
    let targetTime: number;

    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored) {
      const parsed = parseInt(stored, 10);
      const remainingDays = (parsed - Date.now()) / (1000 * 60 * 60 * 24);
      // Valid if between 0 and 90 days
      if (!isNaN(parsed) && remainingDays > 0 && remainingDays <= 90) {
        targetTime = parsed;
      } else {
        targetTime = Date.now() + (89 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
        localStorage.setItem(STORAGE_KEY, targetTime.toString());
      }
    } else {
      targetTime = Date.now() + (89 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const publicNavItems = [
    { id: 'vote', label: 'Cast Ballot', icon: Vote, highlight: !hasVoted },
    { id: 'results', label: 'Live Results', icon: BarChart3 },
    { id: 'map', label: 'Zones & States', icon: MapPin },
    { id: 'candidates', label: 'Candidates', icon: Users },
    { id: 'compare', label: 'Policy Matrix', icon: Scale },
    { id: 'quiz', label: 'Matchmaker', icon: HelpCircle },
    { id: 'townhall', label: 'Town Hall', icon: MessageSquare }
  ] as const;

  const navItems = isAdminAuthenticated
    ? [...publicNavItems, { id: 'admin' as const, label: 'Live Telemetry', icon: Activity }]
    : publicNavItems;

  const votedCandidate = hasVoted ? candidates.find(c => c.id === userVote?.candidateId) : null;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top Banner: National Status & Countdown */}
      <div className="bg-emerald-950/70 border-b border-emerald-800/40 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-emerald-200">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulationActive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulationActive ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className="font-semibold tracking-wide uppercase text-[11px] text-emerald-100 flex items-center gap-1.5">
              <span>🇳🇬 Federal Republic of Nigeria 2027</span>
              <span className="text-emerald-400 font-normal">| Civic Sentiment Barometer</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Live Online Badge */}
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  setActiveTab('admin');
                } else {
                  setAdminAuthModalOpen(true);
                }
              }}
              title="Live Telemetry"
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-300 font-mono text-[11px] bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-2 py-0.5 rounded transition cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{analytics.currentlyOnline.toLocaleString()} Online</span>
            </button>

            {/* Countdown */}
            <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="hidden sm:inline">Election Day:</span>
              <span className="bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded text-emerald-300 font-bold tracking-tight shadow-sm">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.mins}m {timeLeft.secs}s
              </span>
            </div>

            {/* Simulation toggle */}
            <button
              onClick={toggleSimulation}
              title="Toggle simulated live ballot stream"
              className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition ${
                isSimulationActive 
                  ? 'bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/50' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700'
              }`}
            >
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Live Ticker: {isSimulationActive ? 'Active' : 'Paused'}</span>
            </button>

            {/* Discrete Portal access trigger */}
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-1 bg-emerald-950/70 border border-emerald-700/60 rounded px-1.5 py-0.5">
                <button
                  onClick={() => setActiveTab('admin')}
                  className="flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white font-semibold"
                  title="Telemetry Portal (Unlocked)"
                >
                  <Unlock className="w-3 h-3 text-emerald-400" />
                  <span>Portal</span>
                </button>
                <button
                  onClick={lockAdmin}
                  className="text-[10px] text-slate-400 hover:text-red-400 ml-1 pl-1 border-l border-slate-700"
                  title="Lock Session"
                >
                  Lock
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAdminAuthModalOpen(true)}
                title="System Gate"
                aria-label="System Gate"
                className="flex items-center justify-center p-1 sm:px-1.5 sm:py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-emerald-300 transition"
              >
                <Lock className="w-3 h-3 text-slate-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('vote')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-900 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-500/10"></div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-4 bg-emerald-600 flex items-center justify-center rounded-[2px] p-0.5">
                    <div className="w-2 h-full bg-white"></div>
                  </div>
                  <span className="text-[9px] font-black tracking-widest text-emerald-400 mt-0.5">2027</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>Naija</span><span className="text-emerald-400">Votes</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold tracking-normal">
                    2027
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Nigeria Presidential Mock Election & Public Opinion Barometer
              </p>
            </div>
          </div>

          {/* User voter slip badge (mobile view) */}
          {hasVoted && (
            <button
              onClick={() => setShowVoterSlipModal(true)}
              className="md:hidden flex items-center gap-1.5 bg-emerald-900/40 border border-emerald-500/50 text-emerald-300 px-2.5 py-1 rounded-lg text-xs font-semibold"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Voter Slip</span>
            </button>
          )}
        </div>

        {/* Live Vote Counter & Accreditation Status */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-3 bg-slate-800/80 border border-slate-700/60 rounded-xl px-3.5 py-1.5 shadow-inner">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">National Ballots</div>
              <div className="text-lg font-black text-white font-mono flex items-center gap-1.5">
                <span>{totalNationalVotes.toLocaleString()}</span>
                <span className="text-xs text-emerald-400 font-semibold">votes</span>
              </div>
            </div>
            <div className="h-7 w-px bg-slate-700"></div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leading Candidate</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate max-w-[130px]">{leadingCandidate?.name || 'Tallying...'}</span>
              </div>
            </div>
          </div>

          {/* User Voter Slip CTA */}
          {hasVoted ? (
            <button
              onClick={() => setShowVoterSlipModal(true)}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-semibold text-xs px-3.5 py-2 rounded-xl shadow-md shadow-emerald-900/30 transition border border-emerald-400/30"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-200" />
              <div className="text-left">
                <div className="text-[10px] text-emerald-200 leading-none">Accredited Voter</div>
                <div className="text-xs font-bold leading-tight">View PVC Slip</div>
              </div>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('vote')}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/40 transition hover:scale-[1.02] border border-emerald-400/30"
            >
              <Vote className="w-4 h-4 text-emerald-200 animate-bounce" />
              <span>Cast Your Vote</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <nav className="flex items-center space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition whitespace-nowrap shrink-0 relative ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.id === 'vote' && !hasVoted && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
                {item.id === 'vote' && hasVoted && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-800/80 text-emerald-200">
                    Voted
                  </span>
                )}
                {item.id === 'admin' && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950/80 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
