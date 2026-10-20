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
import { AdminDashboard } from './components/AdminDashboard';
import { VoterSlipModal } from './components/VoterSlipModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { INECDisclaimerFooter } from './components/INECDisclaimerFooter';

function MainAppContent() {
  const { activeTab, syncStatus, syncError } = useElection();

  const syncMessage = {
    local: 'Device-only mode: shared data sync is not configured.',
    connecting: 'Connecting to shared election data...',
    connected: 'Shared data sync is live across devices.',
    error: `Shared data sync failed: ${syncError || 'Please check Firebase configuration and try again.'}`
  }[syncStatus];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white bg-grid-pattern">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div
            role={syncStatus === 'error' ? 'alert' : 'status'}
            className={`mb-5 rounded-xl border px-4 py-3 text-xs font-semibold ${
              syncStatus === 'connected'
                ? 'border-emerald-800 bg-emerald-950/50 text-emerald-200'
                : syncStatus === 'error'
                  ? 'border-red-800 bg-red-950/50 text-red-200'
                  : 'border-slate-700 bg-slate-900 text-slate-300'
            }`}
          >
            {syncMessage}
          </div>
          {activeTab === 'vote' && <VotingBooth />}
          {activeTab === 'results' && <LiveResults />}
          {activeTab === 'map' && <GeopoliticalAnalysis />}
          {activeTab === 'candidates' && <CandidateProfiles />}
          {activeTab === 'compare' && <PolicyComparator />}
          {activeTab === 'quiz' && <PolicyComparator />}
          {activeTab === 'townhall' && <TownHall />}
          {activeTab === 'admin' && <AdminDashboard />}
        </main>
      </div>

      <VoterSlipModal />
      <AdminAuthModal />
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
