'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRef } from 'react';

function MagneticButton({
  href,
  className,
  children,
  style,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, x: sx, y: sy, display: 'inline-flex', alignItems: 'center', gap: 8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}

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
        padding: '80px 32px 0',   /* 80px top = nav height + breathing room */
        textAlign: 'center',
      }}
    >
      {/* Eyebrow pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 24 }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '7px 18px',
            borderRadius: 100,
            background: 'rgba(0,207,255,0.07)',
            border: '1px solid rgba(0,207,255,0.18)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#00CFFF',
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#00CFFF', display: 'inline-block', boxShadow: '0 0 8px #00CFFF', flexShrink: 0 }}
          />
          {t('eyebrow')}
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(44px, 7.5vw, 88px)',
          lineHeight: 0.95,
          letterSpacing: '-3px',
          marginBottom: 28,
          maxWidth: 860,
        }}
      >
        <span style={{ color: '#F0F0F8', display: 'block' }}>{t('line1')}</span>
        <span style={{ color: '#F0F0F8', display: 'block' }}>{t('line2')}</span>
        <span className="gradient-text" style={{ display: 'block' }}>
          {t('line3')}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 15,
          color: '#7A8BA0',
          lineHeight: 1.8,
          maxWidth: 480,
          marginBottom: 36,
          fontWeight: 400,
        }}
      >
        {t('description')}
      </motion.p>

      {/* CTAs — magnetic buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <MagneticButton href={ctaHref} className="btn-primary" style={{ fontSize: 14, padding: '15px 34px' }}>
          {t('cta1')}
        </MagneticButton>
        <MagneticButton href={servicesHref} className="btn-ghost" style={{ fontSize: 14, padding: '15px 28px' }}>
          {t('cta2')} <span style={{ opacity: 0.6 }}>→</span>
        </MagneticButton>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
        style={{
          display: 'flex',
          gap: 0,
          marginTop: 52,
          paddingTop: 24,
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0, left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0,207,255,0.18), transparent)',
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
              padding: '0 28px',
              borderRight: i < 3 ? '1px solid rgba(22,22,42,0.9)' : 'none',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                color: stat.cyan ? '#00CFFF' : '#F0F0F8',
                lineHeight: 1,
                letterSpacing: '-0.5px',
                textShadow: stat.cyan ? '0 0 24px rgba(0,207,255,0.45)' : 'none',
              }}
            >
              {stat.num}
            </div>
            <div style={{ fontSize: 10, color: '#3E4560', marginTop: 6, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
