import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SpotifyJourneyMap from "@/components/SpotifyJourneyMap";
import SpotifyQuoteRotator from "@/components/SpotifyQuoteRotator";

export const metadata: Metadata = {
  title: "Spotify — Recently Played Controls · Alfonso Barreiro",
  description:
    "Case study: Pin, Remove, and Pause. Three reversible controls for Spotify's Recently Played shelf that give users agency without degrading recommendation integrity.",
  openGraph: {
    title: "Spotify — Recently Played Controls · Alfonso Barreiro",
    description:
      "A UX case study on designing reversible controls for Spotify's Recently Played shelf.",
    url: "https://barreiro.com/work/spotify",
    siteName: "Alfonso Barreiro",
    locale: "en_US",
    type: "article",
  },
};

/* ─────────────────────────────────────────────
   Color tokens (matching globals.css / Work.tsx)
───────────────────────────────────────────── */
const c = {
  ink:      "#252B28",
  body:     "#3D4440",
  muted:    "#8A8680",
  accent:   "#C17F4A",
  bg:       "#F5F5F4",
  bgSection:"#EBEBEA",
  surface:  "#FFFFFF",
  border:   "#E8E4DE",
  borderStrong: "#C9BFB0",
  green:    "#1DB954",
};

const font = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function SpotifyCaseStudy() {
  return (
    <>
      <Nav />

      <main style={{ background: c.bg, paddingTop: "72px" }}>

        {/* ── Hero ─────────────────────────────────── */}
        <header
          style={{
            background:  c.ink,
            padding:     "clamp(64px, 10vw, 120px) clamp(24px, 5vw, 80px)",
            position:    "relative",
            overflow:    "hidden",
          }}
        >
          {/* Spotify green accent bar */}
          <div style={{
            position:  "absolute",
            top:       0,
            left:      0,
            right:     0,
            height:    "3px",
            background: c.green,
          }} />

          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <span style={{ width: "24px", height: "1px", background: c.green }} />
              <span style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color:         c.green,
              }}>
                Spotify · UX Case Study
              </span>
            </div>

            <h1 style={{
              fontFamily:    font.display,
              fontSize:      "clamp(32px, 6vw, 64px)",
              fontWeight:    400,
              color:         "#F5F5F4",
              margin:        "0 0 16px",
              letterSpacing: "-0.03em",
              lineHeight:    1.05,
            }}>
              Recently Played Controls
            </h1>

            <p style={{
              fontFamily:  font.sans,
              fontSize:    "clamp(16px, 2.2vw, 20px)",
              lineHeight:  1.55,
              color:       "rgba(245,243,239,0.65)",
              margin:      "0 0 48px",
              maxWidth:    "560px",
            }}>
              Pin, Remove, and Pause: three reversible, shelf-native controls designed to give users agency over Spotify&apos;s Home feed without degrading recommendation integrity or breaking discovery behavior.
            </p>

            {/* Metadata row */}
            <div style={{
              display:   "flex",
              flexWrap:  "wrap",
              gap:       "32px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(245,243,239,0.1)",
            }}>
              {[
                { label: "Role",     value: "UX/UI Designer" },
                { label: "Type",     value: "Solo · Concept" },
                { label: "Timeline", value: "Nov – Dec 2025" },
                { label: "Methods",  value: "Competitive Audit · Archetype Synthesis · Constraint Mapping" },
                { label: "Outcome",  value: "3 shelf-native controls: reversible, device-scoped, ML signal intact" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: c.green, margin: "0 0 4px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", color: "rgba(245,243,239,0.75)", margin: 0 }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* ── Cover image ──────────────────────────── */}
        <div style={{ background: c.bgSection, padding: "64px clamp(24px, 5vw, 80px) 0" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image
                src="/images/work/spotify/spotify-hero-cover.webp"
                alt="Spotify Recently Played Controls — UI preview showing Pin, Remove, and Pause controls on the Home shelf"
                fill
                sizes="(max-width: 767px) 100vw, 860px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* ── Content wrapper ──────────────────────── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 01 · Context ─────────────────────────── */}
          <Section label="01" title="Context">
            <p style={bodyText}>
              Spotify&apos;s Recently Played shelf sits at the top of every user&apos;s Home feed, one of the highest-visibility surfaces in the app. It surfaces content automatically based on listening history, but offers no meaningful controls to users who want to manage what appears there. No way to remove an item. No way to pin a favorite. No way to temporarily pause the feed from logging activity.
            </p>
            <p style={bodyText}>
              This matters because the shelf is always visible: on your own screen and on anyone else&apos;s. Shared devices, embarrassing listening sessions, and binge sessions that skew recommendations all create real friction with no way to resolve it. Spotify once surfaced a remove control; it was deprecated, and the community requests never stopped.
            </p>
            <p style={bodyText}>
              One user put it plainly: &ldquo;I don&apos;t want my partner&apos;s eyes to catch my home screen.&rdquo; That&apos;s not a UX complaint. That&apos;s a shelf with consequences.
            </p>
            <Callout label="Design synthesis">
              &ldquo;Recently Played is highly visible on Home; users want fast, reversible control over what appears there, without harming discovery.&rdquo;
            </Callout>
          </Section>

          {/* ── Quote rotator ───────────────────────── */}
          <div style={{ width: "100%", marginTop: "48px", borderTop: `1px solid ${c.border}`, paddingTop: "32px" }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         c.accent,
              margin:        "0 0 16px",
            }}>
              What users said
            </p>
            <SpotifyQuoteRotator />
          </div>

          {/* ── 02 · Problem ─────────────────────────── */}
          <Section label="02" title="The Problem">
            <p style={bodyText}>
              Spotify surfaces what you've played, but gives you no way to shape what stays. The shelf fills itself. A shared device exposes your listening history. A binge session rewrites your recommendations. There's no way to intervene.
            </p>
            <p style={bodyText}>
              Three friction points emerged, each pointing to a different kind of control:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "4px" }}>
              {[
                {
                  label: "Clutter",
                  text: "The shelf gets crowded with low-signal content. Users want to surface favorites without digging, but pinning doesn't exist.",
                },
                {
                  label: "Embarrassment",
                  text: "Shared devices expose listening history publicly on screen. Users need a way to remove specific items. Per-device, not globally.",
                },
                {
                  label: "Recommendation drift",
                  text: "An atypical listening session shouldn't poison future recommendations. Users need a time-boxed way to pause history logging.",
                },
              ].map(({ label, text }) => (
                <div
                  key={label}
                  className="cs-problem-card"
                  style={{
                    display:      "flex",
                    gap:          "20px",
                    padding:      "20px 24px",
                    background:   c.surface,
                    border:       `1px solid ${c.border}`,
                  }}
                >
                  <span className="cs-problem-label" style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, minWidth: "160px", flexShrink: 0, paddingTop: "2px" }}>
                    {label}
                  </span>
                  <p style={{ fontFamily: font.sans, fontSize: "15px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 03 · Research / Discovery ────────────── */}
          <Section label="03" title="Research &amp; Discovery">
            <p style={bodyText}>
              Without live access to users, I built a structured proxy research layer: behavioral archetypes synthesized from Spotify community complaint threads, UX forum posts, and App Store reviews; a competitive audit across seven platforms; and constraint interviews modeled on what Product, ML, Privacy/Legal, and Engineering typically surface in discovery. The goal was to make decisions that would survive real cross-functional scrutiny, not just design-plausible assumptions.
            </p>

            <h3 style={subheading}>User Archetypes</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                {
                  name:  "Social Curator (Melodic Melanie)",
                  need:  "Curated social sharing",
                  pain:  "Recently Played surfaces accidental or embarrassing plays when sharing her screen with friends. No way to clean it up first.",
                  needs: "Pin to surface favorites she'd actually share; Remove to clear plays she wouldn't",
                },
                {
                  name:  "Commuter (Ranger Dave)",
                  need:  "Fast cleanup, focus sessions",
                  pain:  "Shelf is noisy; can't quickly return to go-to music",
                  needs: "Pin/Remove with clear, reversible feedback",
                },
                {
                  name:  "Parent (shared device)",
                  need:  "Privacy control",
                  pain:  "Kids' listening contaminates recommendations; shelf is visible to others",
                  needs: "Remove + Pause scoped to this device only",
                },
                {
                  name:  "Explorer (heavy Home user)",
                  need:  "Minimal friction, fast return",
                  pain:  "Deep listening sessions overwrite shelf with rabbit-hole content",
                  needs: "Pin for fast return; Pause to protect recommendations during deep dives",
                },
              ].map(({ name, need, pain, needs }) => (
                <div
                  key={name}
                  style={{
                    padding:      "24px",
                    background:   c.surface,
                    border:       `1px solid ${c.border}`,
                  }}
                >
                  <p style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 600, color: c.ink, margin: "0 0 12px" }}>{name}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
                    <Detail label="Core need" value={need} />
                    <Detail label="Pain point" value={pain} />
                    <Detail label="What they need from this design" value={needs} />
                  </div>
                </div>
              ))}
            </div>

            <h3 style={subheading}>Competitive Audit</h3>
            <p style={bodyText}>
              I audited seven platforms against the controls in scope: Apple Music, YouTube Music, Amazon Music, SoundCloud, TIDAL, Deezer, and Pandora. The table below shows the three most directly comparable. Spotify currently offers none of the controls on-shelf. Remove and Pause bring it to parity; Pin is the differentiator no competitor has touched.
            </p>

            {/* Competitive table */}
            <div style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    {["Platform", "Remove", "Clear All", "Pause History", "Pin to Shelf"].map((h) => (
                      <th key={h} style={thStyle}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { platform: "YouTube Music",     remove: "✓",               clear: "✓", pause: "✓",          pin: "✗",  proposed: false },
                    { platform: "Apple Music",        remove: "✗",               clear: "✓", pause: "✓ (buried)", pin: "✗",  proposed: false },
                    { platform: "Amazon Music",       remove: "✓ (inconsistent)",clear: "✗", pause: "✗",          pin: "✗",  proposed: false },
                    { platform: "Spotify (current)",  remove: "✗",               clear: "✗", pause: "✗",          pin: "✗",  proposed: false },
                    { platform: "Spotify (proposed)", remove: "✓",               clear: "✓", pause: "✓",          pin: "✓",  proposed: true  },
                  ].map(({ platform, remove, clear, pause, pin, proposed }, i) => (
                    <tr key={platform} style={{ background: proposed ? "rgba(29,185,84,0.06)" : i % 2 === 0 ? c.surface : c.bg }}>
                      <td style={{ ...tdStyle, fontWeight: proposed ? 600 : 400, color: proposed ? c.ink : c.body }}>{platform}</td>
                      <td style={{ ...tdStyle, color: remove.startsWith("✓") ? c.green : c.muted }}>{remove}</td>
                      <td style={{ ...tdStyle, color: clear.startsWith("✓") ? c.green : c.muted }}>{clear}</td>
                      <td style={{ ...tdStyle, color: pause.startsWith("✓") ? c.body : c.muted }}>{pause}</td>
                      <td style={{ ...tdStyle, color: pin === "✓" ? c.green : c.muted, fontWeight: pin === "✓" ? 700 : 400 }}>{pin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, marginTop: "10px", fontSize: "13px", color: c.muted }}>
              Takeaway: Ship Remove + Pause to reach parity. Add Pin to differentiate.
            </p>

            {/* Point of Reference image */}
            <div style={{ marginTop: "32px" }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>
                Point of Reference
              </p>
              <div style={{ border: `1px solid ${c.border}`, overflow: "hidden" }}>
                <Image
                  src="/images/work/spotify/spotify-competitive-ref.webp"
                  alt="Point of Reference — Baseline and market snapshot showing Spotify's gap vs YouTube Music, Apple Music, and Amazon Music"
                  width={1920}
                  height={1080}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          </Section>

        </div>{/* /content wrapper — break for journey map */}

        {/* ── User Journey Map ─────────────────────────────────── */}
        <SpotifyJourneyMap />

        {/* ── Content wrapper (continued: 04) ──────────────────────── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 04 · Design Decisions ────────────────── */}
          <Section label="04" title="Design Decisions">
            <p style={bodyText}>
              Pin, Remove, and Pause weren't the first ideas. They were what survived the filter. Early directions included global history clearing, a private listening mode, and surfacing controls from Settings. Each was ruled out: too broad in scope, too deep in the navigation stack, or too likely to degrade recommendation signals. What remained were three actions that could live on the shelf, complete in 1–2 steps, and reverse without permanent consequence.
            </p>
            <p style={bodyText}>
              Every decision was then filtered through one core constraint: <strong>don't break discovery.</strong> The shelf exists to surface content users want. Any control that weakens that signal is out of scope.
            </p>

            {/* Stakeholder priorities */}
            <div
              style={{
                margin:     "32px 0",
                border:     `1px solid ${c.border}`,
                overflow:   "hidden",
              }}
            >
              <div style={{
                padding:    "16px 24px",
                background: c.bgSection,
                borderBottom: `1px solid ${c.border}`,
              }}>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.muted,
                  margin:        0,
                }}>
                  Stakeholder Priorities: Mapped Before Any Decision
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {[
                  { team: "Product",       concern: "Differentiation + engagement lift",        impact: "Pin is the greenfield feature; Remove + Pause reach parity first" },
                  { team: "ML / Recs",     concern: "Training signal integrity",                 impact: "Permanent pause ruled out. Time-boxing is the constraint that survives" },
                  { team: "Privacy / Legal", concern: "Data handling scope",                    impact: "Remove is device-scoped; global deletion requires a different flow" },
                  { team: "Engineering",   concern: "Sync model complexity",                     impact: "Pin capped at 4; chip-based state avoids a heavy backend rewrite" },
                ].map(({ team, concern, impact }, i) => (
                  <div
                    key={team}
                    style={{
                      padding:      "20px 24px",
                      background:   c.surface,
                      borderRight:  i < 3 ? `1px solid ${c.border}` : "none",
                      borderTop:    "none",
                    }}
                  >
                    <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, margin: "0 0 8px" }}>
                      {team}
                    </p>
                    <p style={{ fontFamily: font.sans, fontSize: "13px", fontWeight: 600, color: c.ink, margin: "0 0 6px", lineHeight: 1.4 }}>
                      {concern}
                    </p>
                    <p style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.body, margin: 0 }}>
                      {impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pin */}
            <FeatureCard
              number="01"
              name="Pin"
              tagline="Bring your favorites to the front"
              body="The need for Pin wasn't speculative. Community forums documented a workaround: users were playing one second of a track just to push it to the top of Recently Played. That's not a power-user habit. It's a signal that the behavior users wanted (surfacing something they care about) had no supported path. Users can pin up to 4 items to the shelf. Pinned items surface in a dedicated Pinned row above the standard shelf, with drag-to-reorder and Undo support. The cap at 4 was a deliberate tradeoff: it keeps the interaction lightweight and prevents the feature from becoming a full playlist management system, which is out of scope."
              decisions={[
                "Cap at 4 pins: prevents scope creep into playlist management; keeps taps-to-pin ≤2.",
                "Visible Pinned row: makes the feature discoverable; signals clearly that pinning does something.",
                "Undo on pin/unpin: reversibility is a first-class affordance, not an afterthought.",
                "Drag/↑↓ reorder: gives power users control over order without requiring a separate screen.",
              ]}
            />

            {/* Remove */}
            <FeatureCard
              number="02"
              name="Remove"
              tagline="Clean up the shelf without losing history"
              body="Per-item removal from the shelf, scoped to the current device. Removal doesn't delete listening history. It just hides the item from the shelf. This distinction is explicit in the microcopy. Undo is available right after removal. A device-scoped 'clear all' is also available for users who need a full reset."
              decisions={[
                "Device-scoped: satisfies privacy use case without touching global history or affecting recommendations signal.",
                "Does not delete history: protects recommendation integrity; avoids a misleading mental model.",
                "Undo available: keeps the action reversible; reduces CSAT risk.",
                "Microcopy matters here: 'Removed from this device. Doesn\u2019t delete your listening history.' Engineering and Support both flagged this as a top priority.",
              ]}
            />

            {/* Pause */}
            <FeatureCard
              number="03"
              name="Pause"
              tagline="Stop the clock on a session you'd rather not save"
              body="A time-boxed pause on history logging: 15 min, 1 hr, 3 hrs, or Until tomorrow. A persistent chip appears in the shelf while Pause is active. It resumes automatically at the selected time. No manual re-enable required. This design came directly from a stakeholder constraint: Recommendations & ML flagged that permanent pausing would degrade model training data."
              decisions={[
                "Time-boxed only: permanent pause would degrade ML training signal. Ruled out in alignment with Recommendations & ML.",
                "Chip + Resume affordance: makes active pause state visible; gives users an easy escape hatch mid-session.",
                "Auto-resume: reduces cognitive load; users shouldn't need to remember to turn it back on.",
                "Start/see/stop in ≤3 clicks: the key metric for this feature; drove the chip placement decision.",
              ]}
            />

          </Section>

        </div>{/* /content wrapper (04) — break out for full-width walkthrough */}

        {/* ── Visual Walkthrough ──────────────────────────── */}
        <div style={{
          background:   c.ink,
          borderTop:    `1px solid rgba(245,243,239,0.08)`,
          borderBottom: `1px solid rgba(245,243,239,0.08)`,
          padding:      "72px clamp(24px, 5vw, 80px)",
          marginTop:    "48px",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "48px", maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "20px", height: "1px", background: c.green }} />
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.green,
                }}>The Solution</span>
              </div>
              <h2 style={{
                fontFamily:    font.display,
                fontSize:      "clamp(22px, 3.5vw, 36px)",
                fontWeight:    400,
                color:         "#F5F5F4",
                margin:        "0 0 16px",
                letterSpacing: "-0.025em",
              }}>
                Screen walkthrough
              </h2>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     0,
              }}>
                Long-press any item on the Recently Played shelf to reveal controls. Each action completes in 1–2 taps with an Undo safety net.
              </p>
            </div>

            {/* 3-screen grid */}
            <div style={{
              display:             "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap:                 "clamp(16px, 3vw, 32px)",
              alignItems:          "start",
            }}>
              {[
                {
                  src:     "/images/work/spotify/spotify-home-default.webp",
                  alt:     "Default Spotify Home showing the Recently Played shelf, no controls visible",
                  label:   "01",
                  caption: "The shelf as users see it today. Long-press any item to access controls.",
                },
                {
                  src:     "/images/work/spotify/spotify-action-sheet.webp",
                  alt:     "Action sheet revealing Remove, Don't Suggest Similar, Pause History, and Clear All options",
                  label:   "02",
                  caption: "Remove, Don't Suggest Similar, Pause History, Clear All: all in 1-2 taps. Microcopy clarifies scope: \u201cRemoving hides it from this shelf.\u201d",
                },
                {
                  src:     "/images/work/spotify/spotify-after-remove.webp",
                  alt:     "Spotify Home shelf after removal: item gone, shelf reflowed, Undo toast visible",
                  label:   "03",
                  caption: "The Roses removed. Shelf reflows immediately. Undo toast available for 10 seconds.",
                },
              ].map(({ src, alt, label, caption }) => (
                <div key={label}>
                  <div style={{
                    position:     "relative",
                    aspectRatio:  "390 / 844",
                    overflow:     "hidden",
                    background:   "rgba(245,243,239,0.04)",
                    border:       "1px solid rgba(245,243,239,0.1)",
                    borderRadius: "12px",
                  }}>
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "top" }}
                    />
                  </div>
                  <div style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily:    font.sans,
                      fontSize:      "10px",
                      fontWeight:    700,
                      letterSpacing: "0.14em",
                      color:         c.green,
                      paddingTop:    "2px",
                      flexShrink:    0,
                    }}>{label}</span>
                    <p style={{
                      fontFamily: font.sans,
                      fontSize:   "13px",
                      lineHeight: 1.65,
                      color:      "rgba(245,243,239,0.5)",
                      margin:     0,
                    }}>{caption}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Content wrapper (continued) ──────────────────────── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 05 · Constraints & Tradeoffs ─────────── */}
          <Section label="05" title="Constraints &amp; Trade-offs">
            <p style={bodyText}>
              Every project has a perimeter. These defined the shape of the solution. The reasoning behind each decision matters as much as the decision itself.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
              {[
                {
                  type:   "Out of scope",
                  item:   "Editing global listening history",
                  reason: "This touches a different surface (Settings → Privacy) and a different stakeholder group. Scoping it here would expand the project beyond one sprint and dilute focus.",
                },
                {
                  type:   "Out of scope",
                  item:   "Changing ranking algorithms",
                  reason: "Recommendation logic is owned by a separate team. Any ranking changes would require cross-team alignment that's out of scope for a shelf-level UX feature.",
                },
                {
                  type:   "Out of scope",
                  item:   "Profile privacy redesign",
                  reason: "The privacy complaints are real, but they're systemic. Not solvable by a shelf control. Addressing this here would be a band-aid on a bigger problem.",
                },
                {
                  type:   "Out of scope",
                  item:   "History Trash",
                  reason: "The research included a 'History Trash' concept: a secondary space holding 30 days of removed items. It was cut. The Undo toast accomplishes the same goal with less cognitive load and no additional surface to manage. A trash layer introduces a mental model question (is this gone, or just hidden?) that the current design avoids entirely. Undo is the answer. Trash is scope creep.",
                },
                {
                  type:   "Constraint",
                  item:   "Pause must be time-boxed",
                  reason: "Recommendations & ML: permanent pause degrades training signal quality over time. Time-boxing was the negotiated middle ground.",
                },
                {
                  type:   "Constraint",
                  item:   "Remove is device-scoped only",
                  reason: "Privacy/Legal: global history deletion requires explicit user confirmation flows and different data handling. Device-scoped remove is a much lighter lift with the same UX benefit for the target use case.",
                },
                {
                  type:   "Constraint",
                  item:   "Pin cap at 4",
                  reason: "Engineering: a lightweight chip-based sync model breaks down past 4 items. Keeps the feature fast and avoids overbuilding into playlist territory.",
                },
              ].map(({ type, item, reason }) => (
                <div key={item} style={{ display: "flex", gap: "16px", padding: "20px 24px", background: c.surface, border: `1px solid ${c.border}` }}>
                  <span style={{
                    fontFamily:    font.sans,
                    fontSize:      "10px",
                    fontWeight:    700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color:         type === "Out of scope" ? c.muted : c.accent,
                    minWidth:      "88px",
                    paddingTop:    "2px",
                  }}>
                    {type}
                  </span>
                  <div>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", fontWeight: 600, color: c.ink, margin: "0 0 6px" }}>{item}</p>
                    <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 06 · Design Principles ───────────────── */}
          <Section label="06" title="Design Principles">
            <p style={bodyText}>
              These weren&apos;t decorative values. They were active filters. Every interaction decision got checked against these four constraints before it moved forward.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginTop: "24px" }}>
              {[
                { principle: "Reversible by default", desc: "Every action has an undo. No permanent changes without confirmation." },
                { principle: "Device scope is explicit", desc: "Actions that affect only this device say so in microcopy. Always." },
                { principle: "On-shelf, 1–2 steps", desc: "Controls live in context. No deep navigation, no modal stacks." },
                { principle: "Don't break discovery", desc: "The shelf exists to surface content. Controls that degrade that signal are out of scope." },
              ].map(({ principle, desc }) => (
                <div
                  key={principle}
                  style={{ padding: "24px", background: c.surface, border: `1px solid ${c.border}` }}
                >
                  <div style={{ width: "24px", height: "2px", background: c.accent, marginBottom: "16px" }} />
                  <p style={{ fontFamily: font.display, fontSize: "17px", color: c.ink, margin: "0 0 10px", lineHeight: 1.3 }}>{principle}</p>
                  <p style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.65, color: c.muted, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ── 07 · Success Metrics ─────────────────── */}
          <Section label="07" title="Validation Plan">
            <p style={bodyText}>
              This is a concept project. There were no live metrics to report. What I defined instead was a validation plan: specific, measurable acceptance criteria for each feature, structured around a moderated usability test. These are the thresholds I'd use to gate a launch decision.
            </p>
            <div style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    <th style={thStyle}>Feature</th>
                    <th style={thStyle}>Metric</th>
                    <th style={thStyle}>Threshold</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Pin",    metric: "Taps to pin",              threshold: "≤ 2" },
                    { feature: "Pin",    metric: "Reorder task time",         threshold: "< 3s" },
                    { feature: "Remove", metric: "Time to remove",            threshold: "≤ 6s" },
                    { feature: "Pause",  metric: "Start / see / stop Pause",  threshold: "≤ 3 clicks" },
                    { feature: "All",    metric: "Error rate",                threshold: "≤ 5%" },
                    { feature: "All",    metric: "Top-2 CSAT",                threshold: "≥ 80%" },
                    { feature: "All",    metric: "UMUX-Lite lift",            threshold: "+8" },
                  ].map(({ feature, metric, threshold }, i) => (
                    <tr
                      key={`${feature}-${metric}`}
                      style={{ background: i % 2 === 0 ? c.surface : c.bg }}
                    >
                      <td style={tdStyle}>{feature}</td>
                      <td style={tdStyle}>{metric}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.accent }}>{threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ ...bodyText, marginTop: "16px", fontSize: "13px", color: c.muted }}>
              Proxy metrics: no live data. These thresholds were validated against task-completion benchmarks from published Spotify usability research and competitive analysis of similar shelf-level controls.
            </p>
          </Section>

          {/* ── 08 · Reflection ──────────────────────── */}
          <Section label="08" title="Reflection">
            <p style={bodyText}>
              The most interesting design challenge here wasn&apos;t the UI. It was the scope constraint. Every promising idea (global history delete, recommendation tuning, private mode) pulled toward a much larger, more complex system. The discipline of asking &ldquo;can this be done on-shelf, in 1&ndash;2 steps?&rdquo; killed more bad ideas than any critique.
            </p>
            <p style={bodyText}>
              Mapping stakeholder priorities did real work. Understanding what Product, ML, Privacy/Legal, and Engineering each cared about meant Remove and Pause were designed with the right constraints from the start, not retrofitted after pushback. Device-scoping Remove and time-boxing Pause weren&apos;t compromises; they were the correct decisions once the full system was visible.
            </p>
            <p style={bodyText}>
              In retrospect, I led with Pin, the differentiation play, when Remove was the higher-urgency fix. Real users filing complaints weren&apos;t asking for curation; they were asking for relief. I would re-sequence: ship Remove in sprint one, observe what users actually do with it, then build Pin on validated behavior rather than assumed need. That sequencing change is a judgment call, not a scope call. It took mapping the full constraint picture to see it clearly.
            </p>

            <h3 style={subheading}>If I had more time</h3>
            <p style={bodyText}>
              The Pause persistence across devices is where I&apos;d start. The current design is device-scoped, but a user who pauses on mobile and then switches to desktop is in an ambiguous state. That&apos;s not an edge case. That&apos;s the person most likely to use Pause in the first place. Resolving it requires a clear decision on the sync model: does Pause follow the user or the device? That&apos;s a Product and ML conversation, and it should happen before any state UI gets finalized.
            </p>
            <p style={bodyText}>
              From there: run moderated usability tests with 5&ndash;6 participants across the four archetypes to pressure-test the 1&ndash;2 step constraint and catch any blind spots around the Pause chip visibility. Then prototype the Pinned row reorder on mobile. Drag handles on touch surfaces have real accessibility and ergonomics trade-offs that don&apos;t show up in static designs. The handoff spec comes last: 44&times;44 tap targets, contrast ratios, and the exact Undo timeout window are all unresolved in the current prototype. Not glamorous, but it&apos;s what makes the feature shippable.
            </p>
          </Section>

        </div>{/* /content wrapper */}

        {/* ── Case Study Slides (deep-dive, post-reflection) ── */}
        <div className="cs-slides-section" style={{
          background:   c.bgSection,
          borderTop:    `1px solid ${c.border}`,
          borderBottom: `1px solid ${c.border}`,
          padding:      "56px clamp(24px, 5vw, 80px)",
          marginTop:    "80px",
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <p style={{
              fontFamily:    font.sans,
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:         c.muted,
              margin:        "0 0 6px",
            }}>
              Case Study Slides
            </p>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "14px",
              color:      c.body,
              margin:     "0 0 20px",
            }}>
              The full narrative deck, if you want to go deeper on any section.
            </p>
            <div className="cs-slides-outer" style={{
              position:      "relative",
              paddingBottom: "56.25%",
              height:        0,
              overflow:      "hidden",
              border:        `1px solid ${c.border}`,
              background:    c.ink,
            }}>
              <iframe
                style={{
                  position: "absolute",
                  top:      0,
                  left:     0,
                  width:    "100%",
                  height:   "100%",
                  border:   "none",
                }}
                src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent("https://www.figma.com/proto/JrM6jElfVB1XXXVNWN980v/Spotify-Recently-Played-Features-Case-Study?node-id=328-5692&scaling=scale-down&content-scaling=fixed&starting-point-node-id=328-5692&page-id=156-4537")}`}
                allowFullScreen
                title="Spotify Recently Played Controls: Case Study Slides"
              />
            </div>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "12px",
              color:      c.muted,
              margin:     "10px 0 0",
            }}>
              Use arrow keys or click to advance. No Figma account required.
            </p>
          </div>
        </div>

        {/* ── Next case study CTA ──────────────────── */}
        <div
          style={{
            background:  c.bgSection,
            borderTop:   `1px solid ${c.border}`,
            padding:     "80px clamp(24px, 5vw, 80px)",
            marginTop:   "80px",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>
                Next Case Study
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 28px)", color: c.ink, margin: 0 }}>
                Wayfarer — Travel Planning Site
              </p>
            </div>
            <Link
              href="/#work"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "10px",
                padding:        "12px 28px",
                background:     c.ink,
                borderRadius:   "8px",
                color:          "#F5F5F4",
                fontFamily:     font.sans,
                fontSize:       "13px",
                fontWeight:     500,
                letterSpacing:  "0.06em",
                textDecoration: "none",
                transition:     "opacity 0.2s",
              }}
            >
              Back to Portfolio
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

const c2 = {
  ink:    "#252B28",
  body:   "#3D4440",
  muted:  "#8A8680",
  accent: "#C17F4A",
  bg:     "#F5F5F4",
  bgSection: "#EBEBEA",
  surface: "#FFFFFF",
  border: "#E8E4DE",
};

const f = {
  display: "var(--font-dm-serif-display), Georgia, serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        paddingTop:    "48px",
        paddingBottom: "16px",
        borderTop:     `1px solid ${c2.border}`,
        marginTop:     "48px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "32px" }}>
        <span style={{
          fontFamily:    f.sans,
          fontSize:      "11px",
          fontWeight:    700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         c2.accent,
        }}>
          {label}
        </span>
        <h2
          style={{
            fontFamily:    f.display,
            fontSize:      "clamp(22px, 3.5vw, 36px)",
            fontWeight:    400,
            color:         c2.ink,
            margin:        0,
            letterSpacing: "-0.025em",
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      {children}
    </section>
  );
}

function Callout({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <blockquote style={{
      margin:      "32px 0",
      padding:     "24px 28px",
      background:  c2.surface,
      border:      `1px solid ${c2.border}`,
      borderLeft:  `3px solid ${c2.accent}`,
    }}>
      {label && (
        <p style={{
          fontFamily:    f.sans,
          fontSize:      "10px",
          fontWeight:    700,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color:         c2.accent,
          margin:        "0 0 10px",
        }}>
          {label}
        </p>
      )}
      <p style={{
        fontFamily:  f.display,
        fontSize:    "clamp(17px, 2.2vw, 20px)",
        lineHeight:  1.5,
        color:       c2.ink,
        fontStyle:   "italic",
        margin:      0,
      }}>
        {children}
      </p>
    </blockquote>
  );
}

function FeatureCard({
  number, name, tagline, body, decisions,
}: {
  number: string;
  name: string;
  tagline: string;
  body: string;
  decisions: string[];
}) {
  return (
    <div style={{ marginTop: "40px", border: `1px solid ${c2.border}`, overflow: "hidden" }}>
      {/* Header */}
      <div style={{
        display:        "flex",
        alignItems:     "baseline",
        gap:            "16px",
        padding:        "24px 28px",
        background:     c2.bgSection,
        borderBottom:   `1px solid ${c2.border}`,
      }}>
        <span style={{ fontFamily: f.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c2.accent }}>{number}</span>
        <div>
          <h3 style={{ fontFamily: f.display, fontSize: "22px", fontWeight: 400, color: c2.ink, margin: "0 0 2px" }}>{name}</h3>
          <p style={{ fontFamily: f.sans, fontSize: "13px", color: c2.muted, margin: 0 }}>{tagline}</p>
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: "28px" }}>
        <p style={{ fontFamily: f.sans, fontSize: "15px", lineHeight: 1.7, color: c2.body, margin: "0 0 24px" }}>{body}</p>
        <p style={{ fontFamily: f.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c2.muted, margin: "0 0 12px" }}>
          Key Decisions
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {decisions.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: c2.accent, marginTop: "8px", flexShrink: 0 }} />
              <p style={{ fontFamily: f.sans, fontSize: "14px", lineHeight: 1.65, color: c2.body, margin: 0 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontFamily: f.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c2.muted, margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontFamily: f.sans, fontSize: "13px", lineHeight: 1.55, color: c2.body, margin: 0 }}>{value}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Shared style objects
───────────────────────────────────────────── */

const bodyText: React.CSSProperties = {
  fontFamily:  "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:    "16px",
  lineHeight:  1.75,
  color:       "#3D4440",
  margin:      "0 0 20px",
};

const subheading: React.CSSProperties = {
  fontFamily:    "var(--font-dm-serif-display), Georgia, serif",
  fontSize:      "20px",
  fontWeight:    400,
  color:         "#252B28",
  margin:        "40px 0 16px",
  letterSpacing: "-0.02em",
};

const thStyle: React.CSSProperties = {
  fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:      "11px",
  fontWeight:    700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color:         "#8A8680",
  padding:       "12px 16px",
  textAlign:     "left",
  borderBottom:  "1px solid #E8E4DE",
};

const tdStyle: React.CSSProperties = {
  fontFamily:  "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:    "14px",
  color:       "#3D4440",
  padding:     "14px 16px",
  borderBottom: "1px solid #E8E4DE",
};
