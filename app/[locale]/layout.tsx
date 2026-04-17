import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/nav/Nav';
import { Footer } from '@/components/footer/Footer';
import { LenisProvider } from '@/components/ui/LenisProvider';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://lynxai.agency/#organization",
  name: "LYNX AI Agency",
  alternateName: ["LYNX GEO Agency", "Lynx AI", "LYNX Agency Barcelona"],
  description:
    "LYNX AI Agency es una agencia de Generative Engine Optimization (GEO) y SEO Local con sede en Barcelona, España. La primera agencia en España que ofrece un servicio dual dedicado de GEO + SEO Local.",
  url: "https://lynxai.agency",
  email: "lynx.geo.agency@gmail.com",
  telephone: ["+34640301104", "+34611406315"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barcelona",
    addressRegion: "Catalonia",
    addressCountry: "ES",
  },
  foundingDate: "2025",
  founder: {
    "@type": "Person",
    name: "Hugo Bucelle",
    jobTitle: "Founder & GEO Specialist",
  },
  slogan: "O apareces en la IA, o no existes.",
  areaServed: [
    { "@type": "Country", name: "Spain" },
    { "@type": "Continent", name: "Europe" },
  ],
};

// Locale layout: adds i18n provider, smooth scroll, nav, footer
// Does NOT render <html>/<body> — root layout handles that
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <LenisProvider>
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
