'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contacto_page');
  const opts = t.raw('form_servicio_opts') as { value: string; label: string }[];

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: '',
    servicio: 'geo-seo',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(17,17,32,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,207,255,0.2)',
          borderRadius: 16,
          padding: 48,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: 'rgba(0,207,255,0.1)',
            border: '1px solid rgba(0,207,255,0.3)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: 22,
            color: '#00CFFF',
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 12,
          }}
        >
          {t('form_success_title')}
        </h2>
        <p style={{ fontSize: 14, color: '#8896AA', lineHeight: 1.7 }}>
          {t('form_success_desc')}
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Name */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#8896AA',
            marginBottom: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('form_name')} *
        </label>
        <motion.input
          required
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          placeholder={t('form_name_placeholder')}
          className="form-input"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Email */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#8896AA',
            marginBottom: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('form_email')} *
        </label>
        <motion.input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder={t('form_email_placeholder')}
          className="form-input"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Empresa */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#8896AA',
            marginBottom: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('form_empresa')}
        </label>
        <motion.input
          value={form.empresa}
          onChange={(e) => setForm({ ...form, empresa: e.target.value })}
          placeholder={t('form_empresa_placeholder')}
          className="form-input"
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Servicio */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#8896AA',
            marginBottom: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('form_servicio')}
        </label>
        <select
          value={form.servicio}
          onChange={(e) => setForm({ ...form, servicio: e.target.value })}
          className="form-input"
        >
          {opts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mensaje */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: 12,
            fontWeight: 600,
            color: '#8896AA',
            marginBottom: 8,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {t('form_mensaje')} *
        </label>
        <motion.textarea
          required
          value={form.mensaje}
          onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          placeholder={t('form_mensaje_placeholder')}
          rows={5}
          className="form-input"
          style={{ resize: 'vertical' }}
          whileFocus={{ scale: 1.005 }}
          transition={{ duration: 0.15 }}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary"
        style={{
          width: '100%',
          justifyContent: 'center',
          background: status === 'loading' ? '#4E5468' : '#00CFFF',
          cursor: status === 'loading' ? 'wait' : 'pointer',
        }}
        whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
        whileTap={status !== 'loading' ? { scale: 0.99 } : {}}
      >
        {status === 'loading' ? t('form_sending') : t('form_submit')}
      </motion.button>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontSize: 13, color: '#ff6b6b' }}
        >
          {t('form_error')}
        </motion.p>
      )}
    </form>
  );
}
