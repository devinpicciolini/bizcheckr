'use client';

import { useState } from 'react';

interface TextHoverEffectProps {
  text: string;
  duration?: number;
}

export function TextHoverEffect({ text, duration = 0.5 }: TextHoverEffectProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h1
        className="text-6xl md:text-8xl font-black relative z-10 tracking-tight"
        style={{
          backgroundImage: isHovered
            ? 'linear-gradient(135deg, #06b6d4, #d946ef, #a855f7)'
            : 'linear-gradient(135deg, #ffffff, #06b6d4, #d946ef)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: `all ${duration}s ease-in-out`,
          filter: isHovered ? 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5)) drop-shadow(0 0 40px rgba(217, 70, 239, 0.3))' : 'none',
        }}
      >
        {text}
      </h1>
      {isHovered && (
        <h1
          className="absolute top-0 left-0 text-6xl md:text-8xl font-black pointer-events-none tracking-tight animate-pulse"
          style={{
            WebkitTextStroke: '1px rgba(6, 182, 212, 0.5)',
            backgroundImage: 'linear-gradient(135deg, #06b6d4, #d946ef, #a855f7)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            filter: 'blur(8px)',
            opacity: 0.6,
          }}
        >
          {text}
        </h1>
      )}
    </div>
  );
}
