import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans, Barlow_Condensed, Lora, Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// GA4 Measurement ID — set NEXT_PUBLIC_GA_ID on Vercel to enable.
// Inert when missing; vanilla <Script> tags mirror the Clarity pattern
// already in this file rather than pulling in @next/third-parties.
const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
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
    <html lang="en" className={`${dmSerifDisplay.variable} ${dmSans.variable} ${barlowCondensed.variable} ${lora.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "wsni68sbvw");`}
        </Script>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
