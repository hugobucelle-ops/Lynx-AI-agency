import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('servicios_page');
  return {
    title: 'Servicios — GEO y SEO Local',
    description: t('desc'),
  };
}

export default async function ServiciosPage() {
  const t = await getTranslations('servicios_page');
  const locale = await getLocale();
  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';
  const pricingHref = `/${locale === 'en' ? 'en/' : ''}pricing`;

  const geoItems = t.raw('geo_items') as { title: string; desc: string }[];
  const seoItems = t.raw('seo_items') as { title: string; desc: string }[];

  return (
    <>
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
            top: -200,
            right: -150,
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(0,207,255,0.06) 0%, transparent 70%)',
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
            <p style={{ fontSize: 16, color: '#8896AA', lineHeight: 1.75, maxWidth: 580 }}>
              {t('desc')}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* GEO */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="service-layout">
            <SectionReveal direction="left" className="service-intro">
              <Badge color="cyan" style={{ marginBottom: 20 } as React.CSSProperties}>
                {t('geo_badge')}
              </Badge>
              <h2
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  letterSpacing: '-1px',
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                {t('geo_title')}
              </h2>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8, marginBottom: 16 }}>
                <strong style={{ color: '#EEEEF4' }}>{t('geo_intro1').split('.')[0]}.</strong>{' '}
                {t('geo_intro1').split('.').slice(1).join('.')}
              </p>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8 }}>
                {t('geo_intro2')}
              </p>
            </SectionReveal>

            <StaggerReveal className="service-cards" stagger={0.07}>
              {geoItems.map((item) => (
                <StaggerItem key={item.title}>
                  <GlassCard accent="cyan" style={{ padding: 22, height: '100%' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#00CFFF',
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 13, color: '#8896AA', lineHeight: 1.65 }}>{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* SEO Local */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="service-layout">
            <SectionReveal direction="left" className="service-intro">
              <Badge color="gold" style={{ marginBottom: 20 } as React.CSSProperties}>
                {t('seo_badge')}
              </Badge>
              <h2
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  letterSpacing: '-1px',
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                {t('seo_title')}
              </h2>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8, marginBottom: 16 }}>
                <strong style={{ color: '#EEEEF4' }}>{t('seo_intro1').split('.')[0]}.</strong>{' '}
                {t('seo_intro1').split('.').slice(1).join('.')}
              </p>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8 }}>
                {t('seo_intro2')}
              </p>
            </SectionReveal>

            <StaggerReveal className="service-cards" stagger={0.07}>
              {seoItems.map((item) => (
                <StaggerItem key={item.title}>
                  <GlassCard accent="gold" style={{ padding: 22, height: '100%' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#F0B429',
                        marginBottom: 8,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 13, color: '#8896AA', lineHeight: 1.65 }}>{item.desc}</p>
                  </GlassCard>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <SectionReveal>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(24px, 3vw, 34px)',
                letterSpacing: '-1px',
                marginBottom: 12,
              }}
            >
              {t('cta_title')}
            </h2>
            <p style={{ fontSize: 15, color: '#8896AA', maxWidth: 480, margin: '0 auto 28px' }}>
              {t('cta_desc')}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={ctaHref} className="btn-primary">{t('cta1')}</Link>
              <Link href={pricingHref} className="btn-ghost">{t('cta2')}</Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .service-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }
        .service-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .service-layout { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 640px) {
          .service-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
