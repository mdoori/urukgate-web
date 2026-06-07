import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Services from "@/components/sections/Services";
import CTA from "@/components/sections/CTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional web development, mobile apps, and business automation for small businesses. Transparent pricing, fast delivery.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-24 pb-8 text-center bg-background">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 pt-8">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto px-4">
            Everything your business needs to succeed online, from your first website
            to a full mobile app platform.
          </p>
        </div>
        <Services />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
