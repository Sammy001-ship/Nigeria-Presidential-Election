import React, { useState, useMemo } from 'react';
import { useElection } from '../context/ElectionContext';
import { NIGERIAN_STATES, GEOPOLITICAL_ZONES, CANDIDATES } from '../data/electionData';
import { GeopoliticalZone, NigerianState } from '../types/election';
import { 
  MapPin, 
  Search, 
  Trophy, 
  ChevronRight, 
  Layers, 
  Globe, 
  CheckCircle,
  Filter,
  X,
  Vote
} from 'lucide-react';

export const GeopoliticalAnalysis: React.FC = () => {
  const { 
    stateVotes, 
    candidates, 
    selectedZoneFilter, 
    setSelectedZoneFilter,
    setActiveTab
  } = useElection();

  const [stateSearch, setStateSearch] = useState<string>('');
  const [selectedStateDetail, setSelectedStateDetail] = useState<NigerianState | null>(null);

  // Compute aggregate votes per zone
  const zoneSummaries = useMemo(() => {
    return GEOPOLITICAL_ZONES.map(zoneObj => {
      let zoneTotal = 0;
      const zoneCandidateVotes: Record<string, number> = {};
      CANDIDATES.forEach(c => { zoneCandidateVotes[c.id] = 0; });

      zoneObj.states.forEach(stName => {
        const sVotes = stateVotes[stName] || {};
        Object.entries(sVotes).forEach(([candId, count]) => {
          zoneTotal += count;
          zoneCandidateVotes[candId] = (zoneCandidateVotes[candId] || 0) + count;
        });
      });

      // Find leader
      let leaderId = '';
      let maxVotes = 0;
      Object.entries(zoneCandidateVotes).forEach(([cId, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          leaderId = cId;
        }
      });

      const leader = zoneTotal > 0 && maxVotes > 0 ? candidates.find(c => c.id === leaderId) : undefined;
      const leaderShare = zoneTotal > 0 ? (maxVotes / zoneTotal) * 100 : 0;

      return {
        zoneName: zoneObj.name,
        color: zoneObj.color,
        stateCount: zoneObj.states.length,
        totalVotes: zoneTotal,
        leader,
        leaderVotes: maxVotes,
        leaderShare,
        candidateVotes: zoneCandidateVotes
      };
    });
  }, [stateVotes, candidates]);

  // Filter states
  const filteredStates = useMemo(() => {
    return NIGERIAN_STATES.filter(st => {
      const matchesZone = selectedZoneFilter === 'ALL' || st.zone === selectedZoneFilter;
      const matchesSearch = st.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
                            st.capital.toLowerCase().includes(stateSearch.toLowerCase()) ||
                            st.zone.toLowerCase().includes(stateSearch.toLowerCase());
      return matchesZone && matchesSearch;
    });
  }, [selectedZoneFilter, stateSearch]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>36 States + Federal Capital Territory + Diaspora</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Geopolitical Zones & State Battlegrounds
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Examine the regional distribution of votes across Nigeria's 6 geopolitical zones. Track which candidates cross the critical 25% threshold state by state.
            </p>
          </div>

          {/* Quick zone tabs scrollable */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedZoneFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                selectedZoneFilter === 'ALL'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              All Zones ({NIGERIAN_STATES.length})
            </button>
          </div>
        </div>

        {/* Zone Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 mt-6">
          {zoneSummaries.map(zone => {
            const isSelected = selectedZoneFilter === zone.zoneName;
            return (
              <button
                key={zone.zoneName}
                onClick={() => setSelectedZoneFilter(isSelected ? 'ALL' : zone.zoneName)}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-[11px] font-bold text-white truncate">{zone.zoneName}</div>
                  <div className="text-[10px] text-slate-400">{zone.totalVotes.toLocaleString()} votes</div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[9px] uppercase font-bold text-slate-500">Leading:</div>
                  {zone.leader ? (
                    <div className="text-xs font-extrabold text-emerald-400 truncate flex items-center gap-1">
                      <span 
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: zone.leader.partyColor }}
                      ></span>
                      <span>{zone.leader.party} ({zone.leaderShare.toFixed(0)}%)</span>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500 font-normal">Awaiting ballots</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* State Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={stateSearch}
            onChange={(e) => setStateSearch(e.target.value)}
            placeholder="Search state, capital, or zone..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
          />
          {stateSearch && (
            <button 
              onClick={() => setStateSearch('')} 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto justify-between sm:justify-end">
          <span>Showing <strong className="text-white">{filteredStates.length}</strong> states/territories</span>
          {selectedZoneFilter !== 'ALL' && (
            <button 
              onClick={() => setSelectedZoneFilter('ALL')}
              className="text-emerald-400 hover:underline flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Clear filter
            </button>
          )}
        </div>
      </div>

      {/* State Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((st) => {
          const sVotes = stateVotes[st.name] || {};
          const totalStateVotes = Object.values(sVotes).reduce((a, b) => a + b, 0);

          // Find leader in this state
          let leaderId = '';
          let maxVotes = 0;
          Object.entries(sVotes).forEach(([cId, count]) => {
            if (count > maxVotes) {
              maxVotes = count;
              leaderId = cId;
            }
          });

          const leader = totalStateVotes > 0 && maxVotes > 0 ? candidates.find(c => c.id === leaderId) : undefined;
          const leaderShare = totalStateVotes > 0 ? (maxVotes / totalStateVotes) * 100 : 0;

          // Which candidates reached 25% in this state?
          const candidatesWith25 = candidates.filter(c => {
            const count = sVotes[c.id] || 0;
            return totalStateVotes > 0 && (count / totalStateVotes) * 100 >= 25.0;
          });

          return (
            <div
              key={st.code}
              onClick={() => setSelectedStateDetail(st)}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-xl p-5 shadow-lg transition cursor-pointer hover:scale-[1.01] flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-black text-white text-lg group-hover:text-emerald-300 transition">
                      {st.name}
                    </h3>
                    <div className="text-xs text-slate-400">
                      Capital: {st.capital} • Zone: <strong className="text-slate-300">{st.zone}</strong>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {totalStateVotes.toLocaleString()} votes
                  </span>
                </div>

                {/* Leading candidate badge */}
                <div className="mt-3 flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  {leader ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: leader.partyColor }}
                        ></span>
                        <span className="text-slate-300 font-semibold truncate max-w-[140px]">{leader.name}</span>
                        <span 
                          className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                          style={{ backgroundColor: leader.partyColor }}
                        >
                          {leader.party}
                        </span>
                      </div>
                      <div className="font-bold text-white font-mono">
                        {leaderShare.toFixed(1)}%
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between w-full text-slate-500 font-mono text-[11px]">
                      <span>Awaiting live ballots</span>
                      <span>0 votes</span>
                    </div>
                  )}
                </div>

                {/* Multi-Candidate Color Progress Bar */}
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden flex mt-3 border border-slate-800">
                  {candidates.map(cand => {
                    const cVotes = sVotes[cand.id] || 0;
                    const cPct = totalStateVotes > 0 ? (cVotes / totalStateVotes) * 100 : 0;
                    if (cPct <= 0) return null;
                    return (
                      <div 
                        key={cand.id}
                        style={{ 
                          width: `${cPct}%`,
                          backgroundColor: cand.partyColor
                        }}
                        title={`${cand.name} (${cand.party}): ${cPct.toFixed(1)}%`}
                        className="h-full"
                      />
                    );
                  })}
                </div>
              </div>

              {/* 25% threshold badges */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <span>25%+ Threshold:</span>
                  <div className="flex items-center gap-1">
                    {candidatesWith25.map(c => (
                      <span 
                        key={c.id} 
                        className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                        style={{ backgroundColor: c.partyColor }}
                        title={`${c.name} holds 25%+ in ${st.name}`}
                      >
                        {c.party}
                      </span>
                    ))}
                  </div>
                </div>

                <span className="text-emerald-400 group-hover:translate-x-0.5 transition flex items-center gap-0.5 font-bold">
                  Inspect <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* State Detail Modal */}
      {selectedStateDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">{selectedStateDetail.name} State</h3>
                <p className="text-xs text-slate-400">
                  Capital: {selectedStateDetail.capital} • Zone: {selectedStateDetail.zone} • {selectedStateDetail.lgaCount} LGAs
                </p>
              </div>
              <button 
                onClick={() => setSelectedStateDetail(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {(() => {
                const sVotes = stateVotes[selectedStateDetail.name] || {};
                const totalStateVotes = Object.values(sVotes).reduce((a, b) => a + b, 0);

                const sortedCandInState = [...candidates].sort((a, b) => {
                  return (sVotes[b.id] || 0) - (sVotes[a.id] || 0);
                });

                return (
                  <>
                    <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Total Ballots in {selectedStateDetail.name}</div>
                        <div className="text-2xl font-black text-white font-mono mt-0.5">{totalStateVotes.toLocaleString()} votes</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase font-bold">Estimated Electorate</div>
                        <div className="text-base font-bold text-slate-200">~{selectedStateDetail.registeredVotersEst}M registered</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Candidate Breakdown in {selectedStateDetail.name}
                      </h4>
                      {sortedCandInState.map((cand, idx) => {
                        const count = sVotes[cand.id] || 0;
                        const pct = totalStateVotes > 0 ? (count / totalStateVotes) * 100 : 0;
                        const has25 = pct >= 25.0;

                        return (
                          <div 
                            key={cand.id}
                            className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-xs text-slate-500">#{idx + 1}</span>
                                <div 
                                  className="w-7 h-7 rounded-lg overflow-hidden border"
                                  style={{ borderColor: cand.partyColor }}
                                >
                                  <img src={cand.photoUrl} alt={cand.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <span className="font-bold text-white text-sm">{cand.name}</span>
                                  <span 
                                    className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white ml-2"
                                    style={{ backgroundColor: cand.partyColor }}
                                  >
                                    {cand.party}
                                  </span>
                                </div>
                              </div>

                              <div className="text-right">
                                <span className="font-black text-white font-mono text-sm">{pct.toFixed(1)}%</span>
                                <div className="text-[10px] text-slate-400 font-mono">{count.toLocaleString()} votes</div>
                              </div>
                            </div>

                            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full rounded-full"
                                style={{ 
                                  width: `${Math.max(pct, 2)}%`,
                                  backgroundColor: cand.partyColor
                                }}
                              ></div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                              <span>25% Constitutional Status:</span>
                              <span className={has25 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                                {has25 ? '✓ 25% Quota Reached' : 'Under 25%'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
