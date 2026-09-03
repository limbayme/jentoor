import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jentoor Nutraceuticals | Evidence-led Manufacturing',
  description: 'Global nutraceutical formulation, manufacturing and fulfillment for ambitious wellness brands.',
  metadataBase: new URL('https://jentoor.com'),
  openGraph: {
    title: 'Jentoor Nutraceuticals | Evidence-led Manufacturing',
    description: 'Evidence-led nutrition, engineered to scale.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Jentoor evidence-led nutrition' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jentoor Nutraceuticals | Evidence-led Manufacturing',
    description: 'Evidence-led nutrition, engineered to scale.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
