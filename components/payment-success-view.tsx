"use client";

import { Card } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useConfetti } from "@/hooks/use-confetti";
import Sharer from "./sharer";
import { useTranslations } from "next-intl";

export default function PaymentSuccessView() {
  useConfetti();
  const t = useTranslations("paymentView");
  return (
    <div className="container bg-black max-w-3xl mx-auto">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-500 mb-4">
            <CheckIcon className="h-8 w-8" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold">
            {t("success.title")} 🎉
          </h1>

          <div className="flex flex-col gap-4 max-w-md mx-auto pt-4">
            <div className="flex">
              <Sharer />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
