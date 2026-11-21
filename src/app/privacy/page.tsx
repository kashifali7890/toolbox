// src/app/privacy/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <main className="min-w-0">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-3 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500">
              Last updated: November 22, 2026
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed mb-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Information We Collect
              </h2>
              <p>
                Toolbox is designed with a "Privacy-First" approach.{" "}
                <strong>
                  We do not collect, store, or transmit any personal data.
                </strong>{" "}
                All tools on this website (including the Word Unscrambler) run
                100% locally in your web browser. The letters you type never
                leave your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Cookies and Local Storage
              </h2>
              <p>
                We do not use tracking cookies. We use your browser's Local
                Storage solely to cache the English word list used by the Word
                Unscrambler, so you don't have to re-download it on every visit.
                This data is stored only on your device and is never sent to our
                servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Analytics
              </h2>
              <p>
                We use <strong>Cloudflare Web Analytics</strong>, a
                privacy-friendly, cookieless tool that measures aggregate page
                views and visits. It does <strong>not</strong> track individual
                visitors, set cookies, or store any personally identifiable
                information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. External Links
              </h2>
              <p>
                Our website may contain links to other sites. We are not
                responsible for the privacy practices of these external sites.
                We encourage you to read their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:{" "}
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
