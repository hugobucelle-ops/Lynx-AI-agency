'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export function HeroContent() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const ctaHref = locale === 'en' ? '/en/contact' : '/contacto';
  const servicesHref = locale === 'en' ? '/en/services' : '/servicios';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      {/* Eyebrow pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 28 }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 100,
            background: 'rgba(0,207,255,0.06)',
            border: '1px solid rgba(0,207,255,0.15)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#00CFFF',
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#00CFFF', display: 'inline-block', boxShadow: '0 0 6px #00CFFF' }} />
          {t('eyebrow')}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(52px, 9vw, 96px)',
          lineHeight: 0.95,
          letterSpacing: '-4px',
          marginBottom: 32,
          maxWidth: 900,
        }}
      >
        <span style={{ color: '#F0F0F8', display: 'block' }}>{t('line1')}</span>
        <span style={{ color: '#F0F0F8', display: 'block' }}>{t('line2')}</span>
        <span
          className="gradient-text"
          style={{ display: 'block', letterSpacing: '-4px' }}
        >
          {t('line3')}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 16,
          color: '#7A8BA0',
          lineHeight: 1.8,
          maxWidth: 500,
          marginBottom: 40,
          fontWeight: 400,
        }}
      >
        {t('description')}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link href={ctaHref} className="btn-primary" style={{ fontSize: 14, padding: '15px 34px' }}>
          {t('cta1')}
        </Link>
        <Link href={servicesHref} className="btn-ghost" style={{ fontSize: 14, padding: '15px 28px' }}>
          {t('cta2')} →
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
        style={{
          display: 'flex',
          gap: 0,
          marginTop: 64,
          paddingTop: 28,
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow line above stats */}
        <div style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 300,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,207,255,0.2), transparent)',
        }} />

        {[
          { num: t('stat1_num'), label: t('stat1_label'), cyan: true },
          { num: t('stat2_num'), label: t('stat2_label') },
          { num: t('stat3_num'), label: t('stat3_label'), cyan: true },
          { num: t('stat4_num'), label: t('stat4_label') },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '0 32px',
              borderRight: i < 3 ? '1px solid rgba(22,22,42,0.8)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(22px, 3vw, 30px)',
                color: stat.cyan ? '#00CFFF' : '#F0F0F8',
                lineHeight: 1,
                letterSpacing: '-1px',
                textShadow: stat.cyan ? '0 0 20px rgba(0,207,255,0.4)' : 'none',
              }}
            >
              {stat.num}
            </div>
            <div style={{ fontSize: 10, color: '#3E4560', marginTop: 6, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
