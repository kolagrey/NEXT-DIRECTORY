"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeCheckoutButton({
  reference,
}: {
  reference: string;
}) {
  const [loading, setLoading] = useState(false);
  const locale = useLocale();
  const t = useTranslations("payWithStripe");
  const processing = t("processing");
  const pay = t("pay");

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({ reference, locale }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to initialize");

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700 py-2 px-4 rounded transition-colors"
    >
      {loading ? processing : pay}
    </button>
  );
}
