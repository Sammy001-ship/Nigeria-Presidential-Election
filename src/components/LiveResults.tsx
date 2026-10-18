import React from 'react';
import { useElection } from '../context/ElectionContext';
import { 
  Trophy, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Radio, 
  Flame, 
  Users,
  ChevronRight,
  Sparkles,
  PieChart
} from 'lucide-react';

export const LiveResults: React.FC = () => {
  const { 
    candidates, 
    totalNationalVotes, 
    candidateTotals, 
    leadingCandidate, 
    constitutionalResults,
    liveFeed,
    isSimulationActive,
    toggleSimulation,
    setActiveTab
  } = useElection();

  // Sort candidates by total votes
  const sortedCandidates = [...candidates].sort((a, b) => {
    return (candidateTotals[b.id] || 0) - (candidateTotals[a.id] || 0);
  });

  const runnerUp = sortedCandidates[1];
  const leadMargin = leadingCandidate && runnerUp 
    ? (candidateTotals[leadingCandidate.id] || 0) - (candidateTotals[runnerUp.id] || 0)
    : 0;
  const leadMarginPercent = leadingCandidate && totalNationalVotes > 0
    ? ((leadMargin / totalNationalVotes) * 100).toFixed(1)
    : '0';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Banner & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* National Votes Cast */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Ballots Cast
          </div>
          <div className="text-3xl font-black text-white font-mono mt-1">
            {totalNationalVotes.toLocaleString()}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-time continuous tally</span>
          </div>
          <div className="absolute right-3 bottom-3 opacity-10 text-white">
            <Users className="w-16 h-16" />
          </div>
        </div>

        {/* Current Leader */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden md:col-span-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Leading Candidate</span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Trophy className="w-3 h-3 text-amber-400" /> Lead: {leadMargin.toLocaleString()} votes ({leadMarginPercent}%)
            </span>
          </div>

          {leadingCandidate && (
            <div className="flex items-center gap-4 mt-2">
              <div 
                className="w-14 h-14 rounded-xl border-2 p-0.5 overflow-hidden shrink-0"
                style={{ borderColor: leadingCandidate.partyColor }}
              >
                <img 
                  src={leadingCandidate.photoUrl} 
                  alt={leadingCandidate.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-black text-white">{leadingCandidate.name}</h3>
                  <span 
                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: leadingCandidate.partyColor }}
                  >
                    {leadingCandidate.party}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {candidateTotals[leadingCandidate.id]?.toLocaleString()} votes (
                  {((candidateTotals[leadingCandidate.id] / (totalNationalVotes || 1)) * 100).toFixed(1)}%)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Turnout / Spread Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            States Reporting
          </div>
          <div className="text-3xl font-black text-white font-mono mt-1">
            36 + FCT
          </div>
          <p className="text-xs text-slate-400 mt-2">
            All 6 geopolitical zones + diaspora active.
          </p>
        </div>
      </div>

      {/* Main Leaderboard & Share Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
              <span>National Presidential Standings</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Popular vote distribution across all participating citizens.
            </p>
          </div>
          
          <button 
            onClick={() => setActiveTab('map')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
          >
            <span>View Geopolitical State Breakdown</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Candidate Bar Rows */}
        <div className="space-y-5">
          {sortedCandidates.map((candidate, index) => {
            const votes = candidateTotals[candidate.id] || 0;
            const percentage = totalNationalVotes > 0 ? (votes / totalNationalVotes) * 100 : 0;
            const constCheck = constitutionalResults.find(r => r.candidateId === candidate.id);

            return (
              <div 
                key={candidate.id} 
                className="bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 sm:p-5 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-slate-500 w-5">
                      #{index + 1}
                    </span>
                    <div 
                      className="w-11 h-11 rounded-xl overflow-hidden border p-0.5 shrink-0"
                      style={{ borderColor: candidate.partyColor }}
                    >
                      <img 
                        src={candidate.photoUrl} 
                        alt={candidate.name} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base sm:text-lg">{candidate.name}</span>
                        <span 
                          className="text-[10px] font-black px-2 py-0.5 rounded text-white"
                          style={{ backgroundColor: candidate.partyColor }}
                        >
                          {candidate.party}
                        </span>
                        {index === 0 && (
                          <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            Leader
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">
                        {candidate.partyFullName}{candidate.zone ? ` • ${candidate.zone}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                    <div className="text-xl sm:text-2xl font-black text-white font-mono">
                      {percentage.toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {votes.toLocaleString()} votes
                    </div>
                  </div>
                </div>

                {/* Visual Progress Bar */}
                <div className="w-full bg-slate-900 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className="h-full rounded-full transition-all duration-700 ease-out shadow"
                    style={{ 
                      width: `${Math.max(percentage, 2)}%`,
                      backgroundColor: candidate.partyColor
                    }}
                  ></div>
                </div>

                {/* Sub-metrics: 25% state rule snippet */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>
                      25% State Spread: <strong className="text-white">{constCheck?.statesWith25Percent || 0} / 24 states</strong> reached
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={constCheck?.qualifiesConstitutionally ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                      {constCheck?.qualifiesConstitutionally ? '✓ 24-State Quota Reached' : `${24 - (constCheck?.statesWith25Percent || 0)} states needed for 2/3`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nigerian Constitutional Section 134(2) Deep-Dive Tracker */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-emerald-400">
              Constitutional Election Criteria Tracker
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              Section 134(2) of the 1999 Nigerian Constitution
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Under Nigerian constitutional law, a presidential candidate must win the <strong className="text-white">highest votes cast</strong> AND secure <strong className="text-white">at least 25% of votes in at least 24 of the 36 states</strong>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {constitutionalResults.map((result) => {
            const candidate = candidates.find(c => c.id === result.candidateId);
            const stateProgress = Math.min((result.statesWith25Percent / 24) * 100, 100);

            return (
              <div 
                key={result.candidateId}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">{result.candidateName}</h4>
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded text-white inline-block mt-0.5"
                      style={{ backgroundColor: candidate?.partyColor }}
                    >
                      {result.party}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                      result.qualifiesConstitutionally
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}>
                      {result.qualifiesConstitutionally ? 'Threshold Met' : 'In Progress'}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">States with 25%+ Share:</span>
                    <span className="font-bold text-white font-mono">
                      {result.statesWith25Percent} / 24 States
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        result.statesWith25Percent >= 24 ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${stateProgress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">2/3 State Quota:</span>
                  <span className={`font-semibold ${result.qualifiesConstitutionally ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {result.qualifiesConstitutionally ? '✓ 24 States Achieved' : `${24 - result.statesWith25Percent} states remaining`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Ballots Feed Ticker */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <h3 className="font-bold text-white text-base">Live Ballot Stream</h3>
            <span className="text-xs text-slate-400">• Real-time updates from across the federation</span>
          </div>

          <button
            onClick={toggleSimulation}
            className="text-xs text-slate-400 hover:text-emerald-400 transition"
          >
            {isSimulationActive ? 'Pause Ticker' : 'Resume Ticker'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {liveFeed.slice(0, 8).map((feed) => {
            const cand = candidates.find(c => c.id === feed.candidateId);
            return (
              <div 
                key={feed.id} 
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cand?.partyColor }}
                  ></div>
                  <div>
                    <div className="font-bold text-white truncate max-w-[110px]">{feed.state}</div>
                    <div className="text-[10px] text-slate-400">{cand?.name?.split(' ')[0]} ({cand?.party})</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-bold font-mono">+{feed.votesCount}</span>
                  <div className="text-[9px] text-slate-500">{feed.timestamp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
