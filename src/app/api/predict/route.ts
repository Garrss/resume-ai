import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        if (!data) {
            return NextResponse.json(
                {error: "Parsing didnt work"},
                {status: 400}
            );
        }
        

       const predict = await fetch(process.env.PREDICT_API!, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
       });

       const predicted = await predict.json()

        return NextResponse.json(predicted);
    } catch (err) {
        console.error(err);
        console.error("PDF parse error:", err);
        return NextResponse.json(
          { error: err },
          { status: 500 }
        );
    }
}