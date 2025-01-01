"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Check, PartyPopper, Rocket } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useConfetti } from "@/hooks/use-confetti";
import BuyMeCoffeeButton from "./buy-me-coffee-button";

export default function CheckoutView({ reference }: { reference: string }) {
  useConfetti();
  const locale = useLocale();
  const t = useTranslations("checkout");

  return (
    <div className="py-6">
      <div className="container bg-black max-w-3xl mx-auto">
        <Card className="p-8 md:p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 text-pink-500 mb-4">
              <PartyPopper className="h-8 w-8" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              🎉 {t("main.title")}
            </h1>

            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              {t("main.description")}
            </p>

            <div className="flex flex-col gap-4 max-w-md mx-auto pt-4">
              <div className="flex items-start gap-3 text-left">
                <Check className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <p className="font-medium">{t("benefit1.title")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("benefit1.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Check className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <p className="font-medium"> {t("benefit2.title")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("benefit2.description")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Rocket className="h-5 w-5 text-pink-500 mt-1" />
                <div>
                  <p className="font-medium"> {t("nextStep.title")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("nextStep.description")}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 items-center pt-8 max-w-md mx-auto">
              <BuyMeCoffeeButton />
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-white hover:text-black"
                asChild
              >
                <Link
                  href={`/${locale}/create/checkout/preview/${reference}`}
                  target="_blank"
                >
                  {t("previewButtonText")}
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
