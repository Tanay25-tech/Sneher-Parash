import { EdTechPreset, CompetitorBenchmark } from '../types/ghostwriter';

export const TRADITIONAL_COMPETITOR_MODELS: CompetitorBenchmark[] = [
  {
    targetModel: 'Traditional 2-Year University Master’s Degree',
    costContrast: '$2,200 intensive sprint vs $65,000 university tuition debt',
    timeToRoi: '8 weeks to live deployment vs 24 months syllabus lag + 5-year debt payback',
    proofMechanism: 'Audited production GitHub repository & live capstone defense vs theoretical thesis paper',
    pedagogy: 'Mentored by active VP/Staff enterprise operators vs tenured theoretical academics',
    keyCompetitiveEdge: 'Direct career IRR: immediate applied proof that bypasses automated ATS filters without tuition debt',
  },
  {
    targetModel: '50-Hour Asynchronous Video MOOCs (Coursera/Udemy)',
    costContrast: 'High-accountability cohort with 88% completion vs $15 courses with 4% completion rate',
    timeToRoi: 'Hands-on project review within 48 hours vs passive endless video queues',
    proofMechanism: 'Production-ready pull requests and live code audits vs multiple-choice quizzes and PDF badges',
    pedagogy: 'Live interactive weekly office hours and peer sprint reviews vs pre-recorded 2021 videos',
    keyCompetitiveEdge: 'Overcoming information overload with strict execution accountability and human code defense',
  },
  {
    targetModel: 'Legacy 6-Month Coding & Analytics Bootcamps',
    costContrast: '$2,500 targeted hybrid skill upgrade vs $20,000 full-time opportunity cost / income share agreement',
    timeToRoi: 'Learn while working full-time with 90-day internal promotion target vs quitting job for 6 months',
    proofMechanism: 'Bespoke enterprise domain projects (SQL pipelines, LLM agents) vs cookie-cutter Todo list clones',
    pedagogy: 'Tailored for experienced mid-career professionals vs entry-level generalist cohorts',
    keyCompetitiveEdge: 'Stacking specialized technical leverage on top of existing business acumen rather than starting from scratch',
  },
  {
    targetModel: 'Corporate Internal L&D Tick-the-Box Training',
    costContrast: 'Rigorous external market benchmark vs mandatory internal compliance videos everyone plays on 2x speed',
    timeToRoi: 'Immediate promotion/raise leverage on the open market vs stagnant internal band adjustments',
    proofMechanism: 'Market-verified portfolio recognized by external hiring managers vs internal completion certificates',
    pedagogy: 'Cutting-edge Silicon Valley operator workflows vs watered-down HR slide decks',
    keyCompetitiveEdge: 'Portable market currency that increases executive market value anywhere, not just within one company',
  },
];

export const EDTECH_PRESETS: EdTechPreset[] = [
  {
    id: 'ai-for-pm',
    title: 'AI for Project Managers — Breaking Coordination Fatigue',
    courseConcept: 'AI for Project Managers',
    primaryMetric: '60% of graduates received a promotion within 6 months; 31% average salary increase',
    customerObjection: 'Will generative AI render traditional project managers obsolete within two years?',
    frictionPoint: 'Generalist coordination is being automated while technical AI workflow orchestration is rewarded',
    targetAudience: 'Mid-to-Senior Technical & Non-Technical Project Managers',
    studentStory: {
      originalRole: 'Traditional Waterfall Project Manager',
      newRole: 'AI Product Operations Lead',
      courseName: 'AI for Project Managers',
      specificOutcome: 'Automated 14 hours of weekly reporting and spearheaded the enterprise LLM rollout',
      formattedStory:
        'We recently saw a Traditional Waterfall Project Manager transition into an AI Product Operations Lead after completing our AI for Project Managers program, attributing their success to the practical skills gained in orchestrating multi-agent workflows and cutting sprint latency by 40%.',
    },
    competitorBenchmark: TRADITIONAL_COMPETITOR_MODELS[0],
    rawInputSnippet: `Course Concept: AI for Project Managers
Core Objection: "Hiring managers tell us PMs are just meeting coordinators, and AI tools like Cursor and Jira automation will replace 50% of the team."
Key Success Metrics: 60% of graduates received a promotion within 6 months; Average salary increase of 28%; 91% capstone projects integrated into live corporate workflows.
Student Transformation: We recently saw a Traditional Project Manager transition into an AI Product Operations Lead after completing our AI for Project Managers program, attributing their success to the practical skills gained in structuring algorithmic roadmaps.
Competitor Benchmark: $2,200 intensive sprint vs $65,000 university Master's degree; 8 weeks to live deployment vs 24 months syllabus lag.
Industry Observation: Companies do not need fewer PMs; they need PMs who can calculate token costs, manage prompt pipelines, and de-risk AI integrations instead of managing static Gantt charts.`,
  },
  {
    id: 'data-analytics-marketers',
    title: 'Data Analytics for Marketers — From Vanity Metrics to Revenue Attribution',
    courseConcept: 'Data Analytics for Marketers',
    primaryMetric: 'Average salary increase of 25%; 74% placed in Head of Growth or Analytics hybrid roles within 90 days',
    customerObjection: 'I do not have a math or CS degree, and Python syntax feels completely out of reach for a creative.',
    frictionPoint: 'Creative gut-feel marketing is being slashed in corporate budgets; leaders demand hard econometric modeling',
    targetAudience: 'Growth Marketers, Brand Directors, and Performance Specialists',
    studentStory: {
      originalRole: 'Senior Content & Social Media Lead',
      newRole: 'Head of Marketing Analytics & Attribution',
      courseName: 'Data Analytics for Marketers',
      specificOutcome: 'Built automated SQL attribution pipelines saving $120k in wasted ad spend',
      formattedStory:
        'We recently saw a Senior Content & Social Media Lead transition into Head of Marketing Analytics & Attribution after completing our Data Analytics for Marketers program, attributing their success to the practical skills gained in SQL-driven customer lifetime value modeling.',
    },
    competitorBenchmark: TRADITIONAL_COMPETITOR_MODELS[1],
    rawInputSnippet: `Course Concept: Data Analytics for Marketers
Core Objection: "Marketers are creative storytellers; forcing us to learn SQL and regression models feels like unnatural friction."
Key Success Metrics: Average salary increase of 25%; 74% received promotions or moved into Analytics/Growth leadership within 90 days; 88% stopped relying on data engineering tickets for routine attribution queries.
Student Transformation: We recently saw a Senior Content & Social Media Lead transition into Head of Marketing Analytics & Attribution after completing our Data Analytics for Marketers program, attributing their success to the practical skills gained in building real-time cohort retention dashboards.
Competitor Benchmark: Live code reviews and real SQL pipelines vs $15 Coursera videos with 4% completion rate and zero feedback.
Industry Observation: The modern CMO cannot protect marketing budgets with impressions and vibes. Marketers who speak SQL and cohort economics control the budget table.`,
  },
  {
    id: 'cloud-architecture-qa',
    title: 'Cloud Architecture & DevOps Sprint — Escaping Manual Testing Ceilings',
    courseConcept: 'Cloud Architecture & DevOps for Senior QA',
    primaryMetric: '68% salary uplift; 82% offer conversion rate on production capstone defense',
    customerObjection: 'Can an enterprise manual tester really bridge into high-scale Kubernetes and AWS infrastructure in 12 weeks?',
    frictionPoint: 'Manual QA is facing aggressive budget downsizing; cloud reliability engineering offers double the compensation',
    targetAudience: 'QA Engineers, Systems Administrators, and Manual Testers',
    studentStory: {
      originalRole: 'Manual QA Specialist (8 years tenure)',
      newRole: 'Cloud Infrastructure & Reliability Engineer',
      courseName: 'Cloud Architecture & DevOps Sprint',
      specificOutcome: 'Designed Terraform CI/CD pipelines reducing deployment failure rates to under 0.2%',
      formattedStory:
        'We recently saw a Manual QA Specialist transition into a Cloud Infrastructure & Reliability Engineer after completing our Cloud Architecture & DevOps Sprint program, attributing their success to the practical skills gained in infrastructure-as-code and container orchestration.',
    },
    competitorBenchmark: TRADITIONAL_COMPETITOR_MODELS[2],
    rawInputSnippet: `Course Concept: Cloud Architecture & DevOps for Senior QA
Core Objection: "Manual testing is safe, and cloud infrastructure architecture requires a decade of backend systems engineering."
Key Success Metrics: 68% salary uplift upon job transition; 82% offer conversion rate on live capstone defense; 100% of graduates have production Terraform configurations publicly audited.
Student Transformation: We recently saw a Manual QA Specialist transition into a Cloud Infrastructure & Reliability Engineer after completing our Cloud Architecture & DevOps Sprint program, attributing their success to the practical skills gained in production incident simulation.
Competitor Benchmark: $2,500 targeted bridge while keeping your job vs quitting for a $20,000 full-time bootcamp with generic portfolio apps.
Industry Observation: The market has zero patience for passive certificate collectors. When candidates defend live production architectures instead of showing PDF badges, hiring timelines collapse from months to weeks.`,
  },
  {
    id: 'custom-template',
    title: 'Custom EdTech Scenario — Write Your Own Course & Metrics',
    courseConcept: 'Technical Product Management & AI Systems',
    primaryMetric: '55% promotion rate within 180 days; $32,000 median salary leap',
    customerObjection: 'Online courses have a 4% completion rate and hiring managers ignore digital badges.',
    frictionPoint: 'Digital certificates are commoditized; only audited proof-of-work commands premium compensation',
    targetAudience: 'Mid-Career Pivoters and Engineering Managers',
    studentStory: {
      originalRole: '[Job Title]',
      newRole: '[New Job Title]',
      courseName: '[Course Name]',
      specificOutcome: '[Specific ROI metric, e.g. 35% salary jump or promotion in 90 days]',
      formattedStory:
        'We recently saw [Job Title] transition into [New Job Title] after completing our [Course Name] program, attributing their success to the practical skills gained.',
    },
    competitorBenchmark: TRADITIONAL_COMPETITOR_MODELS[0],
    rawInputSnippet: `Course Concept: [Insert Course Name, e.g., AI for Project Managers or Data Analytics for Marketers]
Core Objection: [Insert primary buyer doubt or friction, e.g., "AI will replace this role" or "No time while working full-time"]
Key Success Metrics: [Insert metrics, e.g., 60% of graduates received a promotion within 6 months, Average salary increase of 25%]
Student Transformation: We recently saw [Job Title] transition into [New Job Title] after completing our [Course Name] program, attributing their success to the practical skills gained.
Competitor Benchmark: [Insert competitor contrast, e.g. $2k sprint vs $60k University Master's degree]
Industry Observation: [Insert operator perspective on why the industry is shifting]`,
  },
];

export const EXECUTIVE_ANGLES = [
  {
    name: 'The Pragmatic Operator',
    description: 'Calm, measured, focused on operational execution, business leverage, and real workflow shifts.',
  },
  {
    name: 'The Talent Market Insider',
    description: 'Speaks with the authority of someone who reviews hundreds of hiring rubrics and enterprise payroll data.',
  },
  {
    name: 'The Contrarian Dean',
    description: 'Directly challenges outdated university credentials and passive video courses with uncompromising realism.',
  },
  {
    name: 'The Career ROI Architect',
    description: 'Analytical and outcome-driven; treats skill acquisition strictly as capital allocation and career IRR.',
  },
];

export const FRICTION_POINTS = [
  'Credentials & Certificates vs Applied Proof-of-Work',
  'AI Automation Anxieties & Job Role Displacement',
  'The $2k Intensive Cohort vs $60k University Master’s Degree',
  'Mid-Career Stagnation: Moving from Generalist to High-Leverage Specialist',
  'Hiring Manager Disconnect: Resumes getting filtered by automated ATS',
  'Upskilling Fatigue: 50-hour passive video courses that never get finished',
];

export const QUICK_COURSE_EXAMPLES = [
  { name: 'AI for Project Managers', metric: '60% of graduates received a promotion within 6 months' },
  { name: 'Data Analytics for Marketers', metric: 'Average salary increase of 25%' },
  { name: 'Cloud Architecture & DevOps for Senior QA', metric: '68% salary uplift in 90 days' },
  { name: 'Executive AI Systems & Prompt Ops', metric: '79% placed in hybrid lead positions' },
];
