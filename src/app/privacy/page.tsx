// src/app/privacy/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm text-slate-500 mb-6 font-medium"></nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-8 text-sm">
          Last updated: November 15, 2026
        </p>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed">
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
              100% locally in your web browser. The letters you type never leave
              your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              2. Cookies and Local Storage
            </h2>
            <p>
              We use your browser's Local Storage solely to cache dictionary
              files. This improves performance so you don't have to download the
              dictionary every time you visit. This data is stored only on your
              device and is never sent to our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              3. External Links
            </h2>
            <p>
              Our website may contain links to other sites. We are not
              responsible for the privacy practices of these external sites. We
              encourage you to read their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              5. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
