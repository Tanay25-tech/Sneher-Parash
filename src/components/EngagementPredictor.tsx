import React, { useMemo, useState } from 'react';
import {
  TrendingUp,
  BarChart3,
  Activity,
  Users,
  MessageSquare,
  Repeat2,
  Eye,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { analyzePostEngagement, EngagementPrediction } from '../utils/engagementPredictor';

interface EngagementPredictorProps {
  content: string;
  hook?: string;
  cta?: string;
}

export const EngagementPredictor: React.FC<EngagementPredictorProps> = ({ content, hook, cta }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const prediction: EngagementPrediction = useMemo(() => {
    return analyzePostEngagement(content, hook, cta);
  }, [content, hook, cta]);

  const getScoreColor = (score: number) => {
    if (score >= 88) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">Optimal</span>;
      case 'good':
        return <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">Strong</span>;
      default:
        return <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Fair</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3 bg-linear-to-r from-slate-50/80 via-white to-indigo-50/30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-600 to-slate-900 text-white flex items-center justify-center shadow-xs">
            <TrendingUp className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                B2B LinkedIn Engagement &amp; Sentiment Predictor
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-800">
                Algorithm Heuristics
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Evaluated against organic feed distribution, scroll-stop rates, and operator debate patterns
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="flex items-baseline space-x-1 justify-end">
              <span className="text-2xl font-black tracking-tight text-slate-950 font-sans">
                {prediction.overallScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/100</span>
            </div>
            <span className="inline-block text-[11px] font-extrabold text-indigo-700">
              Grade {prediction.scoreGrade} • {prediction.reachTier}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={isExpanded ? 'Collapse analysis' : 'Expand analysis'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-5">
          {/* 4 Estimated Distribution Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-semibold mb-1">
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Est. Impressions</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {prediction.estimatedImpressions}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Organic feed reach</div>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-semibold mb-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Est. Comments</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {prediction.estimatedComments}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">High hiring debate</div>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-semibold mb-1">
                <Repeat2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Est. Reposts</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {prediction.estimatedReposts}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Operator alignment</div>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80">
              <div className="flex items-center space-x-1.5 text-slate-500 text-[11px] font-semibold mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Scroll-Stop Rate</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                {prediction.scrollStopRate}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hook stop power</div>
            </div>
          </div>

          {/* Sentiment & Tone Analysis Spectrum */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Sentiment Spectrum &amp; Operator Tone
                </span>
              </div>
              <span className="text-xs font-semibold text-amber-300">
                Primary: {prediction.sentiment.primaryTone}
              </span>
            </div>

            {/* Visual Sentiment Multi-Bar */}
            <div className="space-y-1.5">
              <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  style={{ width: `${prediction.sentiment.constructiveFriction}%` }}
                  className="bg-amber-500 h-full transition-all duration-500"
                  title={`Constructive Friction: ${prediction.sentiment.constructiveFriction}%`}
                />
                <div
                  style={{ width: `${prediction.sentiment.empatheticRealism}%` }}
                  className="bg-indigo-400 h-full transition-all duration-500"
                  title={`Empathetic Realism: ${prediction.sentiment.empatheticRealism}%`}
                />
                <div
                  style={{ width: `${prediction.sentiment.outcomeOptimism}%` }}
                  className="bg-emerald-400 h-full transition-all duration-500"
                  title={`Outcome Optimism: ${prediction.sentiment.outcomeOptimism}%`}
                />
              </div>

              <div className="grid grid-cols-3 text-[11px] pt-1">
                <div className="text-left">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1.5" />
                  <span className="text-slate-300 font-medium">Constructive Friction</span>
                  <span className="font-bold text-white ml-1">
                    {prediction.sentiment.constructiveFriction}%
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 mr-1.5" />
                  <span className="text-slate-300 font-medium">Empathetic Realism</span>
                  <span className="font-bold text-white ml-1">
                    {prediction.sentiment.empatheticRealism}%
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1.5" />
                  <span className="text-slate-300 font-medium">Outcome Optimism</span>
                  <span className="font-bold text-white ml-1">
                    {prediction.sentiment.outcomeOptimism}%
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span>Executive Operator Voice Score:</span>
              <span className="font-bold text-emerald-400">
                {prediction.sentiment.operatorVoiceScore}% Fluff-Free
              </span>
            </div>
          </div>

          {/* 4 Factor Breakdown */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              B2B Performance Factor Breakdown
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              {prediction.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{metric.label}</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-semibold text-slate-400">
                        Weight: {metric.weight}
                      </span>
                      {getStatusBadge(metric.status)}
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        metric.score >= 85
                          ? 'bg-emerald-500'
                          : metric.score >= 70
                          ? 'bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-tight">
                    {metric.insight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Algorithm Feed Highlights */}
          <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-100/90 space-y-1.5 text-xs">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Algorithmic Optimization Highlights</span>
            </div>
            <ul className="space-y-1 pl-5 list-disc text-[11px] text-indigo-900/90 leading-relaxed">
              {prediction.algorithmHighlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
