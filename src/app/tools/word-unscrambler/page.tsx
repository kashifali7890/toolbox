// src/app/tools/word-unscrambler/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ✅ English-only dictionaries (loaded once, cached in localStorage)
const COMMON_WORDS_URL =
  "https://raw.githubusercontent.com/first20hours/google-10000-english/master/google-10000-english-no-swears.txt";
const FULL_WORDS_URL =
  "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";

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
  {
    id: "meta-tag-generator",
    title: "Meta Tag Generator",
    description: "Create SEO meta tags.",
    icon: "🏷️",
  },
];

export default function WordUnscrambler() {
  const [inputLetters, setInputLetters] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");

  const [includeShortWords, setIncludeShortWords] = useState(false);
  const [commonWordsOnly, setCommonWordsOnly] = useState(true);

  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoadingDict, setIsLoadingDict] = useState(true);
  const [dictionary, setDictionary] = useState<string[]>([]);
  const [commonDictionary, setCommonDictionary] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const loadDictionaries = async () => {
      setIsLoadingDict(true);
      setError("");
      setResults([]);

      try {
        // Load common words (cached)
        const commonCached = localStorage.getItem("toolbox_dict_common_en");
        if (commonCached) {
          setCommonDictionary(new Set(JSON.parse(commonCached)));
        } else {
          const res = await fetch(COMMON_WORDS_URL);
          if (res.ok) {
            const words = (await res.text())
              .split("\n")
              .map((w) => w.trim().toLowerCase())
              .filter(Boolean);
            try {
              localStorage.setItem(
                "toolbox_dict_common_en",
                JSON.stringify(words),
              );
            } catch {}
            setCommonDictionary(new Set(words));
          }
        }

        // Load full dictionary (cached)
        const fullCached = localStorage.getItem("toolbox_dict_full_en");
        if (fullCached) {
          setDictionary(JSON.parse(fullCached));
        } else {
          const res = await fetch(FULL_WORDS_URL);
          if (!res.ok) throw new Error("Network response was not ok");
          const words = (await res.text())
            .split("\n")
            .map((w) => w.trim().toLowerCase())
            .filter(Boolean);
          try {
            localStorage.setItem("toolbox_dict_full_en", JSON.stringify(words));
          } catch {}
          setDictionary(words);
        }
      } catch (err) {
        console.error("Dictionary load failed:", err);
        setError(
          "Could not download dictionary. Please check your connection.",
        );
      } finally {
        setIsLoadingDict(false);
      }
    };

    loadDictionaries();
  }, []);

  const handleUnscramble = () => {
    setError("");
    setResults([]);

    if (!inputLetters.trim()) {
      setError("Please enter some scrambled letters.");
      return;
    }
    if (inputLetters.length < 2) {
      setError("Please enter at least 2 letters.");
      return;
    }

    const letters = inputLetters
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .split("");
    const startStr = startsWith.toLowerCase().trim();
    const endStr = endsWith.toLowerCase().trim();
    const inputLen = letters.length;
    const minLen = includeShortWords ? 2 : 3;
    const maxLen = inputLen;

    const foundWords = dictionary.filter((word) => {
      if (word.length > letters.length) return false;
      const tempLetters = [...letters];
      return word.split("").every((letter) => {
        const index = tempLetters.indexOf(letter);
        if (index !== -1) {
          tempLetters.splice(index, 1);
          return true;
        }
        return false;
      });
    });

    const uniqueWords = [...new Set(foundWords)]
      .filter((word) => {
        if (word.length < minLen || word.length > maxLen) return false;
        if (
          commonWordsOnly &&
          commonDictionary.size > 0 &&
          !commonDictionary.has(word)
        )
          return false;
        if (startStr && !word.startsWith(startStr)) return false;
        if (endStr && !word.endsWith(endStr)) return false;
        return true;
      })
      .sort((a, b) => b.length - a.length);

    if (uniqueWords.length === 0) {
      setError(
        commonWordsOnly
          ? "No common words found. Try unchecking 'Common words only' to see all valid words."
          : "No valid words found. Try including shorter words.",
      );
    } else {
      setResults(uniqueWords);
    }
  };

  const displayMinLen = includeShortWords ? 2 : 3;
  const displayMaxLen = inputLetters.length > 0 ? inputLetters.length : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Word Unscrambler
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Find meaningful words instantly. Shows only common, accurate
                English words by default.
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                Accurate Results Only
              </div>
            </div>

            {isLoadingDict && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-8 text-sm font-medium">
                Loading dictionaries...
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Enter your scrambled letters
                  </label>
                  <input
                    type="text"
                    value={inputLetters}
                    onChange={(e) => setInputLetters(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnscramble()}
                    placeholder="e.g., playing"
                    disabled={isLoadingDict}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 disabled:bg-gray-100 text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Starts with (Optional)
                    </label>
                    <input
                      type="text"
                      value={startsWith}
                      onChange={(e) => setStartsWith(e.target.value)}
                      placeholder="e.g., s"
                      disabled={isLoadingDict}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Ends with (Optional)
                    </label>
                    <input
                      type="text"
                      value={endsWith}
                      onChange={(e) => setEndsWith(e.target.value)}
                      placeholder="e.g., ing"
                      disabled={isLoadingDict}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400 disabled:bg-gray-100"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeShortWords"
                      checked={includeShortWords}
                      onChange={(e) => setIncludeShortWords(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="includeShortWords"
                      className="text-sm text-slate-700 font-medium cursor-pointer"
                    >
                      Include short words (2 letters like "in", "at")
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="commonWordsOnly"
                      checked={commonWordsOnly}
                      onChange={(e) => setCommonWordsOnly(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="commonWordsOnly"
                      className="text-sm text-slate-700 font-medium cursor-pointer"
                    >
                      Common words only (recommended for accuracy)
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleUnscramble}
                  disabled={isLoadingDict}
                  className="inline-block px-6 py-2.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors shadow-sm mb-4"
                >
                  Unscramble Words
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 font-medium">
                {error}
              </div>
            )}

            {results.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Found Words{" "}
                    <span className="text-slate-400 font-normal text-lg ml-2">
                      ({results.length})
                    </span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {displayMinLen}-{displayMaxLen} letters
                    </span>
                    {commonWordsOnly && (
                      <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full font-medium">
                        ✓ Common words only
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {results.map((word, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border border-slate-200 text-center font-semibold text-slate-800 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-default"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Use the Word Unscrambler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Enter Your Letters
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Type your scrambled letters into the main input box. You can
                    enter up to 8 letters at a time.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Add Filters (Optional)
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Use the "Starts with" and "Ends with" boxes to narrow down
                    results for crossword or Scrabble help.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Get Accurate Results
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    By default, we show only common English words. Uncheck
                    "Common words only" to see all valid words including rare
                    ones.
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
                    Why do I only see common words?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    By default, we filter results to show only the 10,000 most
                    frequently used English words. This ensures you get
                    accurate, useful results. Uncheck "Common words only" to see
                    all valid words including rare and technical terms.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is this Word Unscrambler free to use?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes, Toolbox is 100% free. There are no hidden fees,
                    sign-ups, or limits on how many words you can unscramble.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my data safe?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Absolutely. All processing happens directly in your browser.
                    We do not collect, store, or transmit the letters you type
                    to any server.
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
