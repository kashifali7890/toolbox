// src/app/tools/merge-pdf/page.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PDFDocument } from "pdf-lib";

const RELATED_TOOLS = [
  {
    id: "word-unscrambler",
    title: "Word Unscrambler",
    description: "Find words from letters.",
    icon: "🔤",
  },
  {
    id: "word-counter",
    title: "Word Counter",
    description: "Count words and characters.",
    icon: "📝",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Change text case easily.",
    icon: "🔠",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Create secure passwords.",
    icon: "🔒",
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text.",
    icon: "📄",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce image file sizes.",
    icon: "🖼️",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes.",
    icon: "📱",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Create shorter links.",
    icon: "🔗",
  },
];

type PdfFile = { id: string; file: File; pages: number };

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

export default function MergePDF() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputName, setOutputName] = useState("merged");
  const [totalPages, setTotalPages] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (list: FileList | File[]) => {
    setError("");
    setOutputUrl(null);
    const incoming = Array.from(list).filter(
      (f) =>
        f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf"),
    );
    if (incoming.length === 0) {
      setError("Please select valid PDF files only.");
      return;
    }
    const newItems: PdfFile[] = [];
    for (const file of incoming) {
      let pages = 0;
      try {
        const bytes = await file.arrayBuffer();
        const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
        pages = doc.getPageCount();
      } catch {
        pages = 0;
      }
      newItems.push({ id: crypto.randomUUID(), file, pages });
    }
    setFiles((prev) => [...prev, ...newItems]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setOutputUrl(null);
  };

  const clearAll = () => {
    setFiles([]);
    setOutputUrl(null);
    setError("");
    setTotalPages(0);
  };

  const moveFile = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= files.length) return;
    const copy = [...files];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setFiles(copy);
    setOutputUrl(null);
  };

  const handleMerge = async () => {
    setError("");
    setOutputUrl(null);
    if (files.length < 1) {
      setError("Please add at least 1 PDF file to merge.");
      return;
    }
    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      let pageCount = 0;
      for (const f of files) {
        const bytes = await f.file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const copied = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copied.forEach((p) => mergedPdf.addPage(p));
        pageCount += pdf.getPageCount();
      }
      // ✅ FIX 1: was "pdfDoc.save()" — that variable never existed
      const pdfBytes = await mergedPdf.save();
      // ✅ FIX 2: .buffer as ArrayBuffer satisfies TypeScript's Blob typing
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      setTotalPages(pageCount);
      setOutputUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(
        "Merge failed. One of the files may be corrupted or password-protected.",
      );
    } finally {
      setIsMerging(false);
    }
  };

  // ✅ PROFESSIONAL "SAVE AS" DOWNLOAD FUNCTION
  const download = async () => {
    if (!outputUrl) return;
    const fileName = `${outputName.trim() || "merged"}.pdf`;

    // 1. Try the modern, professional "Save As" dialog first (Chrome, Edge, Opera)
    if ("showSaveFilePicker" in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [
            {
              description: "PDF Document",
              accept: { "application/pdf": [".pdf"] },
            },
          ],
        });

        const writable = await handle.createWritable();
        const response = await fetch(outputUrl);
        const blob = await response.blob();
        await writable.write(blob);
        await writable.close();
        return; // Successfully saved, exit function
      } catch (err: any) {
        if (err.name === "AbortError") return; // User clicked "Cancel" on the save dialog
        console.warn(
          "Save picker failed, falling back to standard download",
          err,
        );
      }
    }

    // 2. Fallback for Firefox, Safari, or older browsers
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = fileName;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Merge PDF
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Combine multiple PDF files into one document. Fast, free, and
                100% private.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                100% Free
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                No Sign-up Required
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 shadow-sm">
                <svg
                  className="w-4 h-4 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                Files Never Leave Your Device
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-700 shadow-sm">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Unlimited Merges
              </div>
            </div>

            {/* Tool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  addFiles(e.dataTransfer.files);
                }}
                onClick={() => inputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                <svg
                  className="w-12 h-12 mx-auto text-blue-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-slate-700 font-semibold text-lg mb-1">
                  Drag & drop your PDF files here
                </p>
                <p className="text-slate-500 text-sm">
                  or{" "}
                  <span className="text-blue-600 font-medium">
                    browse from your computer
                  </span>
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {files.length} file{files.length > 1 ? "s" : ""} selected
                    </h3>
                    <button
                      onClick={clearAll}
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Clear all
                    </button>
                  </div>
                  {files.map((f, index) => (
                    <div
                      key={f.id}
                      className="flex items-center gap-3 bg-gray-50 border border-slate-200 rounded-lg p-3"
                    >
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                        PDF
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {f.file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatBytes(f.file.size)}{" "}
                          {f.pages > 0
                            ? `• ${f.pages} page${f.pages > 1 ? "s" : ""}`
                            : ""}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => moveFile(index, -1)}
                          disabled={index === 0}
                          className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                          title="Move up"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => moveFile(index, 1)}
                          disabled={index === files.length - 1}
                          className="p-1.5 rounded hover:bg-slate-200 disabled:opacity-30 text-slate-600"
                          title="Move down"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFile(f.id)}
                          className="p-1.5 rounded hover:bg-red-100 text-red-600"
                          title="Remove"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-6 font-medium text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleMerge}
                disabled={files.length < 1 || isMerging}
                className="mt-6 w-full px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-md shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none text-base"
              >
                {isMerging ? "Merging..." : "Merge PDF Files"}
              </button>
            </div>

            {/* Result */}
            {outputUrl && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Your PDF is ready!
                    </h3>
                    <p className="text-sm text-slate-600">
                      Combined {files.length} files • {totalPages} pages
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={outputName}
                    onChange={(e) => setOutputName(e.target.value)}
                    className="flex-grow px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                    placeholder="File name"
                  />
                  <button
                    onClick={download}
                    className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            )}

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Merge PDF Files
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Add Your PDFs
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Drag and drop multiple PDF files into the box, or click to
                    browse your computer.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Arrange the Order
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Use the up and down arrows to set the exact order your files
                    will be merged in.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Merge & Download
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Click Merge and download your single combined PDF instantly.
                    No uploads, no waiting.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Are my files uploaded to a server?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No. Toolbox runs entirely in your browser using pdf-lib.
                    Your PDF files never leave your device, making this one of
                    the most private merge tools available.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is there a limit on file size or number?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    There are no hard limits. However, since merging happens in
                    your browser, very large files (hundreds of MB) may be
                    limited by your device's available memory.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Can I merge password-protected PDFs?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    PDFs that are fully encrypted with a password cannot be
                    merged until unlocked. Standard PDFs merge perfectly with no
                    sign-up or cost.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore More Tools */}
            <section className="mb-8 border-t border-slate-200 pt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Explore More Tools
                </h2>
                <Link
                  href="/"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  View All Tools
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {RELATED_TOOLS.map((tool) => (
                  <Link
                    href={`/tools/${tool.id}`}
                    key={tool.id}
                    className="block group"
                  >
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all h-full">
                      <div className="text-2xl mb-3">{tool.icon}</div>
                      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
