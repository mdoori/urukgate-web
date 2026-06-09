"use client";

import { Check, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/stripe";
import type { BookingData } from "@/app/book/page";

type Props = {
  booking: BookingData;
  updateBooking: (u: Partial<BookingData>) => void;
  onNext: () => void;
};

export default function ServiceStep({ booking, updateBooking, onNext }: Props) {
  const handleSelect = (service: (typeof SERVICES)[number]) => {
    updateBooking({ service });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Choose a Service</h2>
      <p className="text-text-muted text-sm mb-6">
        Select the service you&apos;re interested in. Not sure? Pick{" "}
        <strong className="text-text-primary">Discovery Call</strong> and we will figure it out together.
      </p>

      <div className="space-y-3 mb-8">
        {SERVICES.map((service) => {
          const isSelected = booking.service?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => handleSelect(service)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-glow-primary"
                  : "border-border bg-surface-elevated hover:border-primary/40 hover:bg-primary/5"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{service.name}</span>
                    {service.popular && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-xs truncate">{service.description}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-text-muted text-xs">{service.duration}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "border-primary bg-primary" : "border-border"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!booking.service}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
