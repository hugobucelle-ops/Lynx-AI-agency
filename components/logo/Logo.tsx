import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 36, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Geometric mark: diamond lens aperture */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer diamond */}
        <rect
          x="20"
          y="3"
          width="24"
          height="24"
          rx="2"
          transform="rotate(45 20 20)"
          stroke="#00CFFF"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner lens iris — 4 arcs creating aperture */}
        <path
          d="M20 10 C26 14, 30 20, 26 26"
          stroke="#00CFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M20 10 C14 14, 10 20, 14 26"
          stroke="#00CFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M14 26 C18 30, 22 30, 26 26"
          stroke="#00CFFF"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        {/* Gold center accent */}
        <circle cx="20" cy="20" r="2.5" fill="#F0B429" />
        {/* Gold accent ray top-right */}
        <line x1="22" y1="18" x2="27" y2="13" stroke="#F0B429" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Wordmark */}
      <div style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: size * 0.56,
            letterSpacing: '0.08em',
            color: '#EEEEF4',
          }}
        >
          LYNX
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-inter)',
            fontWeight: 500,
            fontSize: size * 0.28,
            letterSpacing: '0.18em',
            color: '#4E5468',
            textTransform: 'uppercase' as const,
            marginTop: 1,
          }}
        >
          AI Agency
        </span>
      </div>
    </div>
  );
}
