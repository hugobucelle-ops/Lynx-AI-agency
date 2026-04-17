'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from '@/components/logo/Logo';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const navLinks = (t: (key: string) => string, locale: string) => [
  { href: `/${locale === 'en' ? 'en/services' : 'servicios'}`, label: t('servicios') },
  { href: `/${locale === 'en' ? 'en/cases' : 'casos'}`, label: t('casos') },
  { href: `/${locale === 'en' ? 'en/' : ''}pricing`, label: t('pricing') },
  { href: `/${locale === 'en' ? 'en/contact' : 'contacto'}`, label: t('contacto') },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('nav');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const links = navLinks(t, locale);
  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';
  const homeHref = locale === 'en' ? '/en' : '/';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'rgba(9,9,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,30,50,0.6)' : '1px solid transparent',
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <Link href={homeHref} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Logo size={30} />
        </Link>

        {/* Desktop links */}
        <div
          className="desktop-nav"
          style={{ display: 'flex', alignItems: 'center', gap: 32 }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: pathname === link.href ? '#00CFFF' : '#8896AA',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { if (pathname !== link.href) (e.target as HTMLElement).style.color = '#EEEEF4'; }}
              onMouseLeave={(e) => { if (pathname !== link.href) (e.target as HTMLElement).style.color = '#8896AA'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: lang switcher + CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Language switcher */}
          <LangSwitcher locale={locale} pathname={pathname} />

          {/* CTA */}
          <Link href={ctaHref} className="btn-primary desktop-cta" style={{ padding: '9px 20px', fontSize: 13 }}>
            {t('cta')}
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="hamburger"
            style={{
              width: 40,
              height: 40,
              background: 'transparent',
              border: '1px solid rgba(30,30,50,0.8)',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              padding: 0,
            }}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 18, height: 1.5, background: '#EEEEF4', borderRadius: 2 }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'block', width: 18, height: 1.5, background: '#EEEEF4', borderRadius: 2 }}
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 18, height: 1.5, background: '#EEEEF4', borderRadius: 2 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'rgba(9,9,15,0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(30,30,50,0.8)',
            }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              style={{ padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              {links.map((link) => (
                <motion.div key={link.href} variants={fadeInUp}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '14px 0',
                      fontSize: 18,
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 700,
                      color: pathname === link.href ? '#00CFFF' : '#EEEEF4',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(30,30,50,0.5)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={fadeInUp} style={{ marginTop: 20 }}>
                <Link href={ctaHref} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  {t('cta')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function LangSwitcher({ locale, pathname }: { locale: string; pathname: string }) {
  const isEn = locale === 'en';

  // Simple path swap (works for most routes)
  function getOppositeHref() {
    if (isEn) {
      return pathname
        .replace(/^\/en\/services/, '/servicios')
        .replace(/^\/en\/cases/, '/casos')
        .replace(/^\/en\/contact/, '/contacto')
        .replace(/^\/en/, '/') || '/';
    } else {
      return pathname
        .replace(/^\/servicios/, '/en/services')
        .replace(/^\/casos/, '/en/cases')
        .replace(/^\/contacto/, '/en/contact')
        .replace(/^\//, '/en/');
    }
  }

  return (
    <Link
      href={getOppositeHref()}
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.12em',
        color: '#4E5468',
        textDecoration: 'none',
        padding: '5px 10px',
        border: '1px solid rgba(30,30,50,0.8)',
        borderRadius: 6,
        transition: 'color 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#00CFFF';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,207,255,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = '#4E5468';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30,30,50,0.8)';
      }}
    >
      {isEn ? 'ES' : 'EN'}
    </Link>
  );
}
