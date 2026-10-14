export interface StudentSuccessStory {
  originalRole: string;
  newRole: string;
  courseName: string;
  specificOutcome: string;
  formattedStory: string;
}

export interface CompetitorBenchmark {
  targetModel: string; // e.g., 'Traditional 2-Year University Master’s Degree', '50-Hour Asynchronous Video MOOCs', 'Legacy 6-Month Coding Bootcamps'
  costContrast: string; // e.g., '$2,200 targeted sprint vs $65,000 university tuition debt'
  timeToRoi: string; // e.g., '90-day promotion/offer vs 24 months syllabus lag + 5-year debt payback'
  proofMechanism: string; // e.g., 'Audited production GitHub repository & live capstone defense vs multiple-choice quiz or PDF badge'
  pedagogy: string; // e.g., 'Taught by active enterprise operators vs tenured theoretical professors'
  keyCompetitiveEdge: string; // e.g., 'Direct career IRR: immediate applied proof that bypasses automated ATS filters'
}

export interface EdTechPreset {
  id: string;
  title: string;
  courseConcept: string;
  primaryMetric: string;
  customerObjection: string;
  frictionPoint: string;
  targetAudience: string;
  studentStory: StudentSuccessStory;
  competitorBenchmark?: CompetitorBenchmark;
  rawInputSnippet: string;
}

export interface PostComplianceCheck {
  hasNoEmojis: boolean;
  hasNoHashtags: boolean;
  hasNoGimmickDividers: boolean;
  isPunchyAndActive: boolean;
  notes?: string;
}

export interface PostVariation {
  id: string;
  variationTitle: string;
  hook: string;
  content: string;
  coreShift: {
    oldWay: string;
    newApproach: string;
  };
  cta: string;
  metricsHighlight: string;
  competitiveEdgeHighlight?: string;
  strategicRationale: string;
  complianceCheck: PostComplianceCheck;
  createdAt?: string;
}

export interface GhostwriterState {
  rawInputs: string;
  courseConcept: string;
  primaryMetric: string;
  studentStory: StudentSuccessStory;
  competitorBenchmark: CompetitorBenchmark;
  angle: string;
  frictionPoint: string;
  targetAudience: string;
  variationCount: number;
}
