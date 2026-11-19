// src/app/tools/image-compressor/page.tsx
"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RELATED_TOOLS = [
  {
    id: "word-unscrambler",
    title: "Word Unscrambler",
    description: "Find words from letters.",
    icon: "🔤",
  },
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files.",
    icon: "📑",
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
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes.",
    icon: "📱",
  },
  {
    id: "lorem-ipsum",
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text.",
    icon: "📄",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Create shorter links.",
    icon: "🔗",
  },
  {
    id: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Create SEO meta tags.",
    icon: "🏷️",
  },
];

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function ImageCompressor() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState(80);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAlreadyOptimized, setIsAlreadyOptimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const compressImage = useCallback(
    async (file: File, currentQuality: number) => {
      setIsProcessing(true);
      setCompressedUrl(null);
      setIsAlreadyOptimized(false);

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);

            // Determine output format based on original
            const isPng = file.type === "image/png";
            const outputType = isPng ? "image/png" : "image/jpeg";

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  setCompressedSize(blob.size);
                  setCompressedUrl(URL.createObjectURL(blob));

                  // Smart check: if compressed is larger than original, flag it
                  if (blob.size >= file.size) {
                    setIsAlreadyOptimized(true);
                  }
                }
                setIsProcessing(false);
              },
              outputType,
              isPng ? undefined : currentQuality / 100,
            );
          } else {
            setIsProcessing(false);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    [],
  );

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file);
      compressImage(file, quality);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuality = Number(e.target.value);
    setQuality(newQuality);
    if (originalFile) {
      compressImage(originalFile, newQuality);
    }
  };

  const handleDownload = () => {
    if (!originalFile) return;

    const link = document.createElement("a");
    const originalName = originalFile.name.replace(/\.[^/.]+$/, "");

    // If compressed is larger, download the original instead
    if (isAlreadyOptimized) {
      link.href = URL.createObjectURL(originalFile);
      link.download = originalFile.name;
    } else {
      if (!compressedUrl) return;
      link.href = compressedUrl;
      const ext = originalFile.type === "image/png" ? "png" : "jpg";
      link.download = `${originalName}-compressed.${ext}`;
    }

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalFile(null);
    setCompressedUrl(null);
    setCompressedSize(0);
    setIsAlreadyOptimized(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const savings = originalFile
    ? Math.round(
        ((originalFile.size - compressedSize) / originalFile.size) * 100,
      )
    : 0;
  const isLarger = originalFile ? compressedSize > originalFile.size : false;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          

          <main className="min-w-0">
            

            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Image Compressor
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Reduce image file sizes instantly without losing quality. 100%
                private and runs in your browser.
              </p>
            </div>

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
                Privacy-First (Runs in Browser)
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
                Instant Compression
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              {!originalFile ? (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <svg
                    className="w-16 h-16 mx-auto text-blue-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <p className="text-slate-700 font-semibold text-lg mb-1">
                    Drag & drop your image here
                  </p>
                  <p className="text-slate-500 text-sm">
                    or{" "}
                    <span className="text-blue-600 font-medium">
                      browse from your computer
                    </span>
                  </p>
                  <p className="text-slate-400 text-xs mt-4">
                    Supports JPG, PNG, WEBP
                  </p>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0])
                        handleFileSelect(e.target.files[0]);
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 truncate pr-4">
                      {originalFile.name}
                    </h3>
                    <button
                      onClick={handleReset}
                      className="text-sm font-medium text-red-600 hover:text-red-700 shrink-0"
                    >
                      Start Over
                    </button>
                  </div>

                  {/* Smart Warning Banner */}
                  {isAlreadyOptimized && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-amber-900">
                          This image is already optimized!
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Your image ({formatBytes(originalFile.size)}) is
                          already smaller than what our compressor would
                          produce. We'll give you the original file when you
                          click download — no quality loss, no unnecessary
                          re-encoding.
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-slate-800">
                        Compression Quality
                      </label>
                      <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                        {quality}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={quality}
                      onChange={handleQualityChange}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Smallest File</span>
                      <span>Best Quality</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-xl border border-slate-200">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                        Original Size
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        {formatBytes(originalFile.size)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                        Compressed Size
                      </p>
                      <p
                        className={`text-xl font-bold ${isLarger ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {isProcessing ? "..." : formatBytes(compressedSize)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">
                        Savings
                      </p>
                      <p
                        className={`text-xl font-bold ${isLarger ? "text-amber-600" : savings > 0 ? "text-emerald-600" : "text-slate-600"}`}
                      >
                        {isProcessing
                          ? "..."
                          : isLarger
                            ? "Already optimized"
                            : `${savings}%`}
                      </p>
                    </div>
                  </div>

                  {compressedUrl && !isAlreadyOptimized && (
                    <div className="flex justify-center">
                      <img
                        src={compressedUrl}
                        alt="Compressed Preview"
                        className="max-h-64 rounded-lg border border-slate-200 shadow-sm"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleDownload}
                    disabled={isProcessing}
                    className="w-full px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-md shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none text-base flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      "Compressing..."
                    ) : isAlreadyOptimized ? (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          ></path>
                        </svg>
                        Download Original (Already Optimized)
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          ></path>
                        </svg>
                        Download Compressed Image
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Compress Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Upload Image
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Drag and drop your JPG or PNG image into the box, or click
                    to browse your files.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Adjust Quality
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Use the slider to balance file size and image quality. Watch
                    the savings update instantly.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Download</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Click the download button to save your optimized image.
                    Perfect for faster websites.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my image uploaded to a server?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No. Toolbox uses your browser's built-in Canvas API to
                    compress images locally. Your photos never leave your
                    device, ensuring 100% privacy.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    What quality setting should I use?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    For web use (blogs, social media), 70-80% is usually
                    perfect. It drastically reduces file size with almost no
                    visible loss in quality. For printing, use 90-100%.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Why is my compressed file sometimes larger?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If your image is already highly optimized (like photos from
                    WhatsApp or stock sites), re-encoding can make it slightly
                    larger. Our tool detects this and gives you the original
                    file instead — no unnecessary processing.
                  </p>
                </div>
              </div>
            </section>

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
