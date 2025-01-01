import PaymentView from "@/components/payment-view";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Payment | ${config.appName}`,
  canonicalUrlRelative: "/create/payment/",
});

export default function PaymentPage() {
  return <PaymentView />;
}
