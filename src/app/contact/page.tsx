// src/app/contact/page.tsx
"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RELATED_TOOLS = [
  {
    id: "word-unscrambler",
    title: "Word Unscrambler",
    description: "Find words from letters.",
    icon: "🧩",
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
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce PDF file sizes.",
    icon: "🗜️",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Create secure passwords.",
    icon: "🔒",
  },
  {
    id: "case-converter",
    title: "Case Converter",
    description: "Change text case easily.",
    icon: "🔠",
  },
];

export default function Contact() {
  // ✅ REPLACE THIS WITH YOUR REAL DEDICATED EMAIL
  const businessEmail = "kashif3710123@gmail.com";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          

          <main className="min-w-0">
                        

            {/* Page Header - ✅ UPDATED: More professional, less "heavy" */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3">
                Contact Us
              </h1>
              <p className="text-slate-600 text-base max-w-2xl">
                Have a question, found a bug, or want to suggest a new tool?
                We'd love to hear from you.
              </p>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10 max-w-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    Email Support
                  </h2>
                  <p className="text-slate-600 text-sm mb-4">
                    The fastest way to reach us is via email. We typically
                    respond within 24-48 hours.
                  </p>

                  {/* Button */}
                  <a
                    href={`mailto:${businessEmail}`}
                    className="inline-block px-6 py-2.5 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors shadow-sm mb-4"
                  >
                    Open Email App
                  </a>

                  {/* Visible email address for copying */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <p className="text-xs text-slate-500 font-semibold uppercase mb-1">
                      Or copy our email address:
                    </p>
                    <p className="text-slate-800 font-mono text-sm break-all select-all">
                      {businessEmail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h3 className="font-semibold text-slate-800 mb-3">
                  What to include in your email:
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
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
                    The name of the tool you are using.
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
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
                    A brief description of the issue or suggestion.
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0"
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
                    Screenshots (if reporting a bug).
                  </li>
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-2xl">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Do you offer premium or paid tools?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    No. Toolbox is 100% free. There are no premium tiers or
                    sign-up requirements for our utilities.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-2">
                    Can I request a new tool?
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Absolutely! We are always looking to expand our collection.
                    Email us with your idea, and if it fits our privacy-first
                    model, we'll build it.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore More Tools Section */}
            <section className="mb-8 border-t border-slate-200 pt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-slate-800">
                  Explore More Tools
                </h2>
                <Link
                  href="/tools"
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
            </section>
          </main>

          
        </div>
      </div>

      <Footer />
    </div>
  );
}
