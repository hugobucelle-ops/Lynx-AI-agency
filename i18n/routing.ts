import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/servicios': {
      es: '/servicios',
      en: '/services',
    },
    '/casos': {
      es: '/casos',
      en: '/cases',
    },
    '/pricing': '/pricing',
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
  },
});
