import React from 'react';
import { Sparkles, ShieldCheck, Linkedin, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onOpenSavedPosts: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSavedPosts, savedCount }) => {
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-md shadow-slate-900/10">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                EdTech Executive Ghostwriter
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Career &amp; ROI Transformation Prompt Studio for B2B EdTech Leaders
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Strict formatting guard indicators */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0 Emojis</span>
            <span className="text-slate-300">•</span>
            <span>0 Hashtags</span>
            <span className="text-slate-300">•</span>
            <span>Organic Operator Voice</span>
          </div>

          <button
            onClick={onOpenSavedPosts}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>Saved Drafts</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
