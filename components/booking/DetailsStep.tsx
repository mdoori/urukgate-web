"use client";

import { ArrowLeft, ArrowRight, User, Mail, Phone, MessageSquare } from "lucide-react";
import type { BookingData } from "@/app/book/page";
import { formatCurrency, formatDate } from "@/lib/utils";

type Props = {
  booking: BookingData;
  updateBooking: (u: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2">
        <Icon className="w-4 h-4 text-primary" />
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all";

export default function DetailsStep({ booking, updateBooking, onNext, onBack }: Props) {
  const canContinue = booking.name.trim() && booking.email.trim() && booking.phone.trim();

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Your Details</h2>
      <p className="text-text-muted text-sm mb-6">
        We&apos;ll use these to confirm your booking and send you the meeting link.
      </p>

      {/* Booking summary */}
      <div className="glass-light rounded-xl p-4 border border-primary/20 mb-6">
        <div className="text-xs text-text-muted uppercase tracking-wider mb-2">Booking Summary</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-sm">{booking.service?.name}</div>
            <div className="text-text-muted text-xs mt-0.5">
              {booking.date ? formatDate(booking.date) : ""} at {booking.time}
            </div>
          </div>
          <div className="font-bold text-primary">
            {booking.service ? formatCurrency(booking.service.price) : ""}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <Field label="Full Name" icon={User}>
          <input
            type="text"
            placeholder="Jane Smith"
            value={booking.name}
            onChange={(e) => updateBooking({ name: e.target.value })}
            className={inputClass}
            required
          />
        </Field>

        <Field label="Email Address" icon={Mail}>
          <input
            type="email"
            placeholder="jane@mybusiness.com"
            value={booking.email}
            onChange={(e) => updateBooking({ email: e.target.value })}
            className={inputClass}
            required
          />
        </Field>

        <Field label="Phone Number" icon={Phone}>
          <input
            type="tel"
            placeholder="+44 7700 000 000"
            value={booking.phone}
            onChange={(e) => updateBooking({ phone: e.target.value })}
            className={inputClass}
            required
          />
        </Field>

        <Field label="Tell us about your business (optional)" icon={MessageSquare}>
          <textarea
            placeholder="What does your business do? What problem are you trying to solve with software?"
            value={booking.message}
            onChange={(e) => updateBooking({ message: e.target.value })}
            rows={4}
            className={inputClass + " resize-none"}
          />
        </Field>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
