import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import React from 'react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Christmas Countdown | Snow Animation & Timer 🎅',
  description: 'Get ready for Christmas with our festive countdown timer. Watch the snow fall as you wait for the big day!',
  keywords: 'Christmas Countdown, Snow Animation, Festive Timer, Holiday Countdown, Christmas Tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': 'Christmas Countdown',
    'startDate': '2024-12-25T00:00:00+00:00',
    'description': 'A fun countdown to Christmas Day with live snowfall animation.',
    'eventStatus': 'https://schema.org/EventScheduled',
    'location': {
      '@type': 'VirtualLocation',
      'url': 'https://xmas-countdown.com',
    },
  };

  return (
    <html lang="en">
    <head>
      {/* AdSense Script */}
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3335320516280697"
        data-ad-client="3335320516280697"
        strategy="lazyOnload"
        async
      />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Favicon */}
      <link rel="icon" href="/fav.ico" sizes="any" />
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable}`}>
    {children}
    </body>
    </html>
  );
}
