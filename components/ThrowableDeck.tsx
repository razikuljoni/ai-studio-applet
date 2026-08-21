'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { CATALOGUE_RELEASES, Release } from '@/data/catalogue';
import { audioEngine } from '@/lib/audio';
import { Play, Pause, ChevronLeft, ChevronRight, Disc, Eye, Check, X } from 'lucide-react';

export function ThrowableDeck() {
  const [deck, setDeck] = useState<Release[]>(CATALOGUE_RELEASES);
  const [activeModalRelease, setActiveModalRelease] = useState<Release | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingReleaseId, setPlayingReleaseId] = useState<string | null>(null);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isThrowing, setIsThrowing] = useState<'left' | 'right' | null>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const deckRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!audioEngine) return;
    const unsub = audioEngine.subscribe((playing, id) => {
      setIsAudioPlaying(playing);
      setPlayingReleaseId(id);
    });
    return unsub;
  }, []);

  const currentCard = deck[0];
  const currentIndex = CATALOGUE_RELEASES.findIndex((r) => r.id === currentCard.id);

  // Throw card left or right and advance stack
  const throwCard = useCallback((direction: 'left' | 'right') => {
    if (isThrowing) return;
    setIsThrowing(direction);

    // Audio cue / haptic
    setTimeout(() => {
      setDeck((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top];
      });
      setIsThrowing(null);
      setDragOffset({ x: 0, y: 0 });
    }, 280);
  }, [isThrowing]);

  // Reverse card to previous
  const prevCard = useCallback(() => {
    if (isThrowing) return;
    setDeck((prev) => {
      const last = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      return [last, ...rest];
    });
    setDragOffset({ x: 0, y: 0 });
  }, [isThrowing]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isThrowing) return;
    // Don't drag if clicking interactive buttons inside the card
    if ((e.target as HTMLElement).closest('button')) return;

    pointerIdRef.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    startPosRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;

    const dx = e.clientX - startPosRef.current.x;
    const dy = e.clientY - startPosRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerIdRef.current !== e.pointerId) return;

    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    pointerIdRef.current = null;

    const threshold = 48; // roughly a tenth of deck width
    if (dragOffset.x > threshold) {
      throwCard('right');
    } else if (dragOffset.x < -threshold) {
      throwCard('left');
    } else {
      // Snap back smoothly
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    pointerIdRef.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      throwCard('right');
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      throwCard('left');
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (currentCard && audioEngine) {
        audioEngine.toggle(currentCard.id, currentCard.audioSpec);
      }
    }
  };

  const toggleCurrentAudio = () => {
    if (!currentCard || !audioEngine) return;
    audioEngine.toggle(currentCard.id, currentCard.audioSpec);
  };

  return (
    <section
      id="catalogue"
      className="relative w-full bg-[#0A0C0E] border-t border-[rgba(237,231,220,0.13)] py-24 px-6 md:px-16 lg:px-24 select-none"
    >
      {/* Background Section Index */}
      <div className="flex items-center gap-3 text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] mb-12">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
        <span>[ 02 // PHYSICAL CATALOGUE & SLEEVES ]</span>
        <span className="w-12 h-[1px] bg-[rgba(237,231,220,0.13)]" />
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Headline, Lede, Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase font-mono tracking-[0.16em] text-[#E8913C]">
              LIMITED EDITIONS ARCHIVE
            </span>
            <h2 className="font-display font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.08] text-[#EDE7DC] mt-2 mb-6">
              CATALOGUE SLEEVES.
            </h2>
            <p className="text-[14px] leading-relaxed text-[#9EA5A8] mb-8 font-normal max-w-md">
              A physical deck of heavyweight 180g virgin pressings. Drag each sleeve to cast it aside and uncover the next edition in the archive, or use keyboard arrow keys.
            </p>

            {/* Release Details Callout for currently top card */}
            <div className="bg-[#101317] border border-[rgba(237,231,220,0.13)] p-6 rounded-none mb-8">
              <div className="flex justify-between items-start border-b border-[rgba(237,231,220,0.13)] pb-4 mb-4">
                <div>
                  <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#E8913C] block">
                    {currentCard.code} {'//'} {currentCard.year}
                  </span>
                  <h3 className="font-display font-bold text-[18px] text-[#EDE7DC] mt-1">
                    {currentCard.title}
                  </h3>
                  <span className="text-[12px] uppercase tracking-[0.1em] text-[#9EA5A8]">
                    {currentCard.artist}
                  </span>
                </div>
                <button
                  onClick={() => setActiveModalRelease(currentCard)}
                  id="inspect-sleeve-btn"
                  className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.12em] text-[#9EA5A8] hover:text-[#EDE7DC] py-1.5 px-3 border border-[rgba(237,231,220,0.18)] hover:border-[#EDE7DC] transition-all"
                  title="Inspect sleeve in high resolution"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>INSPECT</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-[0.1em] text-[#6C7378]">
                <div>
                  <span className="text-[#9EA5A8] block text-[10px]">FORMAT</span>
                  <span className="text-[#EDE7DC] font-medium">{currentCard.format}</span>
                </div>
                <div>
                  <span className="text-[#9EA5A8] block text-[10px]">EDITION</span>
                  <span className="text-[#EDE7DC] font-medium">{currentCard.edition}</span>
                </div>
                <div>
                  <span className="text-[#9EA5A8] block text-[10px]">LATHE MATRIX</span>
                  <span className="text-[#9EA5A8] font-mono text-[10px] truncate block">
                    {currentCard.matrix}
                  </span>
                </div>
                <div>
                  <span className="text-[#9EA5A8] block text-[10px]">SPEED</span>
                  <span className="text-[#E8913C] font-medium">{currentCard.rpm}</span>
                </div>
              </div>

              {/* Audio Preview Trigger */}
              <div className="mt-5 pt-4 border-t border-[rgba(237,231,220,0.08)] flex items-center justify-between">
                <button
                  onClick={toggleCurrentAudio}
                  id="sleeve-audio-play-btn"
                  className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#0A0C0E] bg-[#EDE7DC] hover:bg-[#E8913C] px-4 py-2 transition-colors duration-200"
                >
                  {isAudioPlaying && playingReleaseId === currentCard.id ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE GROOVE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PREVIEW NEEDLE DROP</span>
                    </>
                  )}
                </button>
                <span className="text-[10px] uppercase font-mono tracking-[0.12em] text-[#6C7378]">
                  48Hz HARMONIC SUB
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveModalRelease(currentCard)}
              id="order-acetate-btn"
              className="text-[11px] uppercase font-medium tracking-[0.14em] text-[#EDE7DC] hover:text-[#0A0C0E] bg-transparent hover:bg-[#EDE7DC] border border-[rgba(237,231,220,0.3)] hover:border-[#EDE7DC] px-6 py-3 transition-all duration-200"
            >
              ORDER SLEEVE / ACETATE
            </button>
            <a
              href="#roster"
              id="view-roster-link"
              className="text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] hover:text-[#E8913C] py-3 transition-colors"
            >
              ROSTER ARTISTS →
            </a>
          </div>
        </div>

        {/* Right Column: Physical Throwable Deck */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          {/* Throwable Card Container */}
          <div
            ref={deckRef}
            tabIndex={0}
            id="throwable-sleeve-deck"
            aria-label="Physical vinyl sleeve deck. Use left and right arrow keys or drag cards to cycle."
            onKeyDown={handleKeyDown}
            className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[440px] md:h-[440px] focus:outline-none focus:ring-1 focus:ring-[#E8913C]"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Render top 3 stacked cards with physical offsets */}
            {deck.slice(0, 3).map((item, index) => {
              const isTop = index === 0;

              // Physical offsets for stacked cards
              // Card 0: Top card (draggable)
              // Card 1: Slightly scaled down, rotated right
              // Card 2: More scaled down, rotated left
              let transformStyle = '';
              let opacity = 1;
              let zIndex = 30 - index * 10;
              let transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';

              if (isTop) {
                if (isThrowing) {
                  const throwX = isThrowing === 'right' ? 550 : -550;
                  const throwRot = isThrowing === 'right' ? 28 : -28;
                  transformStyle = `translate3d(${throwX}px, -40px, 0) rotate(${throwRot}deg) scale(0.9)`;
                  opacity = 0;
                  transition = 'transform 0.28s ease-out, opacity 0.28s ease-out';
                } else if (isDragging) {
                  const rot = dragOffset.x * 0.08;
                  const scale = 1.02;
                  transformStyle = `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.35}px, 0) rotate(${rot}deg) scale(${scale})`;
                  transition = 'none'; // instantaneous tracking
                } else {
                  transformStyle = 'translate3d(0, 0, 0) rotate(-1.5deg) scale(1)';
                }
              } else if (index === 1) {
                transformStyle = 'translate3d(14px, 12px, 0) rotate(2.5deg) scale(0.96)';
                opacity = 0.88;
              } else if (index === 2) {
                transformStyle = 'translate3d(-10px, 24px, 0) rotate(-3.5deg) scale(0.92)';
                opacity = 0.72;
              }

              return (
                <div
                  key={item.id}
                  id={`sleeve-card-${item.id}`}
                  onPointerDown={isTop ? handlePointerDown : undefined}
                  onPointerMove={isTop ? handlePointerMove : undefined}
                  onPointerUp={isTop ? handlePointerUp : undefined}
                  onPointerCancel={isTop ? handlePointerCancel : undefined}
                  className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none ${
                    isTop ? 'deck-shadow-top' : 'deck-shadow'
                  }`}
                  style={{
                    transform: transformStyle,
                    opacity,
                    zIndex,
                    transition,
                    transformOrigin: '50% 90%',
                  }}
                >
                  {/* Physical 12-inch Vinyl Sleeve Container */}
                  <div className="relative w-full h-full bg-[#101317] border border-[rgba(237,231,220,0.2)] overflow-hidden flex flex-col justify-between p-6">
                    {/* Vinyl Sleeve Spine & Texture Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay bg-[radial-gradient(#EDE7DC_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/60 to-transparent border-r border-[rgba(237,231,220,0.08)]" />

                    {/* Faint edge spine code */}
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[8px] font-mono tracking-[0.2em] text-[#6C7378] pointer-events-none whitespace-nowrap">
                      {item.code} {'//'} {item.matrix}
                    </div>

                    {/* Sleeve Artwork Background Image */}
                    <div className="absolute inset-4 rounded-none overflow-hidden opacity-35 filter contrast-125 grayscale-[20%]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        referrerPolicy="no-referrer"
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#101317] via-transparent to-[#101317]/80" />
                    </div>

                    {/* Top Sleeve Header */}
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.accentColor === 'amber' ? 'bg-[#E8913C]' : 'bg-[#2E6B72]'
                          }`}
                        />
                        <span className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#EDE7DC]">
                          {item.code}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#9EA5A8] border border-[rgba(237,231,220,0.18)] px-2 py-0.5">
                        {item.rpm}
                      </span>
                    </div>

                    {/* Center Artwork Title */}
                    <div className="relative z-10 my-auto text-center px-4">
                      <h4 className="font-display font-black text-[clamp(20px,3.2vw,30px)] leading-[1.1] text-[#EDE7DC] uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[12px] uppercase font-medium tracking-[0.16em] text-[#E8913C] mt-2">
                        {item.artist}
                      </p>
                    </div>

                    {/* Bottom Sleeve Footer Details */}
                    <div className="relative z-10 flex justify-between items-end border-t border-[rgba(237,231,220,0.18)] pt-3 text-[10px] uppercase font-mono tracking-[0.12em] text-[#9EA5A8]">
                      <div>
                        <span className="block text-[#6C7378] text-[9px]">EDITION SPEC</span>
                        <span className="text-[#EDE7DC]">{item.edition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isAudioPlaying && playingReleaseId === item.id && (
                          <span className="flex items-center gap-1 text-[#E8913C] animate-pulse text-[9px]">
                            <Disc className="w-3 h-3 animate-spin" /> PLAYING
                          </span>
                        )}
                        <span className="text-[#6C7378]">DMM LATHE</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls & Progress Beneath Deck */}
          <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-[440px]">
            {/* Hint line */}
            <div className="flex items-center justify-between w-full text-[11px] uppercase font-mono tracking-[0.14em] text-[#9EA5A8]">
              <button
                onClick={prevCard}
                id="deck-prev-arrow-btn"
                className="hover:text-[#EDE7DC] transition-colors p-1 flex items-center gap-1"
                aria-label="Previous sleeve"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">PREV</span>
              </button>

              <div className="flex items-center gap-2 text-[#6C7378]">
                <span>DRAG SLEEVE OR USE ARROWS</span>
                <span className="text-[#E8913C]">← →</span>
              </div>

              <button
                onClick={() => throwCard('right')}
                id="deck-next-arrow-btn"
                className="hover:text-[#EDE7DC] transition-colors p-1 flex items-center gap-1"
                aria-label="Next sleeve"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-2 mt-1">
              {CATALOGUE_RELEASES.map((rel, idx) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    // Bring clicked item to front
                    const foundIdx = deck.findIndex((r) => r.id === rel.id);
                    if (foundIdx > 0) {
                      setDeck((prev) => [...prev.slice(foundIdx), ...prev.slice(0, foundIdx)]);
                    }
                  }}
                  id={`deck-dot-${idx}`}
                  aria-label={`Jump to release ${rel.code}`}
                  className={`h-1.5 transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-7 bg-[#E8913C]'
                      : 'w-1.5 bg-[rgba(237,231,220,0.22)] hover:bg-[rgba(237,231,220,0.5)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Sleeve Inspection Modal */}
      {activeModalRelease && (
        <div
          id="sleeve-inspect-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-3xl bg-[#101317] border border-[rgba(237,231,220,0.25)] p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalRelease(null)}
              id="close-sleeve-modal-btn"
              aria-label="Close sleeve details"
              className="absolute top-6 right-6 text-[#9EA5A8] hover:text-[#EDE7DC] p-2 transition-colors border border-[rgba(237,231,220,0.13)]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[11px] uppercase font-mono tracking-[0.16em] text-[#E8913C] mb-2">
              <span>{activeModalRelease.code}</span>
              <span>{'//'}</span>
              <span>LACQUER SPECIFICATION</span>
            </div>

            <h3 className="font-display font-extrabold text-[28px] md:text-[36px] text-[#EDE7DC] uppercase">
              {activeModalRelease.title}
            </h3>
            <p className="text-[14px] uppercase font-semibold text-[#9EA5A8] mb-6">
              {activeModalRelease.artist} — {activeModalRelease.year}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6">
              {/* Cover Artwork */}
              <div className="relative aspect-square w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.15)] overflow-hidden">
                <Image
                  src={activeModalRelease.image}
                  alt={activeModalRelease.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0A0C0E]/90 px-3 py-1 text-[10px] font-mono uppercase text-[#EDE7DC] border border-[rgba(237,231,220,0.18)]">
                  {activeModalRelease.format}
                </div>
              </div>

              {/* Tracklist & Notes */}
              <div>
                <span className="text-[11px] uppercase font-mono tracking-[0.14em] text-[#6C7378] block mb-3">
                  TRACKLIST / DIRECT LATHE ETCHING
                </span>
                <div className="divide-y divide-[rgba(237,231,220,0.1)] mb-6">
                  {activeModalRelease.tracklist.map((track) => (
                    <div
                      key={track.number}
                      className="py-2.5 flex justify-between items-center text-[12.5px]"
                    >
                      <span className="font-mono text-[#E8913C] w-8">{track.number}</span>
                      <span className="text-[#EDE7DC] flex-1 font-medium">{track.title}</span>
                      <span className="font-mono text-[#9EA5A8] text-[11px]">{track.duration}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#0A0C0E] p-4 border border-[rgba(237,231,220,0.1)] text-[12px] text-[#9EA5A8] leading-relaxed">
                  <span className="text-[10px] font-mono uppercase text-[#EDE7DC] block mb-1">
                    CURATORIAL MASTERING NOTES:
                  </span>
                  {activeModalRelease.curatorNotes}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(237,231,220,0.13)]">
              <button
                onClick={() => {
                  if (audioEngine) {
                    audioEngine.toggle(activeModalRelease.id, activeModalRelease.audioSpec);
                  }
                }}
                id="modal-toggle-audio-btn"
                className="flex items-center gap-2 text-[11px] uppercase font-medium tracking-[0.12em] bg-[#EDE7DC] text-[#0A0C0E] hover:bg-[#E8913C] px-5 py-2.5 transition-colors"
              >
                {isAudioPlaying && playingReleaseId === activeModalRelease.id ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>MUTE NEEDLE DROP</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>LISTEN TO VINYL TEST CUT</span>
                  </>
                )}
              </button>

              <div className="text-[11px] font-mono text-[#6C7378]">
                MATRIX: {activeModalRelease.matrix}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
