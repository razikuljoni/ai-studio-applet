'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      // Calculate progress from 0 (at top of hero) to 1 (when scrolled past hero)
      const current = -rect.top;
      const p = Math.min(Math.max(current / totalScrollable, 0), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Motion calculations based on continuous scroll progress p in [0, 1]
  const p = prefersReducedMotion ? 1 : progress;

  // 1. Panels parting outward: translate from 0% to 105%
  const panelTranslate = p * 105;

  // 2. Full-bleed background image: settles from overscale 1.18 down to 1.0
  const imageScale = 1.18 - p * 0.18;

  // 3. Duotone wash overlay: raises from 0 to 0.42 opacity
  const duotoneOpacity = p * 0.42;

  // 4. Accent dots travel out toward opposite corners
  // Dot 1 (Amber): moves from center (0, 0) to (-42vw, -36vh)
  // Dot 2 (Teal): moves from center (0, 0) to (42vw, 36vh)
  const dot1X = -p * 42;
  const dot1Y = -p * 36;
  const dot2X = p * 42;
  const dot2Y = p * 36;
  const dotOpacity = Math.max(0.2, 1 - p * 0.4);

  // 5. Signature move: Wordmark scale UP + tighten tracking + halves separate
  // Wordmark overall scale grows from 1.0 to 1.38
  const wordmarkScale = 1.0 + p * 0.38;
  // Tracking tightens from 0.02em to -0.065em
  const letterSpacingEm = 0.02 - p * 0.085;
  // Span 1 (SUB) translates left by up to 26vw
  const leftSpanTranslateX = -p * 28;
  // Span 2 (STRATA) translates right by up to 26vw
  const rightSpanTranslateX = p * 28;

  // Corner metadata fade out slightly as portal opens
  const cornerOpacity = Math.max(0.35, 1 - p * 0.6);

  return (
    <section
      ref={containerRef}
      id="portal-stage"
      className="relative w-full h-[250vh] bg-[#0A0C0E]"
      aria-label="Portal Hero Stage"
    >
      {/* Sticky Full-Height Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden isolate select-none">
        {/* LAYER 1: Full-Bleed Photograph (Settles from overscaled on scroll) */}
        <div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            transform: `scale(${imageScale})`,
            transformOrigin: 'center center',
          }}
        >
          {/* High-res atmospheric analog recording lathe & tape chamber photography with teal/amber hues */}
          <Image
            src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000&auto=format&fit=crop"
            alt="Substrata Sound Chamber & Master Lacquer Lathe"
            fill
            priority
            referrerPolicy="no-referrer"
            className="object-cover object-center filter grayscale-[35%] contrast-[115%] brightness-[85%]"
          />
        </div>

        {/* LAYER 2: Duotone Wash blending Amber (#E8913C) and Teal (#2E6B72) at mix-blend-mode: overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-75"
          style={{
            opacity: duotoneOpacity,
            mixBlendMode: 'overlay',
            background:
              'linear-gradient(135deg, rgba(232, 145, 60, 0.85) 0%, rgba(46, 107, 114, 0.95) 100%)',
          }}
        />

        {/* LAYER 3: Radial Veil darkening the edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,12,14,0.15) 30%, rgba(10,12,14,0.85) 75%, #0A0C0E 100%)',
          }}
        />

        {/* LAYER 4: TWO Solid Opaque Panels pinned to left and right edges (meet in the middle) */}
        {/* Left Panel */}
        <div
          id="portal-left-panel"
          className="absolute top-0 left-0 h-full w-[51vw] bg-[#0A0C0E] z-10 will-change-transform border-r border-[rgba(237,231,220,0.13)]"
          style={{
            transform: `translateX(-${panelTranslate}%)`,
          }}
        />

        {/* Right Panel */}
        <div
          id="portal-right-panel"
          className="absolute top-0 right-0 h-full w-[51vw] bg-[#0A0C0E] z-10 will-change-transform border-l border-[rgba(237,231,220,0.13)]"
          style={{
            transform: `translateX(${panelTranslate}%)`,
          }}
        />

        {/* LAYER 5: Two small glowing accent dots at the centre travelling outward */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          {/* Amber Dot traveling Top-Left */}
          <div
            id="portal-dot-amber"
            className="w-2.5 h-2.5 rounded-full bg-[#E8913C] will-change-transform"
            style={{
              transform: `translate(${dot1X}vw, ${dot1Y}vh)`,
              opacity: dotOpacity,
              boxShadow: '0 0 12px rgba(232, 145, 60, 0.6)',
            }}
          />
          {/* Teal Dot traveling Bottom-Right */}
          <div
            id="portal-dot-teal"
            className="w-2.5 h-2.5 rounded-full bg-[#2E6B72] will-change-transform"
            style={{
              transform: `translate(${dot2X}vw, ${dot2Y}vh)`,
              opacity: dotOpacity,
              boxShadow: '0 0 12px rgba(46, 107, 114, 0.6)',
            }}
          />
        </div>

        {/* LAYER 6: The Portal Title (Signature Move: Scaled UP + Tightened Letter-Spacing + Halves Separating) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-6">
          <div
            id="portal-wordmark-wrapper"
            className="flex items-center justify-center will-change-transform select-none"
            style={{
              transform: `scale(${wordmarkScale})`,
              letterSpacing: `${letterSpacingEm}em`,
            }}
          >
            <h1 className="font-display font-extrabold text-[clamp(44px,9.5vw,140px)] leading-none text-[#EDE7DC] flex items-center tracking-tight">
              {/* Left Span (SUB) travels LEFT */}
              <span
                id="portal-title-sub"
                className="inline-block will-change-transform text-right mr-1 md:mr-3"
                style={{
                  transform: `translateX(${leftSpanTranslateX}vw)`,
                }}
              >
                SUB
              </span>

              {/* Center Hairline divider mark */}
              <span
                className="inline-block text-[#E8913C] font-light text-[0.8em] transition-opacity duration-300"
                style={{
                  opacity: Math.max(0, 1 - p * 2.5),
                }}
              >
                /
              </span>

              {/* Right Span (STRATA) travels RIGHT */}
              <span
                id="portal-title-strata"
                className="inline-block will-change-transform text-left ml-1 md:ml-3"
                style={{
                  transform: `translateX(${rightSpanTranslateX}vw)`,
                }}
              >
                STRATA
              </span>
            </h1>
          </div>
        </div>

        {/* LAYER 7: Corner Metadata pinned to top and bottom edges */}
        <div
          className="absolute inset-0 p-6 md:p-10 pointer-events-none z-20 flex flex-col justify-between"
          style={{ opacity: cornerOpacity }}
        >
          {/* Top Edge Metadata */}
          <div className="flex justify-between items-start text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] pt-12 md:pt-10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <span>[ 00-26 // ARCHIVE DISPATCH ]</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span>[ LAT 52.5200° N / LON 13.4050° E ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
            </div>
          </div>

          {/* Bottom Edge Metadata & Scroll Hint */}
          <div className="flex justify-between items-end text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8]">
            <div className="flex items-center gap-2">
              <span className="text-[#6C7378]">SPEC:</span>
              <span className="text-[#EDE7DC]">180G DIRECT MASTER LACQUER</span>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-2 text-[#E8913C]">
                <span>{p > 0.85 ? 'PORTAL UNCOVERED' : 'SCROLL TO UNCOVER'}</span>
                <span className="animate-bounce">↓</span>
              </div>
              <div className="w-24 h-[1px] bg-[rgba(237,231,220,0.13)] relative overflow-hidden">
                <div
                  className="h-full bg-[#E8913C] transition-all duration-75"
                  style={{ width: `${p * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
