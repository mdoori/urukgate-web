import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const paymentIntentId = request.nextUrl.searchParams.get("id");

  if (!paymentIntentId) {
    return NextResponse.json({ error: "Missing payment intent ID" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("payment_intent_id", paymentIntentId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking: data });
}
