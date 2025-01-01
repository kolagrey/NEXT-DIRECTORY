"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

const getFaqs = (t: (arg0: string) => string) => ({
  general: {
    title: t("general.title"),
    items: [
      {
        question: t("general.items.0.question"),
        answer: t("general.items.0.answer"),
      },
      {
        question: t("general.items.1.question"),
        answer: t("general.items.1.answer"),
      },
      {
        question: t("general.items.2.question"),
        answer: t("general.items.2.answer"),
      },
      {
        question: t("general.items.3.question"),
        answer: t("general.items.3.answer"),
      },
    ],
  },
  listings: {
    title: t("listings.title"),
    items: [
      {
        question: t("listings.items.0.question"),
        answer: t("listings.items.0.answer"),
      }
    ],
  },
});

type FAQKeys = "general" | "listings";

export default function FaqView() {
  const [searchQuery, setSearchQuery] = useState("");
  const t = useTranslations("faq");
  const faqs = useMemo(() => getFaqs(t), [t]);

  const filteredFaqs = Object.entries(faqs).reduce((acc, [category, data]) => {
    const filteredItems = data.items.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[category as FAQKeys] = { ...data, items: filteredItems };
    }
    return acc;
  }, {} as Record<FAQKeys, (typeof faqs)[FAQKeys]>);

  return (
    <main className="flex-1 container max-w-7xl py-12 mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            {t("hero.view.title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("hero.view.description")} {" "}
            <a
              href="mailto:hello@nowly.co"
              className="text-primary underline"
            >
              {t("hero.view.contact")}
            </a>
          </p>

          <div className="relative max-w-xl mx-auto mt-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder={t("hero.view.searchPlaceholder")}
              className="pl-10 py-6"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:gap-12">
          {Object.entries(filteredFaqs).map(([category, { title, items }]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <Accordion type="single" collapsible className="w-full">
                {items.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category}-${index}`}
                    className="border rounded-lg px-4 mb-4 hover:bg-muted/50 transition-colors"
                  >
                    <AccordionTrigger className="text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
