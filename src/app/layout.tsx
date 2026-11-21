import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // ✅ 1. Import the Next.js Script component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toolbox - Free, Private, Client-Side Web Utilities",
  description:
    "12 free online utilities like PDF Merge, Age Calculator, and QR Generator. 100% private, runs entirely in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* ✅ 2. Paste your Cloudflare script here, right before </body> */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "2a0e9e178a1a4174a2d7ef85b1aa95db"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
