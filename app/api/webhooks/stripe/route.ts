import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const supabase = createServiceClient();
    await supabase
      .from("bookings")
      .update({ payment_status: "pending", status: "pending" })
      .eq("payment_intent_id", paymentIntent.id);
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as { payment_intent: string };
    const supabase = createServiceClient();
    await supabase
      .from("bookings")
      .update({ payment_status: "refunded", status: "cancelled" })
      .eq("payment_intent_id", charge.payment_intent);
  }

  return NextResponse.json({ received: true });
}
