'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function StatementFold() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // When section is entering viewport to leaving viewport
      const totalDist = rect.height + windowH;
      const current = windowH - rect.top;
      const p = Math.min(Math.max(current / totalDist, 0), 1);
      setScrollProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating circular image subtle drift and rotation on scroll
  const imageTranslateY = (scrollProgress - 0.5) * 80;
  const imageRotate = (scrollProgress - 0.5) * 45;

  return (
    <section
      ref={sectionRef}
      id="ethos"
      className="relative min-h-screen w-full bg-[#0A0C0E] flex items-center overflow-hidden border-t border-[rgba(237,231,220,0.13)] px-6 md:px-16 lg:px-24 py-24"
    >
      {/* Background Index Numeral: Outlined with -webkit-text-stroke and transparent fill */}
      <div
        className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none select-none z-0 stroke-numeral font-display font-black text-[clamp(140px,28vw,380px)] leading-none opacity-25"
        aria-hidden="true"
      >
        01
      </div>

      {/* Floating Circular Vinyl / Acoustic Image drifting & rotating off right edge */}
      <div
        className="absolute -right-24 md:-right-12 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden pointer-events-none opacity-20 border border-[rgba(237,231,220,0.18)] z-0 will-change-transform"
        style={{
          transform: `translateY(${imageTranslateY}px) rotate(${imageRotate}deg)`,
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1000&auto=format&fit=crop"
          alt="Acoustic Vinyl Lathe Plate"
          fill
          referrerPolicy="no-referrer"
          className="object-cover filter contrast-125"
        />
        {/* Subtle radial center spindle */}
        <div className="absolute inset-0 m-auto w-12 h-12 rounded-full border border-[rgba(237,231,220,0.4)] bg-[#0A0C0E]" />
      </div>

      {/* Main Content Column */}
      <div className="relative z-10 max-w-4xl">
        {/* Small uppercase label */}
        <div className="flex items-center gap-3 text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
          <span>[ 01 // FOUNDING ETHOS ]</span>
          <span className="w-12 h-[1px] bg-[rgba(237,231,220,0.13)]" />
        </div>

        {/* Statement text at clamp(24px, 3.6vw, 52px) over about 22ch with one phrase in amber */}
        <h2 className="font-display font-bold text-[clamp(26px,3.8vw,52px)] leading-[1.2] text-[#EDE7DC] max-w-[24ch] tracking-tight">
          We press heavy-weight vinyl for sound systems tuned to silence, precision, and{' '}
          <span className="text-[#E8913C] font-extrabold">pure acoustic tension</span>.
        </h2>

        {/* Supporting description */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[rgba(237,231,220,0.13)] max-w-3xl">
          <div>
            <p className="text-[13px] leading-relaxed text-[#9EA5A8] tracking-normal font-normal">
              Every catalogue release is etched in real-time onto virgin lacquer blanks using a calibrated Neumann lathe. We reject digital peak limiting in favor of wide-band dynamic headroom and physical bass articulation.
            </p>
          </div>
          <div>
            <p className="text-[13px] leading-relaxed text-[#9EA5A8] tracking-normal font-normal">
              Manufactured in hand-numbered editions of 250 to 500 copies on 180g virgin compound. Packaged in custom die-cut unbleached chipboard sleeves printed with mineral-based bone ink.
            </p>
          </div>
        </div>

        {/* Technical specs strip */}
        <div className="mt-10 flex flex-wrap items-center gap-6 text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#6C7378]">
          <span className="flex items-center gap-1.5 text-[#EDE7DC]">
            <span className="w-1 h-1 rounded-full bg-[#2E6B72]" />
            DMM & LACQUER DIRECT
          </span>
          <span className="text-[rgba(237,231,220,0.2)]">/</span>
          <span>180G VIRGIN MATTE COMPOUND</span>
          <span className="text-[rgba(237,231,220,0.2)]">/</span>
          <span>BERLIN / LONDON CUTTING HOUSES</span>
        </div>
      </div>
    </section>
  );
}
