import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { GlassCard } from '@/components/ui/GlassCard';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Casos de Éxito — Resultados GEO reales',
    description:
      'Caso de éxito de LYNX AI Agency: empresa internacional de turismo que pasó de 0 menciones en IA a ser la primera recomendación en ChatGPT para 12+ prompts en 90 días.',
  };
}

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  reviewBody:
    "LYNX AI Agency llevó nuestro negocio de ser completamente invisible para los asistentes de IA a convertirse en la primera recomendación en ChatGPT para nuestros términos clave de búsqueda en 90 días.",
  author: { "@type": "Person", name: "CEO, Empresa Internacional de Turismo" },
  itemReviewed: { "@type": "Organization", name: "LYNX AI Agency", "@id": "https://lynxai.agency/#organization" },
  reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
};

export default async function CasosPage() {
  const t = await getTranslations('casos_page');
  const locale = await getLocale();
  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';
  const pricingHref = `/${locale === 'en' ? 'en/' : ''}pricing`;

  const timeline = t.raw('timeline') as { label: string; title: string; desc: string }[];

  const results = [
    { before: 'No aparece', after: '#1 recomendación', label: 'ChatGPT', cyan: true },
    { before: '2.º puesto', after: '2.º puesto', label: 'Gemini', cyan: false },
    { before: 'No aparece', after: 'Citado con enlace', label: 'Google AI Overview', cyan: true },
    { before: '0 prompts', after: '12+ prompts', label: 'Prompts posicionados', cyan: true },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
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
            top: -200,
            left: -100,
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

      {/* Context */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="context-grid">
            <SectionReveal direction="left">
              <div className="eyebrow">{t('context_eyebrow')}</div>
              <h2
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 26,
                  letterSpacing: '-0.5px',
                  marginBottom: 16,
                }}
              >
                {t('context_title')}
              </h2>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8, marginBottom: 16 }}>
                {t('context_desc1')}
              </p>
              <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.8 }}>
                {t('context_desc2')}
              </p>
            </SectionReveal>

            <SectionReveal direction="right" delay={0.1}>
              <div className="eyebrow">{t('prompt_eyebrow')}</div>
              <GlassCard accent="cyan" style={{ padding: 28, marginTop: 16 }}>
                <p style={{ fontSize: 12, color: '#4E5468', marginBottom: 14 }}>
                  {t('prompt_label')}
                </p>
                <blockquote
                  style={{
                    borderLeft: '2px solid #00CFFF',
                    paddingLeft: 16,
                    marginBottom: 20,
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      color: '#EEEEF4',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                    }}
                  >
                    {t('prompt_text')}
                  </p>
                </blockquote>
                <div className="prompt-motors">
                  {[
                    { motor: 'ChatGPT', antes: '✗ No aparece', despues: '✓ 1.ª opción' },
                    { motor: 'Gemini', antes: '2.º puesto', despues: '2.º puesto' },
                    { motor: 'Perplexity', antes: '✗ No aparece', despues: 'Mencionado' },
                  ].map((r) => (
                    <div
                      key={r.motor}
                      style={{
                        background: 'rgba(9,9,15,0.8)',
                        borderRadius: 8,
                        padding: '12px 14px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#4E5468',
                          marginBottom: 8,
                        }}
                      >
                        {r.motor}
                      </div>
                      <div style={{ fontSize: 12, color: '#4E5468', marginBottom: 4 }}>
                        Antes: {r.antes}
                      </div>
                      <div style={{ fontSize: 12, color: '#00CFFF', fontWeight: 600 }}>
                        Después: {r.despues}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('timeline_eyebrow')}</div>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: '-0.5px',
                marginBottom: 44,
              }}
            >
              {t('timeline_title')}
            </h2>
          </SectionReveal>

          <StaggerReveal stagger={0.08}>
            {timeline.map((item, i) => (
              <StaggerItem key={i}>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr',
                    gap: 24,
                    paddingBottom: 28,
                    paddingTop: i === 0 ? 0 : 28,
                    borderTop: i === 0 ? 'none' : '1px solid rgba(30,30,50,0.5)',
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#4E5468',
                      paddingTop: 2,
                    }}
                  >
                    {item.label}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#00CFFF',
                        marginBottom: 6,
                      }}
                    >
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Results */}
      <section style={{ padding: '72px 0', borderBottom: '1px solid rgba(30,30,50,0.6)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <SectionReveal>
            <div className="eyebrow">{t('results_eyebrow')}</div>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: '-0.5px',
                marginBottom: 36,
              }}
            >
              {t('results_title')}
            </h2>
          </SectionReveal>

          <StaggerReveal className="results-grid" stagger={0.08} delay={0.1}>
            {results.map((r) => (
              <StaggerItem key={r.label}>
                <GlassCard accent={r.cyan ? 'cyan' : 'none'} style={{ padding: 24 }}>
                  <div style={{ fontSize: 11, color: '#4E5468', marginBottom: 8 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: '#4E5468', marginBottom: 8 }}>
                    Antes: {r.before}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      fontSize: 16,
                      color: r.cyan ? '#00CFFF' : '#8896AA',
                    }}
                  >
                    Después: {r.after}
                  </div>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal delay={0.2}>
            <blockquote
              style={{
                borderLeft: '2px solid #00CFFF',
                paddingLeft: 28,
                maxWidth: 660,
                marginTop: 44,
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: '#8896AA',
                  lineHeight: 1.8,
                  marginBottom: 10,
                }}
              >
                "{t('testimonial')}"
              </p>
              <cite style={{ fontSize: 13, color: '#4E5468', fontStyle: 'normal' }}>
                — {t('testimonial_author')}
              </cite>
            </blockquote>
          </SectionReveal>
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
            <p style={{ fontSize: 15, color: '#8896AA', maxWidth: 440, margin: '0 auto 28px' }}>
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
        .context-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }
        .prompt-motors {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        .results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .context-grid { grid-template-columns: 1fr !important; }
          .results-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .prompt-motors { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
