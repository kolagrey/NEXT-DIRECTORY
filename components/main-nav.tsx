"use client";

import Link from "next/link";
import { Plus, Menu, GlobeIcon } from "lucide-react";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b text-white bg-grid-small-purple bg-purple-900 bg-gradient-to-r from-pink-700 to-purple-700 px-4">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-20">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-black">FAATLIST</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-primary"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/why`}
              className="transition-colors hover:text-primary"
            >
              {t("about")}
            </Link>
            <Link
              href={`/${locale}/faq`}
              className="transition-colors hover:text-primary"
            >
              {t("faq")}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="ml-4 flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
            <LanguageSwitcher />
          </div>
          <Button
            variant={"outline"}
            asChild
            className="hidden md:flex  hover:bg-gray-100 hover:text-black"
          >
            <Link href={`/${locale}/create`}>
              <Plus className="mr-2 h-4 w-4" /> {t("create")}
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-black text-white"
            >
              <SheetTitle className="text-white">
                <VisuallyHidden>Navigation Menu</VisuallyHidden>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu for accessing different sections of the
                website
              </SheetDescription>
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href={`/${locale}`}
                  className="text-lg font-semibold hover:text-primary"
                  onClick={handleLinkClick}
                >
                  {t("home")}
                </Link>
                <Link
                  href={`/${locale}/why`}
                  className="text-lg font-semibold hover:text-primary"
                  onClick={handleLinkClick}
                >
                  {t("about")}
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className="text-lg font-semibold hover:text-primary"
                  onClick={handleLinkClick}
                >
                  {t("faq")}
                </Link>
                <Button
                  variant={"outline"}
                  asChild
                  className="mt-4 hover:bg-gray-100 hover:text-black"
                >
                  <Link href={`/${locale}/create`} onClick={handleLinkClick}>
                    <Plus className="mr-2 h-4 w-4" /> {t("create")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
