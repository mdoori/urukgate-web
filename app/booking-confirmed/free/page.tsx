"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Mail, ArrowRight } from "lucide-react";

function FreeConfirmedContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 pt-28 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
        <CheckCircle2 className="w-10 h-10 text-green-400" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold mb-3">
        You&apos;re <span className="text-gradient">Booked In!</span>
      </h1>
      <p className="text-text-muted mb-8">
        Your free discovery call is confirmed. Check your email — your Zoom link is already waiting for you.
      </p>

      {ref && (
        <div className="glass rounded-xl border border-border p-4 mb-8 inline-block">
          <div className="text-xs text-text-muted mb-1">Booking Reference</div>
          <div className="font-mono font-bold text-primary">{ref}</div>
        </div>
      )}

      <div className="glass rounded-2xl border border-border p-6 text-left mb-8">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          What to expect
        </h3>
        <ol className="space-y-3">
          {[
            "Check your inbox — a confirmation email with your Zoom link has been sent",
            "At the booked time, click the Zoom link to join the call",
            "We'll spend 30 minutes understanding your business and goals",
            "Within 24 hours you'll receive a clear, jargon-free proposal",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
              <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <Link href="/" className="btn-secondary inline-flex items-center gap-2">
        Back to Home
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function FreeBookingConfirmedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div className="pt-28 text-center text-text-muted">Loading...</div>}>
          <FreeConfirmedContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
