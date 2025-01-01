"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function Hero() {
  const router = useRouter();
  const t = useTranslations("hero");
  const c = useTranslations("common");
  const announcement = t("announcement");
  const title = t("title");
  const description = t("description");
  const findAgencies = t("findAgencies");
  const browseAgencies = c("browseAgencies");
  const listAgency = c("listAgency");

  return (
    <section className="relative">
      <div className="w-full">
        <div className="container flex max-w-5xl flex-col items-center gap-4 py-10 px-4 text-center md:py-20 mx-auto">
          <div className="inline-flex items-center rounded-full border bg-background/95 px-3 py-1 text-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <span className="ml-2 text-muted-foreground">{announcement}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
            {findAgencies}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
              {title}
            </span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {description}
          </p>
          <div className=" flex flex-col gap-3 min-[400px]:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                document
                  .querySelector("#listings")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <SearchIcon className="mr-2 h-4 w-4" /> {browseAgencies}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black hover:bg-gray-100 hover:text-black"
              onClick={() => router.push("/create")}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> {listAgency}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
