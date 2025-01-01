"use client";

import { useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";

const locales = {
  en: "🇬🇧",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  pt: "🇵🇹",
  ar: "🇸🇦",
  // yo: "🇳🇬",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Get the current pathname
    const segments = pathname.split("/");
    // Remove the locale segment if it exists
    if (segments.length > 1 && Object.keys(locales).includes(segments[1])) {
      segments.splice(1, 1);
    }
    // Add the new locale after the first slash
    segments.splice(1, 0, newLocale);
    // Join the segments back together
    const newPathname = segments.join("/");
    router.push(newPathname);
  };

  return (
    <Select defaultValue={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[70px] bg-black text-white border-white/20">
        <SelectValue placeholder={locales[locale as keyof typeof locales]} />
      </SelectTrigger>
      <SelectContent className="bg-black border-white/20">
        {Object.entries(locales).map(([key, flag]) => (
          <SelectItem
            key={key}
            value={key}
            className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
          >
            {flag}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
