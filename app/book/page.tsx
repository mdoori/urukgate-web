"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServiceStep from "@/components/booking/ServiceStep";
import DateTimeStep from "@/components/booking/DateTimeStep";
import DetailsStep from "@/components/booking/DetailsStep";
import PaymentStep from "@/components/booking/PaymentStep";
import FreeConfirmStep from "@/components/booking/FreeConfirmStep";
import { SERVICES, type Service } from "@/lib/stripe";
import { CheckCircle2 } from "lucide-react";

export type BookingData = {
  service: Service | null;
  date: Date | null;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

function BookingContent() {
  const searchParams = useSearchParams();
  const preselectedId = searchParams.get("service");

  const [step, setStep] = useState(preselectedId ? 1 : 0);
  const [booking, setBooking] = useState<BookingData>({
    service: preselectedId
      ? (SERVICES.find((s) => s.id === preselectedId) ?? null)
      : null,
    date: null,
    time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const updateBooking = (updates: Partial<BookingData>) => {
    setBooking((prev) => ({ ...prev, ...updates }));
  };

  const isFree = (booking.service?.price ?? 1) === 0;

  // Free services: 3 steps (no payment). Paid: 4 steps.
  const STEPS = isFree
    ? ["Service", "Date & Time", "Your Details", "Confirm"]
    : ["Service", "Date & Time", "Your Details", "Payment"];

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Book a <span className="text-gradient">Discovery Call</span>
        </h1>
        <p className="text-text-muted">
          Fill in the steps below and we&apos;ll confirm your booking by email.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 transition-all ${
                i < step
                  ? "bg-primary text-white"
                  : i === step
                  ? "bg-primary text-white shadow-glow-primary"
                  : "bg-surface-elevated text-text-muted border border-border"
              }`}
            >
              {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={`text-xs hidden sm:block font-medium ${
                i === step ? "text-text-primary" : "text-text-muted"
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 transition-all ${i < step ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="glass rounded-2xl border border-border p-6 sm:p-8">
        {step === 0 && (
          <ServiceStep booking={booking} updateBooking={updateBooking} onNext={nextStep} />
        )}
        {step === 1 && (
          <DateTimeStep booking={booking} updateBooking={updateBooking} onNext={nextStep} onBack={prevStep} />
        )}
        {step === 2 && (
          <DetailsStep booking={booking} updateBooking={updateBooking} onNext={nextStep} onBack={prevStep} />
        )}
        {step === 3 && isFree && (
          <FreeConfirmStep booking={booking} onBack={prevStep} />
        )}
        {step === 3 && !isFree && (
          <PaymentStep booking={booking} onBack={prevStep} />
        )}
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <Suspense fallback={<div className="pt-28 text-center text-text-muted">Loading...</div>}>
          <BookingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
