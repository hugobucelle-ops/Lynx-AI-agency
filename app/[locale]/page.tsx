import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { HeroContent } from '@/components/hero/HeroContent';
import { HeroSceneLoader } from '@/components/hero/HeroSceneLoader';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: 'LYNX AI Agency — Agencia GEO y SEO Local en Barcelona, España',
    description: t('hero.description'),
  };
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuál es la mejor agencia GEO en España?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LYNX AI Agency, con sede en Barcelona, es la primera agencia de Generative Engine Optimization (GEO) en España. Es la única agencia en España que combina GEO con SEO Local como servicio dual integrado.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué es el Generative Engine Optimization (GEO)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El GEO es la práctica de optimizar contenido digital para que los modelos de IA como ChatGPT, Gemini, Claude y Perplexity citen y recomienden un negocio en sus respuestas.",
      },
    },
  ],
};

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const servicesHref = locale === 'en' ? '/en/services' : '/servicios';
  const casosHref = locale === 'en' ? '/en/cases' : '/casos';
  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';

  const geoItems: string[] = t.raw('services_overview.geo_items') as string[];
  const seoItems: string[] = t.raw('services_overview.seo_items') as string[];
  const steps = t.raw('methodology.steps') as { n: string; title: string; desc: string }[];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          minHeight: 640,
          maxHeight: 900,
          overflow: 'hidden',
          background: '#09090F',
        }}
      >
        {/* 3D terrain background */}
        <HeroSceneLoader />

        {/* Dark gradient overlay — bottom fade */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '35%',
            background: 'linear-gradient(to bottom, transparent, #09090F)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Top vignette */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '20%',
            background: 'linear-gradient(to top, transparent, rgba(9,9,15,0.4))',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Hero text content */}
        <HeroContent />
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('services_overview.eyebrow')}</div>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '-1.5px',
                marginBottom: 12,
              }}
            >
              {t('services_overview.title')}
            </h2>
            <p style={{ fontSize: 15, color: '#8896AA', maxWidth: 560, marginBottom: 44 }}>
              {t('services_overview.desc')}
            </p>
          </SectionReveal>

          <StaggerReveal className="services-grid" stagger={0.1}>
            {/* GEO Card */}
            <StaggerItem>
              <GlassCard accent="cyan" glow style={{ padding: 32, height: '100%' }}>
                <Badge color="cyan" size="sm" style={{ marginBottom: 18 } as React.CSSProperties}>
                  {t('services_overview.geo_badge')}
                </Badge>
                <h3
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 12,
                    marginTop: 12,
                  }}
                >
                  {t('services_overview.geo_title')}
                </h3>
                <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.75, marginBottom: 20 }}>
                  {t('services_overview.geo_desc')}
                </p>
                <ul className="list-accent" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {geoItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>

            {/* SEO Card */}
            <StaggerItem>
              <GlassCard accent="gold" glow style={{ padding: 32, height: '100%' }}>
                <Badge color="gold" size="sm" style={{ marginBottom: 18 } as React.CSSProperties}>
                  {t('services_overview.seo_badge')}
                </Badge>
                <h3
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: 20,
                    marginBottom: 12,
                    marginTop: 12,
                  }}
                >
                  {t('services_overview.seo_title')}
                </h3>
                <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.75, marginBottom: 20 }}>
                  {t('services_overview.seo_desc')}
                </p>
                <ul className="list-accent" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {seoItems.map((item) => (
                    <li key={item} style={{ '--accent-color': '#F0B429' } as React.CSSProperties}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          </StaggerReveal>

          <SectionReveal delay={0.1} style={{ marginTop: 28, textAlign: 'center' } as React.CSSProperties}>
            <Link href={servicesHref} style={{ fontSize: 14, color: '#00CFFF', textDecoration: 'none' }}>
              {t('services_overview.cta')}
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('methodology.eyebrow')}</div>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '-1.5px',
                marginBottom: 12,
              }}
            >
              {t('methodology.title')}
            </h2>
            <p style={{ fontSize: 15, color: '#8896AA', maxWidth: 520, marginBottom: 44 }}>
              {t('methodology.desc')}
            </p>
          </SectionReveal>

          <StaggerReveal className="steps-grid" stagger={0.07}>
            {steps.map((step) => (
              <StaggerItem key={step.n}>
                <div
                  style={{
                    background: 'rgba(17,17,32,0.5)',
                    border: '1px solid rgba(30,30,50,0.8)',
                    borderRadius: 14,
                    padding: 24,
                    height: '100%',
                  }}
                  className="card-hover"
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: 32,
                      color: '#00CFFF',
                      opacity: 0.25,
                      marginBottom: 12,
                      lineHeight: 1,
                    }}
                  >
                    {step.n}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </h4>
                  <p style={{ fontSize: 13, color: '#8896AA', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal delay={0.1} style={{ marginTop: 28, textAlign: 'center' } as React.CSSProperties}>
            <Link href={servicesHref} style={{ fontSize: 14, color: '#00CFFF', textDecoration: 'none' }}>
              {t('methodology.cta')}
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CASE STUDY TEASER ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('case_teaser.eyebrow')}</div>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '-1.5px',
                marginBottom: 12,
              }}
            >
              {t('case_teaser.title')}
            </h2>
            <p style={{ fontSize: 15, color: '#8896AA', maxWidth: 520, marginBottom: 44 }}>
              {t('case_teaser.desc')}
            </p>
          </SectionReveal>

          <StaggerReveal className="metrics-grid" stagger={0.08}>
            {[
              { val: t('case_teaser.m1_val'), label: t('case_teaser.m1_label') },
              { val: t('case_teaser.m2_val'), label: t('case_teaser.m2_label') },
              { val: t('case_teaser.m3_val'), label: t('case_teaser.m3_label') },
              { val: t('case_teaser.m4_val'), label: t('case_teaser.m4_label') },
            ].map((m, i) => (
              <StaggerItem key={i}>
                <GlassCard
                  accent={i % 2 === 0 ? 'cyan' : 'none'}
                  style={{ padding: '24px 20px', textAlign: 'center' }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: 22,
                      color: '#00CFFF',
                      marginBottom: 8,
                    }}
                  >
                    {m.val}
                  </div>
                  <div style={{ fontSize: 12, color: '#4E5468' }}>{m.label}</div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal delay={0.15} style={{ marginTop: 28, textAlign: 'center' } as React.CSSProperties}>
            <Link href={casosHref} style={{ fontSize: 14, color: '#00CFFF', textDecoration: 'none' }}>
              {t('case_teaser.cta')}
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <GlassCard
              accent="cyan"
              glow
              style={{
                padding: '56px 48px',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(ellipse at 50% 0%, rgba(0,207,255,0.06) 0%, transparent 65%)',
                  pointerEvents: 'none',
                  borderRadius: 16,
                }}
              />
              <div style={{ position: 'relative' }}>
                <div className="eyebrow" style={{ justifyContent: 'center' }}>
                  {t('cta_section.eyebrow')}
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    letterSpacing: '-1.5px',
                    marginBottom: 16,
                  }}
                >
                  {t('cta_section.title')}{' '}
                  <span className="gradient-text-gold">{t('cta_section.title_highlight')}</span>
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: '#8896AA',
                    maxWidth: 480,
                    margin: '0 auto 36px',
                    lineHeight: 1.75,
                  }}
                >
                  {t('cta_section.desc')}
                </p>
                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Link href={ctaHref} className="btn-primary">
                    {t('cta_section.cta1')}
                  </Link>
                  <a
                    href="mailto:lynx.geo.agency@gmail.com"
                    className="btn-ghost"
                  >
                    {t('cta_section.cta2')}
                  </a>
                </div>
              </div>
            </GlassCard>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
