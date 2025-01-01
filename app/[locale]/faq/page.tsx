import { getSEOTags } from "@/lib/seo";
import config from "@/config";
import FaqView from "@/components/faq-view";

export const metadata = getSEOTags({
  title: `FAQ | ${config.appName}`,
  canonicalUrlRelative: "/faq",
});

export default function FAQPage() {
  return <FaqView />;
}
