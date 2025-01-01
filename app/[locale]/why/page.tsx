import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { getSEOTags } from "@/lib/seo";
import config from "@/config";
import { useTranslations } from "next-intl";

export const metadata = getSEOTags({
  title: `Why Publish on Your Agency or Team | ${config.appName}`,
  canonicalUrlRelative: "/about",
});

export default function WhyPage() {
  const t = useTranslations("why");
  const c = useTranslations("common");

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:16px]" />
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center text-white space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
              <span className="text-white">{t("hero.titleInWhite")}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 ">
                {t("hero.titleInColor")}
              </span>
            </h1>
            <p className="mt-4 text-xl">
              {t("hero.descriptionInWhite1")} {"  "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
                Ai
              </span>{" "}
              {"  "}
              {t("hero.descriptionInWhite2")}{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700 ">
                {t("hero.descriptionInColor")}
              </span>
            </p>

            <p className="text-xl text-gray-300">
              {t("hero.subdescription1")}
              {"  "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
                Ai
              </span>
              {t("hero.subdescription2")}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white pt-6 pb-12">
        <div className="container max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold"> {t("cta.title")}</h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/#listings">
                <SearchIcon className="mr-2 h-4 w-4" /> {c("browseAgencies")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-black hover:bg-gray-100 hover:text-black"
              asChild
            >
              <Link href="/create">
                <PlusIcon className="mr-2 h-4 w-4" /> {c("listAgency")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
