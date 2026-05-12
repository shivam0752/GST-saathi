import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const notoSans = Noto_Sans({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "GST Saathi",
  description: "Aapka GST, aasaan bhasha mein",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} antialiased`}>
        <LanguageProvider>
          <div className="app-container">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
