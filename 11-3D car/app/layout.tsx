import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#060709',
};

export const metadata: Metadata = {
  title: 'AUREX | Engineered to Move — High Performance Automotive',
  description:
    'AUREX represents the pinnacle of pure mechanical engineering, atmospheric combustion, and aerodynamic supremacy. Experience the 3D interactive machine.',
  keywords: [
    'AUREX',
    'Automotive',
    'Supercar',
    'Porsche 911 GT3',
    '3D Car Configurator',
    'High Performance',
    'Three.js',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-[#060709] text-[#e2e5eb] antialiased selection:bg-white/20 selection:text-white overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
