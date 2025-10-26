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
      model: "deepseek/deepseek-r1-distill-llama-70b:free",
      messages: [
        {
          role: "system",
          content: `
You are a professional CV reviewer and career advisor. 
You analyze resumes for alignment with specific job roles and provide *clear, structured, and example-driven* feedback.

Your output **must** be organized into clear bullet or numbered points.  
Use concise language, bold key terms, and practical examples.

Format your response exactly like this:

---

## 🔍 Overall Assessment
- (1–2 concise bullet points summarizing the CV’s general quality and relevance to the target role.)

## ⚙️ Detailed, Actionable Improvements
1. **(Area of improvement)**  
   - **Current:** (brief excerpt or issue)  
   - **Improved:** (specific, improved version that fits the target role)

2. **(Next improvement area)**  
   - **Current:** (description)  
   - **Improved:** (description)

3. **(Continue up to 5 total points)**

## 📊 Optional Skill Evaluation
- **Technical Skills:** X/10  
- **Experience Relevance:** X/10  
- **Presentation & Clarity:** X/10  
- **Overall Readiness:** X/10

## ✅ Summary of Readiness
- (One short line stating readiness level: *Strong fit*, *Moderate improvement needed*, or *Significant improvement needed*.)
- (Follow with a brief supporting explanation.)

---

Keep your tone **professional, constructive, and tailored** to the provided role.
Always include clear examples instead of vague advice.
Avoid generic praise; focus on **measurable and realistic** ways to improve.
    `,
        },
        {
          role: "user",
          content: `
Analyze this CV for a **${predictedRole}** position.

CV content:
${JSON.stringify(cvText)}

Make sure to:
- Use bullet or numbered points.
- Follow the formatting above exactly.
- Include short examples for each improvement.
- Keep it concise but actionable.
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
