import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async (context) => {
  const locale = await context.requestLocale || "en"; // Fallback to 'en' if locale is not available
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
