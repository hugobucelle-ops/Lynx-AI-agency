'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Logo } from '@/components/logo/Logo';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const links = [
    { href: locale === 'en' ? '/en/services' : '/servicios', label: t('servicios') },
    { href: locale === 'en' ? '/en/cases' : '/casos', label: t('casos') },
    { href: `/${locale === 'en' ? 'en/' : ''}pricing`, label: t('pricing') },
    { href: locale === 'en' ? '/en/contact' : '/contacto', label: t('contacto') },
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(30,30,50,0.6)',
        background: 'rgba(9,9,15,0.8)',
        padding: '48px 24px 32px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            marginBottom: 40,
            alignItems: 'start',
          }}
        >
          {/* Brand */}
          <div>
            <Logo size={28} />
            <p
              style={{
                fontSize: 13,
                color: '#4E5468',
                marginTop: 16,
                maxWidth: 280,
                lineHeight: 1.65,
                fontStyle: 'italic',
              }}
            >
              "{t('tagline')}"
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'right' }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 13,
                  color: '#4E5468',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#EEEEF4'; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#4E5468'; }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(30,30,50,0.5)',
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: '#4E5468' }}>
            © {new Date().getFullYear()} LYNX AI Agency. {t('rights')}
          </p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a
              href="mailto:lynx.geo.agency@gmail.com"
              style={{ fontSize: 12, color: '#4E5468', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00CFFF'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = '#4E5468'; }}
            >
              {t('email')}
            </a>
            <span style={{ fontSize: 12, color: '#4E5468' }}>{t('location')}</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
