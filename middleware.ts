import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/settings';

export default createMiddleware({
  locales,
  defaultLocale,
  // This will redirect the root path to the default locale
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /_next (Next.js internals)
  // - /icons, /images, etc. (static files)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
