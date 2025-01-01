import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia", // Use the latest API version
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: NextRequest) {
  const body = await req.json();
  const reference = body.reference;
  const locale = body.locale || "en";
  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Agency Directory Listing",
              description: "One-time payment for agency listing",
            },
            unit_amount: 1000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/create/payment/?status=success&session_id={CHECKOUT_SESSION_ID}&reference=${reference}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/${locale}/create/payment/?status=cancel&reference=${reference}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
