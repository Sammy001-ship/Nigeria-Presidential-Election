import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { MATCHMAKER_QUIZ, CANDIDATES } from '../data/electionData';
import { 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Vote, 
  Sparkles,
  Zap,
  TrendingDown,
  Shield,
  Briefcase,
  DollarSign
} from 'lucide-react';

export const PolicyComparator: React.FC = () => {
  const { candidates, setActiveTab, castVote, setShowVoterSlipModal, userVote, hasVoted } = useElection();
  const [activeView, setActiveView] = useState<'matrix' | 'quiz'>('matrix');

  const handleQuickVote = async (candId: string) => {
    if (hasVoted) return;
    await castVote(candId);
    setShowVoterSlipModal(true);
  };

  // Policy matrix topic filter
  const topics = [
    'Economy & Naira',
    'Fuel Subsidy',
    'Security & Policing',
    'Minimum Wage',
    'Electricity & Grid'
  ];
  const [selectedTopic, setSelectedTopic] = useState<string>(topics[0]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({}); // questionIndex -> optionIndex
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleSelectQuizOption = (optionIndex: number) => {
    const updated = { ...userAnswers, [currentQuestionIndex]: optionIndex };
    setUserAnswers(updated);

    if (currentQuestionIndex < MATCHMAKER_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
  };

  // Calculate scores for candidates from quiz
  const matchResults = React.useMemo(() => {
    if (!quizFinished) return [];

    const scores: Record<string, number> = {};
    candidates.forEach(c => { scores[c.id] = 0; });

    Object.entries(userAnswers).forEach(([qIdxStr, optIdx]) => {
      const qIdx = parseInt(qIdxStr);
      const question = MATCHMAKER_QUIZ[qIdx];
      if (question && question.options[optIdx]) {
        const weights = question.options[optIdx].weights;
        Object.entries(weights).forEach(([cId, weight]) => {
          scores[cId] = (scores[cId] || 0) + weight;
        });
      }
    });

    const maxPossibleScore = MATCHMAKER_QUIZ.length * 4;
    return candidates.map(c => {
      const score = scores[c.id] || 0;
      const matchPct = Math.round((score / maxPossibleScore) * 100);
      return {
        candidate: c,
        score,
        matchPct: Math.min(Math.max(matchPct, 20), 98) // clamp realistic range
      };
    }).sort((a, b) => b.matchPct - a.matchPct);
  }, [quizFinished, userAnswers, candidates]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* View Switcher Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>Issues, Ideology & Candidate Alignment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Policy Comparison & Matchmaker Quiz
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Compare how each aspirant proposes to solve Nigeria's most pressing challenges, or take the 5-question Matchmaker to find which platform aligns closest with your worldview.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('matrix')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === 'matrix'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Policy Matrix</span>
            </button>

            <button
              onClick={() => setActiveView('quiz')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeView === 'quiz'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Matchmaker Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: POLICY COMPARISON MATRIX */}
      {activeView === 'matrix' && (
        <div className="space-y-6">
          {/* Topic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
                  selectedTopic === t
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Cards for each candidate on this topic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map(cand => {
              const stanceObj = cand.policyStances.find(p => p.topic === selectedTopic);

              return (
                <div 
                  key={cand.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl overflow-hidden border p-0.5 shrink-0"
                        style={{ borderColor: cand.partyColor }}
                      >
                        <img src={cand.photoUrl} alt={cand.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{cand.name}</h4>
                        <span 
                          className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                          style={{ backgroundColor: cand.partyColor }}
                        >
                          {cand.party}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                        Official Stance
                      </div>
                      <div className="text-xs font-extrabold text-white mt-1">
                        {stanceObj?.stance || 'Platform under review'}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {stanceObj?.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">{cand.zone}</span>
                    <button
                      onClick={() => !hasVoted && handleQuickVote(cand.id)}
                      disabled={hasVoted}
                      className={`font-bold flex items-center gap-1 py-1.5 px-3 rounded-lg transition ${
                        userVote?.candidateId === cand.id
                          ? 'bg-emerald-600 text-white cursor-default'
                          : hasVoted
                          ? 'text-slate-500 cursor-not-allowed opacity-60'
                          : 'text-emerald-400 hover:text-white hover:bg-emerald-950/60 cursor-pointer'
                      }`}
                    >
                      <span>{userVote?.candidateId === cand.id ? '✓ Voted' : hasVoted ? 'Locked' : `Vote ${cand.party}`}</span>
                      {!hasVoted && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: CANDIDATE MATCHMAKER QUIZ */}
      {activeView === 'quiz' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto space-y-6">
          {!quizFinished ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Question {currentQuestionIndex + 1} of {MATCHMAKER_QUIZ.length}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                    {MATCHMAKER_QUIZ[currentQuestionIndex].question}
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-400 shrink-0">
                  {Math.round(((currentQuestionIndex + 1) / MATCHMAKER_QUIZ.length) * 100)}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / MATCHMAKER_QUIZ.length) * 100}%` }}
                ></div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {MATCHMAKER_QUIZ[currentQuestionIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuizOption(idx)}
                    className="w-full text-left bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/80 rounded-xl p-4 transition group flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 group-hover:bg-emerald-500/20 text-slate-400 group-hover:text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 group-hover:text-white leading-relaxed">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>

              {currentQuestionIndex > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Results Screen */
            <div className="space-y-6">
              <div className="text-center space-y-2 border-b border-slate-800 pb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Your Candidate Compatibility Match</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Based on your policy preferences across economy, security, fuel subsidy, and governance, here is how you align with the 2027 candidates:
                </p>
              </div>

              <div className="space-y-3">
                {matchResults.map((result, idx) => (
                  <div 
                    key={result.candidate.id}
                    className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      idx === 0 
                        ? 'bg-slate-950 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                        : 'bg-slate-950/70 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl overflow-hidden border p-0.5 shrink-0"
                        style={{ borderColor: result.candidate.partyColor }}
                      >
                        <img src={result.candidate.photoUrl} alt={result.candidate.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-base">{result.candidate.name}</span>
                          <span 
                            className="text-[10px] font-bold px-1.5 py-0.2 rounded text-white"
                            style={{ backgroundColor: result.candidate.partyColor }}
                          >
                            {result.candidate.party}
                          </span>
                          {idx === 0 && (
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] px-2 py-0.5 rounded-full font-bold">
                              Top Match
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 italic">
                          "{result.candidate.slogan}"
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                      <div className="text-right">
                        <span className="text-xl font-black text-emerald-400 font-mono">
                          {result.matchPct}%
                        </span>
                        <div className="text-[10px] text-slate-500">Compatibility</div>
                      </div>

                      <button
                        onClick={() => !hasVoted && handleQuickVote(result.candidate.id)}
                        disabled={hasVoted}
                        className={`font-bold text-xs py-2 px-3.5 rounded-xl shadow transition flex items-center gap-1 shrink-0 ${
                          userVote?.candidateId === result.candidate.id
                            ? 'bg-emerald-600 text-white cursor-default'
                            : hasVoted
                            ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                        }`}
                      >
                        <Vote className="w-3.5 h-3.5" />
                        <span>{userVote?.candidateId === result.candidate.id ? '✓ Voted' : hasVoted ? 'Ballot Cast' : 'Vote Now'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleResetQuiz}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Alignment Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
