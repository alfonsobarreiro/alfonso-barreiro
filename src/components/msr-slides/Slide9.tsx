// MSR Case Study — Slide 9: Thank You
// Image path updated to /images/work/msr/

import Image from "next/image";

export default function Slide9() {
  return (
    <div className="relative overflow-hidden" style={{ width: 1440, height: 900, background: "#F8F7F7" }}>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-[88px] pb-14 text-center">
        <div className="mb-10">
          <Image src="/images/work/msr/logo-msr-light.svg" alt="Men\u2019s Sole Revival" width={280} height={123} />
        </div>
        <h1 className="font-display leading-[1.1] tracking-tight" style={{ color: "#091016", fontSize: 72, fontWeight: 800, maxWidth: 800, margin: "0 0 24px" }}>
          Thank you.
        </h1>
        <p className="font-heading italic leading-relaxed" style={{ color: "#C4703A", fontSize: 22, maxWidth: 560, margin: "0 0 56px" }}>
          Content as the product. Design as the argument.
        </p>
        <div className="w-16 h-px mb-12" style={{ background: "linear-gradient(90deg, transparent, #C4703A, transparent)" }} />
        <div className="flex items-center gap-10">
          {[
            { label: "Portfolio", value: "barreiro.com" },
            { label: "Email",     value: "alfonso@barreiro.com" },
            { label: "LinkedIn",  value: "/in/alfonsobarreiro" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-display uppercase tracking-[0.2em] mb-1" style={{ color: "#938C86", fontSize: 9, fontWeight: 600 }}>{label}</p>
              <p className="font-body" style={{ color: "#6B6560", fontSize: 14 }}>{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <p className="font-body font-medium" style={{ color: "#B7B2AE", fontSize: 13, letterSpacing: "0.06em" }}>Alfonso Barreiro &middot; UX/UI Designer</p>
        </div>
      </div>
    </div>
  );
}
