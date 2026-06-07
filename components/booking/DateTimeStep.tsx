"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { format, addDays, isSunday, isSaturday } from "date-fns";
import type { BookingData } from "@/app/book/page";
import "react-day-picker/dist/style.css";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30",
];

type Props = {
  booking: BookingData;
  updateBooking: (u: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function DateTimeStep({ booking, updateBooking, onNext, onBack }: Props) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(booking.date ?? undefined);

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    updateBooking({ date: day ?? null, time: "" });
  };

  const handleTimeSelect = (time: string) => {
    updateBooking({ time });
  };

  const disabledDays = [
    { before: addDays(new Date(), 1) },
    isSaturday,
    isSunday,
  ];

  const canContinue = selectedDay && booking.time;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Pick a Date & Time</h2>
      <p className="text-text-muted text-sm mb-6">
        Choose an available slot Monday–Friday. All times are UK time (GMT/BST).
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <div className="flex-1">
          <div className="glass-light rounded-xl p-4 border border-border">
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={handleDaySelect}
              disabled={disabledDays}
              showOutsideDays={false}
              className="w-full"
            />
          </div>
        </div>

        {/* Time slots */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {selectedDay ? format(selectedDay, "EEEE, MMMM d") : "Select a date first"}
            </span>
          </div>

          {selectedDay ? (
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleTimeSelect(slot)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium border transition-all ${
                    booking.time === slot
                      ? "border-primary bg-primary/10 text-primary shadow-glow-primary"
                      : "border-border bg-surface-elevated text-text-muted hover:border-primary/40 hover:text-text-primary"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <div className="h-32 flex items-center justify-center rounded-xl border border-border bg-surface-elevated">
              <p className="text-text-muted text-sm">Select a date to see available times</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
