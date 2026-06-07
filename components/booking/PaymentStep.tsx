"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { ArrowLeft, Lock, Shield, CreditCard } from "lucide-react";
import type { BookingData } from "@/app/book/page";
import { formatCurrency, formatDate } from "@/lib/utils";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutForm({ booking, clientSecret }: { booking: BookingData; clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Save booking data to localStorage so the confirmation page can use it
    localStorage.setItem("pendingBooking", JSON.stringify({
      serviceId: booking.service?.id,
      serviceName: booking.service?.name,
      servicePrice: booking.service?.price,
      bookingDate: booking.date ? booking.date.toISOString().split("T")[0] : "",
      bookingTime: booking.time,
      customerName: booking.name,
      customerEmail: booking.email,
      customerPhone: booking.phone,
      message: booking.message,
    }));

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmed`,
        payment_method_data: {
          billing_details: {
            name: booking.name,
            email: booking.email,
          },
        },
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Card Details
        </h3>
        <div className="p-4 bg-surface-elevated border border-border rounded-xl">
          <PaymentElement
            options={{
              layout: "tabs",
              appearance: {
                theme: "night",
                variables: {
                  colorPrimary: "#6366f1",
                  colorBackground: "#141830",
                  colorText: "#f1f5f9",
                  colorDanger: "#ef4444",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "8px",
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        <Lock className="w-4 h-4" />
        {loading
          ? "Processing..."
          : `Pay ${booking.service ? formatCurrency(booking.service.price) : ""} Securely`}
      </button>

      <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
        <Shield className="w-3.5 h-3.5 text-green-400" />
        Secured by Stripe · 256-bit SSL encryption · PCI DSS compliant
      </div>
    </form>
  );
}

type Props = {
  booking: BookingData;
  onBack: () => void;
};

export default function PaymentStep({ booking, onBack }: Props) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intentError, setIntentError] = useState<string | null>(null);

  useEffect(() => {
    async function createIntent() {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: booking.service?.price,
            service: booking.service?.name,
            customerName: booking.name,
            customerEmail: booking.email,
          }),
        });

        if (!res.ok) throw new Error("Failed to initialise payment");
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        setIntentError("Could not load payment. Please refresh and try again.");
      } finally {
        setLoadingIntent(false);
      }
    }

    createIntent();
  }, [booking]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Secure Payment</h2>
      <p className="text-text-muted text-sm mb-6">
        Your deposit confirms your booking slot. You&apos;ll receive a Google Meet link
        immediately after payment.
      </p>

      {/* Summary */}
      <div className="glass-light rounded-xl p-4 border border-primary/20 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Service</span>
          <span className="font-medium">{booking.service?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Date</span>
          <span className="font-medium">
            {booking.date ? formatDate(booking.date) : ""} at {booking.time}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Client</span>
          <span className="font-medium">{booking.name}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-gradient text-lg">
            {booking.service ? formatCurrency(booking.service.price) : ""}
          </span>
        </div>
      </div>

      {loadingIntent ? (
        <div className="py-8 text-center text-text-muted text-sm">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Preparing secure payment...
        </div>
      ) : intentError ? (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {intentError}
        </div>
      ) : clientSecret ? (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "night",
              variables: {
                colorPrimary: "#6366f1",
                colorBackground: "#141830",
                colorText: "#f1f5f9",
              },
            },
          }}
        >
          <CheckoutForm booking={booking} clientSecret={clientSecret} />
        </Elements>
      ) : null}

      <button
        onClick={onBack}
        className="mt-4 btn-secondary w-full flex items-center justify-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
  );
}
