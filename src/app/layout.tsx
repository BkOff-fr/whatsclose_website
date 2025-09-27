import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Whatsclose - Le système d\'exploitation du commerce local',
  description: 'Une plateforme qui connecte directement commerçants et consommateurs pour redynamiser votre quartier.',
  keywords: 'commerce local, géolocalisation, quartier, commerçants, consommateurs',
  authors: [{ name: 'Whatsclose' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-foret text-creme overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}