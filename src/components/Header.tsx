// src/components/Header.tsx
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "en", name: "English", flag: "us" },
  { code: "es", name: "Spanish", flag: "es" },
  { code: "fr", name: "French", flag: "fr" },
  { code: "de", name: "German", flag: "de" },
  { code: "it", name: "Italian", flag: "it" },
  { code: "pt", name: "Portuguese", flag: "pt" },
];

interface HeaderProps {
  selectedLang?: string;
  onLanguageChange?: (lang: string) => void;
  showLanguageSelector?: boolean;
}

export default function Header({
  selectedLang = "en",
  onLanguageChange,
  showLanguageSelector = true,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangData =
    LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* We use a 3-column grid to force the nav links to the exact center */}
        <div className="grid grid-cols-3 items-center h-16">
          {/* 1. Logo (Left Column) */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900">Toolbox</span>
            </Link>
          </div>

          {/* 2. Navigation Links (Center Column) */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* 3. Language Selector (Right Column) */}
          <div className="flex justify-end">
            {showLanguageSelector && onLanguageChange && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-slate-700 text-sm rounded-lg px-3 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                >
                  <img
                    src={`https://flagcdn.com/w40/${currentLangData.flag}.png`}
                    alt={currentLangData.name}
                    className="w-5 h-4 object-cover rounded-sm shadow-sm"
                  />
                  <span className="font-medium">{currentLangData.name}</span>
                  <svg
                    className={`w-4 h-4 ml-1 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${
                          selectedLang === lang.code
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-700"
                        }`}
                      >
                        <img
                          src={`https://flagcdn.com/w40/${lang.flag}.png`}
                          alt={lang.name}
                          className="w-5 h-4 object-cover rounded-sm shadow-sm"
                        />
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
