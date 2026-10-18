import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { 
  ShieldCheck, 
  ExternalLink, 
  HelpCircle, 
  ChevronDown, 
  RotateCcw, 
  Info,
  CheckCircle2,
  Heart
} from 'lucide-react';

export const INECDisclaimerFooter: React.FC = () => {
  const { resetAllVotes, setActiveTab } = useElection();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is this the official INEC voting portal?',
      a: 'No. This platform is an independent civic mock election and public sentiment barometer created for democratic education, civic engagement, and public opinion tracking ahead of the 2027 general elections. Real voting takes place physically at designated INEC polling units on election day.'
    },
    {
      q: 'What is the Nigerian Constitutional 25% Rule (Section 134)?',
      a: 'Under Section 134 of the 1999 Constitution of Nigeria, a presidential candidate is declared elected if they secure the highest number of votes cast nationally and not less than 25% of the votes cast in at least two-thirds (24) of the 36 states.'
    },
    {
      q: 'How does this mock poll prevent spam and multi-voting?',
      a: 'Each browser session is accredited with a simulated 19-digit mock VIN. Local storage marks the voter as accredited, while continuous live simulated feeds represent dynamic voter turnouts across Nigeria’s 36 states and the Diaspora.'
    },
    {
      q: 'How can Nigerian citizens register for their real PVC?',
      a: 'Eligible citizens aged 18 and above can visit their local INEC LGA office or check the official INEC Continuous Voter Registration portal at inecnigeria.org when the commission opens registration before the 2027 general elections.'
    }
  ];

  return (
    <footer className="mt-20 border-t border-slate-800 bg-slate-950/90 text-slate-400 text-xs">
      {/* Civic Awareness Banner */}
      <div className="bg-emerald-950/40 border-b border-emerald-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4 md:col-span-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Civic Responsibility: Get Your Real PVC!</h4>
              <p className="text-slate-300 text-xs mt-1">
                Your vote is your power. While this mock election gauges national pulse, make sure you and your family are registered to vote with INEC for 2027.
              </p>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <a
              href="https://www.inecnigeria.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition flex items-center gap-2"
            >
              <span>Visit Official INEC Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Frequently Asked Questions & Electoral Law</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-white flex items-center justify-between text-xs sm:text-sm hover:text-emerald-300 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-slate-300 text-xs leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
              <span className="w-3 h-2 bg-emerald-600 inline-block rounded-xs"></span>
              <span className="w-3 h-2 bg-white inline-block rounded-xs"></span>
              <span className="w-3 h-2 bg-emerald-600 inline-block rounded-xs"></span>
              <span>Federal Republic of Nigeria • 2027 Mock Elections</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button 
              onClick={() => setActiveTab('vote')}
              className="hover:text-emerald-400 transition"
            >
              Voting Booth
            </button>
            <button 
              onClick={() => setActiveTab('results')}
              className="hover:text-emerald-400 transition"
            >
              Live Results
            </button>
            <button 
              onClick={() => setActiveTab('map')}
              className="hover:text-emerald-400 transition"
            >
              36 States
            </button>
            <button 
              onClick={resetAllVotes}
              className="text-slate-500 hover:text-amber-400 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Sandbox</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-4 text-[11px] text-slate-600 text-center sm:text-left">
          Non-partisan public sentiment initiative. All candidate manifestos and quotes reflect published statements and campaign policy platforms. Unity and Faith, Peace and Progress.
        </div>
      </div>
    </footer>
  );
};
