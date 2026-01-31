import React, { useState } from 'react';
import { Search, ShieldAlert, Loader2, Zap } from 'lucide-react';
import axios from 'axios';
import type { ScanResult } from '../types';

interface ScannerProps {
  onScanComplete: (result: ScanResult) => void;
}

export default function Scanner({ onScanComplete }: ScannerProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');

    try {
      // Connect to your FastAPI Backend
      const res = await axios.post<ScanResult>('http://127.0.0.1:8000/api/scan', { url: url.trim() });
      onScanComplete(res.data);
      setUrl(''); // Clear input after successful scan
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || 'Connection failed. Is the backend running on port 8000?';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleScan} className="relative group">
        {/* Animated Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-xl blur-lg transition-all duration-300 ${focused || loading ? 'opacity-75 scale-105' : 'opacity-0 group-hover:opacity-50'} ${loading ? 'animate-pulse' : ''}`}></div>
        
        <div className={`relative flex items-center bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 border-2 transition-all duration-300 ${focused ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-700'}`}>
          <div className="pl-4">
            {loading ? (
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            ) : (
              <Search className="w-6 h-6 text-slate-400" />
            )}
          </div>
          
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter URL to analyze (e.g., http://suspicious-paypal.com)"
            className="w-full bg-transparent text-white px-4 py-4 focus:outline-none placeholder-slate-500 text-base"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="group/btn relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-600 disabled:hover:to-blue-600 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105 mr-1 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                <span>SCANNING</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 group-hover/btn:animate-pulse" />
                <span>SCAN</span>
              </>
            )}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border-l-4 border-red-500 rounded-r-lg text-red-300 flex items-start gap-3 animate-fade-in backdrop-blur-sm">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Connection Error</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}