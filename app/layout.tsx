import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jentoor Nutraceuticals | Evidence-led Manufacturing',
  description: 'Global nutraceutical formulation, manufacturing and fulfillment for ambitious wellness brands.',
  metadataBase: new URL('https://jentoor.com'),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
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
      <head>
        <link rel="dns-prefetch" href="//media.jentoor.com" />
        <link rel="preconnect" href="https://media.jentoor.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
