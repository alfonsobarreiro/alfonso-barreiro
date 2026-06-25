import type { Metadata } from "next";
import { Suspense } from "react";
import { DM_Serif_Display, DM_Sans, Barlow_Condensed, Lora, Space_Grotesk, Inter } from "next/font/google";
import BrandSwitch from "@/components/BrandSwitch";
import "./globals.css";

// Pre-hydration brand setter: runs before first paint so ?brand=c / ?brand=e
// apply without flashing the default aubergine palette. The BrandSwitch
// component below handles client-side route changes.
const BRAND_BOOT_SCRIPT = `(function(){try{var p=new URLSearchParams(window.location.search);var b=p.get("brand");if(b==="c"||b==="e"||b==="aubergine"){document.documentElement.setAttribute("data-brand",b);}}catch(e){}})();`;

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

// MSR slide fonts — loaded here so slides embedded in the portfolio
// have correct typography. Scoped via .msr-slide CSS class in globals.css.
// preload: false means these fonts are NOT in the <link rel="preload">
// tags on every page — only fetched when actually rendered (i.e. inside
// .msr-slide / .wayfarer-slide containers on case-study pages). Removes
// the slide-font weight from the home / about / contact first-paint
// without breaking the case studies. The CSS variable is still defined
// site-wide via the <html> className so .msr-slide / .wayfarer-slide
// scoping in globals.css continues to work.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: false,
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
  preload: false,
});

// Wayfarer slide fonts — scoped via .wayfarer-slide CSS class in globals.css.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.barreiro.com"),
  title: {
    default: "Alfonso Barreiro · UX/UI Designer",
    template: "%s · Alfonso Barreiro",
  },
  description:
    "UX/UI Designer in Portland, OR. Research through prototype: clear problem framing, evidence-based decisions, design that holds up under real constraints.",
  authors: [{ name: "Alfonso Barreiro", url: "https://www.barreiro.com" }],
  creator: "Alfonso Barreiro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.barreiro.com",
    siteName: "Alfonso Barreiro",
    title: "Alfonso Barreiro · UX/UI Designer",
    description:
      "UX/UI Designer in Portland, OR. Research through prototype: clear problem framing, evidence-based decisions, design that holds up under real constraints.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alfonso Barreiro · UX/UI Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfonso Barreiro · UX/UI Designer",
    description:
      "UX/UI Designer in Portland, OR. Research through prototype: clear problem framing, evidence-based decisions, design that holds up under real constraints.",
    images: ["/opengraph-image"],
    creator: "@alfbarreiro",
  },
  alternates: {
    canonical: "https://www.barreiro.com",
  },
  // Index in production only. Staging (staging.barreiro.com) and every
  // other Vercel preview deploy gets a noindex/nofollow meta tag so search
  // engines never list staging content or compete with prod for SEO.
  // Belt-and-suspenders alongside the Disallow in robots.ts.
  robots:
    process.env.VERCEL_ENV === "production"
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        },
  // Google Search Console verification — set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  // on Vercel with the meta-content value from Search Console. Inert when missing.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable} ${barlowCondensed.variable} ${lora.variable} ${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BRAND_BOOT_SCRIPT }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <BrandSwitch />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
