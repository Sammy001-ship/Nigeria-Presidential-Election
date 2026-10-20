import React, { useState } from 'react';
import { useElection } from '../context/ElectionContext';
import { ShieldAlert, Lock, Eye, EyeOff, KeyRound, ArrowRight, X, AlertCircle } from 'lucide-react';

export const AdminAuthModal: React.FC = () => {
  const { adminAuthModalOpen, setAdminAuthModalOpen, verifyAdminPassword } = useElection();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!adminAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Verify password
    const success = verifyAdminPassword(password);
    if (!success) {
      setError('Access Denied: Incorrect administrator password.');
      setIsSubmitting(false);
    } else {
      setPassword('');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setPassword('');
    setAdminAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Restricted Operations
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              Admin Authentication
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-6">
          The Audience & Voter Telemetry Dashboard is restricted. Please provide the administrative security passphrase to unlock the live command center.
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-950/80 border border-red-500/60 text-red-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5 tracking-wider">
              Security Passphrase
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                autoFocus
                placeholder="Enter admin password..."
                className="w-full pl-10 pr-11 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!password.trim() || isSubmitting}
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/30 transition cursor-pointer"
            >
              <span>Unlock Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-500" />
            256-bit Encrypted Session
          </span>
          <span>NOC Telemetry v2</span>
        </div>
      </div>
    </div>
  );
};
