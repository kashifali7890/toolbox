// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const contactEmail = "contact@toolbox-utils.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <main className="min-w-0">
            {/* Page Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
                Contact Us
              </h1>
              <p className="text-slate-600 text-lg">
                Have a question, feature request, or found a bug? We'd love to
                hear from you.
              </p>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Email Us Directly
              </h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                To keep Toolbox 100% private and client-side, we don't use
                contact forms that store your data on servers. The fastest way
                to reach us is via email.
              </p>

              {/* Mailto Button (works on mobile) */}
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors shadow-md text-base mb-4"
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                Open Email App
              </a>

              {/* Visible Email Address (for desktop users) */}
              <div className="mt-6">
                <p className="text-sm text-slate-500 mb-2">
                  Or copy our email address:
                </p>
                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
                  <code className="text-slate-900 font-mono text-sm">
                    {contactEmail}
                  </code>
                  <button
                    onClick={handleCopy}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
                      copied
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}
                  >
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-500 mt-6">
                We typically reply within 24 hours.
              </p>
            </div>

            {/* FAQ / Expectations */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight text-center">
                What to Expect
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Bug Reports
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    If a tool isn't working as expected, please include your
                    browser type (e.g., Chrome, Safari) and the steps to
                    reproduce the issue. We fix bugs quickly!
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="text-blue-500">💡</span> Feature Requests
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Have an idea for a new tool? We read every suggestion. If it
                    aligns with our privacy-first, client-side mission, we'll
                    build it.
                  </p>
                </div>
              </div>
            </section>

            {/* Back to Home */}
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
