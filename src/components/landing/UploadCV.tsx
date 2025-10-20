"use client";
import React, { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UploadCV() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback((f: File | null) => {
    if (f) setFile(f);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0];
    handleFiles(f ?? null);
  }

  function clearFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragging(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFiles(f ?? null);
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-3 text-center">Upload your CV</h2>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.click();
        }}
        className={`w-full border-2 rounded-md p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors
          ${dragging ? "border-blue-500 bg-blue-50" : "border-dashed border-neutral-300 bg-white dark:bg-neutral-900"}
        `}
        aria-label="Drag and drop your CV here or click to select a file"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleChange}
          className="hidden"
          aria-hidden
        />

        <div className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          <strong>Drag & drop</strong> your file here, or <span className="underline">click to browse</span>
        </div>
        <div className="text-xs text-neutral-500">Accepted: .pdf .doc .docx .txt</div>
      </div>

      {file && (
        <div className="mt-3 bg-gray-50 dark:bg-neutral-900 p-3 rounded-md">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-neutral-700 dark:text-neutral-200">
              <div className="font-medium">{file.name}</div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {(file.size / 1024).toFixed(0)} KB • {file.type || "unknown"}
              </div>
            </div>

            <button
              type="button"
              onClick={clearFile}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>

          <div className="mt-3">
            <Button
              type="button"
              onClick={() => {
        toast.success("Job generated successfully", {
          style: {
            background: "#ECFDF5",
            color: "#166534",
            border: "1px solid #86EFAC",
          },
        });
        router.push("/jobs");
      }}
              className="w-full text-base sm:text-sm px-6 py-3 rounded-lg font-semibold"
              aria-label="Generate job suggestions"
            >
              Generate jobs ✨
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}