import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { Candidate } from '../types/election';
import { 
  Users, 
  Award, 
  MapPin, 
  Vote, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  ExternalLink,
  Search
} from 'lucide-react';

export const CandidateProfiles: React.FC = () => {
  const { candidates, setActiveTab, hasVoted, userVote, castVote, setShowVoterSlipModal } = useElection();
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(candidates[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleVoteCandidate = async (candidateId: string) => {
    await castVote(candidateId);
    setShowVoterSlipModal(true);
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.partyFullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCandidate = candidates.find(c => c.id === selectedCandidateId) || candidates[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>2027 Presidential Aspirants & Tickets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Candidate Dossiers & 2027 Manifestos
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Inspect the official platforms, running mates, executive experience, and four-pillar manifestos of the contenders vying to lead the Federal Republic of Nigeria.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate or party..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Candidate Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
          {filteredCandidates.map(c => {
            const isSelected = c.id === activeCandidate.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCandidateId(c.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div 
                  className="w-9 h-9 rounded-lg overflow-hidden border shrink-0"
                  style={{ borderColor: c.partyColor }}
                >
                  <img src={c.photoUrl} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{c.name.split(' ').slice(0, 2).join(' ')}</div>
                  <span 
                    className="text-[9px] font-black px-1.5 py-0.2 rounded text-white inline-block mt-0.5"
                    style={{ backgroundColor: c.partyColor }}
                  >
                    {c.party}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Candidate Detailed Showcase */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
        {/* Top Hero Banner of Candidate */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div 
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 p-1 overflow-hidden shrink-0 shadow-2xl"
              style={{ borderColor: activeCandidate.partyColor }}
            >
              <img 
                src={activeCandidate.photoUrl} 
                alt={activeCandidate.name} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span 
                  className="text-xs font-black px-2.5 py-0.5 rounded-md text-white"
                  style={{ backgroundColor: activeCandidate.partyColor }}
                >
                  {activeCandidate.party}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{activeCandidate.partyFullName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {activeCandidate.fullName}
              </h2>

              <p className="text-sm font-semibold text-emerald-400 italic">
                "{activeCandidate.slogan}"
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                <span>Age: <strong className="text-white">{activeCandidate.age ? `${activeCandidate.age} years` : 'Not provided'}</strong></span>
                <span>•</span>
                <span>Origin: <strong className="text-white">{activeCandidate.stateOfOrigin || 'Not provided'}</strong>{activeCandidate.zone ? ` (${activeCandidate.zone})` : ''}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => !hasVoted && handleVoteCandidate(activeCandidate.id)}
              disabled={hasVoted}
              className={`font-bold py-3 px-6 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm ${
                userVote?.candidateId === activeCandidate.id
                  ? 'bg-emerald-600 text-white cursor-default shadow-emerald-950'
                  : hasVoted
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer shadow-emerald-950 hover:scale-[1.01]'
              }`}
            >
              <Vote className="w-4 h-4 text-emerald-200" />
              <span>
                {userVote?.candidateId === activeCandidate.id 
                  ? `✓ Your Voted Choice (${activeCandidate.party})` 
                  : hasVoted
                  ? 'Ballot Already Cast'
                  : `Vote for ${activeCandidate.name.split(' ')[0]} (${activeCandidate.party})`}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-3 px-5 rounded-xl border border-slate-700 transition flex items-center justify-center gap-2 text-sm"
            >
              <span>Compare Stances</span>
            </button>
          </div>
        </div>

        {/* Two-Column Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Background & Pedigree */}
          <div className="space-y-5">

            {/* Political Track Record & Career */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Experience & Past Offices</span>
              </div>
              <ul className="space-y-2 text-xs">
                {activeCandidate.previousOffices.length ? activeCandidate.previousOffices.map((office, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                    <span>{office}</span>
                  </li>
                )) : <li className="text-slate-400">Candidate details have not been provided.</li>}
              </ul>
            </div>

            {/* Quick Bio */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Political Background
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeCandidate.bio}
              </p>
            </div>
          </div>

          {/* Right 2 Columns: Manifesto & Policy Agenda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Manifesto Summary */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>2027 Blueprint Executive Summary</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeCandidate.manifestoSummary}
              </p>
            </div>

            {/* 4 Core Pillars */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3">
                Core Manifesto Pillars
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCandidate.manifestoPillars.length ? activeCandidate.manifestoPillars.map((pillar, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1.5 hover:border-slate-700 transition">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <h5 className="font-bold text-white text-sm">{pillar.title}</h5>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-8">
                      {pillar.description}
                    </p>
                  </div>
                )) : <p className="text-xs text-slate-400">Manifesto details have not been provided.</p>}
              </div>
            </div>

            {/* Top Policy Highlights */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Key Policy Positions
              </h4>
              <div className="space-y-3 text-xs">
                {activeCandidate.policyStances.length ? activeCandidate.policyStances.map((ps, idx) => (
                  <div key={idx} className="border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
                      <span className="text-emerald-400 font-bold">{ps.topic}</span>
                      <span className="text-white">{ps.stance}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {ps.details}
                    </p>
                  </div>
                )) : <p className="text-slate-400">Policy positions have not been provided.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
