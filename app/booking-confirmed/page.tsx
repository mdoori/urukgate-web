"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, Video, Mail, Calendar, ArrowRight, Copy, Check } from "lucide-react";

type BookingDetails = {
  booking_ref: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  meet_link: string;
  zoom_password?: string;
};

function ConfirmedContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!paymentIntentId) {
      setLoading(false);
      return;
    }

    async function createAndFetchBooking() {
      try {
        // First check if booking already exists (page reload case)
        const existingRes = await fetch(`/api/bookings/by-payment?id=${paymentIntentId}`);
        if (existingRes.ok) {
          const data = await existingRes.json();
          setBooking(data.booking);
          setLoading(false);
          return;
        }

        // Create the booking using data saved before payment
        const pendingData = localStorage.getItem("pendingBooking");
        if (!pendingData) {
          setLoading(false);
          return;
        }

        const pending = JSON.parse(pendingData);

        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId,
            ...pending,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setBooking(data.booking);
          localStorage.removeItem("pendingBooking");
        }
      } catch (err) {
        console.error("Failed to create booking:", err);
      } finally {
        setLoading(false);
      }
    }

    createAndFetchBooking();
  }, [paymentIntentId]);

  const copyMeetLink = () => {
    if (booking?.meet_link) {
      navigator.clipboard.writeText(booking.meet_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 pt-28">
      {/* Success icon */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Booking <span className="text-gradient">Confirmed!</span>
        </h1>
        <p className="text-text-muted">
          Your consultation is booked. Check your email for a full confirmation.
        </p>
      </div>

      {/* Booking card */}
      <div className="glass rounded-2xl border border-border p-6 space-y-4 mb-6">
        {loading ? (
          <div className="py-8 text-center text-text-muted">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Setting up your Zoom meeting...
          </div>
        ) : booking ? (
          <>
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <div className="text-xs text-text-muted uppercase tracking-wider mb-1">Booking Reference</div>
                <div className="font-mono font-bold text-primary">{booking.booking_ref}</div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
                Confirmed
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-muted mb-0.5">Date & Time</div>
                  <div className="text-sm font-medium">
                    {booking.booking_date} at {booking.booking_time}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-muted mb-0.5">Service</div>
                  <div className="text-sm font-medium">{booking.service_name}</div>
                </div>
              </div>
            </div>

            {/* Zoom link */}
            <div className="mt-2 p-4 rounded-xl bg-surface-elevated border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-4 h-4 text-[#2D8CFF]" />
                <span className="text-sm font-semibold">Your Zoom Meeting Link</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <code className="flex-1 text-xs text-accent bg-background rounded-lg px-3 py-2 truncate font-mono">
                  {booking.meet_link}
                </code>
                <button
                  onClick={copyMeetLink}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex-shrink-0"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {booking.zoom_password && (
                <p className="text-text-muted text-xs">
                  Meeting password: <span className="font-mono text-text-primary">{booking.zoom_password}</span>
                </p>
              )}
              <p className="text-text-muted text-xs mt-1">
                Click this link at your scheduled time to join the Zoom call.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-text-muted text-sm">
              Your payment was received. You&apos;ll get a confirmation email shortly.
            </p>
          </div>
        )}
      </div>

      {/* Next steps */}
      <div className="glass rounded-2xl border border-border p-6 mb-8">
        <h3 className="font-semibold mb-4">What Happens Next</h3>
        <ol className="space-y-3">
          {[
            "Check your email. A detailed confirmation is on its way.",
            "Save the Zoom link above or find it in your confirmation email",
            "At the booked time, click the link to join the video call",
            "We'll map out your project and send you a written proposal within 24 hours",
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

      <div className="text-center">
        <Link href="/" className="btn-secondary inline-flex items-center gap-2">
          Back to Home
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div className="pt-28 text-center text-text-muted">Loading...</div>}>
          <ConfirmedContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
