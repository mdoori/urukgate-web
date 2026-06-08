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
      serviceId,
      serviceName,
      bookingDate,
      bookingTime,
      customerName,
      customerEmail,
      customerPhone,
      message,
    } = body;

    const parsedDate = parse(
      `${bookingDate} ${bookingTime}`,
      "yyyy-MM-dd HH:mm",
      new Date()
    );
    const startTime = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");

    const zoom = await createZoomMeeting({
      topic: `URUK Gate — Free Discovery Call with ${customerName}`,
      startTime,
      durationMinutes: 30,
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
        service_price: 0,
        booking_date: bookingDate,
        booking_time: bookingTime,
        message: message ?? "",
        status: "confirmed",
        payment_status: "paid",
        payment_intent_id: null,
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

    const emailData = {
      customerName,
      customerEmail,
      serviceName,
      bookingDate,
      bookingTime,
      bookingRef,
      meetLink: zoom.joinUrl,
      zoomPassword: zoom.password,
      servicePrice: 0,
    };

    await Promise.allSettled([
      sendCustomerConfirmation(emailData),
      sendOwnerNotification(emailData),
    ]);

    return NextResponse.json({ booking: data, meetLink: zoom.joinUrl, bookingRef });
  } catch (error) {
    console.error("Free booking error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
