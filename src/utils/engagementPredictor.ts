export interface SentimentAnalysis {
  primaryTone: string;
  constructiveFriction: number; // percentage 0-100
  empatheticRealism: number; // percentage 0-100
  outcomeOptimism: number; // percentage 0-100
  operatorVoiceScore: number; // 0-100 (absence of fluff/jargon)
}

export interface EngagementMetricBreakdown {
  label: string;
  score: number; // 0-100
  weight: string;
  status: 'excellent' | 'good' | 'average' | 'needs-work';
  insight: string;
}

export interface EngagementPrediction {
  overallScore: number; // 0-100
  scoreGrade: string;
  reachTier: string;
  estimatedImpressions: string;
  estimatedComments: string;
  estimatedReposts: string;
  scrollStopRate: number; // e.g. 88%
  sentiment: SentimentAnalysis;
  metrics: EngagementMetricBreakdown[];
  algorithmHighlights: string[];
}

export function analyzePostEngagement(content: string, hook?: string, cta?: string): EngagementPrediction {
  if (!content || !content.trim()) {
    return {
      overallScore: 0,
      scoreGrade: 'N/A',
      reachTier: 'Empty Post',
      estimatedImpressions: '0',
      estimatedComments: '0',
      estimatedReposts: '0',
      scrollStopRate: 0,
      sentiment: {
        primaryTone: 'Neutral',
        constructiveFriction: 0,
        empatheticRealism: 0,
        outcomeOptimism: 0,
        operatorVoiceScore: 0,
      },
      metrics: [],
      algorithmHighlights: ['Add content to calculate reach and engagement.'],
    };
  }

  const cleanContent = content.trim();
  const charCount = cleanContent.length;
  const lines = cleanContent.split('\n').filter((l) => l.trim().length > 0);
  const words = cleanContent.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // 1. Hook Scroll-Stop Factor (Max 25 pts)
  let hookScore = 70;
  const effectiveHook = hook || lines[0] || '';
  const hookLines = lines.slice(0, 3).join(' ');
  const hookChars = hookLines.length;

  // Best hook length is 80 - 180 chars (visible before mobile 3-line fold)
  if (hookChars >= 60 && hookChars <= 200) {
    hookScore += 18;
  } else if (hookChars < 60) {
    hookScore += 8;
  } else {
    hookScore -= 10;
  }

  // Tension words boost hook stop-rate
  const tensionKeywords = [
    'not',
    'dead',
    'collapse',
    'shift',
    'myth',
    'reality',
    'killed',
    'stop',
    'instead',
    'failed',
    'divide',
    'curse',
    'burn',
    'cost',
    'irr',
  ];
  const lowerHook = effectiveHook.toLowerCase();
  const containsTension = tensionKeywords.some((w) => lowerHook.includes(w));
  if (containsTension) hookScore += 12;

  hookScore = Math.min(99, Math.max(30, hookScore));

  // 2. Dwell Time & Formatting Cadence (Max 25 pts)
  let dwellScore = 65;
  // Ideal LinkedIn length: 1,100 to 1,800 characters
  if (charCount >= 1000 && charCount <= 1900) {
    dwellScore += 20;
  } else if (charCount >= 700 && charCount < 1000) {
    dwellScore += 12;
  } else if (charCount > 1900 && charCount <= 2500) {
    dwellScore += 10;
  } else {
    dwellScore -= 15;
  }

  // Paragraph spacing: LinkedIn rewards 1-2 sentence paragraphs (high whitespace readability)
  const avgWordsPerLine = wordCount / Math.max(lines.length, 1);
  if (avgWordsPerLine >= 6 && avgWordsPerLine <= 18) {
    dwellScore += 15;
  } else if (avgWordsPerLine > 25) {
    dwellScore -= 15; // dense blocks hurt dwell time
  }
  dwellScore = Math.min(98, Math.max(35, dwellScore));

  // 3. Comment Debate & Discussion Velocity (Max 25 pts)
  let debateScore = 60;
  const effectiveCta = cta || lines[lines.length - 1] || '';
  const endsWithQuestion = effectiveCta.includes('?') || cleanContent.includes('?');
  if (endsWithQuestion) debateScore += 22;

  // Targeting decision-makers (hiring managers, founders, recruiters)
  const targetTokens = ['hiring manager', 'recruiter', 'engineering', 'director', 'leader', 'team', 'would you', 'do you'];
  const hasTargetToken = targetTokens.some((t) => cleanContent.toLowerCase().includes(t));
  if (hasTargetToken) debateScore += 15;
  debateScore = Math.min(98, Math.max(30, debateScore));

  // 4. Proof & Metric Density (Max 25 pts)
  let proofScore = 60;
  const hasPercent = /%\s*/.test(cleanContent);
  const hasNumbers = /\d+/.test(cleanContent);
  const hasCurrency = /\$|k\b|salary|roi|irr/i.test(cleanContent);
  const hasMonths = /month|week|day|year/i.test(cleanContent);

  if (hasPercent) proofScore += 14;
  if (hasNumbers) proofScore += 8;
  if (hasCurrency) proofScore += 10;
  if (hasMonths) proofScore += 6;
  proofScore = Math.min(98, Math.max(35, proofScore));

  // Penalties for AI Slop / Overuse
  const emojiCount = (cleanContent.match(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length;
  const hashtagCount = (cleanContent.match(/#\w+/g) || []).length;

  let penalty = 0;
  if (emojiCount > 0) penalty += emojiCount * 3;
  if (hashtagCount > 0) penalty += hashtagCount * 4;

  const rawOverall = Math.round(
    hookScore * 0.3 + dwellScore * 0.25 + debateScore * 0.25 + proofScore * 0.2 - penalty
  );
  const overallScore = Math.min(98, Math.max(45, rawOverall));

  // Determine Grade & Reach Tier
  let scoreGrade = 'B+';
  let reachTier = 'Strong Authority Reach';
  let estimatedImpressions = '14,000 – 28,000';
  let estimatedComments = '45 – 90';
  let estimatedReposts = '12 – 26';

  if (overallScore >= 90) {
    scoreGrade = 'A+';
    reachTier = 'Viral B2B Operator Outlier';
    estimatedImpressions = '38,000 – 95,000+';
    estimatedComments = '120 – 340';
    estimatedReposts = '45 – 110';
  } else if (overallScore >= 82) {
    scoreGrade = 'A';
    reachTier = 'Top 5% Executive Feed Reach';
    estimatedImpressions = '22,000 – 52,000';
    estimatedComments = '75 – 180';
    estimatedReposts = '24 – 55';
  } else if (overallScore >= 72) {
    scoreGrade = 'B+';
    reachTier = 'High-Trust Operator Engagement';
    estimatedImpressions = '12,000 – 26,000';
    estimatedComments = '35 – 75';
    estimatedReposts = '10 – 22';
  } else {
    scoreGrade = 'B';
    reachTier = 'Core Niche Audience';
    estimatedImpressions = '6,000 – 14,000';
    estimatedComments = '15 – 40';
    estimatedReposts = '4 – 10';
  }

  // Sentiment Analysis
  const frictionTerms = ['collapse', 'dead', 'anxiety', 'fear', 'threat', 'myth', 'replaced', 'cost', 'debt', 'broken', 'friction', 'outdated'];
  const empathyTerms = ['ambitious', 'professional', 'struggle', 'understand', 'transition', 'patience', 'career', 'learned', 'team'];
  const optimismTerms = ['promotion', 'uplift', 'roi', 'increase', 'secured', 'transition into', 'practical skills', 'succeeded', 'outcome', 'leverage'];

  let frictionCount = 0;
  let empathyCount = 0;
  let optimismCount = 0;

  const lowerContent = cleanContent.toLowerCase();
  frictionTerms.forEach((w) => {
    if (lowerContent.includes(w)) frictionCount++;
  });
  empathyTerms.forEach((w) => {
    if (lowerContent.includes(w)) empathyCount++;
  });
  optimismTerms.forEach((w) => {
    if (lowerContent.includes(w)) optimismCount++;
  });

  const totalSentimentTokens = Math.max(1, frictionCount + empathyCount + optimismCount);
  const constructiveFriction = Math.round((frictionCount / totalSentimentTokens) * 100);
  const empatheticRealism = Math.round((empathyCount / totalSentimentTokens) * 100);
  const outcomeOptimism = Math.max(15, 100 - constructiveFriction - empatheticRealism);

  let primaryTone = 'Strategic Operator Pragmatism';
  if (constructiveFriction > 40) {
    primaryTone = 'Constructive Friction & Market Reality';
  } else if (outcomeOptimism > 45) {
    primaryTone = 'Outcome-Oriented Proof & Acceleration';
  } else {
    primaryTone = 'Empathetic Industry Operator Observation';
  }

  // Highlights & Insights
  const algorithmHighlights: string[] = [];
  if (hookChars <= 180) {
    algorithmHighlights.push('Hook lands completely before the 3-line fold on mobile screens.');
  } else {
    algorithmHighlights.push('Hook extends slightly past the mobile fold; consider tightening first 2 lines.');
  }

  if (endsWithQuestion) {
    algorithmHighlights.push('Open-ended debate CTA primes the first 60 minutes for high comment velocity.');
  }

  if (hasPercent || hasCurrency) {
    algorithmHighlights.push('Hard proof points (% and $) trigger credibility heuristics for senior recruiters.');
  }

  if (emojiCount === 0 && hashtagCount === 0) {
    algorithmHighlights.push('Zero-emoji, zero-hashtag formatting matches high-ticket executive B2B posts.');
  }

  return {
    overallScore,
    scoreGrade,
    reachTier,
    estimatedImpressions,
    estimatedComments,
    estimatedReposts,
    scrollStopRate: Math.round(hookScore * 0.95),
    sentiment: {
      primaryTone,
      constructiveFriction: Math.max(20, Math.min(60, constructiveFriction || 38)),
      empatheticRealism: Math.max(20, Math.min(50, empatheticRealism || 34)),
      outcomeOptimism: Math.max(18, Math.min(50, outcomeOptimism || 28)),
      operatorVoiceScore: Math.max(88, 100 - (emojiCount * 5 + hashtagCount * 5)),
    },
    metrics: [
      {
        label: 'Hook Scroll-Stop Power',
        score: hookScore,
        weight: '30%',
        status: hookScore >= 85 ? 'excellent' : hookScore >= 70 ? 'good' : 'average',
        insight:
          hookScore >= 85
            ? 'High tension contrast immediately stops the scroll in busy executive feeds.'
            : 'Consider sharpening the opening friction point before the fold.',
      },
      {
        label: 'Dwell Time & Cadence',
        score: dwellScore,
        weight: '25%',
        status: dwellScore >= 85 ? 'excellent' : dwellScore >= 70 ? 'good' : 'average',
        insight:
          charCount >= 1100 && charCount <= 1800
            ? 'Optimal 1,200 - 1,800 character length maximizes reader session dwell time.'
            : 'Keep sentences short and paragraphs under 2 lines for rhythmic mobile scanning.',
      },
      {
        label: 'Comment Debate Velocity',
        score: debateScore,
        weight: '25%',
        status: debateScore >= 85 ? 'excellent' : debateScore >= 70 ? 'good' : 'average',
        insight: endsWithQuestion
          ? 'Provocative question specifically prompts opinions from hiring managers.'
          : 'Add an open-ended closing question to ignite debate in the comments.',
      },
      {
        label: 'Proof & Career ROI Density',
        score: proofScore,
        weight: '20%',
        status: proofScore >= 80 ? 'excellent' : 'good',
        insight:
          hasPercent || hasCurrency
            ? 'Anchored in concrete metrics (salary, promotion timeline, and cohort outcomes).'
            : 'Add a specific metric (e.g. 60% promotion, 25% salary uplift) to boost reposts.',
      },
    ],
    algorithmHighlights,
  };
}
