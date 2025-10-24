import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function GET(req: NextRequest) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: "Explain the importance of fast language models.",
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
