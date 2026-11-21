// src/app/about/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <main className="min-w-0">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4 tracking-tight">
              About Toolbox
            </h1>
            <p className="text-slate-600 text-lg">
              Fast, free, and privacy-respecting utility tools for everyone.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed mb-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Our Mission
              </h2>
              <p>
                Toolbox was created with a simple mission: to provide fast,
                free, and privacy-respecting utility tools for everyone. Whether
                you are a student, a developer, a writer, or a word game
                enthusiast, we build tools that make your daily tasks easier
                without compromising your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Why Privacy Matters
              </h2>
              <p>
                Unlike many other tool websites,{" "}
                <strong>Toolbox runs 100% in your browser.</strong> When you use
                our Word Unscrambler or Password Generator, your data never
                touches our servers. We believe your privacy is a fundamental
                right, not a premium feature.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                Support Us
              </h2>
              <p>
                Toolbox is free to use. If you find our tools helpful, please
                consider bookmarking this page or sharing it with friends!
              </p>
            </section>
          </div>

          {/* Back to Home Link (Outside the card, matching Contact page) */}
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
