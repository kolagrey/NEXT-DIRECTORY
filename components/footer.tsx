"use client";

import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BuyMeCoffeeButton from "@/components/buy-me-coffee-button";
import { useState } from "react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useTranslations } from "next-intl";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("footer");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = newsletterSchema.parse({ email });

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-url": window.location.href,
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      toast.success("Successfully subscribed to newsletter! 🎉");
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to subscribe. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="text-white bg-black px-8">
      <div className="container py-12 md:py-16 mx-auto max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold">{t("stayUpdated")}</h3>
            <p className="text-sm text-muted-foreground max-w-60">
              {t("stayUpdatedDescription")}
            </p>
            <form onSubmit={handleSubmit} className="flex max-w-sm space-x-2">
              <Input
                type="email"
                placeholder={t("enterEmail")}
                className="flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button
                type="submit"
                className="bg-black hover:bg-gray-100 hover:text-black"
                disabled={isLoading}
              >
                {isLoading ? t("subscribing") : t("subscribe")}
              </Button>
            </form>
          </div>
          <div className="space-y-4 md:text-right">
            <h3 className="text-3xl font-extrabold">{t("connect")}</h3>
            <div className="flex space-x-4 md:justify-end">
              <a
                href="mailto:hello@metasession.co"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2 hover:text-pink-700 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">{t("email")}</span>
              </a>
              <a
                href="https://twitter.com/kolagrey"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2 hover:text-pink-700 transition-colors"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
                </svg>
                <span className="sr-only">{t("twitter")}</span>
              </a>
            </div>
            <BuyMeCoffeeButton />
          </div>
        </div>
        <div className="pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} FAATLIST. {t("allRightsReserved")}{" "}
            <br />
            {t("builtWith")}{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-purple-700">
              Ai
            </span>
            {" "} {t("by")} {" "}
            <Link href="https://x.com/kolagrey" target="_blank">
              Grey
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme="dark"
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </footer>
  );
}
