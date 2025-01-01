import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";

interface SubscriptionData {
  email: string;
  ip_address: string | null;
  user_agent: {
    browser: string;
    os: string;
    device: string;
  };
  referrer: string | null;
  subscription_date: string;
  status: "pending" | "confirmed";
  locale: string;
  utm_data: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
  };
}

async function collectSubscriptionData(
  email: string
): Promise<SubscriptionData> {
  const headersList = await headers();
  const url = headersList.get("x-url") || headersList.get("referer") || null;

  if (!headersList.get("user-agent")) {
    throw new Error("User-Agent header is missing");
  }

  const userAgent = headersList.get("user-agent") || "";
  const parser = new UAParser(userAgent);

  // Get IP address (considering forward headers for proxy situations)
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor
    ? forwardedFor.split(",")[0]
    : headersList.get("x-real-ip");

  if (!ip) {
    throw new Error("IP address is missing");
  }

  // Parse user agent
  const browserInfo = parser.getBrowser();
  const osInfo = parser.getOS();
  const deviceInfo = parser.getDevice();

  // Get referrer
  const referrer = headersList.get("referer");

  // Get UTM parameters from the URL
  const utmSource = url ? new URL(url).searchParams.get("utm_source") : null;
  const utmMedium = url ? new URL(url).searchParams.get("utm_medium") : null;
  const utmCampaign = url ? new URL(url).searchParams.get("utm_campaign") : null;

  const subscriptionData: SubscriptionData = {
    email: email.toLowerCase().trim(),
    ip_address: ip || null,
    user_agent: {
      browser: `${browserInfo.name || "Unknown"} ${
        browserInfo.version || ""
      }`.trim(),
      os: `${osInfo.name || "Unknown"} ${osInfo.version || ""}`.trim(),
      device: deviceInfo.type || "desktop",
    },
    referrer: referrer || null,
    subscription_date: new Date().toISOString(),
    status: "pending",
    locale: headersList.get("accept-language")?.split(",")[0] || "en",
    utm_data: {
      source: utmSource,
      medium: utmMedium,
      campaign: utmCampaign,
    },
  };

  return subscriptionData;
}

// Example usage in a Next.js route handler
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Invalid email address" }, { status: 400 });
    }

    const subscriptionData = await collectSubscriptionData(email);

    await supabase.from("newsletter_subscriptions").insert([subscriptionData]);

    return Response.json({ success: true });
  } catch (error) {
    console.log("NEWSLETTER SUBSCRIPTION", error);
    return Response.json(
      { error: "Failed to process subscription" },
      { status: 500 }
    );
  }
}
