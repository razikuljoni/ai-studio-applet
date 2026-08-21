'use client';

import React, { useState } from 'react';
import { PERFORMANCE_DATES, PerformanceDate } from '@/data/catalogue';
import { Radio, Check, Calendar } from 'lucide-react';

export function DatesTable() {
  const [selectedDate, setSelectedDate] = useState<PerformanceDate | null>(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);
  const [attendeeEmail, setAttendeeEmail] = useState('');

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeEmail) return;
    setReservationConfirmed(true);
    setTimeout(() => {
      setReservationConfirmed(false);
      setSelectedDate(null);
      setAttendeeEmail('');
    }, 2800);
  };

  return (
    <section
      id="sessions"
      className="relative w-full bg-[#0A0C0E] border-t border-[rgba(237,231,220,0.13)] py-24 px-6 md:px-16 lg:px-24"
    >
      {/* Header Index */}
      <div className="flex items-center gap-3 text-[11px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] mb-12">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8913C]" />
        <span>[ 04 // LATHE CUTS & SPATIAL PERFORMANCE SESSIONS ]</span>
        <span className="w-12 h-[1px] bg-[rgba(237,231,220,0.13)]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="font-display font-bold text-[clamp(32px,4.5vw,56px)] leading-[1.08] text-[#EDE7DC]">
            PERFORMANCE SESSIONS.
          </h2>
          <p className="text-[14px] text-[#9EA5A8] max-w-xl mt-3 font-normal">
            Live direct-to-lathe lacquer cut presentations, spatial multi-channel broadcasts, and acoustical installations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10.5px] uppercase font-mono tracking-[0.14em] text-[#2E6B72]">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#E8913C]" />
          <span>NEUMANN VMS-80 LIVE LATHE CALIBRATED</span>
        </div>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Uppercase Headers over Hairline */}
          <thead>
            <tr className="border-b border-[rgba(237,231,220,0.18)] text-[10.5px] uppercase font-mono tracking-[0.15em] text-[#6C7378]">
              <th className="pb-4 font-normal w-1/5">DATE / TIME</th>
              <th className="pb-4 font-normal w-1/4">CITY & VENUE</th>
              <th className="pb-4 font-normal w-1/3">PERFORMANCE / ARTIST</th>
              <th className="pb-4 font-normal w-1/6">FORMAT / ACCESS</th>
              <th className="pb-4 font-normal text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(237,231,220,0.1)]">
            {PERFORMANCE_DATES.map((item) => (
              <tr
                key={item.id}
                className="group hover:bg-[#101317]/60 transition-colors duration-150"
              >
                {/* Display-face First Column (Date) */}
                <td className="py-6 font-display font-bold text-[18px] text-[#EDE7DC] group-hover:text-[#E8913C] transition-colors whitespace-nowrap">
                  {item.date}
                </td>

                {/* City & Venue */}
                <td className="py-6 text-[13px] text-[#EDE7DC]">
                  <div className="font-semibold uppercase tracking-wider">{item.city}</div>
                  <div className="text-[11px] text-[#9EA5A8] font-normal tracking-wide">
                    {item.venue}
                  </div>
                </td>

                {/* Performance Type */}
                <td className="py-6 text-[12.5px] text-[#9EA5A8] font-mono leading-relaxed">
                  {item.performanceType}
                </td>

                {/* Format / Edition */}
                <td className="py-6 text-[11px] uppercase tracking-wider text-[#6C7378]">
                  {item.format}
                </td>

                {/* Status / Action */}
                <td className="py-6 text-right whitespace-nowrap">
                  <button
                    onClick={() => setSelectedDate(item)}
                    id={`reserve-btn-${item.id}`}
                    disabled={item.status === 'SOLD OUT'}
                    className={`text-[10.5px] uppercase font-medium tracking-[0.14em] px-3.5 py-1.5 transition-all duration-200 ${
                      item.status === 'SOLD OUT'
                        ? 'text-[#6C7378] border border-[rgba(237,231,220,0.06)] cursor-not-allowed'
                        : item.status === 'LIMITED ACETATES'
                        ? 'text-[#E8913C] border border-[#E8913C]/40 hover:bg-[#E8913C] hover:text-[#0A0C0E]'
                        : item.status === 'DIRECT BROADCAST'
                        ? 'text-[#2E6B72] border border-[#2E6B72]/40 hover:bg-[#2E6B72] hover:text-[#EDE7DC]'
                        : 'text-[#EDE7DC] border border-[rgba(237,231,220,0.22)] hover:border-[#EDE7DC] hover:bg-[#EDE7DC] hover:text-[#0A0C0E]'
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Collapsed Two-Column Card Grid */}
      <div className="md:hidden divide-y divide-[rgba(237,231,220,0.13)] border-t border-[rgba(237,231,220,0.13)]">
        {PERFORMANCE_DATES.map((item) => (
          <div key={item.id} className="py-6 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <span className="font-display font-bold text-[18px] text-[#EDE7DC]">
                {item.date}
              </span>
              <span className="text-[10px] uppercase font-mono tracking-[0.14em] text-[#E8913C]">
                {item.city}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11.5px] text-[#9EA5A8]">
              <div>
                <span className="text-[9px] uppercase font-mono text-[#6C7378] block">VENUE</span>
                <span className="text-[#EDE7DC]">{item.venue}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-mono text-[#6C7378] block">FORMAT</span>
                <span className="text-[#EDE7DC] truncate block">{item.format}</span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#6C7378] leading-normal mt-1">
              {item.performanceType}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setSelectedDate(item)}
                id={`mobile-reserve-btn-${item.id}`}
                disabled={item.status === 'SOLD OUT'}
                className="w-full text-center text-[10.5px] uppercase font-medium tracking-[0.14em] py-2 border border-[rgba(237,231,220,0.2)] text-[#EDE7DC]"
              >
                {item.status}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Session Dispatch / Reservation Dialog */}
      {selectedDate && (
        <div
          id="date-reservation-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg bg-[#101317] border border-[rgba(237,231,220,0.22)] p-6 md:p-8">
            <div className="flex items-center gap-2 text-[10.5px] font-mono uppercase tracking-[0.14em] text-[#E8913C] mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>SESSION ACCESS DISPATCH</span>
            </div>

            <h3 className="font-display font-bold text-[24px] text-[#EDE7DC] mb-1">
              {selectedDate.event}
            </h3>
            <p className="text-[12.5px] text-[#9EA5A8] uppercase tracking-wider mb-6">
              {selectedDate.date} — {selectedDate.city} {'//'} {selectedDate.venue}
            </p>

            {reservationConfirmed ? (
              <div className="bg-[#0A0C0E] border border-[#2E6B72] p-6 text-center text-[13px] text-[#EDE7DC] flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2E6B72]/20 border border-[#2E6B72] flex items-center justify-center text-[#2E6B72]">
                  <Check className="w-4 h-4" />
                </div>
                <p className="font-display font-semibold text-[16px]">
                  RESERVATION CONFIRMED {'//'} DISPATCH ISSUED
                </p>
                <p className="text-[11.5px] text-[#9EA5A8]">
                  Admission coordinates and audio session stream link sent to {attendeeEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReserve} className="space-y-4">
                <div className="bg-[#0A0C0E] p-4 border border-[rgba(237,231,220,0.1)] text-[11px] font-mono text-[#9EA5A8]">
                  <div className="flex justify-between mb-1">
                    <span>PERFORMANCE:</span>
                    <span className="text-[#EDE7DC]">{selectedDate.performanceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EDITION ACCESS:</span>
                    <span className="text-[#E8913C]">{selectedDate.format}</span>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="attendee-email"
                    className="block text-[10.5px] uppercase font-mono tracking-[0.14em] text-[#9EA5A8] mb-2"
                  >
                    ENTER RECIPIENT EMAIL FOR ACETATE RESERVATION / STREAM KEY
                  </label>
                  <input
                    id="attendee-email"
                    type="email"
                    required
                    placeholder="acoustic.listener@subdomain.org"
                    value={attendeeEmail}
                    onChange={(e) => setAttendeeEmail(e.target.value)}
                    className="w-full bg-[#0A0C0E] border border-[rgba(237,231,220,0.2)] focus:border-[#E8913C] text-[#EDE7DC] text-[13px] font-mono px-4 py-2.5 outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[rgba(237,231,220,0.1)]">
                  <button
                    type="button"
                    onClick={() => setSelectedDate(null)}
                    className="text-[10.5px] uppercase font-medium tracking-[0.14em] text-[#9EA5A8] hover:text-[#EDE7DC] px-4 py-2"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    id="confirm-reservation-btn"
                    className="text-[10.5px] uppercase font-semibold tracking-[0.14em] bg-[#EDE7DC] text-[#0A0C0E] hover:bg-[#E8913C] px-5 py-2.5 transition-colors"
                  >
                    CONFIRM DISPATCH
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
