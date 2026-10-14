import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputStudio } from './components/InputStudio';
import { LinkedInPreview } from './components/LinkedInPreview';
import { PostInspector } from './components/PostInspector';
import { EngagementPredictor } from './components/EngagementPredictor';
import { RefinementBar } from './components/RefinementBar';
import { SavedPostsModal } from './components/SavedPostsModal';
import { EDTECH_PRESETS, TRADITIONAL_COMPETITOR_MODELS } from './data/edtechPresets';
import { PostVariation, StudentSuccessStory, CompetitorBenchmark } from './types/ghostwriter';
import { Sparkles, BookmarkPlus, Check, Share2, Layers } from 'lucide-react';

const INITIAL_VARIATIONS: PostVariation[] = [
  {
    id: 'var-1',
    variationTitle: 'The Pragmatic Operator',
    hook: 'Most companies do not need fewer project managers.\nThey need project managers who understand token economics.',
    content: `Most companies do not need fewer project managers.
They need project managers who understand token economics.

For the last eighteen months, the prevailing narrative was that AI would wipe out the PM role.
Generalist coordination is indeed collapsing.
Managing static Gantt charts and forwarding status emails is no longer a defensible career moat.

Hiring managers are not cutting headcount because they want less oversight.
They are cutting PMs who cannot speak the language of algorithmic pipelines.

The old playbook:
Spend $60,000 on a 2-year university Master's degree or collect passive video badges on Coursera.

The new reality:
An 8-week operator sprint where you orchestrate multi-agent prompt flows, audit token burn rates, and de-risk deployment latency.

We recently saw a Traditional Waterfall Project Manager transition into an AI Product Operations Lead after completing our AI for Project Managers program, attributing their success to the practical skills gained in orchestrating multi-agent workflows and cutting sprint latency by 40%.

The market outcome was straightforward:
60% of our graduates secured a promotion within 6 months.
The average salary increase was 28%.

The divide in hiring today is not between engineers and non-engineers.
It is between professionals who coordinate tasks and those who design high-leverage workflows.

Are your engineering leads looking for fewer coordinators, or are they waiting for PMs who can actually evaluate AI models?`,
    coreShift: {
      oldWay: 'Passive task tracking, Jira ticket management, and static Gantt chart coordination.',
      newApproach: 'Orchestrating agentic prompt pipelines, auditing token burn, and reducing system latency.',
    },
    cta: 'Are your engineering leads looking for fewer coordinators, or are they waiting for PMs who can actually evaluate AI models?',
    metricsHighlight: '60% promotion within 6 months; 28% salary uplift',
    competitiveEdgeHighlight: '8-week applied operator sprint ($2.2k) vs 2-year university Master’s ($65k) with immediate token economics workflow defense.',
    strategicRationale:
      'Reframes the pervasive fear of AI automation from an existential threat into an upskilling leverage point. Direct challenge to traditional PMs with hard enterprise metrics.',
    complianceCheck: {
      hasNoEmojis: true,
      hasNoHashtags: true,
      hasNoGimmickDividers: true,
      isPunchyAndActive: true,
      notes: 'Verified zero emojis and zero hashtags with pragmatic operator cadence.',
    },
  },
  {
    id: 'var-2',
    variationTitle: 'The Contrarian Dean',
    hook: 'The 40-hour asynchronous video course is officially dead.\nAnd hiring managers are the ones who killed it.',
    content: `The 40-hour asynchronous video course is officially dead.
And hiring managers are the ones who killed it.

Two years ago, a digital badge on a LinkedIn profile was enough to get an exploratory screen.
Today, enterprise recruiters filter out passive certificates automatically.

Why?
Because watching twenty hours of pre-recorded lectures does not prove you can handle a production fire drill.

The old model of EdTech sold the illusion of competence through completion rates.
Watch the video. Pass the multiple-choice quiz. Download the PDF.

The new standard is audited proof-of-work.

When candidates defend a live, containerized architecture during the interview, the entire hiring dynamic flips.
They are not asking for permission to learn on the job.
They are showing an operational blueprint they already deployed.

In our recent cohort, graduates did not receive generic certificates.
They pushed live production capstone repositories.
The result: 60% received promotions or career transitions within 180 days.

Ambitious talent does not have an information deficit. They have an implementation deficit.

Hiring managers: When did a digital course certificate last influence an offer decision on your team?`,
    coreShift: {
      oldWay: 'Passive video completion badges and theoretical multiple-choice quizzes.',
      newApproach: 'Live production repositories, capstone defenses, and audited proof-of-work.',
    },
    cta: 'Hiring managers: When did a digital course certificate last influence an offer decision on your team?',
    metricsHighlight: '60% promotion/transition rate within 180 days',
    competitiveEdgeHighlight: 'Live interactive capstone defense with 88% completion vs passive $15 video courses with 4% completion.',
    strategicRationale:
      'Directly calls out the broken credential industry to establish the EdTech leader as a modern, uncompromised educator.',
    complianceCheck: {
      hasNoEmojis: true,
      hasNoHashtags: true,
      hasNoGimmickDividers: true,
      isPunchyAndActive: true,
    },
  },
  {
    id: 'var-3',
    variationTitle: 'The Career ROI Realist',
    hook: 'A $2,000 targeted skill sprint will consistently outperform a $60,000 university Master’s degree.\nHere is the math modern professionals are doing.',
    content: `A $2,000 targeted skill sprint will consistently outperform a $60,000 university Master’s degree.
Here is the math modern professionals are doing.

A traditional academic program takes twenty-four months to update its syllabus.
By the time the curriculum is approved by an academic board, industry tools have moved two generations ahead.

Mid-career professionals do not have two years or sixty thousand dollars of opportunity cost to burn.
They need career IRR.

The shift is unmistakable:
The old way: Borrow tuition, spend two years absorbing high-level theory, and hope the market still values the credential.
The new approach: Spend eight weeks building production-grade workflows on real company datasets, mentored by active operators.

We recently tracked our cohort outcomes across technical and hybrid roles.
60% of graduates stepped into elevated positions within 6 months.
The average salary increase reached 28%.

The time-to-ROI dropped from five years to ninety days.

Education is no longer about buying institutional prestige.
It is an operational investment with measurable payback periods.

If you had to upskill an enterprise team today, would you sponsor a university degree or an intensive operator sprint?`,
    coreShift: {
      oldWay: '2-year outdated academic curriculum with $60k debt and delayed market feedback.',
      newApproach: '8-week live operator sprint with real production workflows and immediate career IRR.',
    },
    cta: 'If you had to upskill an enterprise team today, would you sponsor a university degree or an intensive operator sprint?',
    metricsHighlight: '90-day time-to-ROI vs 5-year academic payback',
    competitiveEdgeHighlight: 'Direct career IRR: $2,000 sprint with 90-day time-to-ROI vs $60,000 university tuition with 5-year debt payback.',
    strategicRationale:
      'Frames EdTech strictly through executive financial calculus (career IRR, payback period), appealing to decision-makers and high-earning professionals.',
    complianceCheck: {
      hasNoEmojis: true,
      hasNoHashtags: true,
      hasNoGimmickDividers: true,
      isPunchyAndActive: true,
    },
  },
];

export default function App() {
  const defaultPreset = EDTECH_PRESETS[0];

  const [rawInputs, setRawInputs] = useState<string>(defaultPreset.rawInputSnippet);
  const [angle, setAngle] = useState<string>('The Pragmatic Operator');
  const [frictionPoint, setFrictionPoint] = useState<string>(defaultPreset.frictionPoint);
  const [targetAudience, setTargetAudience] = useState<string>(defaultPreset.targetAudience);
  const [metricOrROI, setMetricOrROI] = useState<string>(defaultPreset.primaryMetric);
  const [studentStory, setStudentStory] = useState<StudentSuccessStory>(defaultPreset.studentStory);
  const [competitorBenchmark, setCompetitorBenchmark] = useState<CompetitorBenchmark>(
    defaultPreset.competitorBenchmark || TRADITIONAL_COMPETITOR_MODELS[0]
  );
  const [variationCount, setVariationCount] = useState<number>(3);

  const [variations, setVariations] = useState<PostVariation[]>(INITIAL_VARIATIONS);
  const [activeVariationIndex, setActiveVariationIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [savedPosts, setSavedPosts] = useState<PostVariation[]>(() => {
    try {
      const stored = localStorage.getItem('edtech_saved_posts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('edtech_saved_posts', JSON.stringify(savedPosts));
    } catch (e) {
      console.error('Failed to save posts to localStorage', e);
    }
  }, [savedPosts]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentPost = variations[activeVariationIndex] || variations[0];

  const handleGenerate = async () => {
    if (!rawInputs.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawInputs,
          angle,
          targetAudience,
          frictionPoint,
          metricOrROI,
          competitorBenchmark,
          variationCount,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      if (data.variations && data.variations.length > 0) {
        setVariations(data.variations);
        setActiveVariationIndex(0);
        showToast(`Generated ${data.variations.length} executive LinkedIn post variations.`);
      } else {
        throw new Error('No post variations returned from ghostwriter model.');
      }
    } catch (err: any) {
      console.error('Generation failed:', err);
      showToast(`Ghostwriting error: ${err.message || 'Please retry.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!currentPost) return;
    setIsRefining(true);

    try {
      const res = await fetch('/api/refine-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentContent: currentPost.content,
          instruction,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      if (data.revisedContent) {
        const updatedPost: PostVariation = {
          ...currentPost,
          content: data.revisedContent,
          hook: data.revisedHook || currentPost.hook,
          cta: data.revisedCta || currentPost.cta,
          strategicRationale: data.refinementNotes
            ? `${currentPost.strategicRationale} (Refined: ${data.refinementNotes})`
            : currentPost.strategicRationale,
        };

        const updatedList = [...variations];
        updatedList[activeVariationIndex] = updatedPost;
        setVariations(updatedList);
        showToast('Post refined with ghostwriter polish.');
      }
    } catch (err: any) {
      console.error('Refinement error:', err);
      showToast(`Refinement failed: ${err.message || 'Please retry.'}`);
    } finally {
      setIsRefining(false);
    }
  };

  const handleUpdateContent = (newContent: string) => {
    const updated = [...variations];
    updated[activeVariationIndex] = {
      ...updated[activeVariationIndex],
      content: newContent,
    };
    setVariations(updated);
  };

  const handleSaveToLibrary = () => {
    if (!currentPost) return;
    const exists = savedPosts.some((p) => p.content === currentPost.content);
    if (exists) {
      showToast('This draft is already in your saved drafts.');
      return;
    }
    const newEntry: PostVariation = {
      ...currentPost,
      id: `saved-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setSavedPosts([newEntry, ...savedPosts]);
    showToast('Saved to your Executive Drafts archive.');
  };

  const handleDeleteSaved = (id: string) => {
    setSavedPosts(savedPosts.filter((p) => p.id !== id));
    showToast('Draft removed.');
  };

  const handleSelectSaved = (post: PostVariation) => {
    setVariations([post, ...variations]);
    setActiveVariationIndex(0);
    showToast(`Loaded "${post.variationTitle}" into workspace.`);
  };

  return (
    <div className="min-h-screen bg-slate-100/60 flex flex-col font-sans">
      <Header
        onOpenSavedPosts={() => setIsSavedModalOpen(true)}
        savedCount={savedPosts.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Workspace Subheading / Instructions banner */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white tracking-wide uppercase">
                EdTech Ghostwriting Engine
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Template: "Career &amp; ROI Transformation"
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Turn raw upskilling friction, placement statistics, and student transformations into authoritative LinkedIn thought leadership that drives enrollments and sparks executive debate.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto shrink-0">
            <button
              onClick={handleSaveToLibrary}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-2xs"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-slate-500" />
              <span>Save Active Draft</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Input Studio (Left) & Preview/Inspector (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Input Studio & Prompt Controls */}
          <div className="lg:col-span-5 space-y-6">
            <InputStudio
              rawInputs={rawInputs}
              setRawInputs={setRawInputs}
              angle={angle}
              setAngle={setAngle}
              frictionPoint={frictionPoint}
              setFrictionPoint={setFrictionPoint}
              targetAudience={targetAudience}
              setTargetAudience={setTargetAudience}
              metricOrROI={metricOrROI}
              setMetricOrROI={setMetricOrROI}
              variationCount={variationCount}
              setVariationCount={setVariationCount}
              studentStory={studentStory}
              setStudentStory={setStudentStory}
              competitorBenchmark={competitorBenchmark}
              setCompetitorBenchmark={setCompetitorBenchmark}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            {/* Iterative AI Refinement Bar */}
            <RefinementBar onRefine={handleRefine} isRefining={isRefining} />
          </div>

          {/* Right: Output Variations, Feed Simulator & Strategic Inspector */}
          <div className="lg:col-span-7 space-y-6">
            {/* Variations Switcher Tabs */}
            {variations.length > 1 && (
              <div className="bg-white rounded-xl border border-slate-200/90 p-1.5 shadow-2xs flex items-center space-x-1 overflow-x-auto">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 shrink-0">
                  Variations:
                </span>
                {variations.map((v, idx) => (
                  <button
                    key={v.id || idx}
                    onClick={() => setActiveVariationIndex(idx)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      activeVariationIndex === idx
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 opacity-70" />
                    <span>
                      {idx + 1}. {v.variationTitle || `Angle ${idx + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* LinkedIn Feed Simulator with true "...see more" cutoff */}
            {currentPost && (
              <LinkedInPreview
                post={currentPost}
                onUpdateContent={handleUpdateContent}
                onSaveToLibrary={handleSaveToLibrary}
              />
            )}

            {/* B2B LinkedIn Engagement & Sentiment Predictor */}
            {currentPost && (
              <EngagementPredictor
                content={currentPost.content}
                hook={currentPost.hook}
                cta={currentPost.cta}
              />
            )}

            {/* Strategic Inspector (Hook breakdown, Old vs New, Debate CTA, Compliance Audit) */}
            {currentPost && <PostInspector post={currentPost} />}
          </div>
        </div>
      </main>

      {/* Saved Drafts Drawer / Modal */}
      <SavedPostsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedPosts={savedPosts}
        onDeletePost={handleDeleteSaved}
        onSelectPost={handleSelectSaved}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
