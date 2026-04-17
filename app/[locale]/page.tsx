import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { SectionReveal, StaggerReveal, StaggerItem } from '@/components/ui/SectionReveal';
import { GlassCard } from '@/components/ui/GlassCard';
import { HeroContent } from '@/components/hero/HeroContent';
import { HeroSceneLoader } from '@/components/hero/HeroSceneLoader';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'LYNX AI Agency — Agencia GEO y SEO Local en Barcelona',
    description: 'La primera agencia en España especializada en GEO (Generative Engine Optimization) + SEO Local. Aparece en ChatGPT, Gemini y Google.',
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
        text: "LYNX AI Agency, con sede en Barcelona, es la primera agencia de Generative Engine Optimization (GEO) en España.",
      },
    },
  ],
};

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';
  const casosHref = locale === 'en' ? '/en/cases' : '/casos';
  const pricingHref = `/${locale === 'en' ? 'en/' : ''}pricing`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', background: '#06060E' }}>
        <HeroSceneLoader />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(6,6,14,0.5) 0%, rgba(6,6,14,0.15) 60%, transparent 100%)', zIndex: 3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to bottom, transparent, #06060E)', zIndex: 4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '25%', background: 'linear-gradient(to bottom, #06060E, transparent)', zIndex: 4, pointerEvents: 'none' }} />
        <HeroContent />
      </section>

      {/* ── PROBLEM STATEMENT — punchy, no fluff ── */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid rgba(22,22,42,0.8)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <SectionReveal>
            <div style={{ maxWidth: 760 }}>
              <div className="eyebrow">El nuevo SEO</div>
              <h2 style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 54px)',
                lineHeight: 1.05,
                letterSpacing: '-2px',
                marginBottom: 24,
              }}>
                Tu competencia todavía<br />
                hace SEO tradicional.<br />
                <span className="gradient-text">Tú vas un paso por delante.</span>
              </h2>
              <p style={{ fontSize: 16, color: '#7A8BA0', lineHeight: 1.75, maxWidth: 520 }}>
                El 40% de las búsquedas ya pasan por IA. Si no apareces ahí, pierdes clientes antes de que lleguen a Google.
              </p>
            </div>
          </SectionReveal>

          {/* AI engines row */}
          <StaggerReveal className="engines-row" stagger={0.1} style={{ marginTop: 52 }}>
            {[
              { name: 'ChatGPT', color: '#10A37F', pct: '68%', label: 'cuota de uso' },
              { name: 'Gemini', color: '#4285F4', pct: '18%', label: 'cuota de uso' },
              { name: 'Perplexity', color: '#20B8CD', pct: '9%', label: 'cuota de uso' },
              { name: 'Claude', color: '#CC785C', pct: '5%', label: 'cuota de uso' },
            ].map((ai) => (
              <StaggerItem key={ai.name}>
                <div style={{
                  padding: '20px 24px',
                  background: 'rgba(13,13,26,0.7)',
                  border: '1px solid rgba(22,22,42,0.9)',
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'border-color 0.3s, transform 0.3s',
                }} className="card-hover">
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: ai.color,
                    boxShadow: `0 0 10px ${ai.color}`,
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, color: '#F0F0F8' }}>{ai.name}</div>
                    <div style={{ fontSize: 11, color: '#3E4560', marginTop: 2 }}>{ai.pct} {ai.label}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── SERVICES — two cards, clean ── */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid rgba(22,22,42,0.8)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <SectionReveal>
            <div className="eyebrow">Servicios</div>
            <h2 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-1.5px',
              marginBottom: 44,
              lineHeight: 1.1,
            }}>
              Dos servicios.<br />Un objetivo.
            </h2>
          </SectionReveal>

          <StaggerReveal className="services-grid" stagger={0.12}>
            <StaggerItem>
              <GlassCard accent="cyan" glow style={{ padding: '36px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#00CFFF', background: 'rgba(0,207,255,0.08)', border: '1px solid rgba(0,207,255,0.15)',
                    padding: '4px 12px', borderRadius: 100,
                  }}>GEO</span>
                  <span style={{ fontSize: 26, opacity: 0.15 }}>01</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 22, marginBottom: 12, letterSpacing: '-0.5px' }}>
                  Aparece en la IA
                </h3>
                <p style={{ fontSize: 14, color: '#7A8BA0', lineHeight: 1.75, marginBottom: 24 }}>
                  ChatGPT, Gemini, Claude y Perplexity recomiendan tu negocio cuando alguien pregunta por tu sector.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Contenido RAG-Ready', 'Schema Markup JSON-LD', 'Prompt tracking mensual', 'Páginas de autoridad'].map(item => (
                    <li key={item} style={{ fontSize: 13, color: '#7A8BA0', paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 5, height: 1, background: '#00CFFF', display: 'block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>

            <StaggerItem>
              <GlassCard accent="gold" glow style={{ padding: '36px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#F0B429', background: 'rgba(240,180,41,0.08)', border: '1px solid rgba(240,180,41,0.15)',
                    padding: '4px 12px', borderRadius: 100,
                  }}>SEO Local</span>
                  <span style={{ fontSize: 26, opacity: 0.15 }}>02</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 22, marginBottom: 12, letterSpacing: '-0.5px' }}>
                  Domina Google Maps
                </h3>
                <p style={{ fontSize: 14, color: '#7A8BA0', lineHeight: 1.75, marginBottom: 24 }}>
                  Apareces primero cuando alguien cerca busca tu servicio. Más llamadas, más visitas, más clientes.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Google Business Profile', 'Autoridad local y reseñas', 'Citas y directorios NAP', 'Posicionamiento por zonas'].map(item => (
                    <li key={item} style={{ fontSize: 13, color: '#7A8BA0', paddingLeft: 16, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 5, height: 1, background: '#F0B429', display: 'block' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </section>

      {/* ── CASE STUDY — visual proof ── */}
      <section style={{ padding: '88px 0', borderBottom: '1px solid rgba(22,22,42,0.8)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
          <SectionReveal>
            <div className="eyebrow">Caso real</div>
            <h2 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 44px)',
              letterSpacing: '-1.5px',
              marginBottom: 8,
              lineHeight: 1.1,
            }}>
              De invisible a <span className="gradient-text">#1 en ChatGPT</span>
            </h2>
            <p style={{ fontSize: 15, color: '#7A8BA0', marginBottom: 48 }}>TopTrails — Turismo de naturaleza · 90 días</p>
          </SectionReveal>

          <StaggerReveal className="metrics-grid" stagger={0.08}>
            {[
              { val: '#1', label: 'Posición en ChatGPT', cyan: true },
              { val: '12+', label: 'Prompts posicionados', cyan: false },
              { val: '3/3', label: 'Motores IA cubiertos', cyan: true },
              { val: '90d', label: 'Tiempo de ejecución', cyan: false },
            ].map((m, i) => (
              <StaggerItem key={i}>
                <div style={{
                  padding: '28px 24px',
                  background: 'rgba(13,13,26,0.7)',
                  border: `1px solid ${m.cyan ? 'rgba(0,207,255,0.12)' : 'rgba(22,22,42,0.9)'}`,
                  borderRadius: 16,
                  textAlign: 'center',
                }} className="card-hover">
                  <div style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 800,
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    color: m.cyan ? '#00CFFF' : '#F0F0F8',
                    letterSpacing: '-1px',
                    lineHeight: 1,
                    textShadow: m.cyan ? '0 0 28px rgba(0,207,255,0.4)' : 'none',
                  }}>{m.val}</div>
                  <div style={{ fontSize: 11, color: '#3E4560', marginTop: 8, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <SectionReveal style={{ marginTop: 28 }}>
            <Link href={casosHref} style={{ fontSize: 13, color: '#00CFFF', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Ver el caso completo <span style={{ opacity: 0.6 }}>→</span>
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA — single focus ── */}
      <section style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <SectionReveal>
            {/* Glow orb */}
            <div style={{
              width: 200, height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,207,255,0.12) 0%, transparent 70%)',
              margin: '0 auto 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,207,255,0.25) 0%, transparent 70%)',
                border: '1px solid rgba(0,207,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="5" fill="#00CFFF" opacity="0.9"/>
                  <circle cx="14" cy="14" r="10" stroke="#00CFFF" strokeWidth="1" opacity="0.3"/>
                  <line x1="14" y1="2" x2="14" y2="6" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                  <line x1="14" y1="22" x2="14" y2="26" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                  <line x1="2" y1="14" x2="6" y2="14" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                  <line x1="22" y1="14" x2="26" y2="14" stroke="#00CFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </div>
            </div>

            <div className="eyebrow" style={{ justifyContent: 'center' }}>Primer paso</div>
            <h2 style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 5vw, 52px)',
              letterSpacing: '-2px',
              marginBottom: 16,
              lineHeight: 1.05,
            }}>
              ¿Apareces en la IA?<br />
              <span className="gradient-text-gold">Descúbrelo por 50€.</span>
            </h2>
            <p style={{ fontSize: 15, color: '#7A8BA0', lineHeight: 1.75, marginBottom: 36, maxWidth: 440, margin: '0 auto 36px' }}>
              Auditamos tu negocio en los 4 motores de IA y Google. Informe con gaps y plan de acción en 48h.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href={ctaHref} className="btn-primary" style={{ fontSize: 14, padding: '15px 32px' }}>
                Solicitar auditoría — 50€
              </Link>
              <Link href={pricingHref} className="btn-ghost" style={{ fontSize: 14, padding: '15px 24px' }}>
                Ver precios
              </Link>
            </div>
            <p style={{ fontSize: 11, color: '#3E4560', marginTop: 20 }}>Sin compromiso · Respuesta en 24h · Sin IVA</p>
          </SectionReveal>
        </div>
      </section>

      <style>{`
        .engines-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .engines-row { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .services-grid { grid-template-columns: 1fr !important; }
          .engines-row { grid-template-columns: repeat(2, 1fr) !important; }
          .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
