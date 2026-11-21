// src/app/disclaimer/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <main className="min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3 tracking-tight">
              Disclaimer
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: November 22, 2026
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed mb-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. General Information
              </h2>
              <p>
                The information provided by Toolbox ("we," "us," or "our") on
                our website is for general informational and educational
                purposes only. All information on the site is provided in good
                faith; however, we make no representation or warranty of any
                kind, express or implied, regarding the accuracy, adequacy,
                validity, reliability, availability, or completeness of any
                information on the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Tool Accuracy
              </h2>
              <p>
                While we strive to provide accurate results, our Word
                Unscrambler is based on widely-used open English word lists
                (such as the Google 10,000 most common words and the DWYL
                English word list), which are{" "}
                <strong>
                  not the same as an official Scrabble or tournament word list.
                </strong>{" "}
                We cannot guarantee that every result is 100% valid for every
                specific regional dictionary or game rule set. Users should
                verify critical information with official sources.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. No Professional Advice
              </h2>
              <p>
                The tools on Toolbox (such as calculators and converters) are
                provided for convenience only and do not constitute
                professional, financial, legal, or medical advice. Always
                consult a qualified professional for decisions that require
                expert judgment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. External Links Disclaimer
              </h2>
              <p>
                The site may contain links to other websites or content
                belonging to or originating from third parties. Such external
                links are not investigated, monitored, or checked for accuracy,
                adequacy, validity, reliability, availability, or completeness
                by us.
              </p>
            </section>
          </div>

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
      <Footer />
    </div>
  );
}
