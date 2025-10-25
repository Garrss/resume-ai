"use client";
import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { FileText, File, Image, X, Upload } from "lucide-react";
import { NextResponse } from "next/server";

interface UploadCVProps {
  onJobsGenerated?: () => void;
}

export default function UploadCV({ onJobsGenerated }: UploadCVProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback((f: File | null) => {
    if (f) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      const fileExtension = f.name.split(".").pop()?.toLowerCase();
      const isAllowedType =
        allowedTypes.includes(f.type) ||
        ["pdf", "doc", "docx", "txt"].includes(fileExtension || "");

      if (!isAllowedType) {
        alert("Please upload a valid file type: PDF, DOC, DOCX, or TXT");
        return;
      }

      // Validate file size (5MB max)
      if (f.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setFile(f);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    handleFiles(f ?? null);
  }

  async function parsePdf() {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("An error occured while processing the PDF");
      }

      const data = await response.json();

      console.log(data);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async function predictRole(pdfParsed: JSON) {
    const predict = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdfParsed),
    });

    const predicted_data = await predict.json();
    console.log(predicted_data);

    return predicted_data.predicted_category
  }

  async function feedbackAI(predicted_category: any, cvText: JSON) {
    const ai = await fetch("/api/feedback", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cvText: cvText,
        predictedRole: predicted_category
      })
    });

    const feedback = await ai.json()

    console.log(feedback)
  }

  function clearFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    // Only set dragging to false if leaving the drop zone
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDragging(false);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        alert("Please upload only one file at a time");
        return;
      }
      handleFiles(files[0]);
    }
  }

  const handleGenerateJobs = async () => {
    if (onJobsGenerated) {
      const parse = await parsePdf();
      const role = await predictRole(parse);
      feedbackAI(role, parse);
      onJobsGenerated();
    }
  };

  // Get file icon based on file type
  const getFileIcon = () => {
    if (!file) return <File className="w-8 h-8" />;

    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      return <FileText className="w-8 h-8 text-red-500" />;
    } else if (
      fileType.includes("word") ||
      fileName.endsWith(".doc") ||
      fileName.endsWith(".docx")
    ) {
      return <FileText className="w-8 h-8 text-blue-500" />;
    } else if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      return <FileText className="w-8 h-8 text-gray-500" />;
    } else {
      return <File className="w-8 h-8 text-gray-400" />;
    }
  };

  // Get file type label
  const getFileType = () => {
    if (!file) return "";

    const fileName = file.name.toLowerCase();
    if (fileName.endsWith(".pdf")) return "PDF";
    if (fileName.endsWith(".doc")) return "DOC";
    if (fileName.endsWith(".docx")) return "DOCX";
    if (fileName.endsWith(".txt")) return "TXT";
    return "File";
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-3 text-center">Upload your CV</h2>

      <div
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.click();
        }}
        className={`w-full border-2 rounded-xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200
          ${
            dragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02] shadow-lg"
              : "border-dashed border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10"
          }
        `}
        aria-label="Drag and drop your CV here or click to select a file"
        onClick={() => inputRef.current?.click()}>
        <input
          ref={inputRef}
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
          className="hidden"
          aria-hidden
        />

        <div
          className={`p-3 rounded-full ${
            dragging
              ? "bg-blue-100 dark:bg-blue-800"
              : "bg-gray-100 dark:bg-neutral-800"
          }`}>
          <Upload
            className={`w-6 h-6 ${
              dragging ? "text-blue-600" : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </div>

        <div className="text-center space-y-2">
          <div className="text-sm text-neutral-600 dark:text-neutral-400">
            {dragging ? (
              <span className="text-blue-600 font-semibold">
                Drop your file here
              </span>
            ) : (
              <>
                <strong>Drag & drop</strong> your file here, or{" "}
                <span className="underline">click to browse</span>
              </>
            )}
          </div>
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Supported formats: PDF, DOC, DOCX, TXT • Max 5MB
          </div>
        </div>
      </div>

      {file && (
        <div className="mt-4 bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">{getFileIcon()}</div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-200 truncate">
                  {file.name}
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                  {getFileType()}
                </span>
              </div>
              <div className="text-left text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {(file.size / 1024).toFixed(0)} KB •{" "}
                {new Date().toLocaleDateString()}
              </div>
            </div>

            <button
              type="button"
              onClick={clearFile}
              className="flex-shrink-0 p-1 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-full transition-colors"
              aria-label="Remove file">
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              onClick={handleGenerateJobs}
              className="w-full text-base sm:text-sm px-6 py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md hover:shadow-lg"
              aria-label="Generate job suggestions">
              Generate jobs ⚡
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
