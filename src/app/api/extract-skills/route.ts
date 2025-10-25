import OpenAI from "openai";
import { NextResponse } from "next/server";

const llmClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(request: Request) {
  try {
    const cvText = await request.json();

    const completion = await llmClient.chat.completions.create({
     model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "system",
          content: `You are a CV analyzer. Extract ALL relevant skills from the CV and return ONLY a JSON array of skills.

Format: ["skill1", "skill2", "skill3", ...]

Include:
- Technical skills (programming languages, frameworks, tools)
- Soft skills (leadership, communication, etc.)
- Domain knowledge
- Certifications

Return ONLY the JSON array, nothing else.`,
        },
        {
          role: "user",
          content: `Extract all skills from this CV:\n\n${JSON.stringify(cvText)}`,
        },
      ],
    });

    const extractedData = completion.choices[0].message.content;
    console.log("LLM extracted skills:", extractedData);

    let skills: string[] = [];
    try {
      skills = JSON.parse(extractedData || "[]");

      // Ensure it's an array
      if (!Array.isArray(skills)) {
        skills = [];
      }
    } catch (e) {
      console.error("Failed to parse skills, using empty array");
      skills = [];
    }

    return NextResponse.json(skills);
  } catch (error: any) {
    console.error("Extraction Error:", error);
    return NextResponse.json(
      { error: error.message, skills: [] },
      { status: 500 }
    );
  }
}
