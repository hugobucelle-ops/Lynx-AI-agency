import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contacto — LYNX AI Agency',
    description:
      'Contacta con LYNX AI Agency. Te respondemos en 24 horas con un análisis inicial de tu visibilidad en IA.',
  };
}

export default async function ContactoPage() {
  const t = await getTranslations('contacto_page');

  const nextSteps = t.raw('next_steps') as string[];

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
            bottom: -150,
            right: -80,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(0,207,255,0.05) 0%, transparent 70%)',
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
            <p style={{ fontSize: 16, color: '#8896AA', lineHeight: 1.75, maxWidth: 520 }}>
              {t('desc')}
            </p>
          </SectionReveal>
        </div>
      </section>

      <section style={{ padding: '60px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div className="contact-grid">
            {/* Form */}
            <SectionReveal direction="left">
              <ContactForm />
            </SectionReveal>

            {/* Info */}
            <SectionReveal direction="right" delay={0.1}>
              <div style={{ marginBottom: 40 }}>
                <div className="eyebrow">{t('contact_eyebrow')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>
                  {[
                    {
                      icon: '✉',
                      label: 'Email',
                      value: 'lynx.geo.agency@gmail.com',
                      href: 'mailto:lynx.geo.agency@gmail.com',
                    },
                    {
                      icon: '📞',
                      label: 'Teléfono',
                      value: '640 301 104',
                      href: 'tel:+34640301104',
                    },
                    {
                      icon: '📍',
                      label: 'Ubicación',
                      value: 'Barcelona, España',
                      href: undefined,
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      style={{ display: 'flex', gap: 14, alignItems: 'center' }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          background: 'rgba(0,207,255,0.07)',
                          border: '1px solid rgba(0,207,255,0.15)',
                          borderRadius: 10,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 16,
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#4E5468', marginBottom: 2 }}>
                          {c.label}
                        </div>
                        {c.href ? (
                          <a
                            href={c.href}
                            style={{
                              fontSize: 14,
                              color: '#EEEEF4',
                              fontWeight: 500,
                              textDecoration: 'none',
                            }}
                          >
                            {c.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: 14, color: '#EEEEF4', fontWeight: 500 }}>
                            {c.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(17,17,32,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(30,30,50,0.8)',
                  borderRadius: 14,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 16,
                  }}
                >
                  {t('next_title')}
                </h3>
                {nextSteps.map((step, i) => (
                  <div
                    key={i}
                    style={{ display: 'flex', gap: 12, marginBottom: 12 }}
                  >
                    <span
                      style={{
                        color: '#00CFFF',
                        fontWeight: 700,
                        flexShrink: 0,
                        fontSize: 13,
                      }}
                    >
                      {i + 1}.
                    </span>
                    <p style={{ fontSize: 13, color: '#8896AA', lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
