'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Badge } from '@/components/ui/Badge';

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
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}
      >
        <Badge color="cyan" size="sm">{t('eyebrow')}</Badge>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 8vw, 80px)',
          lineHeight: 1.02,
          letterSpacing: '-3px',
          marginBottom: 28,
          maxWidth: 800,
        }}
      >
        {t('line1')}<br />
        {t('line2')}<br />
        <span className="gradient-text">{t('line3')}</span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 16,
          color: '#8896AA',
          lineHeight: 1.75,
          maxWidth: 520,
          marginBottom: 36,
        }}
      >
        {t('description')}
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link href={ctaHref} className="btn-primary">
          {t('cta1')}
        </Link>
        <Link href={servicesHref} className="btn-ghost">
          {t('cta2')}
        </Link>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        style={{
          display: 'flex',
          gap: 0,
          marginTop: 56,
          borderTop: '1px solid rgba(30,30,50,0.5)',
          paddingTop: 24,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {[
          { num: t('stat1_num'), label: t('stat1_label'), cyan: true },
          { num: t('stat2_num'), label: t('stat2_label'), suffix: ' días' },
          { num: t('stat3_num'), label: t('stat3_label'), cyan: true },
          { num: t('stat4_num'), label: t('stat4_label') },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              padding: '0 28px',
              borderRight: i < 3 ? '1px solid rgba(30,30,50,0.5)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 3vw, 26px)',
                color: stat.cyan ? '#00CFFF' : '#EEEEF4',
                lineHeight: 1,
              }}
            >
              {stat.num}
            </div>
            <div style={{ fontSize: 11, color: '#4E5468', marginTop: 5, fontWeight: 500 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
