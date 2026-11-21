// src/app/tools/case-converter/page.tsx
"use client";

import { useState } from "react";
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

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Conversion Functions
  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());

  const toTitleCase = () => {
    setText(
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
      ),
    );
  };

  const toSentenceCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase()),
    );
  };

  const toCamelCase = () => {
    setText(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()),
    );
  };

  const toPascalCase = () => {
    const camel = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    setText(camel.charAt(0).toUpperCase() + camel.slice(1));
  };

  const toSnakeCase = () => {
    setText(
      text
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        ?.map((x) => x.toLowerCase())
        .join("_") || text.toLowerCase().replace(/\s+/g, "_"),
    );
  };

  const toKebabCase = () => {
    setText(
      text
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        ?.map((x) => x.toLowerCase())
        .join("-") || text.toLowerCase().replace(/\s+/g, "-"),
    );
  };

  const toAlternatingCase = () => {
    setText(
      text
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
        .join(""),
    );
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleClear = () => setText("");

  // Stats
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Case Converter
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Instantly convert text between UPPERCASE, lowercase, Title Case,
                camelCase, and more.
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
                Instant Conversion
              </div>
            </div>

            {/* Tool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              {/* Text Area */}
              <div className="relative mb-6">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type or paste your text here to convert its case..."
                  rows={10}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 text-base resize-y min-h-[250px] pr-20"
                />
                <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium">
                  {words} words • {chars} chars
                </div>
              </div>

              {/* Action Buttons (Copy & Clear) */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleCopy}
                  disabled={!text}
                  className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm flex items-center gap-2 ${
                    copySuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  }`}
                >
                  {copySuccess ? (
                    <>
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
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
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
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                      Copy Text
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  disabled={!text}
                  className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear Text
                </button>
              </div>

              {/* Conversion Grid */}
              <h3 className="text-sm font-bold text-slate-800 mb-4">
                Choose a Case Format:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <button
                  onClick={toUpperCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center"
                >
                  UPPERCASE
                </button>
                <button
                  onClick={toLowerCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center"
                >
                  lowercase
                </button>
                <button
                  onClick={toTitleCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center"
                >
                  Title Case
                </button>
                <button
                  onClick={toSentenceCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center"
                >
                  Sentence case
                </button>
                <button
                  onClick={toCamelCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center font-mono"
                >
                  camelCase
                </button>
                <button
                  onClick={toPascalCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center font-mono"
                >
                  PascalCase
                </button>
                <button
                  onClick={toSnakeCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center font-mono"
                >
                  snake_case
                </button>
                <button
                  onClick={toKebabCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center font-mono"
                >
                  kebab-case
                </button>
                <button
                  onClick={toAlternatingCase}
                  className="px-4 py-3 bg-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all text-center col-span-2 sm:col-span-3 md:col-span-4"
                >
                  aLtErNaTiNg cAsE
                </button>
              </div>
            </div>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Use the Case Converter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Paste Your Text
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Copy text from Word, a website, or an email and paste it
                    into the large text box above.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Click a Format
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Choose from UPPERCASE, Title Case, camelCase, and more. The
                    text updates instantly.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Copy & Use</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Click the blue "Copy Text" button to grab your newly
                    formatted text and paste it anywhere.
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
                    What is the difference between Title Case and Sentence case?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Title Case capitalizes the first letter of every word (e.g.,
                    "The Quick Brown Fox"). Sentence case only capitalizes the
                    first letter of the first word in a sentence (e.g., "The
                    quick brown fox").
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    What is camelCase used for?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    camelCase is primarily used by programmers for naming
                    variables in code (e.g., "myVariableName"). The first word
                    is lowercase, and subsequent words are capitalized.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my text saved when I use this tool?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No. All conversions happen instantly in your web browser. We
                    do not collect, store, or transmit your text to any server.
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
