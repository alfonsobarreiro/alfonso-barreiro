import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Connect — Alfonso Barreiro",
  description:
    "UX/UI Designer in Portland, OR. View my work, grab my resume, or book a coffee chat.",
  alternates: { canonical: "https://www.barreiro.com/connect" },
  openGraph: {
    title: "Connect — Alfonso Barreiro",
    description:
      "UX/UI Designer in Portland, OR. View my work, grab my resume, or book a coffee chat.",
    url: "https://barreiro.com/connect",
    images: [
      {
        url: "https://barreiro.com/og-connect.jpg",
        width: 1200,
        height: 630,
        alt: "Alfonso Barreiro — UX / UI Designer. Research. Decide. Ship.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect — Alfonso Barreiro",
    description:
      "UX/UI Designer in Portland, OR. View my work, grab my resume, or book a coffee chat.",
    images: ["https://barreiro.com/og-connect.jpg"],
  },
};

/* ── Logomarks (inline SVG) ──────────────────────────────────────────── */

const WayfarerGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M23.32 0C36.2 0 46.64 10.44 46.64 23.32C46.64 36.2 36.2 46.64 23.32 46.64C10.44 46.64 0 36.2 0 23.32C0 10.44 10.44 0 23.32 0ZM13.62 39.26C11.67 35.62 10.39 30.89 10.09 25.65H14.77C15.07 30.44 16.3 34.57 17.97 37.5C19 39.31 20.04 40.43 20.99 41.11V25.65H25.65V41.11C26.6 40.43 27.64 39.31 28.67 37.5C30.34 34.57 31.57 30.44 31.87 25.65H36.55C36.25 30.89 34.97 35.62 33.02 39.26C38.39 35.98 41.98 30.07 41.98 23.32C41.98 16.57 38.39 10.66 33.02 7.38C34.97 11.02 36.25 15.75 36.55 20.99H31.87C31.57 16.2 30.34 12.07 28.67 9.14C27.64 7.33 26.6 6.21 25.65 5.53V20.99H20.99V5.53C20.04 6.21 19 7.33 17.97 9.14C16.3 12.07 15.07 16.2 14.77 20.99H10.09C10.39 15.75 11.67 11.02 13.62 7.38C8.25 10.66 4.66 16.57 4.66 23.32C4.66 30.07 8.25 35.98 13.62 39.26Z" fill="#FFFFFF"/>
  </svg>
);

/* ── Contact links (email + calendar + resume) ───────────────────────── */

const contactLinks: {
  href: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  external?: boolean;
  download?: boolean;
}[] = [
  {
    href: "mailto:alfonso@barreiro.com",
    label: "alfonso@barreiro.com",
    iconBg: "var(--color-brand)",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    href: "https://cal.com/alfonso-barreiro",
    label: "Book a coffee chat",
    iconBg: "var(--color-accent)",
    external: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 110 8h-1" />
        <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4Z" />
        <line x1="6" y1="2" x2="6" y2="4" />
        <line x1="10" y1="2" x2="10" y2="4" />
        <line x1="14" y1="2" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    href: "/Alfonso_Barreiro_Resume.pdf",
    label: "Resume",
    iconBg: "var(--color-ink)",
    external: true,
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

export default function ConnectPage() {
  return (
    <main className="connect-page">
      <style>{`
        /* ── Page ─────────────────────────────────────── */
        .connect-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 16px 48px;
          font-family: var(--font-dm-sans), sans-serif;
          background-color: var(--color-surface, #FFFFFF);
          color: var(--color-ink, #191919);
        }

        .connect-content {
          width: 100%;
          max-width: 460px;
          display: flex;
          flex-direction: column;
        }

        /* ── Row (shared by all buttons + contact links) ── */
        .connect-row {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 14px;
          border: 1px solid var(--color-border, #DEDCD7);
          background: transparent;
          color: var(--color-ink, #191919);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .connect-row:hover {
          background: var(--color-callout, #F5F1EC);
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(17, 17, 17, 0.10);
          border-color: var(--color-ink-2, #4A4A4A);
        }

        /* ── Solid variant (Crimson fill) ─────────────── */
        .connect-row.solid {
          background: var(--color-brand);
          border-color: var(--color-brand);
          color: #FFFFFF;
          font-weight: 600;
        }
        .connect-row.solid:hover {
          background: #6E1414;
          border-color: #6E1414;
          box-shadow: 0 10px 22px rgba(140, 26, 26, 0.28);
        }

        /* ── Section label ────────────────────────────── */
        .connect-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 14px;
        }

        /* ── Header identity ──────────────────────────── */
        .connect-identity {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 16px;
          padding-bottom: 28px;
        }
        .connect-photo {
          width: 72px;
          height: 72px;
        }
        .connect-info {
          text-align: left;
        }
        .connect-info h1 {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--color-ink, #191919);
          margin: 0 0 6px;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .connect-tagline {
          font-size: 13px;
          font-weight: 500;
          color: var(--color-brand);
          margin: 0 0 4px;
          letter-spacing: 0.01em;
        }
        .connect-location {
          font-size: 12px;
          color: var(--color-muted, #6B6B6B);
          margin: 0;
          letter-spacing: 0.04em;
        }

        /* ── Availability chip ────────────────────────── */
        .connect-availability {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding: 10px 14px;
          background: rgba(15, 61, 62, 0.06);
          border-left: 2px solid var(--color-accent);
        }
        .connect-availability-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--color-accent);
          flex-shrink: 0;
          animation: pulse 2.2s ease-in-out infinite;
        }
        .connect-availability-text {
          font-size: 11px;
          font-weight: 500;
          color: var(--color-ink-2, #4A4A4A);
          letter-spacing: 0.02em;
          line-height: 1.4;
        }

        /* ── Pulse animation ──────────────────────────── */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* ── Home link ────────────────────────────────── */
        .connect-home {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: var(--color-accent);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          margin-top: 32px;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
        }
        .connect-home:hover { border-bottom-color: var(--color-accent); }

        /* ── Desktop: wider + side-by-side ─────────────── */
        @media (min-width: 768px) {
          .connect-page {
            padding: 56px 24px 64px;
            justify-content: center;
          }
          .connect-content {
            max-width: 880px;
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            column-gap: 40px;
          }
          .connect-header {
            grid-column: 1 / -1;
          }
          .connect-identity {
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding-bottom: 40px;
          }
          .connect-photo {
            width: 112px;
            height: 112px;
          }
          .connect-info {
            text-align: center;
          }
          .connect-info h1 {
            font-size: 30px;
          }
          .connect-tagline { font-size: 14px; }
          .connect-left {
            padding-right: 32px;
            border-right: 1px solid var(--color-border, #DEDCD7);
          }
          .connect-right {
            padding-left: 32px;
          }
          .connect-divider { display: none; }
        }

        @media (min-width: 1024px) {
          .connect-content { max-width: 960px; }
        }
      `}</style>

      <div className="connect-content">

        {/* ── Header: photo + identity ─────────────── */}
        <div className="connect-header">
          <div className="connect-identity">
            <div
              className="connect-photo"
              style={{
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(17, 17, 17, 0.20)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/Alfonso-Barreiro-outdoors.png"
                alt="Alfonso Barreiro"
                width={112}
                height={112}
                sizes="112px"
                priority
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>

            <div className="connect-info">
              <h1>Alfonso Barreiro</h1>
              <p className="connect-tagline">
                UX / UI Designer &middot; Research. Decide. Ship.
              </p>
              <p className="connect-location">Portland, OR</p>
            </div>
          </div>
        </div>

        {/* ── Left column: work ────────────────────── */}
        <div className="connect-left">
          <p className="connect-label">Work</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="https://barreiro.com/" target="_blank" rel="noopener noreferrer" className="connect-row solid">
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#FFFFFF" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo-transparent.png"
                  alt=""
                  width={24}
                  height={11}
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span>Portfolio &middot; barreiro.com</span>
            </a>

            <a href="https://barreiro.com/work/spotify" target="_blank" rel="noopener noreferrer" className="connect-row">
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#1DB954" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.56.3z"/>
                </svg>
              </span>
              <span>Case study &middot; Spotify</span>
            </a>

            <a href="https://barreiro.com/work/mens-sole-revival" target="_blank" rel="noopener noreferrer" className="connect-row">
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "var(--color-brand)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/work/msr/logo-msr-mark.svg"
                  alt=""
                  width={16}
                  height={16}
                  style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                />
              </span>
              <span>Case study &middot; Men&rsquo;s Sole Revival</span>
            </a>

            <a href="https://barreiro.com/work/wayfarer" target="_blank" rel="noopener noreferrer" className="connect-row">
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "var(--color-brand)" }}>
                <WayfarerGlobe />
              </span>
              <span>Case study &middot; Wayfarer</span>
            </a>

            <a href="https://barreiro.com/process" target="_blank" rel="noopener noreferrer" className="connect-row">
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "var(--color-accent)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </span>
              <span>Process</span>
            </a>
          </div>

          {/* ── Studio ────────────────────────────── */}
          <p className="connect-label" style={{ marginTop: 24 }}>Studio</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="https://alphabeta.design/" target="_blank" rel="noopener noreferrer" className="connect-row">
              <span style={{
                width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, backgroundColor: "var(--color-accent)", color: "#FFFFFF",
                fontWeight: 700, fontSize: 12, letterSpacing: "-0.02em",
              }}>
                AB
              </span>
              <span>Alpha Beta Design</span>
            </a>
          </div>
        </div>

        {/* ── Divider (mobile only) ───────────────── */}
        <div
          className="connect-divider"
          style={{
            height: 1,
            backgroundColor: "var(--color-border, #DEDCD7)",
            margin: "24px 0",
          }}
        />

        {/* ── Right column: connect links ─────────── */}
        <div className="connect-right">
          <p className="connect-label">Connect</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a
              href="/alfonso-barreiro.vcf"
              download
              className="connect-row solid"
            >
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#FFFFFF" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: "var(--color-brand)" }}>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </span>
              <span>Save contact</span>
            </a>

            <a
              href="https://www.linkedin.com/in/alfonso-barreiro/"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-row"
            >
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#0A66C2" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://dribbble.com/alfonsobarreiro"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-row"
            >
              <span style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: "#EA4C89" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true">
                  <path d="M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0zm7.93 5.527c1.297 1.583 2.087 3.601 2.13 5.79-.306-.063-3.368-.685-6.456-.297-.066-.152-.13-.305-.197-.456-.19-.448-.4-.89-.61-1.32 3.42-1.394 4.97-3.4 5.133-3.717zM12 2.166c2.31 0 4.42.86 6.03 2.276-.14.198-1.54 2.075-4.85 3.314-1.524-2.8-3.21-5.09-3.475-5.45A9.8 9.8 0 0112 2.166zM7.65 3.026c.253.34 1.91 2.64 3.453 5.38-4.34 1.155-8.166 1.135-8.58 1.13.604-2.888 2.56-5.292 5.127-6.51zM2.166 12.01v-.31c.404.008 4.903.066 9.537-1.324.267.523.522 1.054.756 1.59l-.366.105c-4.787 1.546-7.328 5.77-7.54 6.125A9.8 9.8 0 012.166 12.01zm9.834 9.824a9.78 9.78 0 01-6.043-2.075c.166-.34 2.054-3.97 7.29-5.798l.06-.02c1.31 3.397 1.846 6.25 1.985 7.067a9.76 9.76 0 01-3.292.826zm5.346-1.78c-.094-.563-.59-3.29-1.81-6.64 2.913-.466 5.463.292 5.78.398-.402 2.56-1.873 4.772-3.97 6.242z" />
                </svg>
              </span>
              <span>Dribbble</span>
            </a>

            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="connect-row"
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    backgroundColor: link.iconBg,
                  }}
                >
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* Availability badge */}
          <div className="connect-availability">
            <span className="connect-availability-dot" aria-hidden="true" />
            <span className="connect-availability-text">
              Open to full-time UX/UI roles and selective contract work. Portland, OR or remote.
            </span>
          </div>
        </div>
      </div>

      {/* Home link */}
      <a href="https://barreiro.com/" target="_blank" rel="noopener noreferrer" className="connect-home">
        Back to barreiro.com &rarr;
      </a>
    </main>
  );
}
