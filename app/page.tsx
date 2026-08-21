'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { PortalHero } from '@/components/PortalHero';
import { StatementFold } from '@/components/StatementFold';
import { ThrowableDeck } from '@/components/ThrowableDeck';
import { RosterSection } from '@/components/RosterSection';
import { DatesTable } from '@/components/DatesTable';
import { CloseSection } from '@/components/CloseSection';
import { CATALOGUE_RELEASES } from '@/data/catalogue';
import { X, Disc, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const [showArchiveIndex, setShowArchiveIndex] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0A0C0E] text-[#EDE7DC] selection:bg-[#E8913C] selection:text-[#0A0C0E]">
      {/* 58px Navigation Bar */}
      <Navbar onOpenArchiveModal={() => setShowArchiveIndex(true)} />

      {/* 1. Portal Hero (Sticky stage in 250vh, parting panels, overscaled image settling, tightening wordmark separating outward) */}
      <PortalHero />

      {/* 2. Statement Fold (Founding ethos, outlined stroke index 01, amber phrase, drifting circular lathe) */}
      <StatementFold />

      {/* 3. Catalogue Releases (Two columns: Headline & actions + Throwable card deck with pointer/keyboard physics) */}
      <ThrowableDeck />

      {/* 4. Roster Section (Hairline-ruled rows, uppercase accent labels, display names, counts) */}
      <RosterSection />

      {/* 5. Dates & Sessions Table (Uppercase headers over hairline, display first column, metadata, responsive collapse) */}
      <DatesTable />

      {/* 6. Close Section (Headline, fine-print, 2 buttons, hairline footer strip, cropped full-width wordmark) */}
      <CloseSection />

      {/* Complete Archive Index Modal */}
      {showArchiveIndex && (
        <div
          id="complete-archive-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-4xl bg-[#101317] border border-[rgba(237,231,220,0.22)] p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowArchiveIndex(false)}
              id="close-archive-modal-btn"
              aria-label="Close archive index"
              className="absolute top-6 right-6 text-[#9EA5A8] hover:text-[#EDE7DC] p-2 transition-colors border border-[rgba(237,231,220,0.13)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[11px] uppercase font-mono tracking-[0.16em] text-[#E8913C] mb-2">
              <Disc className="w-3.5 h-3.5" />
              <span>OFFICIAL CATALOGUE REGISTRY // 2024–2026</span>
            </div>

            <h3 className="font-display font-extrabold text-[28px] md:text-[34px] text-[#EDE7DC] uppercase mb-2">
              ALL PHYSICAL EDITIONS
            </h3>
            <p className="text-[13px] text-[#9EA5A8] mb-8 font-normal">
              180g direct lacquer master cuts. Certified virgin pressings on Neumann VMS-80 lathes.
            </p>

            <div className="divide-y divide-[rgba(237,231,220,0.12)] border-t border-b border-[rgba(237,231,220,0.12)]">
              {CATALOGUE_RELEASES.map((rel) => (
                <div
                  key={rel.id}
                  className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-[12.5px]"
                >
                  <div className="sm:col-span-2 font-mono text-[#E8913C] font-semibold text-[11px]">
                    {rel.code}
                  </div>
                  <div className="sm:col-span-4 font-display font-bold text-[#EDE7DC]">
                    {rel.title}
                  </div>
                  <div className="sm:col-span-3 text-[#9EA5A8] uppercase text-[11.5px]">
                    {rel.artist}
                  </div>
                  <div className="sm:col-span-2 text-[#6C7378] font-mono text-[10.5px]">
                    {rel.format.split('/')[0]}
                  </div>
                  <div className="sm:col-span-1 text-right">
                    <button
                      onClick={() => {
                        setShowArchiveIndex(false);
                        const card = document.getElementById('throwable-sleeve-deck');
                        card?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[10px] uppercase font-mono tracking-wider text-[#EDE7DC] hover:text-[#E8913C]"
                    >
                      <ArrowUpRight className="w-4 h-4 inline" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center text-[11px] font-mono text-[#6C7378]">
              <span>TOTAL RUN: 2,400 PRESSINGS</span>
              <button
                onClick={() => setShowArchiveIndex(false)}
                className="text-[10.5px] uppercase font-semibold text-[#EDE7DC] bg-transparent hover:bg-[#EDE7DC] hover:text-[#0A0C0E] border border-[rgba(237,231,220,0.3)] px-5 py-2 transition-all"
              >
                RETURN TO PAGE
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
