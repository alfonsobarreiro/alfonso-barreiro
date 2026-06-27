import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { PersonSchema } from "@/components/structured-data/PersonSchema";

export const metadata: Metadata = {
  alternates: { canonical: "https://www.barreiro.com" },
  openGraph: {
    url: "https://www.barreiro.com",
  },
};

export default function Home() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main id="main-content">
        <Hero />
        <Work />
        <About />
        <Testimonials />
        <Footer />
      </main>
      <BackToTop />
    </>
  );
}
