"use client";

import React from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface DomoDomoViewProps {
  onBack?: () => void;
}

export const DomoDomoView: React.FC<DomoDomoViewProps> = () => {
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
            Product · Web Utilities · Open Source
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-theme-text tracking-tight leading-tight mb-4">
            DomoDomo
          </h1>

          <p className="text-theme-muted text-base md:text-lg leading-relaxed mb-5">
            A multi-purpose, open-source web utility suite — 100% client-side, local-first, and privacy-respecting.
          </p>

          {/* Minimal Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-theme-subtle font-mono">
            <span>2026</span>
            <span>·</span>
            <a
              href="https://domodomo.site/"
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
            src="/assets/images/domodomo_preview.png"
            alt="DomoDomo Website Preview"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Divider */}
        <hr className="blog-hr mb-8" />

        {/* Blog Post Content */}
        <div className="blog-content">
          <p className="blog-p">
            Most online utility sites — like PDF editors, file format converters, and image compressors — require uploading sensitive documents to third-party cloud servers. This introduces significant privacy risks, file size limits, rate limiting, and aggressive advertising trackers.
          </p>

          <p className="blog-p">
            <strong>DomoDomo</strong> was built to challenge that model. It is an open-source utility suite running completely client-side in the user&apos;s browser, offering high-performance tools without compromising confidentiality.
          </p>

          <h2 className="blog-h2">1. The Zero-Upload Architecture</h2>
          <p className="blog-p">
            Unlike cloud utilities, DomoDomo never sends user data across the network:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Local Browser Sandbox:</strong> File manipulation, text processing, and conversions execute locally inside the browser thread and Web Workers.
            </li>
            <li className="blog-li">
              <strong>Zero Data Collection:</strong> Documents, images, audio clips, and code snippets never touch external servers or cloud storage buckets.
            </li>
            <li className="blog-li">
              <strong>Offline Capable:</strong> Once loaded, core utility modules function seamlessly without an active internet connection.
            </li>
          </ul>

          <h2 className="blog-h2">2. Core Capabilities</h2>
          <p className="blog-p">
            The platform brings together essential daily digital utilities under a single unified, lightweight interface:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Document & PDF Tools:</strong> Merge, split, compress, extract pages, and convert PDF documents directly in memory.
            </li>
            <li className="blog-li">
              <strong>Image Transformation:</strong> Format conversion (PNG, JPEG, WebP, AVIF), lossless optimization, and aspect ratio resizing.
            </li>
            <li className="blog-li">
              <strong>Media & Audio Utilities:</strong> Fast client-side audio encoding, trimming, and spectrogram analysis.
            </li>
            <li className="blog-li">
              <strong>Developer & Text Utilities:</strong> Regex matchers, JSON validators, base64 decoders, and markdown formatters.
            </li>
          </ul>

          <h2 className="blog-h2">3. Tech Stack & Performance</h2>
          <p className="blog-p">
            To achieve near-native desktop speeds inside a web browser, DomoDomo utilizes modern web primitives:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>WebAssembly (WASM):</strong> Intensive computing pipelines (codecs, PDF manipulation engines) are compiled to WASM for high computational throughput.
            </li>
            <li className="blog-li">
              <strong>WebGPU & Canvas2D:</strong> Image filters and graphical rendering tasks leverage client hardware acceleration.
            </li>
            <li className="blog-li">
              <strong>React & Tailwind CSS:</strong> Clean, responsive user interface with instant interaction feedback and dark mode support.
            </li>
            <li className="blog-li">
              <strong>Vercel:</strong> Static edge delivery ensuring zero cold-starts and global CDN caching.
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
};
