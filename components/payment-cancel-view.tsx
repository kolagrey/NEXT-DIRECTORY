import Link from "next/link";
import { Card } from "./ui/card";
import { useTranslations } from "next-intl";

export default function PaymentCancelView() {
  const t = useTranslations("paymentView");
  const c = useTranslations("common");
  return (
    <div className="container bg-black max-w-3xl mx-auto">
      <Card className="p-8 md:p-12 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
        <div className="mb-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {t("cancel.title")}
          </h1>
          <p className="text-white mb-6">
            {t("cancel.description")}
          </p>
          <Link
            href="/create/checkout"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {c("tryAgain")}
          </Link>
        </div>
      </Card>
    </div>
  );
}
