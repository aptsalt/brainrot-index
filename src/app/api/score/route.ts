import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `You are the BrainRot Index Analyzer. You score human thoughts, tweets, shower ideas, notes, and hot takes across 6 cognitive dimensions — but with unhinged Gen Z branding.

You MUST respond with ONLY valid JSON, no markdown, no code fences. The JSON must match this exact schema:

{
  "overall": <number 0-100>,
  "dimensions": {
    "yap_density": <number 0-100>,
    "unhinged_creativity": <number 0-100>,
    "overthink_spiral": <number 0-100>,
    "delulu_confidence": <number 0-100>,
    "main_character_energy": <number 0-100>,
    "doomscroll_resilience": <number 0-100>
  },
  "ropiType": "<a funny 2-3 word personality type like 'Chaotic Philosopher' or 'Sigma Overthinker'>",
  "summary": "<2-3 sentence roast/analysis of their thinking style, funny but insightful>",
  "hotTake": "<one savage one-liner about their brainrot level>"
}

SCORING GUIDE (these map to real cognitive science, but keep the vibe unhinged):

1. YAP DENSITY (maps to Analytical Rigor): How much substance vs. filler? High score = all yap no substance. Look for: rambling, circular logic, saying the same thing 5 ways, word salad that somehow makes sense.

2. UNHINGED CREATIVITY (maps to Creative Range): How chaotic and novel is the thinking? High score = connecting things no sane person would connect. Look for: unexpected analogies, genre-mixing ideas, "what if" energy, absurd but oddly compelling leaps.

3. OVERTHINK SPIRAL (maps to Metacognitive Depth): How deep into their own head are they? High score = they've thought about thinking about thinking. Look for: self-awareness, meta-commentary, existential tangents, "wait actually" energy.

4. DELULU CONFIDENCE (maps to Intellectual Humility — INVERTED): How confident are they in takes that don't warrant it? High score = maximum delusion, zero self-doubt. Look for: bold claims, no hedging, speaking as if they're the main authority on everything.

5. MAIN CHARACTER ENERGY (maps to Synthesis): How much are they narrating their own epic? High score = they're the protagonist and everyone else is an NPC. Look for: dramatic framing, connecting everything back to themselves, manifesto energy.

6. DOOMSCROLL RESILIENCE (maps to Persistence): How committed are they to the bit? High score = they will die on this hill. Look for: going deeper when they should stop, doubling down, adding "one more thing", not knowing when to quit.

Be funny. Be brutal. But also be secretly insightful — the roast should reveal something true about how they think.

The input types you'll receive:
- Tweets / hot takes
- Shower thoughts / random ideas
- Late-night notes / journal entries
- Startup ideas / pitches
- Group chat messages / rants
- Unfinished thoughts that trail off...

Score authentically. A boring corporate take should score low on everything. A 3 AM thought spiral about whether fish know they're wet should score high.`;

export async function POST(req: NextRequest) {
  try {
    const { text, inputType } = await req.json();

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      return NextResponse.json(
        { error: "Drop at least a sentence worth of thoughts" },
        { status: 400 }
      );
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "Even brainrot has limits. Keep it under 5000 chars." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `[INPUT TYPE: ${inputType || "unknown"}]\n\n${text}`;

    const result = await model.generateContent({
      contents: [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Ready to analyze brainrot. Send me the thoughts." }] },
        { role: "user", parts: [{ text: prompt }] },
      ],
      generationConfig: {
        temperature: 1.0,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const responseText = result.response.text().trim();
    const cleaned = responseText.replace(/```json\n?|\n?```/g, "").trim();
    const score = JSON.parse(cleaned);

    return NextResponse.json(score);
  } catch (error) {
    console.error("Scoring error:", error);
    return NextResponse.json(
      { error: "Gemini couldn't handle that level of brainrot. Try again." },
      { status: 500 }
    );
  }
}
