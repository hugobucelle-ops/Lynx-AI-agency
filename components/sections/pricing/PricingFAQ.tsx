'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function PricingFAQ() {
  const t = useTranslations('pricing_page');
  const faqs = t.raw('faqs') as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, i) => (
        <div
          key={i}
          style={{ borderTop: '1px solid rgba(30,30,50,0.6)' }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              gap: 16,
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 15,
                color: open === i ? '#00CFFF' : '#EEEEF4',
                transition: 'color 0.2s',
              }}
            >
              {faq.q}
            </h4>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                flexShrink: 0,
                fontSize: 20,
                color: '#4E5468',
                lineHeight: 1,
                display: 'block',
              }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <p
                  style={{
                    fontSize: 14,
                    color: '#8896AA',
                    lineHeight: 1.75,
                    paddingBottom: 20,
                  }}
                >
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {/* Last border */}
      <div style={{ borderTop: '1px solid rgba(30,30,50,0.6)' }} />
    </div>
  );
}
