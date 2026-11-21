// src/app/tools/password-generator/page.tsx
"use client";

import { useState, useEffect } from "react";
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
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes.",
    icon: "📱",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce image file sizes.",
    icon: "🖼️",
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
];

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = /[Il1O0o|`'"{}()\[\]/\\]/g;

// Cryptographically secure random index
const secureRandom = (max: number) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const buildPool = () => {
    let pool = "";
    if (includeUpper) pool += UPPER;
    if (includeLower) pool += LOWER;
    if (includeNumbers) pool += NUMBERS;
    if (includeSymbols) pool += SYMBOLS;
    if (excludeAmbiguous) pool = pool.replace(AMBIGUOUS, "");
    return pool;
  };

  const generate = () => {
    const pool = buildPool();
    if (pool.length === 0) {
      setPassword("");
      return;
    }
    let result = "";
    for (let i = 0; i < length; i++) {
      result += pool[secureRandom(pool.length)];
    }
    setPassword(result);
  };

  // Generate an initial password on load
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Strength calculation based on entropy
  const poolSize = buildPool().length;
  const entropy = poolSize > 0 ? length * Math.log2(poolSize) : 0;
  const strength =
    entropy < 45
      ? {
          label: "Weak",
          color: "bg-red-500",
          text: "text-red-600",
          width: "25%",
        }
      : entropy < 65
        ? {
            label: "Fair",
            color: "bg-orange-500",
            text: "text-orange-600",
            width: "50%",
          }
        : entropy < 90
          ? {
              label: "Strong",
              color: "bg-emerald-500",
              text: "text-emerald-600",
              width: "75%",
            }
          : {
              label: "Very Strong",
              color: "bg-blue-600",
              text: "text-blue-700",
              width: "100%",
            };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const noOptions = poolSize === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Password Generator
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl">
                Create strong, secure, and random passwords instantly. Built
                with true cryptographic security.
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                Cryptographically Secure
              </div>
            </div>

            {/* Tool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
              {/* Password Output */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-slate-800">
                    Your Password
                  </label>
                  <span className={`text-xs font-bold ${strength.text}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={password}
                    placeholder="Select at least one option..."
                    className="w-full px-4 py-4 pr-32 rounded-lg border-2 border-slate-300 bg-gray-50 font-mono text-lg text-slate-900 outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    disabled={!password}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md text-sm font-semibold transition-all disabled:opacity-50 ${
                      copySuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-slate-700"
                    }`}
                  >
                    {copySuccess ? "Copied!" : "Copy"}
                  </button>
                </div>
                {/* Strength bar */}
                <div className="mt-3 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.width }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-slate-800">
                      Length
                    </label>
                    <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                      {length}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>8</span>
                    <span>64</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Toggle
                    label="Uppercase (A-Z)"
                    checked={includeUpper}
                    onChange={setIncludeUpper}
                  />
                  <Toggle
                    label="Lowercase (a-z)"
                    checked={includeLower}
                    onChange={setIncludeLower}
                  />
                  <Toggle
                    label="Numbers (0-9)"
                    checked={includeNumbers}
                    onChange={setIncludeNumbers}
                  />
                  <Toggle
                    label="Symbols (!@#$)"
                    checked={includeSymbols}
                    onChange={setIncludeSymbols}
                  />
                  <Toggle
                    label="Exclude ambiguous (0/O, 1/l)"
                    checked={excludeAmbiguous}
                    onChange={setExcludeAmbiguous}
                  />
                </div>

                {noOptions && (
                  <p className="text-sm text-red-600 font-medium">
                    Please enable at least one character type.
                  </p>
                )}

                <button
                  onClick={generate}
                  disabled={noOptions}
                  className="w-full px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-md shadow-blue-200 disabled:bg-gray-400 disabled:shadow-none text-base flex items-center justify-center gap-2"
                >
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
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Generate New Password
                </button>
              </div>
            </div>

            {/* How to Use */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                How to Use the Password Generator
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Set Your Rules
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Adjust the length slider and toggle which character types
                    you want in your password.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Generate</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Click "Generate" to create a cryptographically secure
                    password. The strength meter updates live.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-lg mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Copy & Use</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Hit the Copy button and paste your new password into any
                    secure signup form.
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
                    Is this password generator really secure?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Yes. Unlike many free tools that use predictable random
                    numbers, we use the browser's{" "}
                    <code className="bg-slate-100 px-1 rounded">
                      crypto.getRandomValues()
                    </code>{" "}
                    API, which generates true cryptographic randomness.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Are my passwords saved or sent anywhere?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Never. The password is created entirely inside your browser
                    and is never uploaded, stored, or logged. When you close the
                    tab, it's gone.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2">
                    What length should my password be?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Security experts recommend at least 12–16 characters for
                    most accounts. For sensitive accounts like email or banking,
                    use 20+ characters with all character types enabled.
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

// Reusable Toggle Switch Component
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 bg-gray-50 border border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-blue-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
