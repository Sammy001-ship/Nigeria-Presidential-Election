import React, { useEffect, useRef } from 'react';
import { useElection } from '../context/ElectionContext';
import { CANDIDATES } from '../data/electionData';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Download, 
  Printer, 
  Sparkles,
  QrCode,
  MapPin,
  Calendar,
  Hash,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const VoterSlipModal: React.FC = () => {
  const { showVoterSlipModal, setShowVoterSlipModal, userVote, candidates, setActiveTab } = useElection();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showVoterSlipModal) {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#008751', '#ffffff', '#10b981', '#f59e0b', '#3b82f6']
      });
    }
  }, [showVoterSlipModal]);

  if (!showVoterSlipModal || !userVote) return null;

  const candidate = candidates.find(c => c.id === userVote.candidateId) || CANDIDATES[0];
  const formattedDate = new Date(userVote.votedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleShareWhatsApp = () => {
    const text = `🗳️ I just voted for ${candidate.name} (${candidate.party}) in the 2027 Nigeria Presidential Mock Election! 🇳🇬\n\nMake your voice heard too! Check the live national results and cast your ballot here: ${window.location.href}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `I just voted for ${candidate.name} (${candidate.party}) in the 2027 Nigeria Presidential Mock Poll! 🇳🇬 Check the live breakdown across 36 states:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}&hashtags=NaijaVotes2027,NigeriaElections,INEC`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="bg-emerald-950 px-5 py-3 border-b border-emerald-800/60 flex items-center justify-between text-emerald-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm tracking-wide">Official Digital Voter Accreditation Slip</span>
          </div>
          <button 
            onClick={() => setShowVoterSlipModal(false)}
            className="text-emerald-300 hover:text-white p-1 rounded-lg hover:bg-emerald-900/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate / Slip Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Status Message */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Ballot Successfully Cast!</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-md mx-auto">
              Your mock vote has been recorded in the national tally and added to the geopolitical state register.
            </p>
          </div>

          {/* The Physical-Style PVC Slip Card */}
          <div 
            ref={cardRef} 
            className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/60 rounded-xl p-5 shadow-2xl overflow-hidden"
          >
            {/* Green-White-Green Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-white to-emerald-600"></div>

            {/* Background Watermark Coat of Arms Motif */}
            <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none text-emerald-400">
              <ShieldCheck className="w-64 h-64" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                  Federal Republic of Nigeria
                </div>
                <div className="text-sm font-black text-white">
                  2027 Presidential Mock Election Slip
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block bg-emerald-950 text-emerald-300 border border-emerald-600/40 text-[10px] font-mono px-2 py-0.5 rounded">
                  VERIFIED ACCREDITED
                </span>
              </div>
            </div>

            {/* Grid of Voter & Ballot Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  Voter Name
                </span>
                <p className="font-bold text-white text-sm truncate">{userVote.voterName || 'Anonymous Citizen'}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Hash className="w-3 h-3 text-emerald-400" /> Mock VIN No.
                </span>
                <p className="font-mono font-bold text-emerald-300 tracking-wider text-xs">{userVote.vinMock}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" /> Voting State & Zone
                </span>
                <p className="font-semibold text-white">{userVote.state} ({userVote.zone})</p>
                <p className="text-[11px] text-slate-400">LGA: {userVote.lga}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> Accreditation Time
                </span>
                <p className="font-medium text-slate-200">{formattedDate}</p>
              </div>
            </div>

            {/* Candidate Voted For Card */}
            <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-900/60 rounded-lg p-3 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full border-2 p-0.5 overflow-hidden shrink-0"
                  style={{ borderColor: candidate.partyColor }}
                >
                  <img 
                    src={candidate.photoUrl} 
                    alt={candidate.name} 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Voted For</div>
                  <div className="font-black text-white text-sm sm:text-base">{candidate.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span 
                      className="text-[10px] font-bold px-1.5 py-0.2 rounded text-white"
                      style={{ backgroundColor: candidate.partyColor }}
                    >
                      {candidate.party}
                    </span>
                    <span className="text-[11px] text-slate-300 truncate max-w-[180px]">{candidate.partyFullName}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-center pl-2">
                <div className="w-10 h-10 border border-slate-700 rounded-lg bg-slate-950 flex flex-col items-center justify-center p-1 text-slate-400">
                  <QrCode className="w-6 h-6 text-emerald-400" />
                  <span className="text-[7px] text-slate-500">2027 POLL</span>
                </div>
              </div>
            </div>

            {userVote.primaryReason && (
              <div className="mt-3 text-xs bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Reason for Choice:</span>
                <p className="text-slate-200 italic">"{userVote.primaryReason}"</p>
              </div>
            )}
          </div>

          {/* Share & Action Buttons */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
              Share Your Civic Choice With Fellow Nigerians
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share WhatsApp</span>
              </button>

              <button
                onClick={handleShareTwitter}
                className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Share on X / Twitter</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 py-2 px-3 rounded-lg hover:bg-slate-800 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Voter Receipt</span>
              </button>

              <button
                onClick={() => {
                  setShowVoterSlipModal(false);
                  setActiveTab('results');
                }}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2 px-4 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <span>View Live State Breakdown</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
