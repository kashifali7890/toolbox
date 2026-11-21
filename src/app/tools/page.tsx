// src/app/tools/page.tsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ALL_TOOLS } from "@/data/tools";

export default function ToolsDirectory() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3 tracking-tight">
                All Tools
              </h1>
              <p className="text-slate-600 text-lg">
                Browse our complete collection of free utilities.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                    <p className="text-slate-600 text-sm">{tool.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Back to Home Link */}
            <div className="text-center">
              <Link
                href="/"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center gap-1"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Back to Toolbox Home
              </Link>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
