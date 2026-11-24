// src/app/tools/compress-pdf/page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { PDFDocument, PDFRawStream, PDFName, PDFNumber } from "pdf-lib";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ Standardized RELATED_TOOLS array (Matches Master Template)
const RELATED_TOOLS = [
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
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine multiple PDF files.",
    icon: "📑",
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

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<
    "light" | "balanced" | "strong"
  >("balanced");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [noReduction, setNoReduction] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setDownloadUrl(null);
    setNoReduction(false);
    setCompressedSize(0);

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Please select a valid PDF file.");
        setFile(null);
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError("File size exceeds 50MB. Please choose a smaller PDF.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setError("");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError("");
    setDownloadUrl(null);
    setNoReduction(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, {
        ignoreEncryption: true,
      });

      // Strip hidden metadata — each call separate, no chaining
      try {
        pdfDoc.setTitle("");
      } catch {}
      try {
        pdfDoc.setAuthor("");
      } catch {}
      try {
        pdfDoc.setSubject("");
      } catch {}
      try {
        pdfDoc.setKeywords([]);
      } catch {}
      try {
        pdfDoc.setProducer("");
      } catch {}
      try {
        pdfDoc.setCreator("");
      } catch {}

      // Re-compress embedded JPEG images — this is where the real savings come from
      const quality =
        compressionLevel === "strong"
          ? 0.45
          : compressionLevel === "light"
            ? 0.85
            : 0.7;
      const context = pdfDoc.context;
      const imageStreams: PDFRawStream[] = [];

      context.enumerateIndirectObjects().forEach(([, obj]) => {
        if (obj instanceof PDFRawStream) {
          const subtype = obj.dict.get(PDFName.of("Subtype"))?.toString();
          if (subtype === "/Image") imageStreams.push(obj);
        }
      });

      for (const stream of imageStreams) {
        try {
          // Skip images with transparency masks so we don't break them
          if (stream.dict.has(PDFName.of("SMask"))) continue;

          const originalBytes = stream.contents;
          // ✅ Blob fix: Uint8Array -> ArrayBuffer
          const blob = new Blob([originalBytes.buffer as ArrayBuffer], {
            type: "image/jpeg",
          });

          // Try to decode the image; if it's not a standard JPEG, skip it
          let bmp: ImageBitmap;
          try {
            bmp = await createImageBitmap(blob);
          } catch {
            continue;
          }

          const canvas = document.createElement("canvas");
          canvas.width = bmp.width;
          canvas.height = bmp.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          ctx.drawImage(bmp, 0, 0);

          const jpegBlob = await new Promise<Blob | null>((res) =>
            canvas.toBlob(res, "image/jpeg", quality),
          );
          if (!jpegBlob) continue;

          const newBytes = new Uint8Array(await jpegBlob.arrayBuffer());

          // ✅ ONLY ONE if block now — no duplicate, no stray comment
          if (newBytes.length < originalBytes.length) {
            // ✅ readonly bypass via cast
            (stream as any).contents = newBytes;
            stream.dict.set(PDFName.of("Filter"), PDFName.of("DCTDecode"));
            stream.dict.set(PDFName.of("Width"), PDFNumber.of(bmp.width));
            stream.dict.set(PDFName.of("Height"), PDFNumber.of(bmp.height));
            stream.dict.set(PDFName.of("ColorSpace"), PDFName.of("DeviceRGB"));
            stream.dict.set(PDFName.of("BitsPerComponent"), PDFNumber.of(8));
            ["DecodeParms", "Decode", "Interpolate"].forEach((key) =>
              stream.dict.delete(PDFName.of(key)),
            );
          }
        } catch {
          // If a single image fails, leave it untouched and continue
        }
      }

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // ✅ Blob fix: Uint8Array -> ArrayBuffer
      const compressedBlob = new Blob([compressedBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(compressedBlob);

      setCompressedSize(compressedBytes.length);

      // If we saved less than 1%, the file was already optimized
      const saved = originalSize - compressedBytes.length;
      if (saved <= originalSize * 0.01) {
        setNoReduction(true);
      } else {
        setDownloadUrl(url);
      }
    } catch (err) {
      console.error("Compression error:", err);
      setError(
        "Failed to process the PDF. The file might be corrupted or heavily encrypted.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const reductionPercentage =
    originalSize > 0
      ? Math.max(
          0,
          ((originalSize - compressedSize) / originalSize) * 100,
        ).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Compress PDF
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Reduce your PDF file size instantly by re-compressing images and
                removing hidden data — securely in your browser.
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Real Image Compression
              </div>
            </div>

            {/* Tool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Upload your PDF file
                  </label>
                  <div
                    className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <svg
                      className="w-12 h-12 text-slate-400 mx-auto mb-3"
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
                    <p className="text-slate-700 font-medium mb-1">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-slate-500 text-sm">
                      PDF files up to 50MB
                    </p>
                    <p className="text-xs text-emerald-600 font-medium mt-3">
                      🔒 Your files are processed 100% in your browser and never
                      uploaded to any server.
                    </p>
                  </div>
                </div>

                {/* Compression Level */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Compression level
                  </label>
                  <select
                    value={compressionLevel}
                    onChange={(e) =>
                      setCompressionLevel(
                        e.target.value as typeof compressionLevel,
                      )
                    }
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 bg-white"
                  >
                    <option value="light">
                      Light — best quality (smaller reduction)
                    </option>
                    <option value="balanced">Balanced — recommended</option>
                    <option value="strong">
                      Strong — smallest file (lower image quality)
                    </option>
                  </select>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium text-sm">
                    {error}
                  </div>
                )}

                <button
                  onClick={handleCompress}
                  disabled={!file || isProcessing}
                  className="w-full px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-md shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none text-base flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Compressing PDF...
                    </>
                  ) : (
                    "Compress PDF"
                  )}
                </button>
              </div>
            </div>

            {/* Success Result */}
            {downloadUrl && (
              <div className="mb-12">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg
                      className="w-6 h-6 text-emerald-600"
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
                    <h3 className="text-lg font-bold text-emerald-900">
                      Compression Successful!
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                        Original Size
                      </p>
                      <p className="text-xl font-bold text-slate-800">
                        {formatSize(originalSize)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                        New Size
                      </p>
                      <p className="text-xl font-bold text-emerald-700">
                        {formatSize(compressedSize)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-emerald-200 text-center">
                      <p className="text-xs text-slate-500 uppercase font-semibold mb-1">
                        Reduced By
                      </p>
                      <p className="text-xl font-bold text-emerald-700">
                        {reductionPercentage}%
                      </p>
                    </div>
                  </div>
                  <a
                    href={downloadUrl}
                    download={`compressed_${file?.name || "document.pdf"}`}
                    className="block w-full text-center px-8 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
                  >
                    Download Compressed PDF
                  </a>
                  <p className="text-xs text-emerald-700 text-center mt-3 opacity-80">
                    Your file was processed entirely in your browser. It was
                    never uploaded to any server.
                  </p>
                </div>
              </div>
            )}

            {/* Already-Optimized Result */}
            {noReduction && !downloadUrl && (
              <div className="mb-12">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="text-lg font-bold text-amber-900">
                      Your PDF is already well-optimized
                    </h3>
                  </div>
                  <p className="text-amber-800 text-sm leading-relaxed">
                    We couldn't reduce the size further because this file
                    contains little or no compressible image data (it's mostly
                    text or already optimized). Try the <strong>Strong</strong>{" "}
                    compression level, or upload a PDF that contains large
                    images for a noticeable reduction.
                  </p>
                </div>
              </div>
            )}

            {/* How to Use Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Use the PDF Compressor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Upload Your PDF
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Click the upload box or drag and drop your PDF file. We
                    support files up to 50MB.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Choose Level & Compress
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Pick Light, Balanced, or Strong, then click "Compress PDF".
                    Images are re-encoded right in your browser.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Download & Share
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Review the size reduction stats and download your newly
                    optimized, smaller PDF file.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my PDF data safe and private?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Absolutely. This tool runs 100% in your browser. Your PDF is
                    never uploaded to our servers or any third party — images
                    are re-compressed locally using the Canvas API.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Why didn't my file shrink much?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    The biggest savings come from re-compressing embedded
                    images. If your PDF is mostly text or scans that are already
                    optimized, the reduction will be small. Try the "Strong"
                    level, or use this tool on PDFs containing large photos.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is this tool really free?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes, Toolbox is 100% free to use. There are no hidden fees,
                    watermarks, or limits on how many PDFs you can compress.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore More Tools Section */}
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
