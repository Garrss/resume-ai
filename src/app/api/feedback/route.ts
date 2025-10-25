import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const body = await req.json();
  const { cvText, predictedRole } = body;

  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  try {
    const response = await openai.chat.completions.create({
      model: "qwen/qwen-2.5-72b-instruct:free",
      messages: [
        {
          role: "system",
          content: `
You are a professional career advisor and expert CV analyzer. 
Your goal is to provide detailed, structured, and highly relevant feedback on the user's CV for the given role. 
Use your expertise in recruitment, hiring, and resume optimization to:
1. Evaluate the CV’s strengths and weaknesses for the target role.
2. Suggest **3–5 specific, actionable improvements** that can realistically enhance the candidate’s chances.
3. Ensure your feedback is **tailored** to the given job title and industry.
4. Keep the tone constructive, professional, and encouraging.
Your response must be clear and formatted in sections with bullet points or numbered lists where helpful.
    `,
        },
        {
          role: "user",
          content: `
Analyze this CV for a **${predictedRole}** position.

CV content:
${cvText}

Provide:
- A brief overall assessment (1–2 sentences)
- 3–5 detailed, actionable improvements
- Optional: One sentence summary of how ready this CV is for the role (e.g. "Strong fit", "Needs moderate improvement")
    `,
        },
      ],
    });

    return NextResponse.json({
      feedback: response.choices[0]?.message?.content,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: error.message,
        details: error.response?.data || error.toString(),
      },
      { status: 500 }
    );
  }
}
