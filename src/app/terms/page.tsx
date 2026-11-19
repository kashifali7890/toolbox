// src/app/terms/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-6 font-medium"></nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          Terms of Service
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Last updated: November 15, 2026
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Toolbox ("the Website"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily use the tools on Toolbox for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. Disclaimer
            </h2>
            <p>
              The materials on Toolbox are provided on an 'as is' basis. Toolbox
              makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              4. Limitations
            </h2>
            <p>
              In no event shall Toolbox or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on Toolbox.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
