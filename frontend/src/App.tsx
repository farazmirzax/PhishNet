import { useState } from 'react';
import { Shield, Github, Lock, Sparkles } from 'lucide-react';
import Scanner from './components/Scanner';
import ResultCard from './components/ResultCard';
import type { ScanResult } from './types';

function App() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanCount, setScanCount] = useState(0);

  const handleScanComplete = (scanResult: ScanResult) => {
    setResult(scanResult);
    setScanCount(prev => prev + 1);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 relative overflow-hidden">
      
      {/* Background Decor (Glowing Orbs) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl flex-1 flex flex-col justify-center">
        
        {/* Header */}
        <div className="mb-16 animate-fade-in-down text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Shield className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              PhishNet
            </h1>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-3">
            Protect yourself from phishing attacks with advanced AI technology.
          </p>
          <div className="flex items-center justify-center gap-6 text-cyan-400 font-mono text-sm">
            <span className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              Secure
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Real-time
            </span>
            <span>•</span>
            <span>AI-Powered</span>
          </div>
          {scanCount > 0 && (
            <div className="mt-4 inline-block px-4 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-400">
              {scanCount} {scanCount === 1 ? 'scan' : 'scans'} completed
            </div>
          )}
        </div>

        {/* The Switcher: Scanner vs Result */}
        <div className="flex-1 flex items-center justify-center">
          {!result ? (
            <Scanner onScanComplete={handleScanComplete} />
          ) : (
            <div className="w-full space-y-8 animate-fade-in">
              <ResultCard result={result} />
              
              <div className="flex justify-center">
                <button 
                  onClick={handleReset}
                  className="group relative px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 transition-transform group-hover:scale-105"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Scan Another URL
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 text-slate-500 text-xs font-mono flex items-center gap-4 py-6">
        <span className="text-slate-600">v1.0.0 Alpha</span>
        <span className="text-slate-700">•</span>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors group cursor-pointer">
          <Github className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> 
          Open Source
        </a>
      </footer>
    </div>
  );
}

export default App;