"use client";

import React from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconArrowUpRight,
} from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface KoncentrateViewProps {
  onBack?: () => void;
}

export const KoncentrateView: React.FC<KoncentrateViewProps> = () => {
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
            Desktop · Linux · KDE Plasma 6
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-theme-text tracking-tight leading-tight mb-4">
            Koncentrate
          </h1>

          <p className="text-theme-muted text-base md:text-lg leading-relaxed mb-5">
            A native KDE Plasma 6 desktop widget combining a Pomodoro timer with integrated task management.
          </p>

          {/* Minimal Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-theme-subtle font-mono">
            <span>2026</span>
            <span>·</span>
            <a
              href="https://github.com/Ram-Gold/koncentrate"
              target="_blank"
              rel="noopener noreferrer"
              onClick={hapticLight}
              className="blog-link inline-flex items-center gap-0.5 text-theme-text hover:underline"
            >
              <span>View on GitHub</span>
              <IconArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Hero Image Embed */}
        <div className="mb-10 rounded-xl overflow-hidden border border-card-border bg-black/40">
          <img
            src="/assets/images/koncentrate_preview.png"
            alt="Koncentrate KDE Widget Banner"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Divider */}
        <hr className="blog-hr mb-8" />

        {/* Blog Post Content */}
        <div className="blog-content">
          <p className="blog-p">
            Most productivity timers live in separate browser tabs or phone apps. This creates friction: checking timer progress requires switching desktop focus or glancing at a phone screen, which frequently derails deep work.
          </p>

          <p className="blog-p">
            <strong>Koncentrate</strong> is a native desktop plasmoid engineered specifically for KDE Plasma 6 on Linux. It embeds interval time tracking and a prioritized to-do list directly onto your panel, system tray, or desktop workspace.
          </p>

          <h2 className="blog-h2">1. The Integrated Focus Workflow</h2>
          <p className="blog-p">
            The widget pairs time-boxing with active task execution:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Customizable Intervals:</strong> Configure standard Pomodoro sessions (25-minute focus, 5-minute short break, 15-minute long break) or custom interval lengths to match your personal rhythm.
            </li>
            <li className="blog-li">
              <strong>Built-In Task Checklist:</strong> Add, reorder, check off, and delete tasks directly within the plasmoid popup without leaving your current workspace.
            </li>
            <li className="blog-li">
              <strong>Native Desktop Alerts:</strong> Audio cues and subtle system notifications notify you when intervals complete, hooking directly into the KDE notification daemon.
            </li>
          </ul>

          <h2 className="blog-h2">2. Native KDE Plasma 6 & QML Architecture</h2>
          <p className="blog-p">
            Rather than wrapping an Electron or web app container, Koncentrate is built with the native KDE Plasma stack:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Qt / QML:</strong> Fluid, hardware-accelerated declarative UI that matches the user&apos;s active KDE Breeze color scheme, font settings, and panel scaling automatically.
            </li>
            <li className="blog-li">
              <strong>Minimal Resource Footprint:</strong> Consumes negligible CPU and memory, ensuring zero impact on battery life or system performance during heavy compile jobs.
            </li>
            <li className="blog-li">
              <strong>Wayland Ready:</strong> Fully compliant with Plasma 6&apos;s Wayland architecture, respecting window management rules and panel containment.
            </li>
          </ul>

          <h2 className="blog-h2">3. Tech Stack</h2>
          <ul className="blog-ul">
            <li className="blog-li">
              <strong>KDE Plasma 6:</strong> Modern Linux desktop framework and plasmoid runtime.
            </li>
            <li className="blog-li">
              <strong>Qt 6 & QML:</strong> High-performance UI language and rendering engine.
            </li>
            <li className="blog-li">
              <strong>C++:</strong> Backend logic and system-level desktop integration.
            </li>
            <li className="blog-li">
              <strong>Linux:</strong> Native desktop platform support.
            </li>
          </ul>
        </div>
      </article>
    </main>
  );
};
