import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

function SectionDivider() {
  return (
    <div
      style={{
        display:        "flex",
        justifyContent: "center",
        alignItems:     "center",
        padding:        "0 clamp(32px, 6vw, 80px)",
      }}
    >
      <div
        style={{
          width:      "48px",
          height:     "1px",
          background: "#C9BFB0",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <About />
      <Footer />
      <CookieConsent />
    </main>
  );
}
