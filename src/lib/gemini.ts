import { GoogleGenerativeAI } from "@google/generative-ai";
import { ParseResponse, CompatibilityScore } from "./types";

const GEMINI_MODEL =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_TIMEOUT_MS = 30_000;

type GeminiTextResult = {
  response: {
    text: () => string;
  };
};

function getGeminiApiKey(): string {
  const key =
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
      ?.GEMINI_API_KEY;

  if (!key) {
    throw new Error(
      "Missing GEMINI_API_KEY. Add it to .env.local for local development and Vercel Environment Variables for deployment."
    );
  }

  return key;
}

function getClient(): GoogleGenerativeAI {
  return new GoogleGenerativeAI(getGeminiApiKey());
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(new Error(`Gemini request timed out after ${ms}ms`));
      }, ms);
    });

    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle);
  }
}

function getModel() {
  return getClient().getGenerativeModel({ model: GEMINI_MODEL });
}

export async function parsePost(
  rawNeed: string,
  rawOffer: string
): Promise<ParseResponse> {
  const model = getModel();

  const prompt = `You are a structured data extraction agent for a barter/exchange platform called Naibour.

Given a user's description of what they NEED and what they OFFER, extract structured data.

User says they NEED: "${rawNeed}"
User says they OFFER: "${rawOffer}"

Respond with ONLY valid JSON matching this exact schema (no markdown, no code fences):
{
  "offers": [{"skill": "short description", "category": "one of: finance, education, home services, pet care, technology, creative services, food services, fitness, maintenance, language services, elder care, other", "availability": "optional timing info or null"}],
  "needs": [{"skill": "short description", "category": "same categories as above", "availability": "optional timing info or null"}],
  "confidence": 0.0 to 1.0
}

Rules:
- Extract ALL distinct skills/services mentioned
- Use concise, normalized skill names
- confidence = how clearly the user expressed their needs/offers (1.0 = very clear)
- If something is ambiguous, still extract your best guess but lower the confidence`;

  try {
    const result = (await withTimeout(
      model.generateContent(prompt),
      GEMINI_TIMEOUT_MS
    )) as GeminiTextResult;
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as ParseResponse;

    // Schema validation
    if (!Array.isArray(parsed.offers) || !Array.isArray(parsed.needs)) {
      throw new Error("Invalid schema: offers and needs must be arrays");
    }
    if (typeof parsed.confidence !== "number" || parsed.confidence < 0 || parsed.confidence > 1) {
      parsed.confidence = 0.5;
    }

    return parsed;
  } catch (error) {
    // Retry once on failure
    try {
      const result = (await withTimeout(
        model.generateContent(prompt + "\n\nIMPORTANT: Respond with ONLY valid JSON. No explanation, no markdown."),
        GEMINI_TIMEOUT_MS
      )) as GeminiTextResult;
      const text = result.response.text().trim();
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      return JSON.parse(cleaned) as ParseResponse;
    } catch {
      console.error("Gemini parse failed after retry:", error);
      return {
        offers: [{ skill: rawOffer, category: "other" }],
        needs: [{ skill: rawNeed, category: "other" }],
        confidence: 0.3,
      };
    }
  }
}

export async function scoreCompatibility(
  offer: string,
  offerCategory: string,
  need: string,
  needCategory: string
): Promise<CompatibilityScore> {
  const model = getModel();

  const prompt = `You are a matching agent for a barter/exchange platform. Determine whether an OFFER can fulfill a NEED.

OFFER: "${offer}" (category: ${offerCategory})
NEED: "${need}" (category: ${needCategory})

Respond with ONLY valid JSON (no markdown, no code fences):
{
  "score": 0.0 to 1.0,
  "reasoning": "one sentence explaining why this is or isn't a good match",
  "offerSkill": "${offer}",
  "needSkill": "${need}"
}

Scoring guide:
- 1.0 = exact same service (e.g. "dog walking" matches "dog walking")
- 0.8 = same service, minor wording difference (e.g. "apartment cleaning" matches "deep cleaning")
- 0.6 = closely related, could reasonably substitute (e.g. "math tutoring" matches "calculus tutoring")
- 0.3 = same broad domain but different specialization (e.g. "plumbing" vs "electrical work")
- 0.0 = unrelated, even if they share a word (e.g. "guitar lessons" vs "golf lessons" — different subjects, score 0)

Key rule: The SUBJECT MATTER must match. Shared format words like "lessons", "repair", "tutoring" do not make a match — the actual skill must be the same or very similar.`;

  try {
    const result = (await withTimeout(
      model.generateContent(prompt),
      GEMINI_TIMEOUT_MS
    )) as GeminiTextResult;
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as CompatibilityScore;

    if (typeof parsed.score !== "number") parsed.score = 0;
    if (parsed.score < 0) parsed.score = 0;
    if (parsed.score > 1) parsed.score = 1;

    return parsed;
  } catch {
    return {
      score: 0,
      reasoning: "Failed to evaluate compatibility",
      offerSkill: offer,
      needSkill: need,
    };
  }
}

export async function batchScoreCompatibility(
  pairs: Array<{
    fromUserId: string;
    toUserId: string;
    offer: string;
    offerCategory: string;
    need: string;
    needCategory: string;
  }>
): Promise<
  Array<{
    fromUserId: string;
    toUserId: string;
    score: number;
    reasoning: string;
    offerSkill: string;
    needSkill: string;
  }>
> {
  const model = getModel();

  const pairsDescription = pairs
    .map(
      (p, i) =>
        `${i}: OFFER="${p.offer}" (${p.offerCategory}) → NEED="${p.need}" (${p.needCategory})`
    )
    .join("\n");

  const prompt = `You are a matching agent for a barter/exchange platform. For each pair, determine whether the OFFER can fulfill the NEED.

Pairs to evaluate:
${pairsDescription}

Respond with ONLY a valid JSON array (no markdown, no code fences):
[
  {"index": 0, "score": 0.0 to 1.0, "reasoning": "one sentence explanation"},
  ...
]

Scoring guide:
- 1.0 = exact same service (e.g. "dog walking" matches "dog walking")
- 0.8 = same service, minor wording difference (e.g. "apartment cleaning" matches "deep cleaning")
- 0.6 = closely related, could reasonably substitute (e.g. "math tutoring" matches "calculus tutoring")
- 0.3 = same broad domain but different specialization (e.g. "plumbing" vs "electrical work")
- 0.0 = unrelated, even if they share a word (e.g. "guitar lessons" vs "golf lessons" — different subjects, score 0)

Key rule: The SUBJECT MATTER must match. Shared format words like "lessons", "repair", "tutoring" do not make a match — the actual skill must be the same or very similar.`;

  try {
    const result = (await withTimeout(
      model.generateContent(prompt),
      GEMINI_TIMEOUT_MS
    )) as GeminiTextResult;
    const text = result.response.text().trim();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned) as Array<{
      index: number;
      score: number;
      reasoning: string;
    }>;

    return pairs.map((p, i) => {
      const match = parsed.find((r) => r.index === i);
      return {
        fromUserId: p.fromUserId,
        toUserId: p.toUserId,
        score: match?.score ?? 0,
        reasoning: match?.reasoning ?? "No evaluation available",
        offerSkill: p.offer,
        needSkill: p.need,
      };
    });
  } catch {
    return pairs.map((p) => ({
      fromUserId: p.fromUserId,
      toUserId: p.toUserId,
      score: 0,
      reasoning: "Batch evaluation failed",
      offerSkill: p.offer,
      needSkill: p.need,
    }));
  }
}
