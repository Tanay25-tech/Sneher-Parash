import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, RefreshCw } from 'lucide-react';

interface RefinementBarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

const QUICK_REFINEMENTS = [
  'Make the opening hook punchier and more scroll-stopping',
  'Sharpen the contrast between the old credentialism and new proof-of-work',
  'Shorten every sentence to 12 words or less for maximum cadence',
  'Make the debate question hotter and more provocative for hiring managers',
  'Weave in the student career transformation more organically in the body',
];

export const RefinementBar: React.FC<RefinementBarProps> = ({ onRefine, isRefining }) => {
  const [customPrompt, setCustomPrompt] = useState('');

  const handleAction = async (prompt: string) => {
    if (!prompt.trim() || isRefining) return;
    try {
      await onRefine(prompt);
    } catch (err) {
      console.warn('Refinement action caught:', err);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customPrompt.trim() || isRefining) return;
    const promptToSend = customPrompt;
    setCustomPrompt('');
    await handleAction(promptToSend);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Wand2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Iterative Ghostwriter Polish
            </h3>
            <p className="text-[11px] text-slate-500">
              Direct the AI ghostwriter to refine tone, cadence, hooks, or debate intensity
            </p>
          </div>
        </div>
      </div>

      {/* Quick Refinement Pills */}
      <div className="flex items-center flex-wrap gap-1.5 text-xs">
        {QUICK_REFINEMENTS.map((action, idx) => (
          <button
            key={idx}
            disabled={isRefining}
            onClick={() => handleAction(action)}
            className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-medium text-[11px] transition-colors disabled:opacity-50 text-left"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Custom Refinement Input */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-1">
        <input
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          disabled={isRefining}
          placeholder="Or give specific ghostwriting instructions, e.g. 'Tone down the skepticism, emphasize the salary metric...'"
          className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
        />
        <button
          type="submit"
          disabled={isRefining || !customPrompt.trim()}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1.5 transition-all"
        >
          {isRefining ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <>
              <span>Refine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
