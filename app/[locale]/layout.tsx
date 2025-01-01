import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { locales } from "@/i18n/settings";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

async function getMessages(locale: string) {
  try {
    return (await import(`@/i18n/messages/${locale}.json`)).default;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = createTranslator({ locale, messages });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <div className="flex-1 px-6 py-8 text-white bg-grid-small-purple dark:bg-grid-small-white bg-black">
          {children}
        </div>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
