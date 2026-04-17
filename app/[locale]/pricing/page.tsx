import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { PricingFAQ } from '@/components/sections/pricing/PricingFAQ';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Precios — GEO y SEO Local',
    description:
      'LYNX AI Agency: setup inicial 600–800€ + 450€/mes. Auditoría de visibilidad IA 50€. Servicio dual GEO + SEO Local.',
  };
}

export default async function PricingPage() {
  const t = await getTranslations('pricing_page');
  const locale = await getLocale();
  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';

  const auditItems: string[] = t.raw('audit_items') as string[];
  const setupItems: string[] = t.raw('setup_items') as string[];
  const monthlyItems: string[] = t.raw('monthly_items') as string[];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuánto cuesta el servicio GEO de LYNX AI Agency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El servicio GEO + SEO Local de LYNX AI Agency tiene un setup inicial de 600–800€ más 450€/mes de mantenimiento. Contrato mínimo de 3 meses. Auditoría inicial disponible por 50€.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section
        style={{
          padding: '120px 0 64px',
          borderBottom: '1px solid rgba(30,30,50,0.6)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -150,
            right: -100,
            width: 450,
            height: 450,
            background: 'radial-gradient(circle, rgba(240,180,41,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('eyebrow')}</div>
            <h1
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 6vw, 60px)',
                lineHeight: 1.04,
                letterSpacing: '-2.5px',
                marginBottom: 20,
              }}
            >
              {t('title')}<br />
              <span className="gradient-text">{t('title_highlight')}</span>
            </h1>
            <p style={{ fontSize: 16, color: '#8896AA', lineHeight: 1.75, maxWidth: 560 }}>
              {t('desc')}
            </p>
          </SectionReveal>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>

          {/* Audit card */}
          <SectionReveal>
            <GlassCard
              accent="gold"
              glow
              style={{ padding: 32, marginBottom: 24 }}
            >
              <div className="audit-card-inner">
                <div style={{ flex: 1 }}>
                  <Badge color="gold" size="sm" style={{ marginBottom: 14 } as React.CSSProperties}>
                    {t('audit_badge')}
                  </Badge>
                  <h2
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: 22,
                      letterSpacing: '-0.5px',
                      marginBottom: 10,
                      marginTop: 12,
                    }}
                  >
                    {t('audit_title')}
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: '#8896AA',
                      lineHeight: 1.7,
                      maxWidth: 480,
                      marginBottom: 18,
                    }}
                  >
                    {t('audit_desc')}
                  </p>
                  <ul
                    className="list-accent"
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    {auditItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ textAlign: 'center', minWidth: 140, flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: 48,
                      letterSpacing: '-2px',
                      color: '#F0B429',
                      lineHeight: 1,
                    }}
                  >
                    {t('audit_price')}
                  </div>
                  <div style={{ fontSize: 11, color: '#4E5468', marginTop: 6 }}>
                    {t('audit_note')}
                  </div>
                  <Link
                    href={ctaHref}
                    className="btn-gold"
                    style={{ display: 'inline-block', marginTop: 18 }}
                  >
                    {t('audit_cta')}
                  </Link>
                </div>
              </div>
            </GlassCard>
          </SectionReveal>

          {/* Main pricing card */}
          <SectionReveal delay={0.1}>
            <GlassCard
              accent="cyan"
              glow
              style={{ overflow: 'hidden' }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '28px 36px',
                  borderBottom: '1px solid rgba(30,30,50,0.6)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 20,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: 26,
                      letterSpacing: '-0.5px',
                      marginBottom: 4,
                    }}
                  >
                    {t('main_title').split('+')[0]}+{' '}
                    <span style={{ color: '#00CFFF' }}>
                      {t('main_title').split('+ ')[1]}
                    </span>
                  </h2>
                  <p style={{ fontSize: 13, color: '#4E5468' }}>{t('main_subtitle')}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#4E5468',
                        marginBottom: 4,
                      }}
                    >
                      {t('setup_label')}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        fontSize: 32,
                        letterSpacing: '-1px',
                        lineHeight: 1,
                      }}
                    >
                      {t('setup_price')}
                    </div>
                  </div>
                  <div
                    style={{ width: 1, height: 44, background: 'rgba(30,30,50,0.8)' }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#4E5468',
                        marginBottom: 4,
                      }}
                    >
                      {t('monthly_label')}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        fontSize: 32,
                        letterSpacing: '-1px',
                        lineHeight: 1,
                        color: '#00CFFF',
                      }}
                    >
                      {t('monthly_price')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div
                style={{
                  padding: '28px 36px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                }}
                className="pricing-body"
              >
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#F0B429',
                      marginBottom: 14,
                    }}
                  >
                    {t('setup_includes')}
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {setupItems.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: 13,
                          color: '#8896AA',
                          paddingLeft: 18,
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 2,
                            fontSize: 9,
                            color: '#F0B429',
                          }}
                        >
                          ✦
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color: '#00CFFF',
                      marginBottom: 14,
                    }}
                  >
                    {t('monthly_includes')}
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 10,
                    }}
                  >
                    {monthlyItems.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: 13,
                          color: '#8896AA',
                          paddingLeft: 18,
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 2,
                            fontSize: 9,
                            color: '#00CFFF',
                          }}
                        >
                          ✦
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  borderTop: '1px solid rgba(30,30,50,0.6)',
                  padding: '16px 36px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <p style={{ fontSize: 12, color: '#4E5468' }}>
                  {t('contract_note').replace('3 meses', '')}{' '}
                  <strong style={{ color: 'rgba(240,180,41,0.85)' }}>3 meses</strong>{' '}
                  {t('contract_note').split('3 meses')[1]}
                </p>
                <Link href={ctaHref} className="btn-primary" style={{ padding: '10px 22px', fontSize: 13 }}>
                  {t('main_cta')}
                </Link>
              </div>
            </GlassCard>
          </SectionReveal>

          {/* FAQ */}
          <SectionReveal delay={0.15} style={{ marginTop: 56 } as React.CSSProperties}>
            <h3
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 22,
                marginBottom: 28,
              }}
            >
              {t('faq_title')}
            </h3>
            <PricingFAQ />
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .audit-card-inner {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 768px) {
          .audit-card-inner { flex-direction: column !important; }
          .pricing-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
