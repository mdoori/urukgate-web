import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { createZoomMeeting } from "@/lib/zoom";
import { generateBookingRef } from "@/lib/utils";
import { sendCustomerConfirmation, sendOwnerNotification } from "@/lib/email";
import { format, parse } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      paymentIntentId,
      serviceId,
      serviceName,
      servicePrice,
      bookingDate,
      bookingTime,
      customerName,
      customerEmail,
      customerPhone,
      message,
    } = body;

    // Build ISO start time for Zoom (e.g. "2025-08-15T10:00:00")
    const parsedDate = parse(
      `${bookingDate} ${bookingTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const startTime = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");

    // Create a unique Zoom meeting for this booking
    const zoom = await createZoomMeeting({
      topic: `URUK Gate — ${serviceName} with ${customerName}`,
      startTime,
      durationMinutes: serviceId === "consultation" ? 60 : 90,
    });

    const supabase = createServiceClient();
    const bookingRef = generateBookingRef();

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        booking_ref: bookingRef,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        service_id: serviceId,
        service_name: serviceName,
        service_price: servicePrice,
        booking_date: bookingDate,
        booking_time: bookingTime,
        message: message ?? "",
        status: "confirmed",
        payment_status: "paid",
        payment_intent_id: paymentIntentId,
        meet_link: zoom.joinUrl,
        zoom_meeting_id: zoom.meetingId,
        zoom_password: zoom.password,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
    }

    // Send confirmation emails (non-blocking — don't fail the booking if email fails)
    const emailData = {
      customerName,
      customerEmail,
      serviceName,
      bookingDate,
      bookingTime,
      bookingRef,
      meetLink: zoom.joinUrl,
      zoomPassword: zoom.password,
      servicePrice,
    };

    await Promise.allSettled([
      sendCustomerConfirmation(emailData),
      sendOwnerNotification(emailData),
    ]);

    return NextResponse.json({
      booking: data,
      meetLink: zoom.joinUrl,
      zoomPassword: zoom.password,
      bookingRef,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

export async function GET() {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}
