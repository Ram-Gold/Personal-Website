"use client";
import React from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconFolder } from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';
import { PROJECTS } from '../data/projects';

export const ProjectsView: React.FC = () => {
  return (
    <main id="main-content" className="max-w-6xl mx-auto px-4 py-8">
      {/* Back navigation */}
      <Link
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-6 hover:text-theme-text transition-colors focus-visible:ring-1 focus-visible:ring-theme-border-accent outline-none rounded p-1 cursor-pointer animate-fade-in group/back"
        href="/"
        prefetch={true}
        onClick={hapticLight}
      >
        <IconArrowLeft
          size={16}
          className="text-theme-muted group-hover/back:text-theme-text transition-colors"
        />
        Back to Home
      </Link>

      <div className="flex flex-col gap-y-8 animate-fade-in animate-slide-up animation-delay-100">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-card-border/60 pb-6">
          <div className="w-10 h-10 rounded-xl bg-theme-hover border border-card-border flex items-center justify-center shrink-0 text-theme-muted">
            <IconFolder size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-2xl text-theme-text tracking-tight">All Projects</h1>
            <p className="text-theme-muted text-xs md:text-sm mt-0.5">
              A collection of my recent work and experiments.
            </p>
          </div>
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              prefetch={true}
              onClick={hapticLight}
              className="block outline-none focus-visible:ring-1 focus-visible:ring-theme-border-accent rounded-2xl group"
            >
              <article className="flex flex-col justify-between h-full group cursor-pointer transition-all duration-200">
                <div>
                  {/* Top: Media (Video or Image) with rounded corners (rounded-2xl) */}
                  <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-theme-hover relative mb-3.5">
                    {project.video ? (
                      <video
                        src={project.video}
                        poster={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                      />
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-theme-hover text-theme-subtle">
                        <IconFolder size={24} className="opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="text-xs text-theme-subtle font-mono tracking-normal mb-1.5">
                    {project.year}
                  </div>

                  {/* Title */}
                  <h2 className="font-sans font-bold text-[17px] md:text-[18px] leading-[1.3] tracking-tight text-theme-text group-hover:text-theme-hover-text transition-colors duration-200 line-clamp-2 mb-2.5">
                    {project.title}
                  </h2>
                </div>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="mt-3.5 min-w-0">
                    <div
                      className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-nowrap min-w-0 max-w-full"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {project.tags.map((tag, idx) => (
                        <div key={idx} className="tag shrink-0">
                          <p>{tag}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};
