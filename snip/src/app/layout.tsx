import type { Metadata } from 'next';
import { Spline_Sans_Mono, Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import Providers from './providers';

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Portfolio - Animation Heavy',
  description: 'A visually stunning, animation-heavy portfolio website built with GSAP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${splineSansMono.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
