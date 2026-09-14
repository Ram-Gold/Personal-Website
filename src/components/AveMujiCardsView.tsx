"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconCheck,
  IconCopy,
} from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface AveMujiCardsViewProps {
  onBack?: () => void;
}

const R3F_CODE_SNIPPET = `// Texture loader pipeline
const [albedo, normal, roughness] = useTexture([
  '/ticket/albedo.png',
  '/ticket/normal.png',
  '/ticket/roughness.png'
]);

// Material definition
<mesh geometry={ticketGeometry}>
  <meshPhysicalMaterial
    map={albedo}
    normalMap={normal}
    normalScale={[0.6, 0.6]}
    roughnessMap={roughness}
    metalness={1.0}
    roughness={0.8}
    clearcoat={0.3}
    clearcoatRoughness={0.1}
    envMapIntensity={1.5}
  />
</mesh>`;

export const AveMujiCardsView: React.FC<AveMujiCardsViewProps> = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(R3F_CODE_SNIPPET);
      setCopied(true);
      hapticLight();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent fail */
    }
  };

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
            Experiment · 3D Web
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-theme-text tracking-tight leading-tight mb-4">
            Ave Muji Cards
          </h1>

          <p className="text-theme-muted text-base md:text-lg leading-relaxed mb-5">
            An interactive 3D collectible card experience leveraging a Physically Based Rendering (PBR) pipeline, Three.js, and physics-driven pointer tilt.
          </p>

          {/* Minimal Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-theme-subtle font-mono">
            <span>2026</span>
            <span>·</span>
            <a
              href="https://avemujicardcarousel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={hapticLight}
              className="blog-link inline-flex items-center gap-0.5 text-theme-text hover:underline"
            >
              <span>Visit Live Site</span>
              <IconArrowUpRight size={13} />
            </a>
            <span>·</span>
            <a
              href="https://github.com/Ram-Gold/ave_muji_card_carousel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={hapticLight}
              className="blog-link inline-flex items-center gap-0.5 text-theme-text hover:underline"
            >
              <span>GitHub</span>
              <IconArrowUpRight size={13} />
            </a>
          </div>
        </header>

        {/* Video Preview Embed */}
        <div className="mb-10 rounded-xl overflow-hidden border border-card-border bg-black/40">
          <video
            src="https://2jb116hoscccm9hn.public.blob.vercel-storage.com/projects/previews/avemujicards.mp4"
            poster="/assets/images/ave_muji_cards_preview.jpg"
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-auto max-h-[520px] object-contain mx-auto"
          />
        </div>

        {/* Divider */}
        <hr className="blog-hr mb-8" />

        {/* Blog Post Content */}
        <div className="blog-content">
          <p className="blog-p">
            This project is an interactive 3D card experiment inspired by physical foil collectibles. The implementation breaks down into three distinct layers: <strong>texture asset generation</strong>, <strong>3D scene setup (Three.js & React Three Fiber)</strong>, and <strong>physics-driven pointer interactions</strong>.
          </p>

          <h2 className="blog-h2">1. The PBR Asset Pipeline</h2>
          <p className="blog-p">
            To achieve a realistic embossed gold appearance without building a heavy, high-polygon 3D mesh, the card uses a single flat plane (<code>PlaneGeometry</code>) combined with baked texture maps:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Base Map (Albedo):</strong> The clean 2D artwork and base coloration without baked shadows.
            </li>
            <li className="blog-li">
              <strong>Normal Map:</strong> Generated from height and bevel data to give tactile depth to borders, typography, and card contours.
            </li>
            <li className="blog-li">
              <strong>Roughness Map:</strong> Encodes micro-surface variation. Matte areas scatter light softly, while metallic engravings reflect light sharply.
            </li>
            <li className="blog-li">
              <strong>Metalness:</strong> Configured directly on the physical material as <code>metalness: 1.0</code>, instructing the shader to treat the card as conductive metallic foil.
            </li>
          </ul>

          {/* Texture Maps 3-column figure (NO hover scale effects) */}
          <figure className="my-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Base Map */}
              <div className="rounded-lg overflow-hidden border border-card-border bg-black/20">
                <div className="aspect-[3/4] w-full overflow-hidden bg-black/30">
                  <img
                    src="https://2jb116hoscccm9hn.public.blob.vercel-storage.com/projects/previews/mortis.png"
                    alt="Base Map (Albedo) - Mortis"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 text-center border-t border-card-border bg-theme-hover/30">
                  <span className="text-[11px] font-mono text-theme-muted">Base Map</span>
                </div>
              </div>

              {/* Normal Map */}
              <div className="rounded-lg overflow-hidden border border-card-border bg-black/20">
                <div className="aspect-[3/4] w-full overflow-hidden bg-black/30">
                  <img
                    src="https://2jb116hoscccm9hn.public.blob.vercel-storage.com/projects/previews/mortis-normal-map.png"
                    alt="Normal Map - Mortis"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 text-center border-t border-card-border bg-theme-hover/30">
                  <span className="text-[11px] font-mono text-theme-muted">Normal Map</span>
                </div>
              </div>

              {/* Roughness Map */}
              <div className="rounded-lg overflow-hidden border border-card-border bg-black/20">
                <div className="aspect-[3/4] w-full overflow-hidden bg-black/30">
                  <img
                    src="https://2jb116hoscccm9hn.public.blob.vercel-storage.com/projects/previews/mortis-roughness-map.png"
                    alt="Roughness Map - Mortis"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 text-center border-t border-card-border bg-theme-hover/30">
                  <span className="text-[11px] font-mono text-theme-muted">Roughness Map</span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <figcaption className="text-center text-xs text-theme-subtle font-mono mt-3">
              Mortis (Mitsumi Wakaba)
            </figcaption>
          </figure>

          <h2 className="blog-h2">2. Three.js / R3F Material & Environment Setup</h2>
          <p className="blog-p">
            Metallic surfaces cannot reflect convincing highlights from simple point or directional lights alone. The scene utilizes Three.js&apos;s physical shader material combined with Image-Based Lighting (IBL) via an Environment Map (such as <code>&lt;Environment preset=&quot;city&quot; /&gt;</code>).
          </p>
          <p className="blog-p">
            As the card rotates, surface normals sample the HDR reflection probe, producing real-time glints across the foil engravings:
          </p>

          {/* Code Block with Copy */}
          <div className="blog-code-block group">
            <div className="blog-code-header">
              <span className="blog-code-lang">jsx</span>
              <button
                onClick={handleCopy}
                className="blog-code-copy"
                aria-label={copied ? "Code copied" : "Copy code"}
              >
                {copied ? (
                  <>
                    <IconCheck size={13} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy size={13} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="blog-code-pre">
              <code>{R3F_CODE_SNIPPET}</code>
            </pre>
          </div>

          <h2 className="blog-h2">3. Pointer-Based 3D Physics and Tilt</h2>
          <p className="blog-p">
            The interaction is driven by tracking pointer coordinates relative to the card&apos;s bounding box and feeding those values into damped springs or lerped rotations:
          </p>

          <ul className="blog-ul">
            <li className="blog-li">
              <strong>Normalized Pointer Coordinates:</strong> Calculates mouse or touch offset from the center of the card from <code>-1.0</code> to <code>1.0</code>.
            </li>
            <li className="blog-li">
              <strong>Rotation Clamping:</strong> Rotations are clamped (<code>rotation.y = mouseX * maxAngle</code> and <code>rotation.x = -mouseY * maxAngle</code>) to keep perspective natural.
            </li>
            <li className="blog-li">
              <strong>Dynamic Light Tracking:</strong> A local point light is simultaneously offset to mirror the cursor position, emphasizing normal-mapped highlights directly under the user&apos;s cursor.
            </li>
            <li className="blog-li">
              <strong>Spring Damping:</strong> Adds smooth inertia so the card drifts back to its resting position when the cursor leaves the frame.
            </li>
            <li className="blog-li">
              <strong>Mobile Gyroscope:</strong> On phones supporting <code>DeviceOrientationEvent</code>, <code>gamma</code> (tilt left/right) and <code>beta - 45°</code> (pitch) map directly to rotation angles, with sensor jitter smoothed via lerp damping.
            </li>
          </ul>

        </div>
      </article>
    </main>
  );
};
