import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Whatsclose - Le Système d\'Exploitation du Commerce Local',
  description: 'La révolution du commerce de proximité commence à Strasbourg. Découvrez comment Whatsclose connecte producteurs et consommateurs grâce à l\'innovation des flux tirés.',
  keywords: ['commerce local', 'Strasbourg', 'système d\'exploitation', 'innovation', 'proximité'],
  authors: [{ name: 'Icam Strasbourg Europe' }],
  openGraph: {
    title: 'Whatsclose - Le Système d\'Exploitation du Commerce Local',
    description: 'La révolution du commerce de proximité commence à Strasbourg.',
    type: 'website',
    siteName: 'Whatsclose',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#224229',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body suppressHydrationWarning className="bg-foret loading">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <div id="app">
          {children}
        </div>
      </body>
    </html>
  )
}