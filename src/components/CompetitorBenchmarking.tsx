import React, { useState } from 'react';
import {
  Scale,
  Plus,
  ArrowRight,
  ShieldAlert,
  Zap,
  CheckCircle2,
  DollarSign,
  Clock,
  Award,
  Users2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CompetitorBenchmark } from '../types/ghostwriter';
import { TRADITIONAL_COMPETITOR_MODELS } from '../data/edtechPresets';

interface CompetitorBenchmarkingProps {
  currentBenchmark: CompetitorBenchmark;
  onChangeBenchmark: (benchmark: CompetitorBenchmark) => void;
  onInjectIntoRawInputs: (benchmarkText: string) => void;
}

export const CompetitorBenchmarking: React.FC<CompetitorBenchmarkingProps> = ({
  currentBenchmark,
  onChangeBenchmark,
  onInjectIntoRawInputs,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectModel = (model: CompetitorBenchmark) => {
    onChangeBenchmark({ ...model });
  };

  const handleFieldChange = (field: keyof CompetitorBenchmark, val: string) => {
    onChangeBenchmark({
      ...currentBenchmark,
      [field]: val,
    });
  };

  const formatBenchmarkSummary = () => {
    return `Competitor Benchmark: Contrasting against ${currentBenchmark.targetModel}
- Cost & Investment: ${currentBenchmark.costContrast}
- Time-to-ROI & Speed: ${currentBenchmark.timeToRoi}
- Proof Mechanism: ${currentBenchmark.proofMechanism}
- Instructor Pedagogy: ${currentBenchmark.pedagogy}
- Core Competitive Edge: ${currentBenchmark.keyCompetitiveEdge}`;
  };

  return (
    <div className="rounded-2xl border border-indigo-200/90 bg-linear-to-b from-indigo-50/40 via-white to-slate-50/60 p-4 sm:p-5 space-y-4 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-100 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Scale className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Competitor Benchmarking &amp; Academic Contrast
              </h3>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                Edge Booster
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Directly contrast your course against outdated university degrees and passive MOOCs
            </p>
          </div>
        </div>

        <button
          onClick={() => onInjectIntoRawInputs(formatBenchmarkSummary())}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl shadow-xs transition-colors self-start sm:self-auto"
          title="Inject this competitor comparison into raw inputs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Inject Benchmark into Inputs</span>
        </button>
      </div>

      {/* Model Selector Buttons */}
      <div>
        <label className="block text-[11px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
          Select Traditional Baseline Model to Challenge
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TRADITIONAL_COMPETITOR_MODELS.map((model, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectModel(model)}
              className={`p-2.5 text-left rounded-xl border text-xs transition-all flex items-start space-x-2 ${
                currentBenchmark.targetModel === model.targetModel
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold ring-1 ring-indigo-600 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                  currentBenchmark.targetModel === model.targetModel
                    ? 'border-indigo-600 bg-indigo-600'
                    : 'border-slate-300'
                }`}
              >
                {currentBenchmark.targetModel === model.targetModel && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <div className="min-w-0">
                <span className="block font-bold text-xs truncate">{model.targetModel}</span>
                <span className="block text-[11px] text-slate-500 line-clamp-1">
                  {model.costContrast.split(' vs ')[1] || model.costContrast}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-xs overflow-hidden">
        {/* Cost & Tuition Debt */}
        <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          <div className="md:col-span-3 flex items-center space-x-2 text-slate-500 font-semibold">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Cost / Tuition Contrast</span>
          </div>
          <div className="md:col-span-9">
            {isEditing ? (
              <input
                type="text"
                value={currentBenchmark.costContrast}
                onChange={(e) => handleFieldChange('costContrast', e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded-md"
              />
            ) : (
              <p className="text-slate-900 font-medium">
                <strong className="text-emerald-700 font-bold">Your Course:</strong>{' '}
                {currentBenchmark.costContrast}
              </p>
            )}
          </div>
        </div>

        {/* Time-to-ROI */}
        <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          <div className="md:col-span-3 flex items-center space-x-2 text-slate-500 font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Time-to-ROI &amp; Speed</span>
          </div>
          <div className="md:col-span-9">
            {isEditing ? (
              <input
                type="text"
                value={currentBenchmark.timeToRoi}
                onChange={(e) => handleFieldChange('timeToRoi', e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded-md"
              />
            ) : (
              <p className="text-slate-900 font-medium">
                <strong className="text-blue-700 font-bold">Speed Advantage:</strong>{' '}
                {currentBenchmark.timeToRoi}
              </p>
            )}
          </div>
        </div>

        {/* Proof Mechanism */}
        <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          <div className="md:col-span-3 flex items-center space-x-2 text-slate-500 font-semibold">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Proof vs Credentialism</span>
          </div>
          <div className="md:col-span-9">
            {isEditing ? (
              <input
                type="text"
                value={currentBenchmark.proofMechanism}
                onChange={(e) => handleFieldChange('proofMechanism', e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded-md"
              />
            ) : (
              <p className="text-slate-900 font-medium">
                <strong className="text-purple-700 font-bold">Audited Proof:</strong>{' '}
                {currentBenchmark.proofMechanism}
              </p>
            )}
          </div>
        </div>

        {/* Pedagogy */}
        <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          <div className="md:col-span-3 flex items-center space-x-2 text-slate-500 font-semibold">
            <Users2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Operator Pedagogy</span>
          </div>
          <div className="md:col-span-9">
            {isEditing ? (
              <input
                type="text"
                value={currentBenchmark.pedagogy}
                onChange={(e) => handleFieldChange('pedagogy', e.target.value)}
                className="w-full px-2 py-1 text-xs border rounded-md"
              />
            ) : (
              <p className="text-slate-900 font-medium">
                <strong className="text-amber-800 font-bold">Mentorship:</strong>{' '}
                {currentBenchmark.pedagogy}
              </p>
            )}
          </div>
        </div>

        {/* Key Competitive Edge / Unfair Advantage */}
        <div className="p-3 bg-indigo-50/40 grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          <div className="md:col-span-3 flex items-center space-x-2 text-indigo-900 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Unfair Competitive Moat</span>
          </div>
          <div className="md:col-span-9">
            {isEditing ? (
              <input
                type="text"
                value={currentBenchmark.keyCompetitiveEdge}
                onChange={(e) => handleFieldChange('keyCompetitiveEdge', e.target.value)}
                className="w-full px-2 py-1 text-xs border border-indigo-300 rounded-md font-medium"
              />
            ) : (
              <p className="text-indigo-950 font-bold">
                "{currentBenchmark.keyCompetitiveEdge}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Edit Toggle */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
        <span>The ghostwriter model will explicitly contrast these metrics in the body copy.</span>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="font-bold text-indigo-600 hover:text-indigo-900 hover:underline"
        >
          {isEditing ? 'Save Custom Benchmark' : 'Customize Comparison Metrics'}
        </button>
      </div>
    </div>
  );
};
