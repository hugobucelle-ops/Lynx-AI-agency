import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 36, className = '' }: LogoProps) {
  const s = size;
  return (
    <div className={`flex items-center gap-3 ${className}`} style={{ display: 'flex', alignItems: 'center', gap: s * 0.28 }}>
      {/* Mark: minimal L-shape + scan line */}
      <svg
        width={s}
        height={s}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer square frame */}
        <rect x="1.5" y="1.5" width="29" height="29" rx="6" stroke="rgba(0,207,255,0.18)" strokeWidth="1"/>

        {/* Main L mark */}
        <path
          d="M9 8 L9 22 L22 22"
          stroke="#00CFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Accent tick */}
        <path
          d="M14 16.5 L19 11.5"
          stroke="#F0B429"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Gold dot */}
        <circle cx="22" cy="22" r="1.8" fill="#F0B429" />

        {/* Scan line */}
        <line x1="6" y1="26.5" x2="26" y2="26.5" stroke="rgba(0,207,255,0.12)" strokeWidth="0.8"/>
      </svg>

      {/* Wordmark */}
      <div style={{ lineHeight: 1, display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: s * 0.54,
            letterSpacing: '0.12em',
            color: '#EEEEF4',
            lineHeight: 1,
          }}
        >
          LYNX
        </span>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 500,
            fontSize: s * 0.25,
            letterSpacing: '0.22em',
            color: '#00CFFF',
            textTransform: 'uppercase' as const,
            marginTop: 2,
            opacity: 0.7,
          }}
        >
          AI Agency
        </span>
      </div>
    </div>
  );
}
