import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SpotifyJourneyMap from "@/components/SpotifyJourneyMap";
import SpotifyQuoteRotator from "@/components/SpotifyQuoteRotator";
import SpotifyRemoveAnimation from "@/components/SpotifyRemoveAnimation";

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
  bg:       "#FFFFFF",
  bgSection:"#FAFAF9",
  surface:  "#FFFFFF",
  border:   "#E8E4DE",
  borderStrong: "#C9BFB0",
  green:    "#1DB954",
};

const font = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
  sans:    "var(--font-dm-sans), -apple-system, sans-serif",
};

export default function SpotifyCaseStudy() {
  return (
    <>
      <Nav />

      <main className="cs-content-wrap" style={{ background: c.bg, paddingTop: "72px" }}>

        {/* ── Back link ───────────────────────────── */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "24px clamp(24px, 5vw, 80px) 0" }}>
          <Link
            href="/#work"
            style={{
              fontFamily:     font.sans,
              fontSize:       "13px",
              color:          c.muted,
              textDecoration: "none",
              display:        "inline-block",
            }}
          >
            ← Back to work
          </Link>
        </div>

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

          <div style={{ maxWidth: "none", margin: "0 auto" }}>
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
              Spotify&apos;s highest-visibility surface offers no way to manage what appears there. I designed three shelf-native controls (Pin, Remove, and Pause) that give users agency without degrading the recommendation engine.
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
                { label: "Methods",  value: "Competitive Audit · Persona Analysis · Constraint Mapping · AI-Assisted Research Synthesis" },
                { label: "Outcome",  value: "Three controls that close the gap between user need and platform capability, without breaking discovery" },
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
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
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
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 01 · Context & Problem ───────────────── */}
          <Section label="01" title="Context &amp; Problem">
            <p style={bodyText}>
              I noticed a gap in one of Spotify&apos;s highest-traffic surfaces: the Recently Played shelf sits at the top of every user&apos;s Home feed, updates automatically based on listening history, and offers no meaningful controls. No way to remove an item. No way to pin a favorite. No way to pause the feed from logging activity. The shelf is always visible, on your screen and on anyone else&apos;s. One user put it plainly: &ldquo;I don&apos;t want my partner&apos;s eyes to catch my home screen.&rdquo; That&apos;s not a UX complaint. That&apos;s a shelf with consequences.
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

          {/* ── 02 · Research / Discovery ────────────── */}
          <Section label="02" title="Research &amp; Discovery">
            <p style={bodyText}>
              No live users, no internal data, no brief. I built the research layer from public signals: Spotify community complaint threads, App Store reviews, UX forum posts, and a competitive audit across seven platforms. I used AI-assisted synthesis to cluster behavioral themes from 200+ community posts. It cut the analysis time significantly, but the judgment calls were still mine.
            </p>

            <h3 style={subheading}>Spotify Personas</h3>
            <p style={bodyText}>
              These three personas come from Spotify&apos;s own UX research. I used them as the lens for every design decision because they represent the real behavioral range of Recently Played users. The tension between them is what made the design hard: Melanie needs social curation, Dave needs fast access under time pressure, and Stephen tells you where the feature boundary is.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                {
                  name:    "Melodic Melanie",
                  type:    "Primary Persona",
                  img:     "/images/work/spotify/persona-melodic-melanie.webp",
                  quote:   "Why pay for it when it\u2019s free?",
                  bio:     "24, single, Pasadena. Freelance illustrator and UI designer. Budget-constrained. Uses free music-playing apps. Shares music with friends constantly and enjoys a wide variety of genres.",
                  goals:   "Inexpensive access to music for herself and for sharing with friends.",
                  pain:    "Recently Played surfaces embarrassing or accidental plays when she shares her screen. No way to clean it up before someone sees it.",
                  needs:   "Pin to surface favorites she\u2019d actually share. Remove to clear plays she wouldn\u2019t.",
                  tension: "Melanie is the social pressure case. If the shelf feels curated, she\u2019s comfortable sharing. If it doesn\u2019t, she stops showing her phone.",
                },
                {
                  name:    "Ranger Dave",
                  type:    "Secondary Persona",
                  img:     "/images/work/spotify/persona-ranger-dave.webp",
                  quote:   "You should pay for music to support the artists.",
                  bio:     "33, married, one toddler, Fremont. Sociologist at a tech startup. Commutes on BART. Pays for Spotify. Listens offline during transit. His taste has shifted as he\u2019s aged, and he doesn\u2019t share music with friends as often due to work and family.",
                  goals:   "Supporting music creatives. Listening without interruption from ads.",
                  pain:    "The shelf is noisy from commute listening and his son\u2019s music. He can\u2019t quickly get back to what he actually wants to hear.",
                  needs:   "Pin for fast access to go-to albums. Pause to protect recommendations during his son\u2019s listening sessions.",
                  tension: "Dave is the time-pressure case. He has 45 minutes on BART. Every tap matters. If the control takes more than two steps, he won\u2019t use it.",
                },
                {
                  name:    "Stephen Tan",
                  type:    "Negative Persona",
                  img:     "/images/work/spotify/persona-stephen-tan.webp",
                  quote:   "I stream my music to hear it first before committing to buy the ones I like.",
                  bio:     "43, married, one teenager, Irvine. Insurance agent. Had a flip phone until three years ago. Listens to a limited selection of favorites. Not interested in discovery or sharing.",
                  goals:   "Listen to a small set of favorite songs. Keep hassle to a minimum.",
                  pain:    "None related to Recently Played. He doesn\u2019t engage with the shelf or discovery surfaces.",
                  needs:   "Nothing from this feature set. Stephen defines the boundary.",
                  tension: "Stephen is the person these controls are not for. He validates the scope: if the design started trying to serve Stephen, it would mean the feature was too broad.",
                },
              ].map(({ name, type, img, quote, bio, goals, pain, needs, tension }) => (
                <div
                  key={name}
                  style={{
                    padding:      "28px",
                    background:   c.surface,
                    border:       `1px solid ${c.border}`,
                  }}
                >
                  <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", marginBottom: "16px" }}>
                    <Image
                      src={img}
                      alt={`${name} persona portrait`}
                      width={72}
                      height={72}
                      style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                        <p style={{ fontFamily: font.sans, fontSize: "16px", fontWeight: 600, color: c.ink, margin: 0 }}>{name}</p>
                        <span style={{ fontFamily: font.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: type === "Negative Persona" ? c.muted : c.accent }}>{type}</span>
                      </div>
                      <p style={{ fontFamily: font.display, fontSize: "15px", fontStyle: "italic", color: c.muted, margin: 0, lineHeight: 1.4 }}>
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>
                  </div>
                  <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.6, color: c.body, margin: "0 0 16px" }}>
                    {bio}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "16px" }}>
                    <Detail label="Goals" value={goals} />
                    <Detail label="Pain point" value={pain} />
                    <Detail label="What they need from this design" value={needs} />
                  </div>
                  <div style={{ paddingTop: "12px", borderTop: `1px solid ${c.border}` }}>
                    <p style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.muted, margin: 0 }}>
                      <span style={{ fontWeight: 600, color: c.body }}>Design tension:</span> {tension}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={subheading}>Competitive Audit</h3>
            <p style={bodyText}>
              I audited seven platforms. YouTube Music is the closest competitor with three of the four controls. Nobody offers on-shelf pinning.
            </p>

            {/* Competitive table */}
            <div className="cs-table-scroll" style={{ marginTop: "8px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
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
                    { platform: "YouTube Music",     remove: "✓", clear: "✓", pause: "✓", pin: "✗",  proposed: false },
                    { platform: "Spotify (current)",  remove: "✗", clear: "✗", pause: "✗", pin: "✗",  proposed: false },
                    { platform: "Spotify (proposed)", remove: "✓", clear: "✓", pause: "✓", pin: "✓",  proposed: true  },
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
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 03 · Design Decisions ────────────────── */}
          <Section label="03" title="Design Decisions">
            <p style={bodyText}>
              Pin, Remove, and Pause weren't the first ideas. They were what survived the filter. Early directions included global history clearing, a private listening mode, and surfacing controls from Settings. Each was ruled out: too broad in scope, too deep in the navigation stack, or too likely to degrade recommendation signals. What remained were three actions that could live on the shelf, complete in 1–2 steps, and reverse without permanent consequence.
            </p>
            <p style={bodyText}>
              Every decision was then filtered through one core constraint: <strong>don't break discovery.</strong> The shelf exists to surface content users want. Any control that weakens that signal is out of scope.
            </p>

            {/* Three controls overview diagram */}
            <div style={{
              margin:       "40px 0",
              background:   "#FFFFFF",
              borderRadius: "8px",
              padding:      "32px 24px",
              border:       `1px solid ${c.border}`,
            }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "720px", margin: "0 auto" }}>
                <Image
                  src="/images/work/spotify/spotify-overview-three-controls-cropped.webp"
                  alt="The three core actions: Pin item, Remove from Recently Played, and Pause Listening History. Each is shelf-native, reversible, and completes in 1 to 2 taps."
                  width={3640}
                  height={520}
                  sizes="(max-width: 860px) 100vw, 720px"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "12px",
                lineHeight:    1.5,
                color:         c.muted,
                textAlign:     "center",
                margin:        "20px 0 0",
              }}>
                Three actions. All shelf-native. All reversible. No settings menus, no buried toggles.
              </p>
            </div>

            <Callout label="Mid-project pivot">
              I originally led with Pin, the differentiation play. Mapping stakeholder priorities revealed that Remove was the higher-urgency fix. Real users weren&apos;t asking for curation. They were asking for relief. That re-sequencing changed the entire build order.
            </Callout>

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

          </Section>

          {/* ── 04 · Feature Details ─────────────────── */}
          <Section label="04" title="Feature Details">
            <p style={bodyText}>
              Each control earned its place by surviving the filter above. Here&apos;s the reasoning behind the specific decisions that shaped Pin, Remove, and Pause.
            </p>

            {/* Pin */}
            <FeatureCard
              number="01"
              name="Pin"
              tagline="Bring your favorites to the front"
              body="Community forums documented users playing one second of a track to push it to the top of Recently Played. That workaround is the evidence Pin isn't speculative. Cap at 4 keeps it lightweight and out of playlist territory."
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
              body="Per-item removal, device-scoped. Hides the item from the shelf without deleting listening history. The distinction is explicit in microcopy because Engineering and Support both flagged it as a top confusion risk."
              decisions={[
                "Device-scoped: satisfies privacy use case without touching global history or affecting recommendations signal.",
                "Does not delete history: protects recommendation integrity; avoids a misleading mental model.",
                "Undo available: keeps the action reversible; reduces CSAT risk.",
                "Microcopy matters here: 'Removed from this device. Doesn\u2019t delete your listening history.'",
              ]}
            />

            {/* Pause */}
            <FeatureCard
              number="03"
              name="Pause"
              tagline="Stop the clock on a session you'd rather not save"
              body="Time-boxed pause on history logging: 15 min, 1 hr, 3 hrs, or Until tomorrow. Auto-resumes at the selected time. This constraint came directly from ML: permanent pausing degrades training signal."
              decisions={[
                "Time-boxed only: permanent pause would degrade ML training signal. Ruled out in alignment with Recommendations & ML.",
                "Chip + Resume affordance: makes active pause state visible; gives users an easy escape hatch mid-session.",
                "Auto-resume: reduces cognitive load; users shouldn't need to remember to turn it back on.",
                "Start/see/stop in ≤3 clicks: the key metric for this feature; drove the chip placement decision.",
              ]}
            />

          </Section>

        </div>{/* /content wrapper (04-05) — break out for full-width walkthrough */}

        {/* ── Visual Walkthrough ──────────────────────────── */}
        <div style={{
          background:   c.ink,
          borderTop:    `1px solid rgba(245,243,239,0.08)`,
          borderBottom: `1px solid rgba(245,243,239,0.08)`,
          padding:      "72px clamp(24px, 5vw, 80px)",
          marginTop:    "48px",
        }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>

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
                Three controls, one surface
              </h2>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     0,
              }}>
                Every control lives behind the same long-press gesture on the Recently Played shelf. No settings menus, no buried toggles. Each action completes in 1–2 taps and every destructive action includes an Undo safety net.
              </p>
            </div>

            {/* ── Pin Flow ──────────────────── */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.green,
                margin:        "0 0 12px",
              }}>Pin</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Lock a favorite to the front of the shelf. No competitor offers on-shelf pinning. The item moves to position one and stays there until unpinned.
              </p>
              <div style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap:                 "clamp(16px, 3vw, 32px)",
                alignItems:          "start",
              }}>
                {[
                  {
                    src:     "/images/work/spotify/spotify-pin-01-long-press.webp",
                    alt:     "Long-press on a Recently Played item reveals the action sheet with Pin, Remove, and Pause controls",
                    label:   "01",
                    caption: "Long-press any item on the shelf. The action sheet surfaces all controls in one place.",
                  },
                  {
                    src:     "/images/work/spotify/spotify-pin-02-action.webp",
                    alt:     "Action sheet with Pin on top highlighted, showing the option to pin an item to the Recently Played shelf",
                    label:   "02",
                    caption: "Select Pin on top. Microcopy clarifies: removing hides it from this shelf, not from your library.",
                  },
                  {
                    src:     "/images/work/spotify/spotify-pin-03-result.webp",
                    alt:     "Recently Played shelf with The Roses pinned to position one, green pin indicator visible on album art",
                    label:   "03",
                    caption: "The Roses moves to position one with a pin indicator. The rest of the shelf shifts to accommodate.",
                  },
                ].map(({ src, alt, label, caption }) => (
                  <div key={`pin-${label}`}>
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

              {/* Pin micro-interaction annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Long-press hold (500ms)", why: "Prevents accidental triggers. Tap opens the item. Hold reveals controls." },
                  { detail: "Pin badge persists on album art", why: "Always visible without hovering or inspecting. Unpinning requires the same long-press path." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width:        "4px",
                      height:       "4px",
                      borderRadius: "50%",
                      background:   c.green,
                      flexShrink:   0,
                      marginTop:    "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans,
                      fontSize:   "12px",
                      lineHeight: 1.55,
                      color:      "rgba(245,243,239,0.4)",
                      margin:     0,
                    }}>
                      <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                      {" · "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Remove Flow ──────────────── */}
            <div style={{ marginBottom: "64px" }}>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.green,
                margin:        "0 0 12px",
              }}>Remove</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Hide an item from the shelf without deleting it from your library. Device-scoped, not global. The Undo toast is the safety net that made a trash layer unnecessary.
              </p>

              {/* Animated prototype preview + step narration + toast details */}
              <div style={{
                background:   "rgba(29,185,84,0.03)",
                border:       "1px solid rgba(29,185,84,0.1)",
                borderRadius: "12px",
                padding:      "clamp(16px, 3vw, 32px) clamp(12px, 3vw, 24px)",
                marginBottom: "48px",
              }}>
                <SpotifyRemoveAnimation />

                {/* 3-step narration — frames 1 / 2 / 3 of the loop */}
                <div className="cs-grid-collapse" style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap:                 "clamp(16px, 3vw, 32px)",
                  marginTop:           "clamp(24px, 4vw, 40px)",
                  paddingTop:          "clamp(24px, 4vw, 32px)",
                  borderTop:           "1px solid rgba(29,185,84,0.15)",
                }}>
                  {[
                    { label: "01", caption: "Same entry point. Long-press surfaces the same action sheet as Pin." },
                    { label: "02", caption: "Select Remove from Recently Played. The item is hidden from the shelf, not deleted from your library." },
                    { label: "03", caption: "Item gone. Shelf reflows immediately. The Undo toast sits above the Now Playing bar: reversible by default." },
                  ].map(({ label, caption }) => (
                    <div key={`remove-${label}`} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
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
                        color:      "rgba(245,243,239,0.55)",
                        margin:     0,
                      }}>{caption}</p>
                    </div>
                  ))}
                </div>

                {/* Toast design details */}
                <div style={{
                  display:       "flex",
                  flexDirection: "column",
                  gap:           "8px",
                  marginTop:     "clamp(20px, 3vw, 28px)",
                }}>
                  {[
                    { detail: "Toast above Now Playing bar", why: "Positioned where the eye already rests. Doesn't cover shelf content or block navigation." },
                    { detail: "3-4 second dismiss window", why: "Matches Spotify's existing toast timing. Long enough to read and act, short enough to feel lightweight." },
                    { detail: "Auto-dismiss completes the removal", why: "No second confirmation. Inaction is consent. The Undo toast is the entire safety net." },
                  ].map(({ detail, why }) => (
                    <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{
                        width:        "4px",
                        height:       "4px",
                        borderRadius: "50%",
                        background:   c.green,
                        flexShrink:   0,
                        marginTop:    "7px",
                      }} />
                      <p style={{
                        fontFamily: font.sans,
                        fontSize:   "12px",
                        lineHeight: 1.55,
                        color:      "rgba(245,243,239,0.4)",
                        margin:     0,
                      }}>
                        <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                        {" · "}{why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Pause Flow ──────────────── */}
            <div>
              <h3 style={{
                fontFamily:    font.sans,
                fontSize:      "13px",
                fontWeight:    700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.green,
                margin:        "0 0 12px",
              }}>Pause</h3>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "14px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     "0 0 24px",
                maxWidth:   "560px",
              }}>
                Stop the shelf from logging activity without leaving the app. Time-boxed to protect ML training signal. One toggle, same action sheet, instant feedback.
              </p>
              <div style={{
                display:             "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap:                 "clamp(16px, 3vw, 32px)",
                alignItems:          "start",
              }}>
                {[
                  {
                    src:     "/images/work/spotify/spotify-pause-01-long-press.webp",
                    alt:     "Long-press on a Recently Played item reveals the action sheet for the Pause flow",
                    label:   "01",
                    caption: "Same entry point again. All three controls share one gesture and one surface.",
                  },
                  {
                    src:     "/images/work/spotify/spotify-pause-02-toggle-off.webp",
                    alt:     "Action sheet showing Pause listening history toggle in the off position",
                    label:   "02",
                    caption: "Pause listening history toggle in its default off state. The toggle sits inline with the other controls.",
                  },
                  {
                    src:     "/images/work/spotify/spotify-pause-03-toggle-on.webp",
                    alt:     "Action sheet showing Pause listening history toggle switched on with green indicator",
                    label:   "03",
                    caption: "Toggle flipped. History pauses immediately. Time-boxed: resumes automatically to protect recommendation quality.",
                  },
                ].map(({ src, alt, label, caption }) => (
                  <div key={`pause-${label}`}>
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

              {/* Pause micro-interaction annotations */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
                {[
                  { detail: "Toggle inline in the action sheet", why: "No navigation to Settings. The control lives where the user already is." },
                  { detail: "Green track fill (#1DB954) on activation", why: "Instant visual confirmation. The color matches Spotify's primary action green across the app." },
                  { detail: "Time-boxed auto-revert", why: "Protects ML recommendation signal. The user doesn't have to remember to turn it back on." },
                ].map(({ detail, why }) => (
                  <div key={detail} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{
                      width:        "4px",
                      height:       "4px",
                      borderRadius: "50%",
                      background:   c.green,
                      flexShrink:   0,
                      marginTop:    "7px",
                    }} />
                    <p style={{
                      fontFamily: font.sans,
                      fontSize:   "12px",
                      lineHeight: 1.55,
                      color:      "rgba(245,243,239,0.4)",
                      margin:     0,
                    }}>
                      <span style={{ color: "rgba(245,243,239,0.65)", fontWeight: 600 }}>{detail}</span>
                      {" · "}{why}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Shelf State Diagram ──────────────────────── */}
        <div style={{
          background:   c.ink,
          borderBottom: `1px solid rgba(245,243,239,0.08)`,
          padding:      "56px clamp(24px, 5vw, 80px) 64px",
        }}>
          <div style={{ maxWidth: "none", margin: "0 auto" }}>
            <div style={{ marginBottom: "32px", maxWidth: "560px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <span style={{ width: "20px", height: "1px", background: c.green }} />
                <span style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color:         c.green,
                }}>System Model</span>
              </div>
              <h2 style={{
                fontFamily:    font.display,
                fontSize:      "clamp(22px, 3.5vw, 36px)",
                fontWeight:    400,
                color:         "#F5F5F4",
                margin:        "0 0 12px",
                letterSpacing: "-0.025em",
              }}>
                Every state is reachable and reversible
              </h2>
              <p style={{
                fontFamily: font.sans,
                fontSize:   "15px",
                lineHeight: 1.65,
                color:      "rgba(245,243,239,0.5)",
                margin:     0,
              }}>
                One entry point, three branches, and every path returns to Default. The dashed node is the only terminal state, and it takes deliberate inaction to reach it.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/work/spotify/spotify-shelf-state-diagram.svg"
              alt="State diagram showing five shelf states: Default Shelf, Action Sheet, Pinned, Removed plus Undo Toast, and Pause Active. Green arrows show forward actions from the Action Sheet. Muted return arrows show how each state resolves back to Default. The only terminal state is Removed permanent, reached when the Undo toast expires."
              style={{
                width:     "100%",
                maxWidth:  "860px",
                height:    "auto",
                margin:    "0 auto",
                display:   "block",
              }}
            />
          </div>
        </div>

        {/* ── Content wrapper (continued) ──────────────────────── */}
        <div style={{ maxWidth: "none", margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px)" }}>

          {/* ── 05 · Constraints & Tradeoffs ─────────── */}
          <Section label="05" title="Constraints &amp; Trade-offs">
            <p style={bodyText}>
              Every project has a perimeter. These defined the shape of the solution. The reasoning behind each decision matters as much as the decision itself.
            </p>

            {/* Desktop cross-platform evidence */}
            <div style={{
              margin:       "32px 0",
              background:   c.surface,
              borderRadius: "8px",
              border:       `1px solid ${c.border}`,
              overflow:     "hidden",
            }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "0 auto", padding: "24px 24px 0" }}>
                <Image
                  src="/images/work/spotify/spotify-desktop-context-menu-cropped.webp"
                  alt="Spotify desktop app showing the right-click context menu on a Recently Played item, demonstrating cross-platform consistency with the mobile long-press action sheet"
                  width={880}
                  height={940}
                  sizes="(max-width: 860px) 100vw, 640px"
                  style={{ width: "100%", height: "auto", borderRadius: "6px", border: `1px solid ${c.border}` }}
                />
              </div>
              <div style={{ padding: "16px 24px 20px" }}>
                <p style={{
                  fontFamily:    font.sans,
                  fontSize:      "11px",
                  fontWeight:    600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         c.accent,
                  margin:        "0 0 6px",
                }}>Cross-platform</p>
                <p style={{
                  fontFamily: font.sans,
                  fontSize:   "13px",
                  lineHeight: 1.6,
                  color:      c.body,
                  margin:     0,
                }}>
                  Desktop users access the same controls through right-click, matching existing Spotify paradigms. The interaction model stays consistent across surfaces without forcing mobile patterns onto desktop.
                </p>
              </div>
            </div>

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

          {/* ── 06 · Validation Plan ────────────────── */}
          <Section label="06" title="Validation Plan">
            <p style={bodyText}>
              This is a concept project. No live data exists. Instead of reporting numbers I don&apos;t have, I built the evaluation framework I&apos;d use to gate a launch decision: a moderated usability test with specific acceptance criteria per feature.
            </p>

            {/* Test protocol */}
            <div style={{
              margin:     "24px 0",
              padding:    "20px 24px",
              background: c.bgSection,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>Test Protocol</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                Moderated usability test. 6 participants across the four archetypes (Social Curator, Commuter, Parent on shared device, Explorer). Each participant completes three task scenarios: pin a specific item, remove an embarrassing play, and pause history before handing the phone to a friend. Sessions recorded. Think-aloud protocol. 45 minutes per session.
              </p>
            </div>

            {/* Threshold table with rationale */}
            <div className="cs-table-scroll" style={{ marginTop: "24px", border: `1px solid ${c.border}`, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: c.bgSection }}>
                    <th style={thStyle}>Feature</th>
                    <th style={thStyle}>Metric</th>
                    <th style={thStyle}>Threshold</th>
                    <th style={thStyle}>Rationale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Pin",    metric: "Taps to pin",              threshold: "≤ 2",       rationale: "Long-press + tap. If it takes more, the action sheet hierarchy failed." },
                    { feature: "Pin",    metric: "Reorder task time",         threshold: "< 3s",      rationale: "Benchmark: iOS Home Screen widget reorder averages 2.5s." },
                    { feature: "Remove", metric: "Time to remove + undo",    threshold: "≤ 6s",      rationale: "End-to-end: long-press, tap Remove, spot toast. 6s is generous. Under 4s signals strong discoverability." },
                    { feature: "Pause",  metric: "Start / see / stop",        threshold: "≤ 3 taps",  rationale: "Toggle on, confirm state change, toggle off. Three taps is the ceiling." },
                    { feature: "All",    metric: "Task error rate",           threshold: "≤ 5%",      rationale: "Industry benchmark for low-complexity touch tasks. Above 5% means the affordance is unclear." },
                    { feature: "All",    metric: "Post-task CSAT (top-2 box)", threshold: "≥ 80%",    rationale: "Collected after each task, not at end of session. Isolates per-feature satisfaction." },
                    { feature: "All",    metric: "UMUX-Lite lift vs. baseline", threshold: "+8 pts",  rationale: "Baseline: current Spotify shelf with no controls. +8 is a meaningful usability gain, not noise." },
                  ].map(({ feature, metric, threshold, rationale }, i) => (
                    <tr
                      key={`${feature}-${metric}`}
                      style={{ background: i % 2 === 0 ? c.surface : c.bg }}
                    >
                      <td style={tdStyle}>{feature}</td>
                      <td style={tdStyle}>{metric}</td>
                      <td style={{ ...tdStyle, fontWeight: 600, color: c.accent }}>{threshold}</td>
                      <td style={{ ...tdStyle, fontSize: "12px", color: c.muted }}>{rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Decision criteria */}
            <div style={{
              margin:     "24px 0 0",
              padding:    "20px 24px",
              background: c.surface,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>Decision Criteria</p>
              <p style={{ fontFamily: font.sans, fontSize: "14px", lineHeight: 1.65, color: c.body, margin: 0 }}>
                All feature-specific thresholds must pass for that feature to ship. If error rate or CSAT fails on a single feature, that feature gets a redesign cycle before re-test. UMUX-Lite is a directional signal, not a gate: if task metrics pass but UMUX-Lite is flat, the features ship and the team investigates perception gap in follow-up research.
              </p>
            </div>

            {/* Qualitative signals */}
            <div style={{
              margin:     "16px 0 0",
              padding:    "20px 24px",
              background: c.surface,
              border:     `1px solid ${c.border}`,
            }}>
              <p style={{
                fontFamily:    font.sans,
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:         c.muted,
                margin:        "0 0 12px",
              }}>Qualitative Signals to Watch</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {[
                  "Do participants discover long-press without prompting, or does the facilitator have to hint?",
                  "After removing an item, do participants look for the Undo toast or scan the shelf first?",
                  "Do participants understand that Pause is time-boxed, or do they expect it to last indefinitely?",
                  "When pinning, do participants expect the pinned item to stay after closing the app?",
                ].map((signal) => (
                  <p key={signal} style={{ fontFamily: font.sans, fontSize: "13px", lineHeight: 1.6, color: c.body, margin: 0, paddingLeft: "16px", textIndent: "-16px" }}>
                    <span style={{ color: c.accent, marginRight: "8px" }}>→</span>{signal}
                  </p>
                ))}
              </div>
            </div>
          </Section>

          {/* ── 07 · Reflection ──────────────────────── */}
          <Section label="07" title="Reflection">
            <p style={bodyText}>
              The hardest part of this project wasn&apos;t the UI. It was saying no. Every promising idea (global history delete, recommendation tuning, private mode) pulled toward a much larger system. The discipline of asking &ldquo;can this be done on-shelf, in 1&ndash;2 steps?&rdquo; killed more bad ideas than any critique.
            </p>
            <p style={bodyText}>
              Mapping stakeholder priorities did real work. Understanding what Product, ML, Privacy/Legal, and Engineering each cared about meant Remove and Pause were designed with the right constraints from the start, not retrofitted after pushback. Device-scoping Remove and time-boxing Pause weren&apos;t compromises; they were the correct decisions once the full system was visible.
            </p>
            <p style={bodyText}>
              The pivot from Pin-first to Remove-first (documented in Section 03) was the most consequential decision in the project. It came from mapping the full constraint picture. What I&apos;d add now: ship Remove in sprint one, observe what users actually do with it, then build Pin on validated behavior rather than assumed need. That sequencing change is a judgment call, not a scope call.
            </p>

            <h3 style={subheading}>If I had more time</h3>
            <p style={bodyText}>
              The Pause persistence across devices is where I&apos;d start. The current design is device-scoped, but a user who pauses on mobile and then switches to desktop is in an ambiguous state. That&apos;s not an edge case. That&apos;s the person most likely to use Pause in the first place. Resolving it requires a clear decision on the sync model: does Pause follow the user or the device? That&apos;s a Product and ML conversation, and it should happen before any state UI gets finalized.
            </p>
            <p style={bodyText}>
              The bigger open question is what happens when these controls interact. A user pins an item, then removes it. Does the pin persist in memory, or is it gone? A user pauses history, pins something during the pause, then unpauses. Does the pinned item show up in the Recently Played feed retroactively? These intersection states aren&apos;t edge cases. They&apos;re the scenarios that surface once real users start combining features in ways the designer didn&apos;t sequence. The state diagram covers the individual paths. The space between those paths is where the next round of design work lives.
            </p>
          </Section>

        </div>{/* /content wrapper */}

        {/* ── Slide deck CTA (compact inline bar) ───── */}
        <div
          style={{
            borderTop:   `1px solid ${c.border}`,
            padding:     "20px clamp(24px, 5vw, 80px)",
            marginTop:   "80px",
          }}
        >
          <div style={{
            maxWidth: "none",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <p style={{
              fontFamily: font.sans,
              fontSize:   "14px",
              color:      c.muted,
              margin:     0,
            }}>
              Prefer the narrative version?
            </p>
            <Link
              href="/work/presentations/spotify"
              style={{
                fontFamily:     font.sans,
                fontSize:       "14px",
                fontWeight:     600,
                color:          c.ink,
                textDecoration: "none",
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "4px",
              }}
            >
              View the slide deck
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Next case study CTA ──────────────────── */}
        <div
          style={{
            background:  c.bgSection,
            borderTop:   `1px solid ${c.border}`,
            padding:     "80px clamp(24px, 5vw, 80px)",
          }}
        >
          <div style={{ maxWidth: "none", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
            <div>
              <p style={{ fontFamily: font.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted, margin: "0 0 8px" }}>
                Next Case Study
              </p>
              <p style={{ fontFamily: font.display, fontSize: "clamp(20px, 3vw, 28px)", color: c.ink, margin: 0 }}>
                Men&apos;s Sole Revival
              </p>
            </div>
            <Link
              href="/work/mens-sole-revival"
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
              View Case Study
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
  bg:     "#FFFFFF",
  bgSection: "#FAFAF9",
  surface: "#FFFFFF",
  border: "#E8E4DE",
};

const f = {
  display: "var(--font-dm-sans), -apple-system, sans-serif",
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
  fontFamily:    "var(--font-dm-sans), -apple-system, sans-serif",
  fontSize:      "20px",
  fontWeight:    600,
  color:         "#252B28",
  margin:        "40px 0 16px",
  letterSpacing: "-0.015em",
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
