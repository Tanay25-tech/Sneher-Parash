import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Copy,
  Check,
  Globe,
  MoreHorizontal,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  Edit3,
  Sparkles,
  Info,
} from 'lucide-react';
import { PostVariation } from '../types/ghostwriter';
import { safeCopyToClipboard } from '../utils/clipboard';

interface LinkedInPreviewProps {
  post: PostVariation;
  onUpdateContent: (newContent: string) => void;
  onSaveToLibrary: (post: PostVariation) => void;
}

export const LinkedInPreview: React.FC<LinkedInPreviewProps> = ({
  post,
  onUpdateContent,
  onSaveToLibrary,
}) => {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedHook, setCopiedHook] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [authorName, setAuthorName] = useState<string>('Alex Vance');
  const [authorTitle, setAuthorTitle] = useState<string>(
    'Founder & Chief Learning Officer | Bridging Tech & Non-Tech Career Moats'
  );

  const characterCount = post.content.length;
  const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeSeconds = Math.max(15, Math.round((wordCount / 200) * 60));

  // LinkedIn folds around 3 lines or ~140-200 characters on mobile/desktop
  const lines = post.content.split('\n');
  const hookCandidate = lines.slice(0, 3).join('\n');
  const remainingText = lines.slice(3).join('\n');
  const hasFold = lines.length > 3 || post.content.length > 210;

  const handleCopyPost = async () => {
    try {
      const ok = await safeCopyToClipboard(post.content);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Copy post failed:', err);
    }
  };

  const handleCopyHook = async () => {
    try {
      const ok = await safeCopyToClipboard(post.hook || lines[0] || '');
      if (ok) {
        setCopiedHook(true);
        setTimeout(() => setCopiedHook(false), 2000);
      }
    } catch (err) {
      console.warn('Copy hook failed:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col">
      {/* Top Bar with Device switcher & Actions */}
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            LinkedIn Feed Simulator
          </span>
          <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 shadow-2xs">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                device === 'desktop'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                device === 'mobile'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              isEditing
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Editing' : 'Edit Text'}</span>
          </button>

          <button
            onClick={handleCopyHook}
            className="flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            title="Copy just the opening hook"
          >
            {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHook ? 'Hook Copied!' : 'Copy Hook'}</span>
          </button>

          <button
            onClick={handleCopyPost}
            className="flex items-center space-x-1.5 px-3 py-1 text-xs font-bold bg-slate-950 text-white hover:bg-slate-800 rounded-lg shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Full Post!' : 'Copy Post'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Header */}
      <div className="px-4 py-2 bg-slate-100/50 border-b border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center space-x-3">
          <span>
            <strong className="text-slate-800 font-bold">{characterCount}</strong> chars
          </span>
          <span>•</span>
          <span>
            <strong className="text-slate-800 font-bold">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>~{readingTimeSeconds}s read</span>
        </div>
        <div className="flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold text-[10px]">
          <span>Optimal LinkedIn Range (1,200 - 1,800 chars)</span>
        </div>
      </div>

      {/* Main Feed Container */}
      <div className="p-4 sm:p-6 bg-slate-100/70 flex-1 flex justify-center items-start overflow-y-auto">
        <div
          className={`w-full bg-white rounded-xl border border-slate-300/80 shadow-md transition-all ${
            device === 'mobile' ? 'max-w-sm' : 'max-w-xl'
          }`}
        >
          {/* LinkedIn Post Header */}
          <div className="p-4 flex items-start justify-between border-b border-slate-100">
            <div className="flex items-start space-x-3">
              <div className="w-11 h-11 rounded-full bg-linear-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                {authorName.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-700 cursor-pointer truncate">
                    {authorName}
                  </span>
                  <span className="text-slate-400 text-xs">• 1st</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight">
                  {authorTitle}
                </p>
                <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-0.5">
                  <span>1h</span>
                  <span>•</span>
                  <span>Edited</span>
                  <span>•</span>
                  <Globe className="w-2.5 h-2.5 inline" />
                </div>
              </div>
            </div>

            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* LinkedIn Post Body with Realistic Fold */}
          <div className="p-4 text-xs sm:text-[13px] text-slate-900 leading-relaxed font-sans selection:bg-amber-100">
            {isEditing ? (
              <textarea
                rows={12}
                value={post.content}
                onChange={(e) => onUpdateContent(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-lg text-xs sm:text-[13px] leading-relaxed focus:outline-hidden focus:ring-1 focus:ring-amber-500 bg-amber-50/30"
              />
            ) : hasFold && !isExpanded ? (
              <div>
                <div className="whitespace-pre-line">{hookCandidate}</div>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="font-semibold text-slate-500 hover:text-slate-800 hover:underline mt-1 cursor-pointer inline-flex items-center"
                >
                  ...see more
                </button>
              </div>
            ) : (
              <div className="whitespace-pre-line">
                {post.content}
                {hasFold && (
                  <div className="pt-2">
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-[11px] font-semibold text-slate-400 hover:text-slate-700"
                    >
                      (collapse to test fold)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Above-the-fold Hook Checker banner */}
          {!isExpanded && hasFold && !isEditing && (
            <div className="mx-4 mb-3 p-2 rounded-lg bg-indigo-50/80 border border-indigo-100 text-[11px] text-indigo-900 flex items-center justify-between">
              <span className="flex items-center space-x-1.5 font-medium">
                <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Simulating the critical 3-line fold before users click "...see more"</span>
              </span>
              <button
                onClick={() => setIsExpanded(true)}
                className="font-bold underline text-indigo-700 ml-2"
              >
                Expand
              </button>
            </div>
          )}

          {/* Mock Social Engagement Reactions */}
          <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white font-bold">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-amber-600 flex items-center justify-center text-[9px] text-white font-bold">
                💡
              </span>
              <span className="text-[11px] text-slate-600 font-medium pl-1">
                482 reactions
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-slate-500">
              <span>94 comments</span>
              <span>•</span>
              <span>38 reposts</span>
            </div>
          </div>

          {/* Mock Action Bar */}
          <div className="px-2 py-1.5 border-t border-slate-100 grid grid-cols-4 gap-1 text-[11px] font-semibold text-slate-600">
            <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Like</span>
            </button>
            <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Comment</span>
            </button>
            <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Repeat2 className="w-3.5 h-3.5" />
              <span>Repost</span>
            </button>
            <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-100 rounded-lg transition-colors">
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
