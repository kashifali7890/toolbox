// src/app/about/page.tsx
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header showLanguageSelector={false} />

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/*  */}

        <h1 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-6 tracking-tight">
          About Toolbox
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Our Mission
            </h2>
            <p>
              Toolbox was created with a simple mission: to provide fast, free,
              and privacy-respecting utility tools for everyone. Whether you are
              a student, a developer, a writer, or a word game enthusiast, we
              build tools that make your daily tasks easier without compromising
              your data.
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
      </div>
      <Footer />
    </div>
  );
}
