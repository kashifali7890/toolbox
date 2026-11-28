// src/app/page.tsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_TOOLS } from "@/data/tools";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toolbox | Free, 100% Private Online Utilities",
  description:
    "Free, privacy-first online tools for everyday tasks. Merge PDFs, generate passwords, and unscramble words. 100% client-side, no uploads, no sign-ups.",
};
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Hero Section */}
            <div className="text-center mb-10 py-4">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Simple tools for everyday tasks
              </h1>
              <p className="text-slate-600 text-base max-w-2xl mx-auto">
                A collection of useful, privacy-first online tools. 100% free,
                no sign-up required.
              </p>
            </div>

            {/* Tools Grid - reads from single source */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                  All Tools
                </h2>
                <Link
                  href="/tools"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
                >
                  View Directory
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ALL_TOOLS.map((tool) => (
                  <Link
                    href={`/tools/${tool.id}`}
                    key={tool.id}
                    className="block group"
                  >
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all h-full">
                      <div className="text-2xl mb-3">{tool.icon}</div>
                      <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Why Choose Toolbox */}
            <div className="mb-12 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center tracking-tight">
                Why Choose Toolbox?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Privacy-First
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Your files and data are processed directly in your browser.
                    We never upload or store your personal information.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    100% Free
                  </h3>
                  <p className="text-slate-600 text-sm">
                    No hidden fees, no premium tiers, and no limits. All our
                    tools are completely free to use, forever.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Lightning Fast
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Because everything runs locally in your browser, there is no
                    server lag. Get instant results every time.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
