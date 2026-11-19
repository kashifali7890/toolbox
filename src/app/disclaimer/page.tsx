// src/app/disclaimer/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-6 font-medium"></nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Last updated: November 15, 2026
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. General Information
            </h2>
            <p>
              The information provided by Toolbox ("we," "us," or "our") on our
              website is for general informational and educational purposes
              only. All information on the site is provided in good faith;
              however, we make no representation or warranty of any kind,
              express or implied, regarding the accuracy, adequacy, validity,
              reliability, availability, or completeness of any information on
              the site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Tool Accuracy
            </h2>
            <p>
              While we strive to provide accurate results (such as using the
              Official Scrabble Dictionary for our Word Unscrambler), we cannot
              guarantee that every result is 100% accurate for every specific
              regional dictionary or tournament rule set. Users should verify
              critical information with official sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. External Links Disclaimer
            </h2>
            <p>
              The site may contain links to other websites or content belonging
              to or originating from third parties. Such external links are not
              investigated, monitored, or checked for accuracy, adequacy,
              validity, reliability, availability, or completeness by us.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
