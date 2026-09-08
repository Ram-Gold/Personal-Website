import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../src/utils/ThemeContext';
import { ThemeToggle } from '../src/components/ThemeToggle';
import Script from 'next/script';

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
      <head>
        <link rel="icon" href="/assets/images/ram-guinto.png" />
        <link rel="apple-touch-icon" href="/assets/images/ram-guinto.png" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Documentation" />
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              var theme = localStorage.getItem('theme') || 'dark';
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            })();
          `}
        </Script>
      </head>
      <body>
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
