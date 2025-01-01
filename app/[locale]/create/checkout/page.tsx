import CheckoutView from "@/components/checkout-view";
import { notFound } from "next/navigation";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Checkout | ${config.appName}`,
  canonicalUrlRelative: "/create/checkout",
});

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  if (!reference) {
    notFound();
  }

  return <CheckoutView reference={reference} />;
}

