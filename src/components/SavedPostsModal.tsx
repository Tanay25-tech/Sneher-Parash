import React, { useState } from 'react';
import { X, Copy, Check, Trash2, Download, FileText, Calendar } from 'lucide-react';
import { PostVariation } from '../types/ghostwriter';
import { safeCopyToClipboard } from '../utils/clipboard';

interface SavedPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPosts: PostVariation[];
  onDeletePost: (id: string) => void;
  onSelectPost: (post: PostVariation) => void;
}

export const SavedPostsModal: React.FC<SavedPostsModalProps> = ({
  isOpen,
  onClose,
  savedPosts,
  onDeletePost,
  onSelectPost,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (post: PostVariation) => {
    try {
      const ok = await safeCopyToClipboard(post.content);
      if (ok) {
        setCopiedId(post.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (err) {
      console.warn('Copy saved post failed:', err);
    }
  };

  const handleDownloadAll = () => {
    const text = savedPosts
      .map(
        (p, idx) =>
          `# Post ${idx + 1}: ${p.variationTitle}\n\n${p.content}\n\n---\nStrategic Rationale: ${
            p.strategicRationale
          }\n`
      )
      .join('\n\n=====================\n\n');

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EdTech_LinkedIn_Drafts_${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-slate-800" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Saved Executive LinkedIn Drafts ({savedPosts.length})
              </h3>
              <p className="text-[11px] text-slate-500">
                Persisted drafts ready for your content calendar
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {savedPosts.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="flex items-center space-x-1 px-3 py-1 text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export All .md</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {savedPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FileText className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold text-slate-600">No saved drafts yet</p>
              <p className="text-xs text-slate-400 mt-1">
                Generate posts and click "Save to Library" to curate your executive drafts.
              </p>
            </div>
          ) : (
            savedPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-bold text-[10px]">
                      {post.variationTitle}
                    </span>
                    {post.createdAt && (
                      <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleCopy(post)}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                      title="Copy full post"
                    >
                      {copiedId === post.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                      title="Delete draft"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-800 line-clamp-3 font-sans leading-relaxed whitespace-pre-line bg-white p-2.5 rounded-lg border border-slate-200/80">
                  {post.content}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">
                    {post.content.length} characters • {post.content.split(/\s+/).length} words
                  </span>
                  <button
                    onClick={() => {
                      onSelectPost(post);
                      onClose();
                    }}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    Load into Inspector &amp; Preview &rarr;
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
