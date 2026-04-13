// MSR Case Study — Slide 1: Cover / Hero
// Adapted from mens-sole-revival/app/case-study/page.tsx
// Image paths updated to /images/work/msr/; CaseStudyNav removed.

import Image from "next/image";

const stats = [
  { value: "1 in 4",  label: "men over 40 experience chronic foot pain",    context: "That\u2019s probably someone in your household." },
  { value: "63\u201372%", label: "of adults wear shoes that don\u2019t fit them correctly", context: "The most upstream variable. And the most fixable." },
];

const articles = [
  { title: "Your Big Toe Controls More of Your Body Than You Think", category: "Toe Alignment", readTime: "6 min", image: "/images/work/msr/pexels-9467290.jpg" },
  { title: "Cracked Heels: The Fix That Isn\u2019t a Pumice Stone",  category: "Dry Skin",      readTime: "5 min", image: "/images/work/msr/pexels-29145634.jpg" },
];

export default function Slide1() {
  return (
    <main className="relative overflow-hidden" style={{ width: 1440, height: 900, background: "#F8F7F7" }}>
      <div className="flex h-[900px]">

        {/* LEFT PANEL */}
        <div className="relative flex flex-col justify-between px-12 py-14" style={{ width: 520, background: "#F8F7F7" }}>
          <div>
            <Image src="/images/work/msr/logo-msr-light.svg" alt="Men\u2019s Sole Revival" width={400} height={176} />
          </div>
          <div className="flex-1 flex flex-col justify-center -mt-4">
            <div className="w-1 h-16 rounded-full mb-7" style={{ background: "#C4703A" }} />
            <p className="font-heading italic leading-relaxed mb-6" style={{ color: "#6B6560", fontSize: 19 }}>
              The right research question is worth more than the right Shopify plugin.
            </p>
            <p className="font-body leading-relaxed" style={{ color: "#938C86", fontSize: 14 }}>
              63% of Americans report foot pain. 12% see a doctor. I built the resource that should exist between those two numbers.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-body" style={{ color: "#938C86", fontSize: 11 }}>
            <span><span style={{ color: "#B7B2AE" }}>Role:</span> UX/UI Design, Product Strategy</span>
            <span style={{ color: "#C4703A" }}>&middot;</span>
            <span><span style={{ color: "#B7B2AE" }}>Type:</span> Self-initiated</span>
            <span style={{ color: "#C4703A" }}>&middot;</span>
            <span><span style={{ color: "#B7B2AE" }}>Timeline:</span> 2024&ndash;present</span>
            <span style={{ color: "#C4703A" }}>&middot;</span>
            <span><span style={{ color: "#B7B2AE" }}>Stack:</span> Next.js, Sanity, Tailwind</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 flex flex-col overflow-hidden rounded-xl m-4 ml-0" style={{ border: "1px solid #EEEDEC", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          {/* Nav bar */}
          <div className="flex items-center justify-between px-8 py-3" style={{ background: "#0C1A26", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-6">
              {["Home","Guides","Reviews","Routines","Assessment"].map((item, i) => (
                <span key={item} className="font-body" style={{ color: i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: i === 0 ? 500 : 400 }}>{item}</span>
              ))}
            </div>
            <div className="rounded-sm px-3 py-1 font-body font-medium" style={{ background: "#C4703A", color: "#FFFFFF", fontSize: 10 }}>Take Assessment</div>
          </div>

          {/* Hero */}
          <div className="relative flex-1 flex flex-col" style={{ minHeight: 380 }}>
            <div className="absolute inset-0">
              <Image src="/images/work/msr/pexels-17979558.jpg" alt="" fill className="object-cover object-center" style={{ opacity: 0.5 }} priority />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #091016 0%, rgba(9,16,22,0.7) 40%, rgba(9,16,22,0.3) 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #091016 0%, transparent 50%)" }} />
            </div>
            <div className="relative z-10 flex-1 flex flex-col justify-center px-10 py-10">
              <p className="font-body font-semibold uppercase tracking-widest mb-3" style={{ color: "#C4703A", fontSize: 9 }}>For men over 40 who are finally paying attention.</p>
              <h2 className="font-display uppercase leading-[0.95] tracking-tight" style={{ color: "#FFFFFF", fontSize: 42, fontWeight: 800 }}>Fix your feet.<br />Keep up with<br />everything else.</h2>
              <p className="font-body leading-relaxed mt-5 max-w-[380px]" style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Foot problems don&rsquo;t stay in your feet &mdash; they change how your knees load, how your hips move, and how your back feels by evening.</p>
              <div className="flex gap-2 mt-5">
                <div className="rounded-sm px-4 py-2 font-body font-semibold" style={{ background: "#C4703A", color: "#FFFFFF", fontSize: 10 }}>Take the Assessment</div>
                <div className="rounded-sm px-4 py-2 font-body font-semibold" style={{ border: "1px solid rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.7)", fontSize: 10 }}>Browse Guides</div>
              </div>
            </div>
            <div className="relative z-10 flex items-center px-4 py-2" style={{ background: "rgba(9,16,22,0.7)", borderTop: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
              <span className="font-body font-bold uppercase tracking-widest mr-4 pr-4" style={{ color: "rgba(255,255,255,0.25)", fontSize: 8, borderRight: "1px solid rgba(255,255,255,0.1)" }}>Browse topics</span>
              {["Nails","Alignment","Routine","Foot Health","Fit","Pain","Evidence-Based"].map((t) => (
                <span key={t} className="font-body font-semibold uppercase tracking-widest mx-2" style={{ color: "rgba(255,255,255,0.35)", fontSize: 8 }}>{t}<span className="ml-2" style={{ color: "#C4703A" }}>&middot;</span></span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 px-10 py-6" style={{ background: "#F8F7F7" }}>
            <div className="pr-6" style={{ borderRight: "1px solid #EEEDEC" }}>
              <span className="font-body uppercase tracking-widest block mb-3" style={{ color: "#6B6560", fontSize: 8 }}>The numbers most men ignore</span>
            </div>
            <div className="pl-6" />
            {stats.map((s, i) => (
              <div key={s.value} className={i === 0 ? "pr-6 pt-1" : "pl-6 pt-1"} style={i === 0 ? { borderRight: "1px solid #EEEDEC" } : undefined}>
                <span className="font-display block leading-none" style={{ color: "#091016", fontSize: 32, fontWeight: 800 }}>{s.value}</span>
                <span className="font-body block mt-1 leading-snug" style={{ color: "#6B6560", fontSize: 10 }}>{s.label}</span>
                <span className="font-body block mt-1 font-semibold" style={{ color: "#C4703A", fontSize: 9 }}>{s.context}</span>
              </div>
            ))}
          </div>

          {/* From the Guides */}
          <div className="grid grid-cols-2" style={{ background: "#FFFFFF", borderTop: "1px solid #EEEDEC", minHeight: 180 }}>
            <div className="flex flex-col justify-between p-8">
              <p className="font-display uppercase leading-[0.9]" style={{ color: "#091016", fontSize: 36, fontWeight: 800 }}>From<br />The<br /><span style={{ color: "#C4703A" }}>*</span>Guides.</p>
            </div>
            <div className="flex flex-col">
              {articles.map((a) => (
                <div key={a.title} className="flex gap-3 px-4 py-3" style={{ borderBottom: "1px solid #EEEDEC" }}>
                  <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 72, height: 52 }}>
                    <Image src={a.image} alt={a.title} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-body font-semibold uppercase tracking-wider" style={{ color: "#C4703A", fontSize: 8 }}>{a.category} &middot; {a.readTime} read</span>
                    <span className="font-display uppercase leading-tight mt-0.5" style={{ color: "#091016", fontSize: 11, fontWeight: 700 }}>{a.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
