import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { NIGERIAN_STATES } from '../data/electionData';
import { 
  Vote, 
  Check, 
  CheckCircle2,
  Fingerprint, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  RotateCcw,
  BarChart3,
  TrendingUp,
  Lock,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VotingBooth: React.FC = () => {
  const { 
    candidates, 
    castVote, 
    hasVoted, 
    userVote, 
    candidateTotals,
    totalNationalVotes,
    setShowVoterSlipModal,
    setActiveTab,
    resetAllVotes
  } = useElection();

  const [votingState, setVotingState] = useState<string>(userVote?.state || 'Lagos');
  const [justVotedId, setJustVotedId] = useState<string | null>(null);
  const [alreadyVotedNotice, setAlreadyVotedNotice] = useState<string | null>(null);

  const handleVoteCandidate = async (candidateId: string) => {
    if (hasVoted) {
      setAlreadyVotedNotice('You have already cast your ballot. Electoral law enforces one vote per citizen!');
      setTimeout(() => setAlreadyVotedNotice(null), 3500);
      return;
    }

    try {
      // 1. Cast vote immediately
      await castVote(candidateId, votingState);

      setJustVotedId(candidateId);

      // 2. Confetti pop
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#008751', '#ffffff', '#10b981', '#f59e0b', '#3b82f6']
      });

      // Show voter slip modal after a brief moment
      setTimeout(() => {
        setShowVoterSlipModal(true);
      }, 1000);
    } catch (err: any) {
      setAlreadyVotedNotice(err?.message || 'You have already voted!');
    }
  };

  const votedCandidate = hasVoted ? candidates.find(c => c.id === userVote?.candidateId) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>One Citizen, One Vote System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Vote for Nigeria's 2027 President
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {hasVoted ? (
                <span>Your official mock ballot is <strong className="text-emerald-400 font-bold">locked and recorded</strong>. Each citizen is restricted to one vote.</span>
              ) : (
                <span>Click <strong className="text-emerald-400 font-bold">"Vote"</strong> on your preferred candidate. You can only vote <strong className="text-white">once</strong>, and your choice is counted immediately!</span>
              )}
            </p>
          </div>

          {/* Quick State Selector Bar (disabled after voting) */}
          <div className={`flex items-center gap-2 w-full md:w-auto p-2.5 rounded-xl border shadow-inner ${
            hasVoted ? 'bg-slate-950/60 border-slate-800/60 opacity-80' : 'bg-slate-950 border-slate-800'
          }`}>
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            <div className="text-xs text-slate-400 shrink-0 font-medium">Voting State:</div>
            {hasVoted ? (
              <span className="text-xs text-white font-bold">{userVote?.state}</span>
            ) : (
              <select
                value={votingState}
                onChange={(e) => setVotingState(e.target.value)}
                className="bg-transparent text-xs text-white font-bold focus:outline-none cursor-pointer pr-2"
              >
                {NIGERIAN_STATES.map(s => (
                  <option key={s.code} value={s.name} className="bg-slate-900 text-white">
                    {s.name} ({s.zone})
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Warning Toast if User tries to vote again */}
        {alreadyVotedNotice && (
          <div className="mt-4 bg-amber-950/80 border border-amber-600/60 text-amber-200 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{alreadyVotedNotice}</span>
          </div>
        )}

        {/* Locked Voting State Banner if already voted */}
        {hasVoted && votedCandidate && (
          <div className="mt-5 bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border-2 border-emerald-500 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in zoom-in-95 duration-200 shadow-xl shadow-emerald-950/50">
            <div className="flex items-center gap-3.5">
              <div 
                className="w-14 h-14 rounded-2xl border-2 p-0.5 overflow-hidden shrink-0 shadow-lg"
                style={{ borderColor: votedCandidate.partyColor }}
              >
                <img 
                  src={votedCandidate.photoUrl} 
                  alt={votedCandidate.name} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Accreditation Locked • One Vote Cast</span>
                </div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">
                  You voted for <span className="text-emerald-300 font-extrabold">{votedCandidate.name}</span> ({votedCandidate.party})
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Registered in <strong>{userVote?.state}</strong> • Mock VIN: <span className="font-mono text-emerald-300">{userVote?.vinMock}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={() => setShowVoterSlipModal(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View Official Voter Slip</span>
              </button>

              <button
                onClick={() => setActiveTab('results')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-3.5 rounded-xl border border-slate-700 transition flex items-center gap-1"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Live Standings</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {candidates.map((candidate) => {
          const isUserChoice = userVote?.candidateId === candidate.id;
          const isJustVoted = justVotedId === candidate.id;
          const votes = candidateTotals[candidate.id] || 0;
          const percentage = totalNationalVotes > 0 ? (votes / totalNationalVotes) * 100 : 0;

          return (
            <div
              key={candidate.id}
              className={`bg-slate-900 border rounded-2xl p-5 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden ${
                isUserChoice
                  ? 'border-emerald-500 ring-2 ring-emerald-500/40 bg-gradient-to-b from-slate-900 to-emerald-950/30'
                  : hasVoted
                  ? 'border-slate-800/80 opacity-75'
                  : 'border-slate-800 hover:border-slate-700 hover:shadow-2xl'
              }`}
            >
              {/* Badge for Chosen Candidate */}
              {isUserChoice && (
                <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/40 flex items-center gap-1 animate-in zoom-in-75">
                  <Check className="w-3.5 h-3.5" />
                  <span>YOUR VOTE</span>
                </div>
              )}

              <div>
                {/* Candidate Info Header */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-16 h-16 rounded-2xl border-2 p-0.5 overflow-hidden shrink-0 shadow-md relative"
                    style={{ borderColor: candidate.partyColor }}
                  >
                    <img 
                      src={candidate.photoUrl} 
                      alt={candidate.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="text-[10px] font-black px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: candidate.partyColor }}
                      >
                        {candidate.party}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium truncate">
                        {candidate.partyFullName}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white mt-1 leading-tight">
                      {candidate.name}
                    </h3>
                  </div>
                </div>

                {/* Slogan */}
                <p className="text-xs text-emerald-400/90 font-medium italic mt-3 line-clamp-1">
                  "{candidate.slogan}"
                </p>

                {/* Live Vote Counter */}
                <div className={`mt-4 p-3 rounded-xl border transition-all duration-300 ${
                  isUserChoice
                    ? 'bg-emerald-950/50 border-emerald-500/40' 
                    : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      Total Votes:
                    </span>
                    <span className={`font-mono text-base font-black ${
                      isUserChoice ? 'text-emerald-300' : 'text-white'
                    }`}>
                      {votes.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>Popular Share:</span>
                    <span className="font-mono font-bold text-emerald-400">{percentage.toFixed(1)}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mt-2 border border-slate-800">
                    <div 
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${Math.max(percentage, 2)}%`,
                        backgroundColor: candidate.partyColor
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* VOTE BUTTON (STRICTLY ONE-TIME VOTE) */}
              <div className="pt-2">
                {isUserChoice ? (
                  <button
                    disabled
                    className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-emerald-600 text-white shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>✓ Ballot Recorded for {candidate.name.split(' ')[0]}</span>
                  </button>
                ) : hasVoted ? (
                  <button
                    onClick={() => handleVoteCandidate(candidate.id)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-500 border border-slate-800 flex items-center justify-center gap-2 cursor-not-allowed transition"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Locked (Already Voted)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleVoteCandidate(candidate.id)}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-emerald-950 hover:scale-[1.01] active:scale-95"
                  >
                    <Fingerprint className="w-4 h-4 text-emerald-200" />
                    <span>Vote for {candidate.name.split(' ')[0]}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Reset & Sandbox Info */}
      <div className="text-center text-xs text-slate-500 pt-2 flex flex-wrap items-center justify-center gap-3">
        <span>🇳🇬 Nigeria 2027 Mock Presidential Poll</span>
        <span>•</span>
        <span>Strict Electoral Limit: 1 Vote Per Citizen</span>
        {hasVoted && (
          <>
            <span>•</span>
            <button 
              onClick={resetAllVotes}
              className="text-slate-500 hover:text-amber-400 transition flex items-center gap-1 font-medium underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Ballot (Sandbox Test Mode)</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
