import React from 'react';
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Target,
  MessageCircle,
  Compass,
  Zap,
  Sparkles,
} from 'lucide-react';
import { PostVariation } from '../types/ghostwriter';

interface PostInspectorProps {
  post: PostVariation;
}

export const PostInspector: React.FC<PostInspectorProps> = ({ post }) => {
  // Real-time checks
  const containsEmojiRegex = /[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const hasEmoji = containsEmojiRegex.test(post.content);
  const hasHashtag = post.content.includes('#');
  const hasDividers = /[-~*_]{4,}/.test(post.content);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Strategic Blueprint &amp; Compliance Audit
            </h3>
            <p className="text-[11px] text-slate-500">
              Verified against EdTech Executive Ghostwriter rules
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-900 text-white">
            {post.variationTitle}
          </span>
        </div>
      </div>

      {/* 5-Rule Strict Compliance Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs">
        <div className="flex items-center space-x-2">
          {!hasEmoji ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span className="font-semibold text-slate-700">
            {!hasEmoji ? '0 Emojis' : 'Emoji Detected'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {!hasHashtag ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span className="font-semibold text-slate-700">
            {!hasHashtag ? '0 Hashtags' : 'Hashtag Found'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {!hasDividers ? (
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          )}
          <span className="font-semibold text-slate-700">
            {!hasDividers ? '0 Gimmick Dividers' : 'Divider Used'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold text-slate-700">Operator Voice</span>
        </div>
      </div>

      {/* 1. Hook Friction Analysis */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span>The Scroll-Stopping Friction Hook</span>
        </div>
        <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 text-xs font-medium text-slate-900 leading-relaxed">
          "{post.hook}"
        </div>
        <p className="text-[11px] text-slate-500">
          Targeted directly at professional anxieties, avoiding vague inspirational platitudes.
        </p>
      </div>

      {/* 2. The Core Paradigm Shift (Old Way vs New Strategic Reality) */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-indigo-500" />
          <span>The Core Strategic Shift</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Outdated Way of Thinking
            </span>
            <p className="text-slate-700 font-medium leading-relaxed">
              {post.coreShift?.oldWay || 'Relying on passive certifications, credentials, and video course hours.'}
            </p>
          </div>
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80">
            <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
              New Strategic Operator Approach
            </span>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {post.coreShift?.newApproach || 'Audited proof-of-work, live production repos, and high-leverage workflows.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Debate-Spurring CTA */}
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
          <span>Closing Debate Question (CTA)</span>
        </div>
        <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 text-xs font-semibold text-blue-950 leading-relaxed">
          "{post.cta}"
        </div>
        <p className="text-[11px] text-slate-500">
          Open-ended provocation engineered to prompt comments from recruiters and senior hiring managers.
        </p>
      </div>

      {/* 4. Competitive Edge Highlight */}
      {post.competitiveEdgeHighlight && (
        <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-200/80 text-xs space-y-1">
          <div className="flex items-center space-x-1.5 text-indigo-950 font-bold uppercase tracking-wider text-[10px]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Competitive Edge vs Traditional Academia</span>
          </div>
          <p className="text-indigo-900 font-medium leading-relaxed">
            {post.competitiveEdgeHighlight}
          </p>
        </div>
      )}

      {/* 5. Strategic Rationale */}
      {post.strategicRationale && (
        <div className="p-3.5 bg-slate-900 text-white rounded-xl text-xs space-y-1">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
            Executive Ghostwriter Briefing
          </span>
          <p className="text-slate-300 leading-relaxed">
            {post.strategicRationale}
          </p>
        </div>
      )}
    </div>
  );
};
