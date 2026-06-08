"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarCheck, Loader2, Video } from "lucide-react";
import type { BookingData } from "@/app/book/page";
import { formatDate } from "@/lib/utils";

type Props = {
  booking: BookingData;
  onBack: () => void;
};

export default function FreeConfirmStep({ booking, onBack }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/bookings/free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: booking.service?.id,
          serviceName: booking.service?.name,
          servicePrice: 0,
          bookingDate: booking.date ? booking.date.toISOString().split("T")[0] : "",
          bookingTime: booking.time,
          customerName: booking.name,
          customerEmail: booking.email,
          customerPhone: booking.phone,
          message: booking.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to confirm booking");

      const data = await res.json();
      router.push(`/booking-confirmed/free?ref=${data.bookingRef}`);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Confirm Your Free Call</h2>
      <p className="text-text-muted text-sm mb-6">
        No payment needed. Click confirm and we&apos;ll send your Zoom link straight to your email.
      </p>

      {/* Summary */}
      <div className="glass-light rounded-xl p-4 border border-primary/20 mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Service</span>
          <span className="font-medium">{booking.service?.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Date & Time</span>
          <span className="font-medium">
            {booking.date ? formatDate(booking.date) : ""} at {booking.time}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Name</span>
          <span className="font-medium">{booking.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Email</span>
          <span className="font-medium">{booking.email}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between font-bold">
          <span>Total Cost</span>
          <span className="text-green-400 text-lg">Free</span>
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
        <Video className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-text-muted">
          A unique Zoom meeting link will be created and sent to <strong className="text-text-primary">{booking.email}</strong> immediately after you confirm.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Confirming...</>
        ) : (
          <><CalendarCheck className="w-4 h-4" /> Confirm Free Discovery Call</>
        )}
      </button>

      <button onClick={onBack} className="mt-3 btn-secondary w-full flex items-center justify-center gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
  );
}
