import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { NIGERIAN_STATES } from '../data/electionData';
import { 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Send, 
  MapPin, 
  Flame, 
  Filter,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Zap,
  TrendingDown,
  Shield,
  Briefcase,
  DollarSign
} from 'lucide-react';

export const TownHall: React.FC = () => {
  const { 
    comments, 
    addComment, 
    likeComment, 
    candidates, 
    issuePolls, 
    voteIssuePoll, 
    hasVotedIssue,
    userVote
  } = useElection();

  const [authorName, setAuthorName] = useState<string>(userVote?.voterName || '');
  const [selectedState, setSelectedState] = useState<string>(userVote?.state || 'Lagos');
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(userVote?.candidateId || candidates[0].id);
  const [commentText, setCommentText] = useState<string>('');
  const [filterCandidate, setFilterCandidate] = useState<string>('ALL');

  const totalIssueVotes = issuePolls.reduce((acc, curr) => acc + curr.votes, 0);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addComment(
      selectedCandidateId,
      authorName.trim() || 'Civic Patriot',
      selectedState,
      commentText
    );
    setCommentText('');
  };

  const filteredComments = comments.filter(c => {
    if (filterCandidate === 'ALL') return true;
    return c.candidateId === filterCandidate;
  });

  const getIssueIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingDown': return <TrendingDown className="w-4 h-4 text-emerald-400" />;
      case 'Shield': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-emerald-400" />;
      case 'DollarSign': return <DollarSign className="w-4 h-4 text-emerald-400" />;
      default: return <Flame className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>Civic Forum & Voter Voices</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              National Town Hall & Voter Sentiments
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Hear directly from citizens across all 36 states and the diaspora on what drives their choice. Participate in the issue barometer and debate key priorities.
            </p>
          </div>
        </div>
      </div>

      {/* Top Section: Real-time Voter Priority Barometer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base sm:text-lg font-bold text-white">
              Voter Priority Barometer: What is your #1 issue for 2027?
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {totalIssueVotes.toLocaleString()} votes cast
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {issuePolls.map(issue => {
            const pct = totalIssueVotes > 0 ? (issue.votes / totalIssueVotes) * 100 : 0;

            return (
              <div 
                key={issue.id}
                onClick={() => !hasVotedIssue && voteIssuePoll(issue.id)}
                className={`bg-slate-950 border rounded-xl p-4 flex flex-col justify-between transition ${
                  hasVotedIssue 
                    ? 'border-slate-800' 
                    : 'border-slate-800 hover:border-emerald-500 cursor-pointer hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      {getIssueIcon(issue.icon)}
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400">{pct.toFixed(1)}%</span>
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-1">{issue.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{issue.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden mb-2">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  {!hasVotedIssue ? (
                    <button className="w-full text-center text-[10px] font-bold text-emerald-400 hover:text-emerald-300 py-0.5">
                      + Vote this priority
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500 block text-center font-mono">
                      {issue.votes.toLocaleString()} votes
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Town Hall Body: Comments + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Post a Comment / Voice */}
        <div className="space-y-6">
          <form onSubmit={handlePostComment} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Share Your Reason with Nigeria</span>
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Name / Alias
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Nkem, Damilola, or Usman"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  State / Region
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none transition"
                >
                  {NIGERIAN_STATES.map(s => (
                    <option key={s.code} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Candidate Supported
                </label>
                <select
                  value={selectedCandidateId}
                  onChange={(e) => setSelectedCandidateId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-2.5 py-2.5 text-xs text-white focus:outline-none transition"
                >
                  {candidates.map(c => (
                    <option key={c.id} value={c.id}>{c.party} - {c.name.split(' ')[0]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Your Perspective / Argument
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
                required
                placeholder="Explain why your candidate has the best vision for Nigeria's economy, security, and governance..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-xs flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post to National Board</span>
            </button>
          </form>

          {/* Civic Guidelines Box */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 space-y-2">
            <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
              Civic Discourse Guidelines
            </div>
            <p>
              Please engage respectfully. Focus on policies, measurable track records, and solutions rather than ethnic or defamatory remarks.
            </p>
          </div>
        </div>

        {/* Right 2 Columns: Stream of Comments with Candidate Filter */}
        <div className="lg:col-span-2 space-y-4">
          {/* Candidate Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setFilterCandidate('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                filterCandidate === 'ALL'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              All Comments ({comments.length})
            </button>
            {candidates.map(c => (
              <button
                key={c.id}
                onClick={() => setFilterCandidate(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border whitespace-nowrap ${
                  filterCandidate === c.id
                    ? 'text-white border-slate-600'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
                style={filterCandidate === c.id ? { backgroundColor: c.partyColor } : {}}
              >
                {c.party} Supporters
              </button>
            ))}
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {filteredComments.map(comment => {
              const cand = candidates.find(c => c.id === comment.candidateId);

              return (
                <div 
                  key={comment.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-xs sm:text-sm">{comment.author}</span>
                          {comment.isVerifiedVoter && (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5" title="Accredited Mock Voter">
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{comment.state}</span>
                          <span>•</span>
                          <span>{comment.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: cand?.partyColor }}
                    >
                      {cand?.party} Supporter
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {comment.content}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Supporting: <strong className="text-slate-300">{cand?.name}</strong>
                    </span>

                    <button
                      onClick={() => likeComment(comment.id)}
                      className="text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition py-1 px-2 rounded-lg hover:bg-slate-800"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
