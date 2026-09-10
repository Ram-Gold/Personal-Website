import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '../globals.css';
import { ThemeProvider } from '@/src/utils/ThemeContext';
import { ThemeToggle } from '@/src/components/ThemeToggle';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
  ],
};

export const metadata: Metadata = {
  title: 'Ram Guinto | Front-End Developer & AI Engineering Associate',
  description: 'Personal portfolio of Ram Guinto — Front-End Developer, Graphic Designer, and AI Engineering Associate in Manila, Philippines.',
  keywords: 'Ram Guinto, Ram Achilles Guinto, Front-End Developer, AI Engineer, React, TypeScript, Tailwind CSS, Manila Philippines, DomoDomo, Koncentrate, Model Context Protocol, Anthropic Claude',
  authors: [{ name: 'Ram Achilles Guinto' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  icons: {
    icon: '/assets/images/ram-guinto.png',
    apple: '/assets/images/ram-guinto.png',
  },
  alternates: {
    types: {
      'text/markdown': '/llms.txt',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://ram-gold.github.io/Personal-Website/',
    siteName: 'Ram Guinto Portfolio',
    title: 'Ram Guinto | Front-End Developer & AI Engineering Associate',
    description: 'Front-end developer and aspiring AI engineer based in Manila, Philippines. Building fast, responsive web apps with React, Tailwind CSS, and AI systems.',
    images: [{ url: 'https://ram-gold.github.io/Personal-Website/assets/images/ram-guinto.png' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ram Guinto | Front-End Developer & AI Engineering Associate',
    description: 'Front-end developer and aspiring AI engineer based in Manila, Philippines. Building fast, responsive web apps with React, Tailwind CSS, and AI systems.',
    images: ['https://ram-gold.github.io/Personal-Website/assets/images/ram-guinto.png'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
          />
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-white dark:focus:bg-neutral-900 focus:text-neutral-900 dark:focus:text-white focus:border focus:border-neutral-300 dark:focus:border-neutral-700 focus:rounded-lg focus:shadow-xl focus:outline-none text-xs font-semibold"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ThemeToggle />
          <div id="root">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
