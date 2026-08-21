'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Check, Disc } from 'lucide-react';

export function CloseSection() {
  const [inquirySent, setInquirySent] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [email, setEmail] = useState('');

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setShowInquiryModal(false);
      setEmail('');
    }, 2400);
  };

  return (
    <footer
      id="close-section"
      className="relative w-full bg-[#0A0C0E] border-t border-[rgba(237,231,220,0.13)] pt-24 overflow-hidden select-none"
    >
      {/* Header and Call to Action Row */}
      <div className="px-6 md:px-16 lg:px-24 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          {/* Left: Short headline & fine print */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
              <span>[ 05 // DIRECT MASTER COMMISSIONS ]</span>
            </div>

            <h2 className="font-display font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.08] text-[#EDE7DC]">
              PHYSICAL COMMISSIONS & TEST PRESSINGS.
            </h2>

            <p className="text-[13px] leading-relaxed text-[#9EA5A8] mt-4 max-w-xl font-normal">
              Direct master lacquer cuts on Neumann VMS-80 lathes with SAL-74B amplifiers. Hand-poured 180g virgin compound. Strict dynamic headroom preservation without digital watermarking or peak brickwall limiting.
            </p>
          </div>

          {/* Right: Two buttons at opposite edge */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => setShowInquiryModal(true)}
              id="footer-request-acetate-btn"
              className="flex items-center justify-center gap-2 text-[11px] uppercase font-semibold tracking-[0.14em] bg-[#EDE7DC] text-[#0A0C0E] hover:bg-[#E8913C] px-6 py-3.5 transition-colors duration-200"
            >
              <span>REQUEST ACETATE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <a
              href="#portal-stage"
              id="footer-return-portal-btn"
              className="flex items-center justify-center gap-2 text-[11px] uppercase font-medium tracking-[0.14em] text-[#EDE7DC] hover:text-[#0A0C0E] bg-transparent hover:bg-[#EDE7DC] border border-[rgba(237,231,220,0.3)] hover:border-[#EDE7DC] px-6 py-3.5 transition-all duration-200"
            >
              <span>RETURN TO PORTAL</span>
              <span className="text-[#E8913C]">↑</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hairline Footer Strip */}
      <div className="px-6 md:px-16 lg:px-24 py-8 border-t border-[rgba(237,231,220,0.13)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-[10.5px] uppercase font-mono tracking-[0.14em] text-[#6C7378]">
        <div>
          <span className="text-[#9EA5A8] block text-[9px] mb-0.5">PRESSING HOUSE</span>
          <span className="text-[#EDE7DC]">BERLIN / OSLO</span>
        </div>
        <div>
          <span className="text-[#9EA5A8] block text-[9px] mb-0.5">LATHE SPEC</span>
          <span className="text-[#EDE7DC]">NEUMANN VMS-80</span>
        </div>
        <div>
          <span className="text-[#9EA5A8] block text-[9px] mb-0.5">CATALOGUE RANGE</span>
          <span className="text-[#EDE7DC]">SUB-001 TO SUB-026</span>
        </div>
        <div className="text-right sm:text-right">
          <span className="text-[#9EA5A8] block text-[9px] mb-0.5">IMPRINT</span>
          <span className="text-[#EDE7DC]">© SUBSTRATA PRESS</span>
        </div>
      </div>

      {/* Signature Close: Giant Display Wordmark cropped by the bottom page edge */}
      <div className="relative w-full overflow-hidden flex justify-center pointer-events-none select-none border-t border-[rgba(237,231,220,0.06)]">
        <div
          id="close-wordmark"
          className="font-display font-extrabold text-[clamp(68px,17.5vw,250px)] leading-[0.75] text-[#EDE7DC]/15 tracking-[-0.04em] whitespace-nowrap translate-y-[28%] md:translate-y-[32%]"
          aria-hidden="true"
        >
          SUBSTRATA
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div
          id="acetate-inquiry-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md bg-[#101317] border border-[rgba(237,231,220,0.22)] p-6 md:p-8">
            <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#E8913C] mb-2">
              <Disc className="w-3.5 h-3.5" />
              <span>DIRECT LACQUER / ACETATE INQUIRY</span>
            </div>

            <h3 className="font-display font-bold text-[22px] text-[#EDE7DC] mb-2">
              ARCHIVE DISPATCH REQUEST
            </h3>
            <p className="text-[12px] text-[#9EA5A8] mb-6 leading-relaxed">
              Direct lacquer dubplates and unnumbered test pressings are reserved for institutional sound archives, acoustic labs, and registered subscribers.
            </p>

            {inquirySent ? (
              <div className="bg-[#0A0C0E] border border-[#2E6B72] p-5 text-center text-[12.5px] text-[#EDE7DC] flex flex-col items-center gap-2">
                <Check className="w-5 h-5 text-[#2E6B72]" />
                <span className="font-semibold">DISPATCH CODES TRANSMITTED</span>
                <span className="text-[11px] text-[#9EA5A8]">
                  We have queued the archive catalog for {email}.
                </span>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="space-y-4">
                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-[10.5px] uppercase font-mono tracking-[0.14em] text-[#9EA5A8] mb-2"
                  >
                    REGISTERED EMAIL
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="curator@sound-archive.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.2)] focus:border-[#E8913C] text-[#EDE7DC] text-[13px] font-mono px-4 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowInquiryModal(false)}
                    className="text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] hover:text-[#EDE7DC] px-4 py-2"
                  >
                    CLOSE
                  </button>
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="text-[10.5px] uppercase font-semibold tracking-[0.14em] bg-[#EDE7DC] text-[#0A0C0E] hover:bg-[#E8913C] px-5 py-2.5 transition-colors"
                  >
                    SEND INQUIRY
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
