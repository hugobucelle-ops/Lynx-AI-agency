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
      {glow && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              accent === 'cyan'
                ? 'radial-gradient(ellipse at 50% 0%, rgba(0,207,255,0.05) 0%, transparent 60%)'
                : accent === 'gold'
                ? 'radial-gradient(ellipse at 50% 0%, rgba(240,180,41,0.05) 0%, transparent 60%)'
                : 'none',
            pointerEvents: 'none',
          }}
        />
      )}
      {children}
    </div>
  );
}
