"use client";

import { useEffect, useState } from "react";
import { createServiceClient } from "@/lib/supabase";
import { formatCurrency } from "@/lib/utils";
import {
  CalendarCheck, PoundSterling, Users, Clock,
  TrendingUp, Video, Mail, Copy, Check,
} from "lucide-react";

type Booking = {
  id: string;
  booking_ref: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_name: string;
  service_price: number;
  booking_date: string;
  booking_time: string;
  status: string;
  payment_status: string;
  meet_link: string;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-500/10 text-green-400 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const res = await fetch("/api/admin/bookings");
    const data = await res.json();
    setBookings(data.bookings ?? []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await fetchBookings();
    setUpdatingId(null);
  }

  const copyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Stats
  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.booking_date === today);
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "completed");
  const monthRevenue = confirmedBookings
    .filter((b) => b.created_at.startsWith(new Date().toISOString().slice(0, 7)))
    .reduce((sum, b) => sum + b.service_price, 0);
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + b.service_price, 0);
  const upcoming = bookings.filter(
    (b) => b.booking_date >= today && b.status !== "cancelled"
  );

  const stats = [
    { label: "Today's Bookings", value: todayBookings.length, icon: CalendarCheck, color: "text-primary" },
    { label: "This Month's Revenue", value: formatCurrency(monthRevenue), icon: PoundSterling, color: "text-green-400" },
    { label: "Total Clients", value: bookings.length, icon: Users, color: "text-accent" },
    { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: TrendingUp, color: "text-violet-400" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-muted text-sm mt-1">
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl border border-border p-5">
            <div className={`w-9 h-9 rounded-xl bg-surface-elevated flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-text-muted text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming bookings highlight */}
      {upcoming.length > 0 && (
        <div className="glass rounded-2xl border border-primary/20 p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm">Upcoming Bookings ({upcoming.length})</h2>
          </div>
          <div className="space-y-2">
            {upcoming.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <span className="font-medium text-sm">{b.customer_name}</span>
                  <span className="text-text-muted text-xs ml-2">{b.service_name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">{b.booking_date}</div>
                  <div className="text-text-muted text-xs">{b.booking_time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All bookings table */}
      <div className="glass rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">All Bookings</h2>
          <span className="text-text-muted text-sm">{bookings.length} total</span>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-text-muted text-sm">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center">
            <CalendarCheck className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-text-muted text-sm">No bookings yet. They will appear here when clients book.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {["Ref", "Client", "Service", "Date & Time", "Amount", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-5 py-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface-elevated/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-primary">{booking.booking_ref}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-sm">{booking.customer_name}</div>
                      <div className="text-text-muted text-xs">{booking.customer_phone}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm">{booking.service_name}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium">{booking.booking_date}</div>
                      <div className="text-text-muted text-xs">{booking.booking_time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold text-green-400">{formatCurrency(booking.service_price)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={booking.status}
                        disabled={updatingId === booking.id}
                        onChange={(e) => updateStatus(booking.id, e.target.value)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border bg-transparent cursor-pointer focus:outline-none ${STATUS_STYLES[booking.status] ?? STATUS_STYLES.pending}`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Copy email */}
                        <button
                          onClick={() => copyEmail(booking.customer_email, booking.id + "email")}
                          title={booking.customer_email}
                          className="p-1.5 rounded-lg bg-surface-elevated hover:bg-primary/10 text-text-muted hover:text-primary transition-all"
                        >
                          {copiedId === booking.id + "email" ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Mail className="w-3.5 h-3.5" />
                          )}
                        </button>
                        {/* Copy Zoom link */}
                        <button
                          onClick={() => copyEmail(booking.meet_link, booking.id + "zoom")}
                          title="Copy Zoom link"
                          className="p-1.5 rounded-lg bg-surface-elevated hover:bg-primary/10 text-text-muted hover:text-primary transition-all"
                        >
                          {copiedId === booking.id + "zoom" ? (
                            <Check className="w-3.5 h-3.5 text-green-400" />
                          ) : (
                            <Video className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
