import { CanvasFactory } from "pdf-parse/worker";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "PDF file not found" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();

    //parse PDF
    const parser = new PDFParse({ data: arrayBuffer, CanvasFactory });
    const data = await parser.getText();
    await parser.destroy();
    return NextResponse.json({
      text: data.text,
    });
  } catch (error) {
    console.error("PDF parse error:", error);
    return NextResponse.json(
      { error: "An error occured while processing the PDF" },
      { status: 500 }
    );
  }
}
