import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json({ limit: '2mb' }));

const PORT = Number(process.env.PORT) || 3000;

// Shared Gemini client instance with User-Agent as required by AI Studio guidelines
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are a premier B2B executive ghostwriter specializing in EdTech, workforce digital transformation, and professional career acceleration. Your client is an EdTech Leader who builds courses designed to bridge skills gaps for working professionals.

Your mission is to take raw educational concepts, customer objections, student placement statistics, or upskilling trends and craft compelling, executive-tier LinkedIn thought leadership.

CRITICAL TONE & FORMATTING RULES:
1. Tone: Professional, empathetic, highly strategic, and outcome-oriented. Avoid overly corporate jargon or sounding like a sales brochure. It must feel like an organic observation from an experienced industry operator and educator.
2. Hook: Focus directly on a major friction point professionals face today (e.g., job market changes, AI automation anxieties, the debate between specific career skills, credentials vs proof-of-work, or real ROI on upskilling). Make it punchy, intriguing, and scroll-stopping within the first 1-2 lines before the "see more" cutoff.
3. Body: Clearly illustrate the transition from the old way of thinking to the new strategic approach. Keep sentences short, active, and highly punchy. Use strategic spacing (one or two sentences per paragraph). Each line should deliver immediate value.
4. Call to Action (CTA): End with an open-ended question designed to spark a high-level debate among hiring managers, recruiters, founders, and ambitious working professionals.
5. Formatting: STRICTLY AVOID emojis (zero emojis anywhere in the text), gimmicky dividers (no '----' or '~*~' or special bullet characters), and hashtags (zero hashtags). Maintain the authoritative, calm voice of a pragmatic leader.`;

// Post generation endpoint
app.post('/api/generate-post', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check environment variables.',
      });
    }

    const {
      rawInputs,
      angle = 'The Pragmatic Operator',
      targetAudience = 'Ambitious Mid-Career Professionals & Hiring Managers',
      frictionPoint = 'Credentials vs Applied Proof-of-Work',
      metricOrROI = '',
      competitorBenchmark = null,
      variationCount = 3,
    } = req.body;

    if (!rawInputs || typeof rawInputs !== 'string' || !rawInputs.trim()) {
      return res.status(400).json({ error: 'Raw EdTech inputs are required.' });
    }

    let competitorContext = '';
    if (competitorBenchmark) {
      competitorContext = `
[COMPETITOR BENCHMARK TO CONTRAST]:
- Target Model Challenged: ${competitorBenchmark.targetModel || 'Traditional 2-Year University Master’s Degree'}
- Cost Contrast: ${competitorBenchmark.costContrast || ''}
- Time-to-ROI / Velocity: ${competitorBenchmark.timeToRoi || ''}
- Proof Mechanism: ${competitorBenchmark.proofMechanism || ''}
- Instructor Pedagogy: ${competitorBenchmark.pedagogy || ''}
- Key Competitive Edge: ${competitorBenchmark.keyCompetitiveEdge || ''}
*IMPORTANT: Explicitly highlight this competitive edge against the outdated model in the body of the post.*`;
    }

    const userPrompt = `Generate ${variationCount} distinct strategic LinkedIn post variations based on the following EdTech inputs.

[RAW EDTECH INPUTS]:
${rawInputs}

[ADDITIONAL CONTEXT & STRATEGIC KNOBS]:
- Executive Writing Archetype: ${angle}
- Primary Friction Point: ${frictionPoint}
- Primary Target Audience: ${targetAudience}
${metricOrROI ? `- Key Metric / ROI Evidence: ${metricOrROI}` : ''}
${competitorContext}

Ensure every variation strictly adheres to the 5 critical rules:
1. Tone: Professional, empathetic, highly strategic, organic operator voice (no sales pitch).
2. Hook: Directly tackles the friction point in the first 1-2 lines.
3. Body: Explicitly contrasts the "Old Way of Thinking" (or outdated competitor model like 2-year degrees / passive MOOCs) vs the "New Strategic Reality / Operator Cohort", with short punchy lines, real metrics, and strategic pacing.
4. CTA: Open-ended question sparking genuine debate among executives, hiring managers, and ambitious learners.
5. Formatting: 0 EMOJIS, 0 HASHTAGS, 0 GIMMICKY DIVIDERS.

Return the response in the specified structured schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variations: {
              type: Type.ARRAY,
              description: 'List of strategic LinkedIn post variations',
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'Unique slug ID' },
                  variationTitle: {
                    type: Type.STRING,
                    description: 'Descriptive title for this strategic angle, e.g. "The Contrarian Operator"',
                  },
                  hook: {
                    type: Type.STRING,
                    description: 'The exact opening hook (first 1-2 lines before see more)',
                  },
                  content: {
                    type: Type.STRING,
                    description: 'The full post ready for LinkedIn, strictly without emojis or hashtags',
                  },
                  coreShift: {
                    type: Type.OBJECT,
                    properties: {
                      oldWay: { type: Type.STRING, description: 'The old, outdated belief or competitor assumption' },
                      newApproach: { type: Type.STRING, description: 'The new strategic approach or operator reality' },
                    },
                    required: ['oldWay', 'newApproach'],
                  },
                  cta: {
                    type: Type.STRING,
                    description: 'The closing open-ended debate question',
                  },
                  metricsHighlight: {
                    type: Type.STRING,
                    description: 'The core proof point or ROI summary',
                  },
                  competitiveEdgeHighlight: {
                    type: Type.STRING,
                    description: 'Concise summary of the course competitive advantage over traditional academic or MOOC models',
                  },
                  strategicRationale: {
                    type: Type.STRING,
                    description: 'Why this post framing generates engagement and establishes executive credibility',
                  },
                  complianceCheck: {
                    type: Type.OBJECT,
                    properties: {
                      hasNoEmojis: { type: Type.BOOLEAN },
                      hasNoHashtags: { type: Type.BOOLEAN },
                      hasNoGimmickDividers: { type: Type.BOOLEAN },
                      isPunchyAndActive: { type: Type.BOOLEAN },
                      notes: { type: Type.STRING },
                    },
                    required: ['hasNoEmojis', 'hasNoHashtags', 'hasNoGimmickDividers', 'isPunchyAndActive'],
                  },
                },
                required: [
                  'id',
                  'variationTitle',
                  'hook',
                  'content',
                  'coreShift',
                  'cta',
                  'metricsHighlight',
                  'strategicRationale',
                  'complianceCheck',
                ],
              },
            },
          },
          required: ['variations'],
        },
      },
    });

    function cleanJson(rawStr: string): string {
      let cleaned = (rawStr || '').trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
      }
      return cleaned.trim();
    }

    let parsed: any;
    try {
      parsed = JSON.parse(cleanJson(response.text || '{"variations":[]}'));
    } catch (parseErr) {
      console.warn('Failed to parse model JSON directly, attempting recovery:', parseErr);
      parsed = { variations: [] };
    }

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating LinkedIn posts:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to generate posts. Please try again.',
    });
  }
});

// Post refinement endpoint
app.post('/api/refine-post', async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
    }

    const { currentContent, instruction } = req.body;

    if (!currentContent || !instruction) {
      return res.status(400).json({ error: 'Current content and instruction are required.' });
    }

    const refinePrompt = `You are the executive ghostwriter. Refine the following LinkedIn post according to the instruction while strictly keeping the executive tone, 0 emojis, 0 hashtags, and punchy line breaks.

[CURRENT POST]:
${currentContent}

[REFINEMENT INSTRUCTION]:
${instruction}

Return a revised version conforming to the structured schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: refinePrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.6,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            revisedContent: {
              type: Type.STRING,
              description: 'The updated full LinkedIn post text (strictly 0 emojis, 0 hashtags)',
            },
            revisedHook: {
              type: Type.STRING,
              description: 'The updated opening hook',
            },
            revisedCta: {
              type: Type.STRING,
              description: 'The updated debate question',
            },
            refinementNotes: {
              type: Type.STRING,
              description: 'Brief explanation of what was tightened or elevated',
            },
          },
          required: ['revisedContent', 'revisedHook', 'revisedCta', 'refinementNotes'],
        },
      },
    });

    function cleanJson(rawStr: string): string {
      let cleaned = (rawStr || '').trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
      }
      return cleaned.trim();
    }

    let parsed: any;
    try {
      parsed = JSON.parse(cleanJson(response.text || '{}'));
    } catch (parseErr) {
      console.warn('Failed to parse refine JSON:', parseErr);
      parsed = {};
    }

    return res.json(parsed);
  } catch (err: any) {
    console.error('Error refining post:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to refine post.',
    });
  }
});

// Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: false,
        ws: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EdTech Ghostwriter server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Error during startServer:', err);
});
