"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import PaymentSuccessView from "@/components/payment-success-view";
import PaymentCancelView from "@/components/payment-cancel-view";
import { useTranslations } from "next-intl";

export default function PaymentView() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const reference = searchParams.get("reference");
  const sessionId = searchParams.get("session_id");
  const [isStorageComplete, setIsStorageComplete] = useState(false);
  const t = useTranslations("paymentView");

  useEffect(() => {
    const storeCheckoutReference = async () => {
      if (status === "success" && sessionId && !isStorageComplete) {
        try {
          await fetch("/api/checkout/reference", {
            method: "PATCH",
            body: JSON.stringify({
              status,
              reference,
              session_id: sessionId,
            }),
          });
          setIsStorageComplete(true);
        } catch (err) {
          console.error("Error storing checkout reference:", err);
        }
      }
    };

    storeCheckoutReference();
  }, [status, sessionId, isStorageComplete, reference]);

  if (status === "success" && sessionId) {
    return <PaymentSuccessView />;
  }
  if (status === "cancel") {
    <PaymentCancelView />;
  }

  return (
    <div className="container bg-black max-w-3xl mx-auto">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-yellow-100 text-black rounded-full flex items-center justify-center mx-auto mb-4">
            <InfoIcon />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
           {t("default.title")}
          </h1>
          <p className="text-white mb-6">{t("default.description")}</p>
        </div>
      </Card>
    </div>
  );
}
