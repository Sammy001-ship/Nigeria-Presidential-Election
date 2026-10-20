import React, { useState, useMemo } from 'react';
import { useElection } from '../context/ElectionContext';
import { 
  Users, 
  Eye, 
  Radio, 
  Vote, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  MapPin, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Download, 
  RotateCcw, 
  Play, 
  Pause, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Layers,
  ArrowUpRight,
  Server,
  Zap,
  Globe,
  Lock,
  Unlock,
  KeyRound,
  EyeOff,
  ShieldAlert,
  LogOut
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    analytics, 
    visitorLogs, 
    totalNationalVotes, 
    candidates,
    leadingCandidate, 
    isSimulationActive, 
    toggleSimulation, 
    resetAnalytics,
    resetAllVotes,
    setActiveTab,
    isAdminAuthenticated,
    verifyAdminPassword,
    lockAdmin
  } = useElection();

  const [activeLogFilter, setActiveLogFilter] = useState<'ALL' | 'VOTERS' | 'BROWSING'>('ALL');
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showResetSandboxConfirm, setShowResetSandboxConfirm] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const handleResetSandbox = () => {
    resetAllVotes();
    setShowResetSandboxConfirm(false);
    setCopiedNotification('Sandbox reset: All candidate ballots, tallies, and state votes have been reset to zero.');
    setTimeout(() => setCopiedNotification(null), 4000);
  };

  // Inline Admin authentication state
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineShowPassword, setInlineShowPassword] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);

  const handleInlineAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError(null);
    const success = verifyAdminPassword(inlinePassword);
    if (!success) {
      setInlineError('Access Denied: Incorrect administrator password.');
    } else {
      setInlinePassword('');
    }
  };

  // Turnout conversion: votes cast vs unique voter visitors
  const conversionRate = useMemo(() => {
    if (!analytics.votersVisited || analytics.votersVisited === 0) return '0.0';
    return ((totalNationalVotes / analytics.votersVisited) * 100).toFixed(1);
  }, [totalNationalVotes, analytics.votersVisited]);

  // Filtered activity logs
  const filteredLogs = useMemo(() => {
    if (activeLogFilter === 'VOTERS') {
      return visitorLogs.filter(log => log.isVoter);
    }
    if (activeLogFilter === 'BROWSING') {
      return visitorLogs.filter(log => !log.isVoter);
    }
    return visitorLogs;
  }, [visitorLogs, activeLogFilter]);

  // Top visiting states distribution
  const stateTraffic = [
    { state: 'Lagos', zone: 'South West', share: '22.8%', visits: Math.round(analytics.allTimeVisits * 0.228), color: '#10b981' },
    { state: 'FCT Abuja', zone: 'North Central', share: '14.6%', visits: Math.round(analytics.allTimeVisits * 0.146), color: '#3b82f6' },
    { state: 'Kano', zone: 'North West', share: '11.4%', visits: Math.round(analytics.allTimeVisits * 0.114), color: '#8b5cf6' },
    { state: 'Rivers', zone: 'South South', share: '8.9%', visits: Math.round(analytics.allTimeVisits * 0.089), color: '#06b6d4' },
    { state: 'Oyo', zone: 'South West', share: '7.8%', visits: Math.round(analytics.allTimeVisits * 0.078), color: '#f59e0b' },
    { state: 'Diaspora Voters', zone: 'Diaspora', share: '7.2%', visits: Math.round(analytics.allTimeVisits * 0.072), color: '#ec4899' },
    { state: 'Benue', zone: 'North Central', share: '5.9%', visits: Math.round(analytics.allTimeVisits * 0.059), color: '#14b8a6' },
    { state: 'Cross River', zone: 'South South', share: '5.3%', visits: Math.round(analytics.allTimeVisits * 0.053), color: '#f97316' },
    { state: 'Kaduna', zone: 'North West', share: '4.8%', visits: Math.round(analytics.allTimeVisits * 0.048), color: '#6366f1' },
    { state: 'Anambra', zone: 'South East', share: '4.2%', visits: Math.round(analytics.allTimeVisits * 0.042), color: '#84cc16' }
  ];

  // Export analytics as JSON file
  const handleExportData = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      platform: 'NaijaVotes 2027 Mock Presidential Election & Civic Barometer',
      telemetry: {
        votersVisited: analytics.votersVisited,
        allTimeVisits: analytics.allTimeVisits,
        currentlyOnline: analytics.currentlyOnline,
        totalBallotsCast: totalNationalVotes,
        turnoutConversionRate: `${conversionRate}%`,
        leadingCandidate: leadingCandidate?.name || 'None'
      },
      topTrafficStates: stateTraffic,
      recentActivityLogs: visitorLogs.slice(0, 30)
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `naijavotes-telemetry-report-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setCopiedNotification('Telemetry analytics report successfully exported as JSON!');
    setTimeout(() => setCopiedNotification(null), 3500);
  };

  // If not authenticated, render restricted authentication screen
  if (!isAdminAuthenticated) {
    return (
      <div className="max-w-xl mx-auto py-8 sm:py-16 px-4 animate-in fade-in duration-300">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-slate-800 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Restricted National Operations Center
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Administrator Authentication
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
            This dashboard displays sensitive audience analytics, unique voter visits, all-time page impressions, and live online concurrency. Enter your administrative password to continue.
          </p>

          {inlineError && (
            <div className="mb-6 bg-red-950/80 border border-red-500/60 text-red-200 px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{inlineError}</span>
            </div>
          )}

          <form onSubmit={handleInlineAuthSubmit} className="space-y-4 max-w-sm mx-auto">
            <div className="text-left">
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5 tracking-wider">
                Security Passphrase
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={inlineShowPassword ? 'text' : 'password'}
                  value={inlinePassword}
                  onChange={(e) => {
                    setInlinePassword(e.target.value);
                    if (inlineError) setInlineError(null);
                  }}
                  autoFocus
                  placeholder="Enter admin password..."
                  className="w-full pl-10 pr-11 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setInlineShowPassword(!inlineShowPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {inlineShowPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={!inlinePassword.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/40 transition cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Unlock Admin Telemetry</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => setActiveTab('vote')}
              className="text-slate-400 hover:text-emerald-400 transition flex items-center gap-1"
            >
              <span>← Return to Voting Booth</span>
            </button>
            <span className="font-mono text-[11px]">INEC-NOC-AUTH</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Title */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                Live Control Room & Telemetry
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ID: INEC-NOC-2027
              </span>
              <span className="flex items-center gap-1 text-[11px] bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 font-mono px-2 py-0.5 rounded-full">
                <Unlock className="w-3 h-3 text-emerald-400" />
                Session: Samuelpicolo1
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Audience & Voter Traffic Analytics</span>
            </h2>

            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Official command dashboard monitoring verified voter impressions, unique citizen voter sessions, all-time page visits, and real-time concurrent online activity ahead of the 2027 election.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={lockAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-red-950/70 text-red-200 border border-red-800/80 hover:bg-red-900 transition shadow-sm"
              title="Lock Admin session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span>Lock Session</span>
            </button>

            <button
              onClick={toggleSimulation}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                isSimulationActive 
                  ? 'bg-emerald-950/70 text-emerald-200 border-emerald-700/60 hover:bg-emerald-900' 
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isSimulationActive ? (
                <>
                  <Pause className="w-4 h-4 text-emerald-400" />
                  <span>Pause Live Feed</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-slate-400" />
                  <span>Resume Live Feed</span>
                </>
              )}
            </button>

            <button
              onClick={handleExportData}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-3.5 py-2 rounded-xl border border-slate-700 transition shadow-sm"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Telemetry</span>
            </button>

            {/* Reset Sandbox Button */}
            {showResetSandboxConfirm ? (
              <div className="flex items-center gap-2 bg-amber-950/90 border border-amber-800/90 px-3 py-1.5 rounded-xl text-xs shadow-md">
                <span className="text-amber-200 font-semibold">Reset all votes to 0?</span>
                <button
                  onClick={handleResetSandbox}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-2.5 py-1 rounded-lg text-xs transition shadow"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetSandboxConfirm(false)}
                  className="text-slate-400 hover:text-white px-2 py-1 text-xs"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetSandboxConfirm(true)}
                className="flex items-center gap-2 bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 font-bold text-xs px-3.5 py-2 rounded-xl border border-amber-700/60 transition shadow-sm"
                title="Reset Sandbox: Reset all candidate ballots, state counts, and tallies back to zero"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Reset Sandbox</span>
              </button>
            )}
          </div>
        </div>

        {/* Notification Toast */}
        {copiedNotification && (
          <div className="mt-4 bg-emerald-950/80 border border-emerald-500/60 text-emerald-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{copiedNotification}</span>
          </div>
        )}
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: How many voters visited */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Voters Visited
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {analytics.votersVisited.toLocaleString()}
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Unique registered voter sessions</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Identification:</span>
            <span className="text-slate-200 font-semibold">Local fingerprinting</span>
          </div>
        </div>

        {/* Metric 2: All time visit */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              All-Time Visits
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {analytics.allTimeVisits.toLocaleString()}
            </div>
            <div className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Cumulative pageviews & sessions</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg. Page Depth:</span>
            <span className="text-slate-200 font-semibold">3.8 views / visitor</span>
          </div>
        </div>

        {/* Metric 3: Currently Online */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Currently Online
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-300 font-mono tracking-tight flex items-baseline gap-2">
              <span>{analytics.currentlyOnline.toLocaleString()}</span>
              <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Live</span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              Active concurrent citizens now
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Peak 24h Window:</span>
            <span className="text-emerald-400 font-semibold">2,894 active</span>
          </div>
        </div>

        {/* Metric 4: Ballots Cast / Turnout Rate */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between pb-4">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              Total Ballots Cast
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Vote className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              {totalNationalVotes.toLocaleString()}
            </div>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
              <span>Turnout: <strong>{conversionRate}%</strong> of visiting voters</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Roster:</span>
            <span className="text-slate-200 font-semibold">{candidates.length} Presidential Candidates</span>
          </div>
        </div>

      </div>

      {/* Middle Section: Traffic Distribution & Real-Time Hourly Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: State & Geopolitical Traffic Breakdown */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Top Visitor Traffic by Nigerian States & Diaspora</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution of citizen visits across 36 states, the Federal Capital Territory, and global diaspora voters
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('map')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              <span>View Map Matrix</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Traffic Table / Progress Bars */}
          <div className="space-y-3.5">
            {stateTraffic.map((st, i) => (
              <div key={st.state} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-slate-500 font-mono text-[11px]">{i + 1}.</span>
                    <span className="text-white font-bold">{st.state}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-normal">
                      {st.zone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 font-mono text-[11px]">
                      {st.visits.toLocaleString()} visits
                    </span>
                    <span className="text-emerald-400 font-bold font-mono w-12 text-right">
                      {st.share}
                    </span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: st.share,
                      backgroundColor: st.color 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Device Telemetry & Infrastructure Health */}
        <div className="space-y-6">
          {/* Device Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Device & Platform Share</span>
            </h3>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Mobile Devices</div>
                    <div className="text-[10px] text-slate-400">Android & iOS smartphones</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-emerald-400 font-mono">75.6%</div>
                  <div className="text-[10px] text-slate-500">{Math.round(analytics.allTimeVisits * 0.756).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Desktop & Laptops</div>
                    <div className="text-[10px] text-slate-400">Windows, macOS & Linux</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-blue-400 font-mono">21.2%</div>
                  <div className="text-[10px] text-slate-500">{Math.round(analytics.allTimeVisits * 0.212).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Tablet className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Tablets & WebApps</div>
                    <div className="text-[10px] text-slate-400">iPads & Android Tablets</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-purple-400 font-mono">3.2%</div>
                  <div className="text-[10px] text-slate-500">{Math.round(analytics.allTimeVisits * 0.032).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* System & Telemetry Health */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-400" />
              <span>Platform Health & Security</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Voter Integrity Rule:</span>
                <span className="text-emerald-400 font-bold">1 Citizen, 1 Ballot (Locked)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Live Heartbeat Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active (4s ping)
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800/80">
                <span>Database Sync Engine:</span>
                <span className="text-slate-200 font-mono">Local State Storage v2</span>
              </div>
              <div className="flex items-center justify-between text-slate-300 py-1">
                <span>Registered Presidential Candidates:</span>
                <span className="text-white font-bold">{candidates.length} / 18</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Real-Time Live Activity Telemetry Log Feed */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>Live Citizen Telemetry Feed</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time audit log of citizen visits, ballot submissions, and policy inspections
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveLogFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeLogFilter === 'ALL'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events ({visitorLogs.length})
            </button>
            <button
              onClick={() => setActiveLogFilter('VOTERS')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeLogFilter === 'VOTERS'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ballot Actions
            </button>
            <button
              onClick={() => setActiveLogFilter('BROWSING')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                activeLogFilter === 'BROWSING'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Browsing
            </button>
          </div>
        </div>

        {/* Logs Feed List */}
        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {filteredLogs.map(log => (
            <div 
              key={log.id} 
              className="flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${log.isVoter ? 'bg-emerald-400' : 'bg-blue-400'}`}></span>
                
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-200">
                    {log.action}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <MapPin className="w-3 h-3" />
                      {log.state}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      {log.device === 'Mobile' && <Smartphone className="w-3 h-3" />}
                      {log.device === 'Desktop' && <Laptop className="w-3 h-3" />}
                      {log.device === 'Tablet' && <Tablet className="w-3 h-3" />}
                      {log.device}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Admin Controls Footer */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Real-time listener active. Telemetry updates automatically.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Reset Sandbox Option */}
            {showResetSandboxConfirm ? (
              <div className="flex items-center gap-2 bg-amber-950/80 border border-amber-800 px-3 py-1.5 rounded-xl">
                <span className="text-amber-300 font-semibold text-xs">Reset all sandbox votes to 0?</span>
                <button
                  onClick={handleResetSandbox}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-2 py-0.5 rounded text-[11px]"
                >
                  Yes, Reset Sandbox
                </button>
                <button
                  onClick={() => setShowResetSandboxConfirm(false)}
                  className="text-slate-400 hover:text-white px-2 py-0.5 text-[11px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetSandboxConfirm(true)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition"
                title="Reset all candidate votes to zero"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset Sandbox</span>
              </button>
            )}

            <span className="text-slate-700">|</span>

            {/* Reset Telemetry Option */}
            {showResetConfirm ? (
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-800 px-3 py-1.5 rounded-xl">
                <span className="text-red-300 font-semibold text-xs">Reset metrics?</span>
                <button
                  onClick={() => {
                    resetAnalytics();
                    setShowResetConfirm(false);
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-2 py-0.5 rounded text-[11px]"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-slate-400 hover:text-white px-2 py-0.5 text-[11px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Telemetry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
