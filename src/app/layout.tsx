import React from 'react';
import type {Metadata} from 'next';
import {Inter, Lora, Inconsolata} from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dictionary',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inconsolata',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${lora.variable} ${inconsolata.variable} h-full`}
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
