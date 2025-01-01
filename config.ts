import { ConfigProps } from "@/lib/types";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://faatlist.com";
// REQUIRED (no https://, not trialing slash at the end, just the naked domain)
const domainName = "faatlist.com";

const config = {
  baseURL: process.env.BASE_URL || baseURL,
  domainName: process.env.SITE_DOMAIN || domainName,
  appLogo: `${baseURL}/logo.png`,
  appLogoAlt: `${baseURL}/logo-alt.png`,
  // REQUIRED
  appName: "FAATLIST",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "Find Teams and Agencies. Build and Launch your MVP or Full Scale Projects within Budget and Time! Turn your ideas into reality, fast with verified Ai tech agencies and consultants.",
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    // REQUIRED
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. yourdomain.com)
    subdomain: "",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `FAATLIST Login <noreply@metasession.co>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Grey at FAATLIST <hello@metasession.co>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "hello@metasession.co",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "hello@metasession.co",
  },
  isDevEnv: process.env.NODE_ENV === "development",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  NEXT_PUBLIC_MICROSOFT_CLARITY: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_BUCKET: process.env.NEXT_PUBLIC_SUPABASE_BUCKET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

} as ConfigProps;

export default config;
