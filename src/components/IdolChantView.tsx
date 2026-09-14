"use client";

import React from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface IdolChantViewProps {
  onBack?: () => void;
}

export const IdolChantView: React.FC<IdolChantViewProps> = () => {
  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back navigation */}
      <Link
        className="inline-flex items-center gap-1.5 text-xs text-theme-muted mb-8 hover:text-theme-text transition-colors group/back"
        href="/"
        prefetch={true}
        onClick={hapticLight}
      >
        <IconArrowLeft
          size={14}
          className="text-theme-muted group-hover/back:text-theme-text transition-colors"
        />
        Back to Home
      </Link>

      {/* Article container */}
      <article className="animate-slide-up animation-delay-100">
        {/* Header */}
        <header className="mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-theme-subtle mb-3 block">
            Community · Culture · Web App
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-theme-text tracking-tight leading-tight mb-4">
            Idol Chant & Mixes
          </h1>

          <p className="text-theme-muted text-base md:text-lg leading-relaxed mb-5">
            A centralized digital catalog for Japanese idol culture, synchronized crowd calls, and wotagei mixes.
          </p>

          {/* Minimal Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-theme-subtle font-mono">
            <span>2026</span>
            <span>·</span>
            <a
              href="https://idol-mixes.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={hapticLight}
              className="blog-link inline-flex items-center gap-0.5 text-theme-text hover:underline"
            >
              <span>Visit Live Site</span>
              <IconArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Hero Image Embed */}
        <div className="mb-10 rounded-xl overflow-hidden border border-card-border bg-black/40">
          <img
            src="/assets/images/idol_chant_preview.png"
            alt="Idol Chant & Mixes Website Preview"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Divider */}
        <hr className="blog-hr mb-8" />

        {/* Blog Post Content */}
        <div className="blog-content">
          <p className="blog-p">
            In Japanese idol concerts and live performances, crowd participation — known as <strong>wotagei</strong> and <strong>call & response</strong> — is a vibrant, synchronized tradition. Fans cheer with rhythmic chants, call out members&apos; names during instrumental intros, and recite rapid-fire phonetic &quot;mixes&quot; during song transitions.
          </p>

          <p className="blog-p">
            Historically, learning these chants has been notoriously difficult for newcomers and international fans. Guides were scattered across disorganized blog pastes, obscure fan forums, or expired Google Docs with broken formatting.
          </p>

          <h2 className="blog-h2">1. The Centralized Hub</h2>
          <p className="blog-p">
            <strong>Idol Chant & Mixes</strong> was created to solve this knowledge gap. It provides a structured, easily searchable home for idol calls:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Phonetic Romanization:</strong> Complex Japanese chants are transcribed phonetically so fans of any language background can learn and participate.
            </li>
            <li className="blog-li">
              <strong>Song & Group Index:</strong> Browse by idol group, track title, or chant category (Standard Mix, Japanese Mix, Ainu Mix, and custom variations).
            </li>
            <li className="blog-li">
              <strong>Timing & Rhythm Guides:</strong> Line-by-line breakdowns showing exactly when calls trigger relative to musical intros, choruses, and instrumental breakdowns.
            </li>
          </ul>

          <h2 className="blog-h2">2. Mobile-First Concert Usability</h2>
          <p className="blog-p">
            Concerts are fast-paced environments with low lighting and spotty cellular connectivity. The interface was engineered with specific constraints in mind:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>High-Contrast Typography:</strong> Dark-themed by default with high-contrast text to remain legible on mobile screens inside concert venues.
            </li>
            <li className="blog-li">
              <strong>Instant Client-Side Filtering:</strong> Fast, offline-tolerant search allowing fans to pull up a setlist chant in seconds.
            </li>
            <li className="blog-li">
              <strong>Zero Clutter:</strong> Minimal, distraction-free reading experience without unnecessary ads or heavy assets.
            </li>
          </ul>

          <h2 className="blog-h2">3. Tech Stack</h2>
          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Next.js & React:</strong> Fast server-rendered pages with pre-rendered static routes for optimal SEO and rapid initial loads.
            </li>
            <li className="blog-li">
              <strong>Tailwind CSS:</strong> Highly maintainable utility styling with responsive breakpoints for phone and desktop viewports.
            </li>
            <li className="blog-li">
              <strong>Vercel:</strong> Continuous deployment with global CDN edge caching.
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
};
