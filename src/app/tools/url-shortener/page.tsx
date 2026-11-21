// src/app/tools/url-shortener/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const otherTools = [
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
    icon: "🔤",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Create secure passwords.",
    icon: "🔒",
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
    icon: "📄",
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create custom QR codes.",
    icon: "🔳",
  },
  {
    id: "word-unscrambler",
    title: "Word Unscrambler",
    description: "Find words from letters.",
    icon: "🧩",
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file sizes.",
    icon: "🗜️",
  },
];

export default function URLShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    if (!longUrl.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    let urlToShorten = longUrl.trim();
    if (!/^https?:\/\//i.test(urlToShorten)) {
      urlToShorten = "https://" + urlToShorten;
    }

    try {
      new URL(urlToShorten);
    } catch {
      setError("Please enter a valid URL (e.g., example.com).");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToShorten }),
      });

      const data = await response.json();

      if (response.ok && data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || "Failed to shorten URL. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={true} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Main Content Column */}
          <main className="min-w-0">
            {/* Tool Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                URL Shortener
              </h1>
              <p className="text-slate-600 text-lg max-w-2xl mb-6">
                Transform long, messy links into clean, short, and shareable
                URLs instantly.
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  100% Free
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  No Sign-up Required
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 shadow-sm">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Privacy-First (Runs in Browser)
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm font-medium text-green-700 shadow-sm">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Instant Results
                </span>
              </div>
            </div>

            {/* Main Tool Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8 mb-10">
              <form onSubmit={handleShorten} className="space-y-4">
                <div>
                  <label
                    htmlFor="longUrl"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Enter your long URL
                  </label>
                  <input
                    type="text"
                    id="longUrl"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
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
                      Shortening...
                    </>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </form>

              {shortUrl && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">
                    Your shortened URL is ready!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={shortUrl}
                      readOnly
                      className="flex-grow px-4 py-2 bg-white border border-green-300 rounded-md text-slate-700 focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2 min-w-[120px]"
                    >
                      {copied ? "Copied! ✅" : "Copy 📋"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* How to Use Section */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                How to Use the URL Shortener
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-lg flex items-center justify-center mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Enter Your URL
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Paste any long web address into the input box above. You can
                    include http:// or https:// — we'll handle it automatically.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-lg flex items-center justify-center mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Click Shorten
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Press the "Shorten URL" button. Your compact, shareable link
                    will be generated in less than a second.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-lg flex items-center justify-center mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Copy & Share
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Use the copy button to grab your new short link and paste it
                    anywhere — social media, emails, or messages.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is this URL shortener free to use?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Yes, it is 100% free with no hidden fees, no sign-up, and no
                    limits on how many links you can shorten.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Do the shortened links expire?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    No. The links generated are permanent and will continue to
                    redirect to your original URL indefinitely.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Is my data safe?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Absolutely. We do not store your long URLs in any database.
                    The shortening process is handled securely and anonymously.
                  </p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-2">
                    Can I use these links for social media?
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Yes! Short links are perfect for Twitter/X, Instagram, and
                    SMS where character limits matter.
                  </p>
                </div>
              </div>
            </div>

            {/* Explore More Tools Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Explore More Tools
                </h2>
                <Link
                  href="/tools"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                >
                  View All Tools <span>›</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherTools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.id}`}
                    className="block bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
