import type { ScanResult } from '../types';
import { ShieldCheck, ShieldAlert, AlertTriangle, Activity, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

export default function ResultCard({ result }: { result: ScanResult }) {
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Dynamic Styling based on Risk Level
  const styles = {
    SAFE: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      accent: 'from-emerald-500 to-green-500',
      shadow: 'shadow-emerald-500/20',
      icon: <ShieldCheck className="w-20 h-20 text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />,
      title: 'No Threats Detected',
      subtitle: 'This URL appears to be safe'
    },
    MODERATE: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      accent: 'from-yellow-500 to-orange-500',
      shadow: 'shadow-yellow-500/20',
      icon: <AlertTriangle className="w-20 h-20 text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]" />,
      title: 'Suspicious Activity',
      subtitle: 'Proceed with caution'
    },
    CRITICAL: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/50',
      text: 'text-red-400',
      accent: 'from-red-500 to-rose-600',
      shadow: 'shadow-red-500/30',
      icon: <ShieldAlert className="w-20 h-20 text-red-500 animate-pulse drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]" />,
      title: '⚠️ Phishing Detected',
      subtitle: 'Do not enter any personal information'
    }
  };

  const theme = styles[result.risk_level];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Result Card */}
      <div className={`relative p-10 rounded-2xl border-2 ${theme.border} ${theme.bg} backdrop-blur-md ${theme.shadow} shadow-xl animate-fade-in overflow-hidden`}>
        {/* Gradient Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme.accent}`}></div>
        
        <div className="flex flex-col items-center">
          {/* Icon with glow */}
          <div className="mb-6">
            {theme.icon}
          </div>
          
          {/* Title & Subtitle */}
          <h2 className={`text-4xl font-bold ${theme.text} mb-2`}>{theme.title}</h2>
          <p className="text-slate-400 text-sm mb-6">{theme.subtitle}</p>
          
          {/* URL Display with Copy */}
          <div className="w-full bg-slate-900/60 border border-slate-700 rounded-lg p-4 mb-8 group hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <ExternalLink className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm font-mono break-all">{result.url}</p>
              </div>
              <button
                onClick={copyUrl}
                className="flex-shrink-0 p-2 hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Copy URL"
              >
                {copied ? (
                  <CheckCheck className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>
          
          {/* Main Stats - Enhanced */}
          <div className="grid grid-cols-2 gap-6 w-full max-w-lg mb-8">
            <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:scale-105">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-semibold">Confidence Score</p>
              <p className="text-3xl font-bold text-white mb-1">{result.display_confidence}</p>
              <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.accent} transition-all duration-1000 ease-out`}
                  style={{width: result.display_confidence}}
                ></div>
              </div>
            </div>
            <div className="bg-slate-900/70 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-all hover:scale-105">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2 font-semibold">Risk Level</p>
              <p className={`text-3xl font-bold ${theme.text}`}>{result.risk_level}</p>
              <p className="text-xs text-slate-500 mt-2">{result.is_phishing ? 'Phishing Detected' : 'Legitimate'}</p>
            </div>
          </div>

          {/* Analysis Report - Enhanced */}
          <div className="w-full text-left bg-slate-900/90 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-white font-bold text-base uppercase tracking-wide">Detailed Analysis</h3>
            </div>
            
            <ul className="space-y-3">
              {result.details.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                  <span className={`${theme.text} font-bold flex-shrink-0 mt-0.5`}>▸</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}