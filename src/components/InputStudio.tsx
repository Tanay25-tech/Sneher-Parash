import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  TrendingUp,
  Target,
  SlidersHorizontal,
  Flame,
  Check,
  RotateCcw,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  EDTECH_PRESETS,
  EXECUTIVE_ANGLES,
  FRICTION_POINTS,
  QUICK_COURSE_EXAMPLES,
} from '../data/edtechPresets';
import { EdTechPreset, StudentSuccessStory, CompetitorBenchmark } from '../types/ghostwriter';
import { StudentStoryBuilder } from './StudentStoryBuilder';
import { CompetitorBenchmarking } from './CompetitorBenchmarking';

interface InputStudioProps {
  rawInputs: string;
  setRawInputs: (val: string) => void;
  angle: string;
  setAngle: (val: string) => void;
  frictionPoint: string;
  setFrictionPoint: (val: string) => void;
  targetAudience: string;
  setTargetAudience: (val: string) => void;
  metricOrROI: string;
  setMetricOrROI: (val: string) => void;
  variationCount: number;
  setVariationCount: (val: number) => void;
  studentStory: StudentSuccessStory;
  setStudentStory: (val: StudentSuccessStory) => void;
  competitorBenchmark: CompetitorBenchmark;
  setCompetitorBenchmark: (val: CompetitorBenchmark) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputStudio: React.FC<InputStudioProps> = ({
  rawInputs,
  setRawInputs,
  angle,
  setAngle,
  frictionPoint,
  setFrictionPoint,
  targetAudience,
  setTargetAudience,
  metricOrROI,
  setMetricOrROI,
  variationCount,
  setVariationCount,
  studentStory,
  setStudentStory,
  competitorBenchmark,
  setCompetitorBenchmark,
  onGenerate,
  isLoading,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ai-for-pm');
  const [showAdvancedKnobs, setShowAdvancedKnobs] = useState(false);

  const handleSelectPreset = (preset: EdTechPreset) => {
    setSelectedPresetId(preset.id);
    setRawInputs(preset.rawInputSnippet);
    setFrictionPoint(preset.frictionPoint);
    setTargetAudience(preset.targetAudience);
    setMetricOrROI(preset.primaryMetric);
    setStudentStory(preset.studentStory);
    if (preset.competitorBenchmark) {
      setCompetitorBenchmark(preset.competitorBenchmark);
    }
  };

  const handleInsertQuickExample = (name: string, metric: string) => {
    const addition = `\nCourse Concept: ${name}\nSuccess Metric: ${metric}`;
    setRawInputs(rawInputs ? `${rawInputs.trim()}${addition}` : addition.trim());
    setMetricOrROI(metric);
  };

  const handleInjectStudentStory = (storyText: string) => {
    const addition = `\nStudent Transformation: ${storyText}`;
    setRawInputs(rawInputs ? `${rawInputs.trim()}${addition}` : addition.trim());
  };

  const handleInjectCompetitorBenchmark = (benchmarkText: string) => {
    const addition = `\n\n[COMPETITIVE BENCHMARKING]:\n${benchmarkText}`;
    setRawInputs(rawInputs ? `${rawInputs.trim()}${addition}` : addition.trim());
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 md:p-6 space-y-6">
      {/* Header and Preset Pills */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Curated EdTech Scenarios &amp; Inputs
              </h2>
              <p className="text-xs text-slate-500">
                Select an industry case study or input custom course placement data
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 self-start sm:self-auto overflow-x-auto pb-1 sm:pb-0">
            {EDTECH_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all border whitespace-nowrap ${
                  selectedPresetId === preset.id
                    ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {preset.courseConcept}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Concept & Metric Injection Chips */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Quick Inject:
          </span>
          {QUICK_COURSE_EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => handleInsertQuickExample(ex.name, ex.metric)}
              className="group inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-100/80 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-200/60 text-slate-700 hover:text-indigo-900 transition-colors"
              title={`Click to add "${ex.name}" and its outcome metric to the input`}
            >
              <TrendingUp className="w-3 h-3 text-emerald-600 group-hover:text-indigo-600" />
              <span className="font-semibold">{ex.name}</span>
              <span className="text-slate-400 text-[10px]">({ex.metric.split(';')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Competitor Benchmarking Section */}
      <CompetitorBenchmarking
        currentBenchmark={competitorBenchmark}
        onChangeBenchmark={setCompetitorBenchmark}
        onInjectIntoRawInputs={handleInjectCompetitorBenchmark}
      />

      {/* Anonymized Student Success Story Interactive Builder */}
      <StudentStoryBuilder
        currentStory={studentStory}
        onChangeStory={setStudentStory}
        onInjectIntoRawInputs={handleInjectStudentStory}
      />

      {/* Raw Inputs Textarea */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-xs font-bold text-slate-800 tracking-wider uppercase">
            <span>[RAW EDTECH INPUTS]</span>
            <span className="text-[11px] font-normal lowercase text-slate-400">
              (course concepts, customer objections, placement stats, student story)
            </span>
          </label>
          <button
            onClick={() => {
              const currentPreset = EDTECH_PRESETS.find((p) => p.id === selectedPresetId) || EDTECH_PRESETS[0];
              setRawInputs(currentPreset.rawInputSnippet);
            }}
            className="flex items-center space-x-1 text-[11px] font-medium text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to preset</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            rows={7}
            value={rawInputs}
            onChange={(e) => setRawInputs(e.target.value)}
            placeholder="Insert course concepts, customer objections, career placement statistics, or upskilling trends here..."
            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 text-xs sm:text-sm font-mono-code leading-relaxed focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-inner"
          />
        </div>
        <p className="text-[11px] text-slate-500">
          Tip: Rawer notes and verbatim objections work best. The ghostwriting model extracts the core tension and transforms it into the "Old Way vs New Strategic Reality".
        </p>
      </div>

      {/* Strategic Knobs & Executive Archetype */}
      <div className="border-t border-slate-100 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Strategic Levers &amp; Voice Controls
            </span>
          </div>
          <button
            onClick={() => setShowAdvancedKnobs(!showAdvancedKnobs)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            {showAdvancedKnobs ? 'Hide Details' : 'Customize Levers'}
          </button>
        </div>

        {/* Executive Voice Archetype Grid */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-2 uppercase tracking-wider">
            Executive Voice Archetype
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {EXECUTIVE_ANGLES.map((archetype) => (
              <button
                key={archetype.name}
                onClick={() => setAngle(archetype.name)}
                className={`p-2.5 text-left rounded-xl border transition-all text-xs ${
                  angle === archetype.name
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{archetype.name}</span>
                  {angle === archetype.name && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <p
                  className={`text-[11px] line-clamp-2 leading-tight ${
                    angle === archetype.name ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {archetype.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {showAdvancedKnobs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80 text-xs">
            {/* Primary Friction Point */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Primary Friction Point (Hook Anchor)
              </label>
              <select
                value={frictionPoint}
                onChange={(e) => setFrictionPoint(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              >
                {FRICTION_POINTS.map((fp) => (
                  <option key={fp} value={fp}>
                    {fp}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Target Audience
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Senior Tech PMs, Hiring Directors, Career Pivoters"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Key Metric / ROI Highlight */}
            <div className="md:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 mb-1 uppercase tracking-wider">
                Key ROI Metric to Anchor
              </label>
              <input
                type="text"
                value={metricOrROI}
                onChange={(e) => setMetricOrROI(e.target.value)}
                placeholder="e.g. 60% of graduates received a promotion within 6 months; Average salary increase of 25%"
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        )}

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center space-x-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-700">Variations:</span>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => setVariationCount(num)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                    variationCount === num
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {num} {num === 1 ? 'Angle' : 'Angles'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onGenerate}
            disabled={isLoading || !rawInputs.trim()}
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-slate-900/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Ghostwriting Executive Post...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Generate Executive LinkedIn Post</span>
                <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
