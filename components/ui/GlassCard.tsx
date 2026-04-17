import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'cyan' | 'gold' | 'none';
  glow?: boolean;
  style?: React.CSSProperties;
}

export function GlassCard({
  children,
  className = '',
  accent = 'none',
  glow = false,
  style,
}: GlassCardProps) {
  const accentClass =
    accent === 'cyan' ? 'accent-top-cyan' :
    accent === 'gold' ? 'accent-top-gold' : '';

  return (
    <div
      className={`glass-card card-hover ${accentClass} ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Inner glow */}
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              accent === 'cyan'
                ? 'radial-gradient(ellipse at 50% -10%, rgba(0,207,255,0.08) 0%, transparent 65%)'
                : accent === 'gold'
                ? 'radial-gradient(ellipse at 50% -10%, rgba(240,180,41,0.07) 0%, transparent 65%)'
                : 'none',
            pointerEvents: 'none',
            borderRadius: 'inherit',
          }}
        />
      )}
      {/* Corner decoration */}
      {accent !== 'none' && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 14,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: accent === 'cyan' ? 'rgba(0,207,255,0.4)' : 'rgba(240,180,41,0.4)',
            boxShadow: accent === 'cyan' ? '0 0 8px rgba(0,207,255,0.5)' : '0 0 8px rgba(240,180,41,0.5)',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </div>
  );
}
