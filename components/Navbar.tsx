'use client';

import React, { useState, useEffect } from 'react';
import { audioEngine } from '@/lib/audio';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenArchiveModal?: () => void;
}

export function Navbar({ onOpenArchiveModal }: NavbarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  useEffect(() => {
    if (!audioEngine) return;
    const unsub = audioEngine.subscribe((playing, id) => {
      setIsPlaying(playing);
      setActiveTrack(id);
    });
    return unsub;
  }, []);

  const toggleSound = () => {
    if (!audioEngine) return;
    if (isPlaying) {
      audioEngine.stop();
    } else {
      // Default to premier release SUB-006
      audioEngine.play('sub-006', {
        baseFreq: 55,
        subFreq: 27.5,
        filterFreq: 480,
        noiseLevel: 0.08,
      });
    }
  };

  return (
    <header
      id="main-nav"
      className="fixed top-0 left-0 w-full h-[58px] z-50 bg-[#0A0C0E]/80 backdrop-blur-[14px] border-b border-[rgba(237,231,220,0.13)] flex items-center justify-between px-6 md:px-10 transition-colors duration-300"
    >
      {/* Brand Wordmark */}
      <a
        href="#portal-stage"
        className="font-display font-bold text-[15px] tracking-[-0.02em] text-[#EDE7DC] flex items-center gap-0.5 hover:opacity-85 transition-opacity"
        id="nav-wordmark"
      >
        <span>SUBSTRATA</span>
        <span className="text-[#E8913C] font-black">.</span>
      </a>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8]">
        <a
          href="#ethos"
          className="hover:text-[#E8913C] transition-colors py-1"
          id="nav-link-ethos"
        >
          ETHOS
        </a>
        <a
          href="#catalogue"
          className="hover:text-[#E8913C] transition-colors py-1"
          id="nav-link-catalogue"
        >
          CATALOGUE SLEEVES
        </a>
        <a
          href="#roster"
          className="hover:text-[#E8913C] transition-colors py-1"
          id="nav-link-roster"
        >
          ROSTER
        </a>
        <a
          href="#sessions"
          className="hover:text-[#E8913C] transition-colors py-1"
          id="nav-link-dates"
        >
          LATHE SESSIONS
        </a>
      </nav>

      {/* Action and Audio Controls */}
      <div className="flex items-center gap-4">
        {/* Needle audio monitor */}
        <button
          onClick={toggleSound}
          id="nav-audio-toggle"
          aria-label={isPlaying ? 'Mute vinyl audio' : 'Play vinyl audio'}
          className="flex items-center gap-2 text-[10.5px] tracking-[0.12em] uppercase text-[#9EA5A8] hover:text-[#EDE7DC] py-1.5 px-2.5 rounded-sm transition-colors border border-transparent hover:border-[rgba(237,231,220,0.1)]"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E8913C] animate-pulse" />
              <span className="hidden sm:inline text-[#E8913C]">48Hz ACTIVE</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#6C7378]" />
              <span className="hidden sm:inline">GROOVE MONITOR</span>
            </>
          )}
        </button>

        {/* Pill button */}
        <button
          onClick={() => {
            if (onOpenArchiveModal) {
              onOpenArchiveModal();
            } else {
              const el = document.getElementById('catalogue');
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          id="nav-cta-pill"
          className="text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#EDE7DC] hover:text-[#0A0C0E] bg-transparent hover:bg-[#EDE7DC] border border-[rgba(237,231,220,0.22)] hover:border-[#EDE7DC] px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap"
        >
          EDITIONS 25/26
        </button>
      </div>
    </header>
  );
}
