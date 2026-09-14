"use client";
import React, { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { animate } from "motion";
import { hapticLight } from "../utils/haptics";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { PROJECTS } from "../data/projects";

function CarouselMedia({
  image,
  video,
  title,
  isActive,
}: {
  image: string;
  video?: string;
  title: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Playback was prevented or interrupted
        });
      }
    } else {
      videoEl.pause();
    }
  }, [isActive]);

  return (
    <div className="selected-projects-image">
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover pointer-events-none"
        />
      ) : (
        <Image
          src={image}
          alt={`${title} preview`}
          fill
          sizes="(max-width: 640px) 80vw, 380px"
          className="object-cover"
          draggable={false}
        />
      )}
    </div>
  );
}

export function SelectedProjects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const hasDragged = useRef(false);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const pointerVelocity = useRef(0);
  const animControls = useRef<{ stop: () => void } | null>(null);

  // Duplicate items for infinite loop: 5 copies for smooth centered navigation
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS, ...PROJECTS];
  const singleSetWidth = useRef(0);
  const baseScroll = useRef(0);
  const activeIndexRef = useRef(2 * PROJECTS.length);
  const [activeIndex, setActiveIndex] = useState(2 * PROJECTS.length);

  // Determine which card is closest to the horizontal center
  const updateActiveCard = useCallback(() => {
    const track = trackRef.current;
    if (!track || singleSetWidth.current === 0) return;

    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const stride = cardWidth + gap;
    const centerOffset = (track.offsetWidth - cardWidth) / 2;

    const rawIndex = Math.round((track.scrollLeft + centerOffset) / stride);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, rawIndex));

    if (clampedIndex !== activeIndexRef.current) {
      activeIndexRef.current = clampedIndex;
      setActiveIndex(clampedIndex);
    }
  }, [items.length]);

  // Handle infinite loop repositioning around the centered middle set
  const handleInfiniteWrap = useCallback(() => {
    const track = trackRef.current;
    if (!track || singleSetWidth.current === 0) return;

    const setW = singleSetWidth.current;
    const base = baseScroll.current;

    // If scrolled past the middle set, jump back
    if (track.scrollLeft >= base + setW) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft -= setW;
      track.style.scrollBehavior = "";
    }
    // If scrolled before the middle set, jump forward
    else if (track.scrollLeft <= base - setW) {
      track.style.scrollBehavior = "auto";
      track.scrollLeft += setW;
      track.style.scrollBehavior = "";
    }
  }, []);

  // Initialize scroll to center the middle set (Set 2)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const initScroll = () => {
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth;
      const gap = 16;
      const stride = cardWidth + gap;
      singleSetWidth.current = PROJECTS.length * stride;

      // Center index 2 * PROJECTS.length (Set 2, first card) in the track
      const centerOffset = (track.offsetWidth - cardWidth) / 2;
      const targetScroll = 2 * PROJECTS.length * stride - centerOffset;
      baseScroll.current = targetScroll;
      track.scrollLeft = targetScroll;
      updateActiveCard();
    };

    requestAnimationFrame(initScroll);

    window.addEventListener("resize", initScroll);
    return () => window.removeEventListener("resize", initScroll);
  }, [updateActiveCard]);

  // Handle scroll listener for native trackpad / inertial scrolling
  const handleScroll = useCallback(() => {
    if (!isDragging.current && !animControls.current) {
      handleInfiniteWrap();
      updateActiveCard();
    }
  }, [handleInfiniteWrap, updateActiveCard]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Smooth ease-out arrow navigation using motion
  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track || !track.children[0]) return;

      if (animControls.current) {
        animControls.current.stop();
        animControls.current = null;
      }

      const firstCard = track.children[0] as HTMLElement;
      const cardWidth = firstCard.offsetWidth;
      const gap = 16;
      const stride = cardWidth + gap;
      const centerOffset = (track.offsetWidth - cardWidth) / 2;

      // Current centered card index
      const currentIndex = Math.round((track.scrollLeft + centerOffset) / stride);
      const targetIndex = currentIndex + direction;
      const targetScroll = targetIndex * stride - centerOffset;

      track.style.scrollSnapType = "none";

      animControls.current = animate(track.scrollLeft, targetScroll, {
        duration: 0.38,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (latest) => {
          if (track) {
            track.scrollLeft = latest;
            updateActiveCard();
          }
        },
        onComplete: () => {
          if (track) {
            track.style.scrollSnapType = "";
            animControls.current = null;
            handleInfiniteWrap();
            updateActiveCard();
          }
        },
      });
    },
    [updateActiveCard, handleInfiniteWrap]
  );

  // Mouse / touch drag
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;

    // Interrupt any running ease animation
    if (animControls.current) {
      animControls.current.stop();
      animControls.current = null;
    }

    isDragging.current = true;
    hasDragged.current = false;
    dragStart.current = {
      x: e.clientX,
      scrollLeft: track.scrollLeft,
    };
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    pointerVelocity.current = 0;
    track.classList.add("is-dragging");
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const track = trackRef.current;
    if (!track) return;

    const now = performance.now();
    const dt = now - lastPointerTime.current;
    if (dt > 0) {
      pointerVelocity.current = (e.clientX - lastPointerX.current) / dt;
      lastPointerX.current = e.clientX;
      lastPointerTime.current = now;
    }

    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > 8) {
      hasDragged.current = true;
      if (!track.hasPointerCapture(e.pointerId)) {
        track.setPointerCapture(e.pointerId);
        track.style.cursor = "grabbing";
        track.style.scrollSnapType = "none";
      }
      track.scrollLeft = dragStart.current.scrollLeft - dx;
      updateActiveCard();
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;

    isDragging.current = false;
    track.classList.remove("is-dragging");
    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    track.style.cursor = "";

    // If it was just a click (no drag), don't trigger animated snap
    if (!hasDragged.current) {
      track.style.scrollSnapType = "";
      return;
    }

    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) {
      track.style.scrollSnapType = "";
      return;
    }

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    const stride = cardWidth + gap;
    const centerOffset = (track.offsetWidth - cardWidth) / 2;

    // Which card was centered when dragging started
    const startScroll = dragStart.current.scrollLeft;
    const startIndex = Math.round((startScroll + centerOffset) / stride);

    const dx = e.clientX - dragStart.current.x;
    const velocity = pointerVelocity.current; // px / ms

    // Drag distance relative to card stride (-dx because dragging left increases scrollLeft)
    const progress = -dx / stride;

    // Halfway snap rule:
    // If flicked with velocity, advance in direction of swipe.
    // Otherwise, if dragged halfway (>= 50%), advance/retreat to the nearest card;
    // if dragged < 50%, smoothly ease back to the original position.
    let targetIndex = startIndex;
    if (Math.abs(velocity) > 0.35 && Math.abs(dx) > 20) {
      targetIndex = startIndex + (velocity < 0 ? 1 : -1);
    } else {
      targetIndex = startIndex + Math.round(progress);
    }

    const targetScroll = targetIndex * stride - centerOffset;

    track.style.scrollSnapType = "none";

    animControls.current = animate(track.scrollLeft, targetScroll, {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1], // fluid ease-out
      onUpdate: (latest) => {
        if (track) {
          track.scrollLeft = latest;
          updateActiveCard();
        }
      },
      onComplete: () => {
        if (track) {
          track.style.scrollSnapType = "";
          animControls.current = null;
          handleInfiniteWrap();
          updateActiveCard();
        }
      },
    });
  };

  return (
    <section className="selected-projects mb-8 animate-fade-in animate-slide-up">
      {/* Header row */}
      <div className="selected-projects-header">
        <h2 className="selected-projects-title">Selected Projects</h2>
        <div className="selected-projects-actions">
          <button
            className="selected-projects-arrow selected-projects-arrow-left"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
          >
            <IconChevronLeft size={16} />
          </button>
          <button
            className="selected-projects-arrow selected-projects-arrow-right"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel container with edge gradients */}
      <div className="selected-projects-carousel-container">
        {/* Left gradient fade */}
        <div className="selected-projects-fade-left" aria-hidden="true" />

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="selected-projects-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {items.map((project, i) => (
            <Link
              key={`${project.title}-${i}`}
              href={project.href}
              prefetch
              onClick={(e) => {
                if (hasDragged.current) {
                  e.preventDefault();
                  return;
                }
                hapticLight();
              }}
              className={`selected-projects-card ${i === activeIndex ? "is-active" : ""}`}
              draggable={false}
            >
              {/* Media: Video or Image */}
              <CarouselMedia
                image={project.image}
                video={project.video}
                title={project.title}
                isActive={i === activeIndex}
              />

              {/* Gradient overlay + text */}
              <div className="selected-projects-overlay">
                <div className="selected-projects-card-info">
                  <p className="selected-projects-card-title">
                    {project.title}
                  </p>
                  <div className="selected-projects-card-meta">
                    {project.tags.map((tag) => (
                      <span key={tag} className="selected-projects-card-tag">
                        {tag}
                      </span>
                    ))}
                    <span className="selected-projects-card-year">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right gradient fade */}
        <div className="selected-projects-fade-right" aria-hidden="true" />
      </div>

      {/* View more link at bottom right */}
      <div className="flex justify-end mt-3">
        <Link
          href="/projects"
          prefetch
          onClick={hapticLight}
          className="selected-projects-viewmore"
        >
          <span>View all projects</span>
          <IconChevronRight size={14} />
        </Link>
      </div>
    </section>
  );
}
