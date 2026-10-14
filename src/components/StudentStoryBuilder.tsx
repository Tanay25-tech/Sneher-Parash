import React, { useState } from 'react';
import { UserCheck, Sparkles, Plus, Copy, Check } from 'lucide-react';
import { StudentSuccessStory } from '../types/ghostwriter';
import { safeCopyToClipboard } from '../utils/clipboard';

interface StudentStoryBuilderProps {
  currentStory: StudentSuccessStory;
  onChangeStory: (story: StudentSuccessStory) => void;
  onInjectIntoRawInputs: (storyText: string) => void;
}

export const StudentStoryBuilder: React.FC<StudentStoryBuilderProps> = ({
  currentStory,
  onChangeStory,
  onInjectIntoRawInputs,
}) => {
  const [copied, setCopied] = useState(false);

  const handleFieldChange = (field: keyof StudentSuccessStory, val: string) => {
    const updated = {
      ...currentStory,
      [field]: val,
    };
    // Recompute formatted narrative
    updated.formattedStory = `We recently saw a ${updated.originalRole || '[Job Title]'} transition into ${
      updated.newRole || '[New Job Title]'
    } after completing our ${updated.courseName || '[Course Name]'} program, attributing their success to the practical skills gained${
      updated.specificOutcome ? ` in ${updated.specificOutcome}` : '.'
    }`;
    onChangeStory(updated);
  };

  const copyStory = async () => {
    try {
      const ok = await safeCopyToClipboard(currentStory.formattedStory);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Copy story failed:', err);
    }
  };

  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Anonymized Student Success Narrative
            </span>
            <p className="text-[11px] text-amber-800/80">
              Transformational career case study inserted into the prompt template
            </p>
          </div>
        </div>
        <button
          onClick={() => onInjectIntoRawInputs(currentStory.formattedStory)}
          className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-900 text-white rounded-lg hover:bg-amber-800 shadow-xs transition-colors"
          title="Inject this narrative into Raw EdTech Inputs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Insert into Inputs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Original Role [Job Title]
          </label>
          <input
            type="text"
            value={currentStory.originalRole}
            onChange={(e) => handleFieldChange('originalRole', e.target.value)}
            placeholder="e.g. Traditional Project Manager"
            className="w-full px-2.5 py-1.5 bg-white border border-amber-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            New Role [New Job Title]
          </label>
          <input
            type="text"
            value={currentStory.newRole}
            onChange={(e) => handleFieldChange('newRole', e.target.value)}
            placeholder="e.g. AI Product Operations Lead"
            className="w-full px-2.5 py-1.5 bg-white border border-amber-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Program [Course Name]
          </label>
          <input
            type="text"
            value={currentStory.courseName}
            onChange={(e) => handleFieldChange('courseName', e.target.value)}
            placeholder="e.g. AI for Project Managers"
            className="w-full px-2.5 py-1.5 bg-white border border-amber-200 rounded-md text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="relative bg-white border border-amber-200/70 rounded-lg p-2.5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs text-slate-800 font-medium leading-relaxed italic">
            "{currentStory.formattedStory}"
          </p>
          <button
            onClick={copyStory}
            className="shrink-0 p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Copy narrative text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
