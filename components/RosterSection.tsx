'use client';

import React, { useState } from 'react';
import { ARTISTS_ROSTER, Artist } from '@/data/catalogue';
import { ChevronDown, ChevronUp, Disc } from 'lucide-react';

export function RosterSection() {
  const [expandedArtistId, setExpandedArtistId] = useState<string | null>(null);

  const toggleArtist = (id: string) => {
    setExpandedArtistId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="roster"
      className="relative w-full bg-[#0A0C0E] border-t border-[rgba(237,231,220,0.13)] py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header Index */}
      <div className="flex items-center gap-3 text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] mb-12">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B72]" />
        <span>[ 03 // RESIDENT ARTISTS & RESEARCH ROSTER ]</span>
        <span className="w-12 h-[1px] bg-[rgba(237,231,220,0.13)]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="font-display font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.08] text-[#EDE7DC]">
            THE ROSTER.
          </h2>
          <p className="text-[14px] text-[#9EA5A8] max-w-xl mt-3 font-normal">
            Composers, acoustic researchers, and modular synthesis practitioners commissioned for physical master pressings.
          </p>
        </div>

        <div className="text-[11px] uppercase font-mono tracking-[0.14em] text-[#6C7378]">
          <span>TOTAL RESIDENTS: 06</span>
          <span className="mx-2 text-[#E8913C]">/</span>
          <span>EDITIONS IN CUT: 19</span>
        </div>
      </div>

      {/* Hairline-Ruled Rows */}
      <div className="border-t border-[rgba(237,231,220,0.13)] divide-y divide-[rgba(237,231,220,0.13)]">
        {ARTISTS_ROSTER.map((artist, idx) => {
          const isExpanded = expandedArtistId === artist.id;
          return (
            <div key={artist.id} className="group transition-colors duration-200">
              {/* Row Header */}
              <button
                onClick={() => toggleArtist(artist.id)}
                id={`roster-row-${artist.id}`}
                aria-expanded={isExpanded}
                className="w-full py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:bg-[#101317]/50 px-3 md:px-4 -mx-3 md:-mx-4 transition-colors"
              >
                {/* Left: Accent label + Display Name */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#E8913C] w-24">
                    [ 0{idx + 1} {'//'} {artist.location.split(',')[0]} ]
                  </span>
                  <span className="font-display font-bold text-[20px] md:text-[26px] text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors tracking-tight">
                    {artist.name}
                  </span>
                </div>

                {/* Center / Role */}
                <div className="text-[11px] uppercase tracking-[0.12em] text-[#9EA5A8] md:w-1/3 truncate">
                  {artist.role}
                </div>

                {/* Right: Count + Toggle icon */}
                <div className="flex items-center justify-between md:justify-end gap-6 text-[11px] uppercase font-mono tracking-[0.14em] text-[#6C7378]">
                  <span className="text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors">
                    {artist.releasesCount}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#E8913C]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#6C7378] group-hover:text-[#EDE7DC]" />
                  )}
                </div>
              </button>

              {/* Expanded Details Panel */}
              {isExpanded && (
                <div className="py-6 px-4 md:px-8 bg-[#101317] border-t border-[rgba(237,231,220,0.08)] mb-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bio */}
                    <div className="md:col-span-2">
                      <span className="text-[10px] uppercase font-mono tracking-[0.14em] text-[#6C7378] block mb-2">
                        PRACTICE & ACOUSTIC INQUIRY
                      </span>
                      <p className="text-[13.5px] leading-relaxed text-[#EDE7DC]">
                        {artist.bio}
                      </p>
                      <div className="mt-4 pt-4 border-t border-[rgba(237,231,220,0.08)]">
                        <span className="text-[10px] uppercase font-mono tracking-[0.14em] text-[#9EA5A8] block mb-1">
                          MODULAR INSTRUMENTATION & RECORDING CHAIN:
                        </span>
                        <p className="text-[12px] font-mono text-[#E8913C]">
                          {artist.modularRig}
                        </p>
                      </div>
                    </div>

                    {/* Catalog Links */}
                    <div className="bg-[#0A0C0E] p-4 border border-[rgba(237,231,220,0.1)]">
                      <span className="text-[10px] uppercase font-mono tracking-[0.14em] text-[#6C7378] block mb-3">
                        LINKED EDITIONS
                      </span>
                      <div className="flex flex-col gap-2">
                        {artist.releases.map((relCode) => (
                          <div
                            key={relCode}
                            className="flex items-center justify-between text-[11px] font-mono text-[#EDE7DC] py-1 border-b border-[rgba(237,231,220,0.06)]"
                          >
                            <span className="flex items-center gap-1.5">
                              <Disc className="w-3 h-3 text-[#2E6B72]" />
                              {relCode}
                            </span>
                            <a
                              href="#catalogue"
                              className="text-[10px] text-[#E8913C] hover:underline uppercase"
                            >
                              VIEW IN DECK →
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
