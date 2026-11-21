// src/app/tools/word-counter/page.tsx
"use client";

import { useState, useMemo } from "react";
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

export default function WordCounter() {
  const [text, setText] = useState("");

  // Calculate all stats in real-time using useMemo for performance
  const stats = useMemo(() => {
    const trimmedText = text.trim();

    // 1. Words
    const words = trimmedText === "" ? 0 : trimmedText.split(/\s+/).length;

    // 2. Characters
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    // 3. Sentences (Split by . ! ?)
    const sentences =
      trimmedText === ""
        ? 0
        : trimmedText.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;

    // 4. Paragraphs (Split by newlines)
    const paragraphs =
      trimmedText === ""
        ? 0
        : trimmedText.split(/\n+/).filter((p) => p.trim().length > 0).length;

    // 5. Reading & Speaking Time
    const readingTime = Math.ceil(words / 200); // Avg 200 wpm
    const speakingTime = Math.ceil(words / 130); // Avg 130 wpm

    // 6. Keyword Density (Top 5 words)
    const wordMap: Record<string, number> = {};
    if (trimmedText !== "") {
      const wordsArray =
        trimmedText.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
      wordsArray.forEach((word) => {
        // Ignore very short common words for density
        if (word.length > 2) {
          wordMap[word] = (wordMap[word] || 0) + 1;
        }
      });
    }
    const topKeywords = Object.entries(wordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        density: words > 0 ? ((count / words) * 100).toFixed(1) : "0",
      }));

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
      topKeywords,
    };
  }, [text]);

  const handleClear = () => setText("");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Word Counter
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Count words, characters, sentences, and paragraphs in real-time.
                Perfect for writers and SEO.
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
                Real-Time Analysis
              </div>
            </div>

            {/* Tool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Text Input (Takes up 2 columns) */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-semibold text-slate-800">
                      Enter your text below
                    </label>
                    <button
                      onClick={handleClear}
                      className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                    >
                      Clear Text
                    </button>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Start typing or paste your text here to see the word count, character count, and more..."
                    rows={14}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 text-base resize-y min-h-[300px]"
                  />
                </div>

                {/* Right: Stats Panel */}
                <div className="bg-gray-50 rounded-xl p-6 border border-slate-200 space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Basic Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {stats.words}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Words
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {stats.characters}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Characters
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-2xl font-bold text-slate-700">
                          {stats.charactersNoSpaces}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          No Spaces
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-2xl font-bold text-slate-700">
                          {stats.sentences}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Sentences
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center col-span-2">
                        <p className="text-2xl font-bold text-slate-700">
                          {stats.paragraphs}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Paragraphs
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Time Estimates
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-xl font-bold text-emerald-600">
                          {stats.readingTime} min
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Reading
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm text-center">
                        <p className="text-xl font-bold text-emerald-600">
                          {stats.speakingTime} min
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                          Speaking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyword Density Section */}
              {stats.topKeywords.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">
                    Top Keywords (Density)
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {stats.topKeywords.map((item, index) => (
                      <div
                        key={index}
                        className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-center"
                      >
                        <p className="font-bold text-slate-900 capitalize text-sm truncate">
                          {item.word}
                        </p>
                        <p className="text-xs text-blue-600 font-medium">
                          {item.count}x ({item.density}%)
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Use the Word Counter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Paste or Type
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Paste your essay, article, or social media post into the
                    text box. The tool updates instantly.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Check Your Stats
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    View your word count, character count, reading time, and top
                    keywords in the side panel.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Optimize Your Text
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Use the keyword density tool to ensure your SEO keywords
                    aren't overused or underused.
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
                    How is the word count calculated?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We count any sequence of characters separated by a space as
                    a word. This is the standard method used by Microsoft Word
                    and Google Docs.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    What is keyword density?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Keyword density is the percentage of times a word appears in
                    your text compared to the total word count. It helps SEO
                    writers avoid "keyword stuffing."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my text saved or shared?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Never. All calculations happen directly in your web browser.
                    Your text is never uploaded to our servers, ensuring 100%
                    privacy.
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
