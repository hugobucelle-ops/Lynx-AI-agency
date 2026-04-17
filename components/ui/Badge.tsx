import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'cyan' | 'gold';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  className?: string;
}

export function Badge({ children, color = 'cyan', size = 'md', style, className }: BadgeProps) {
  const isCyan = color === 'cyan';
  const padding = size === 'sm' ? '3px 10px' : '5px 14px';
  const fontSize = size === 'sm' ? 9 : 10;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding,
        borderRadius: 20,
        background: isCyan ? 'rgba(0,207,255,0.07)' : 'rgba(240,180,41,0.08)',
        border: isCyan
          ? '1px solid rgba(0,207,255,0.18)'
          : '1px solid rgba(240,180,41,0.2)',
        color: isCyan ? '#00CFFF' : '#F0B429',
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
