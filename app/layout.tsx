import type { Metadata } from 'next';
import { Syne, Sora } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SUBSTRATA // Physical Editions & Acoustic Pressings',
  description:
    'An independent record label crafting heavy-weight vinyl editions, direct-to-lathe lacquer master cuts, and spatial acoustic compositions.',
  openGraph: {
    title: 'SUBSTRATA // Physical Editions & Acoustic Pressings',
    description: 'Direct-to-lathe vinyl master cuts, spatial acoustics, and physical editions.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${sora.variable} dark scroll-smooth`}>
      <body
        className="bg-[#0A0C0E] text-[#EDE7DC] font-sans antialiased selection:bg-[#E8913C] selection:text-[#0A0C0E] min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

