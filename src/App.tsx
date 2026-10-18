/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ElectionProvider, useElection } from './context/ElectionContext';
import { Header } from './components/Header';
import { VotingBooth } from './components/VotingBooth';
import { LiveResults } from './components/LiveResults';
import { GeopoliticalAnalysis } from './components/GeopoliticalAnalysis';
import { CandidateProfiles } from './components/CandidateProfiles';
import { PolicyComparator } from './components/PolicyComparator';
import { TownHall } from './components/TownHall';
import { VoterSlipModal } from './components/VoterSlipModal';
import { INECDisclaimerFooter } from './components/INECDisclaimerFooter';

function MainAppContent() {
  const { activeTab } = useElection();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white bg-grid-pattern">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          {activeTab === 'vote' && <VotingBooth />}
          {activeTab === 'results' && <LiveResults />}
          {activeTab === 'map' && <GeopoliticalAnalysis />}
          {activeTab === 'candidates' && <CandidateProfiles />}
          {activeTab === 'compare' && <PolicyComparator />}
          {activeTab === 'quiz' && <PolicyComparator />}
          {activeTab === 'townhall' && <TownHall />}
        </main>
      </div>

      <VoterSlipModal />
      <INECDisclaimerFooter />
    </div>
  );
}

export default function App() {
  return (
    <ElectionProvider>
      <MainAppContent />
    </ElectionProvider>
  );
}
