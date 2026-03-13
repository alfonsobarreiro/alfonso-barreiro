import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alfonso Barreiro — UX/UI Designer",
  description:
    "UX/UI Designer based in Portland, OR. Research through prototype — focused on clear problem framing, evidence-based decisions, and design that holds up under real constraints.",
  keywords: ["UX Designer", "UI Designer", "Product Designer", "Portland", "Alfonso Barreiro"],
  authors: [{ name: "Alfonso Barreiro" }],
  openGraph: {
    title: "Alfonso Barreiro — UX/UI Designer",
    description: "UX/UI Designer based in Portland, OR.",
    url: "https://barreiro.com",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Barreiro — UX/UI Designer",
    description: "UX/UI Designer based in Portland, OR.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
