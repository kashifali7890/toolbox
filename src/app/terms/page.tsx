// src/app/terms/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <main className="min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: November 22, 2026
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed mb-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Toolbox if you do not agree
                to take all of the terms and conditions stated on this page. If
                you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Use License
              </h2>
              <p>
                Permission is granted to temporarily use the tools on Toolbox
                for personal, non-commercial transitory viewing only. This is
                the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Disclaimer
              </h2>
              <p>
                The materials on Toolbox are provided on an 'as is' basis.
                Toolbox makes no warranties, expressed or implied, and hereby
                disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability,
                fitness for a particular purpose, or non-infringement of
                intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Limitations
              </h2>
              <p>
                In no event shall Toolbox or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on Toolbox.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Modifications
              </h2>
              <p>
                We may revise these terms of service for our website at any time
                without notice. By using this website you are agreeing to be
                bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Contact Us
              </h2>
              <p>
                Questions about the Terms of Service should be sent to us via
                our{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
                >
                  Contact Page
                </Link>
                .
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
