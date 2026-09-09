"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, MotionConfig } from 'framer-motion';
import {
  IconArrowLeft,
  IconArticle,
  IconSearch,
  IconX,
  IconSparkles,
  IconList,
  IconLayoutGrid,
} from '@tabler/icons-react';
import { hapticLight, hapticSelection } from '../utils/haptics';
import {
  BlogPostItem,
  normalizePost,
  formatBlogDate,
} from '../data/blogPosts';
import type { Post, Topic } from '@/payload-types';

interface BlogViewProps {
  initialPosts?: (Post | BlogPostItem)[];
  initialTopics?: (Topic | string)[];
}

type ViewMode = 'list' | 'grid';

export const BlogView: React.FC<BlogViewProps> = ({
  initialPosts = [],
  initialTopics = [],
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Normalize server CMS posts
  const activePosts: BlogPostItem[] = useMemo(() => {
    return initialPosts.map(normalizePost);
  }, [initialPosts]);

  // Combine topics from database with distinct topics from published posts
  const topics: string[] = useMemo(() => {
    const set = new Set<string>();
    if (initialTopics && initialTopics.length > 0) {
      initialTopics.forEach((t) => {
        const name = typeof t === 'string' ? t : t.name;
        if (name && name.trim().length > 0) set.add(name.trim());
      });
    }
    activePosts.forEach((post) => {
      const t = post.topic || post.category;
      if (t && t.trim().length > 0) set.add(t.trim());
    });
    return ['All', ...Array.from(set)];
  }, [initialTopics, activePosts]);

  // Filter posts based on topic and live search query
  const filteredPosts = useMemo(() => {
    return activePosts.filter((post) => {
      const topicValue = post.topic || post.category;
      const matchesTopic =
        selectedTopic === 'All' ||
        (topicValue && topicValue.toLowerCase() === selectedTopic.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesTopic && matchesSearch;
    });
  }, [activePosts, selectedTopic, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
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

      {/* Main Container - Borderless & Minimal Padding */}
      <div className="flex flex-col gap-y-8 animate-fade-in animate-slide-up animation-delay-100">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border/60 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-theme-hover border border-card-border flex items-center justify-center shrink-0 text-theme-muted">
              <IconArticle size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-2xl text-theme-text tracking-tight">Blog Posts</h1>
              <p className="text-theme-muted text-xs md:text-sm mt-0.5">
                Articles, technical notes, and explorations
              </p>
            </div>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-64">
            <IconSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-subtle pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts or tags..."
              className="w-full pl-9 pr-8 py-2 rounded-lg text-xs border border-card-border text-theme-text placeholder:text-theme-subtle focus:border-theme-border-accent focus-visible:ring-1 focus-visible:ring-theme-border-accent outline-none transition-all duration-200"
              style={{
                background: `color-mix(in srgb, var(--theme-card-bg) 60%, transparent)`,
              }}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  hapticLight();
                  setSearchQuery('');
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-text p-1 rounded cursor-pointer transition-colors"
                aria-label="Clear search"
              >
                <IconX size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Controls Bar: Topics Filter (Left) & List/Grid View Toggle (Right) */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Dynamic Topic Filter Pills */}
          {topics.length > 1 ? (
            <MotionConfig transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}>
              <div
                className="flex flex-wrap items-center gap-1 p-1 rounded-xl border border-card-border w-fit"
                style={{ background: `color-mix(in srgb, var(--theme-card-bg) 40%, transparent)` }}
              >
                {topics.map((topic) => {
                  const isActive = selectedTopic === topic;
                  return (
                    <motion.button
                      layout
                      key={topic}
                      onClick={() => {
                        hapticSelection();
                        setSelectedTopic(topic);
                      }}
                      className="relative px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer outline-none select-none z-10"
                      style={{ color: isActive ? 'var(--theme-bg)' : 'var(--theme-text-muted)' }}
                      whileHover={!isActive ? { color: 'var(--theme-text)' } : undefined}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="blog-category-pill"
                          className="absolute inset-0 rounded-lg"
                          style={{ background: 'var(--theme-text)' }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10 font-semibold">{topic}</span>
                    </motion.button>
                  );
                })}
              </div>
            </MotionConfig>
          ) : (
            <div />
          )}

          {/* View Mode Toggle (List vs 3-Card Grid) */}
          <MotionConfig transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}>
            <div
              className="flex items-center gap-1 p-1 rounded-xl border border-card-border w-fit shrink-0 ml-auto"
              style={{ background: `color-mix(in srgb, var(--theme-card-bg) 40%, transparent)` }}
            >
              <motion.button
                layout
                onClick={() => {
                  hapticSelection();
                  setViewMode('list');
                }}
                className="relative p-1.5 rounded-lg cursor-pointer outline-none select-none z-10 flex items-center justify-center w-8 h-8"
                style={{ color: viewMode === 'list' ? 'var(--theme-bg)' : 'var(--theme-text-muted)' }}
                whileHover={viewMode !== 'list' ? { color: 'var(--theme-text)' } : undefined}
                whileTap={{ scale: 0.95 }}
                aria-label="List view"
                title="List view"
              >
                {viewMode === 'list' && (
                  <motion.div
                    layoutId="blog-view-toggle-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--theme-text)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <IconList size={16} className="relative z-10 shrink-0" />
              </motion.button>

              <motion.button
                layout
                onClick={() => {
                  hapticSelection();
                  setViewMode('grid');
                }}
                className="relative p-1.5 rounded-lg cursor-pointer outline-none select-none z-10 flex items-center justify-center w-8 h-8"
                style={{ color: viewMode === 'grid' ? 'var(--theme-bg)' : 'var(--theme-text-muted)' }}
                whileHover={viewMode !== 'grid' ? { color: 'var(--theme-text)' } : undefined}
                whileTap={{ scale: 0.95 }}
                aria-label="Grid view"
                title="Grid view"
              >
                {viewMode === 'grid' && (
                  <motion.div
                    layoutId="blog-view-toggle-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--theme-text)' }}
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <IconLayoutGrid size={16} className="relative z-10 shrink-0" />
              </motion.button>
            </div>
          </MotionConfig>
        </div>

        {/* Posts List / Grid */}
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'
              : 'flex flex-col gap-10'
          }
        >
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              prefetch={true}
              onClick={hapticLight}
              className="block outline-none focus-visible:ring-1 focus-visible:ring-theme-border-accent rounded-2xl group"
            >
              {viewMode === 'list' ? (
                /* List View: Borderless, Zero Padding, Emil-style Spacing */
                <article className="flex flex-col sm:flex-row items-stretch gap-6 group cursor-pointer transition-all duration-200">
                  {/* Left Side: Article Preview Image */}
                  <div className="w-full sm:w-52 md:w-60 lg:w-64 shrink-0 aspect-[16/10] rounded-2xl overflow-hidden bg-theme-hover relative">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-theme-hover text-theme-subtle">
                        <IconArticle size={24} className="opacity-40" />
                      </div>
                    )}
                  </div>

                  {/* Right Side: Article Details */}
                  <div className="flex flex-col justify-between flex-grow min-w-0 py-0.5">
                    <div>
                      {/* Date */}
                      <div className="text-xs text-theme-subtle font-mono tracking-normal mb-1.5">
                        {formatBlogDate(post.publishedDate)}
                      </div>

                      {/* Title */}
                      <h2 className="font-sans font-bold text-lg md:text-xl leading-snug tracking-tight text-theme-text group-hover:text-theme-hover-text transition-colors duration-200 mb-2">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-theme-muted text-xs md:text-sm leading-relaxed line-clamp-2 mb-2.5">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Read · X min */}
                      <div className="text-xs text-theme-subtle/80 font-mono flex items-center gap-1.5">
                        <span>Read</span>
                        <span className="opacity-40">·</span>
                        <span>{post.readingTime ? `${post.readingTime} min` : '5 min'}</span>
                      </div>
                    </div>

                    {/* Scrollable Hidden Scrollbar Tags - Exact Original Pill Styling */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-3.5 min-w-0">
                        <div
                          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-nowrap min-w-0 max-w-full"
                          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                          {post.tags.map((tag, idx) => (
                            <div key={idx} className="tag shrink-0">
                              <p>{tag}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ) : (
                /* Grid View: Borderless, Zero Padding, Emil-style Spacing Hierarchy (Matches Reference Image) */
                <article className="flex flex-col justify-between h-full group cursor-pointer transition-all duration-200">
                  <div>
                    {/* Top: Image with rounded corners (rounded-2xl) */}
                    <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-theme-hover relative mb-3.5">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.025]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-theme-hover text-theme-subtle">
                          <IconArticle size={24} className="opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Date: Aug 2026 */}
                    <div className="text-xs text-theme-subtle font-mono tracking-normal mb-1.5">
                      {formatBlogDate(post.publishedDate)}
                    </div>

                    {/* Title: Bold Sans-serif with tight line height */}
                    <h2 className="font-sans font-bold text-[17px] md:text-[18px] leading-[1.3] tracking-tight text-theme-text group-hover:text-theme-hover-text transition-colors duration-200 line-clamp-2 mb-2.5">
                      {post.title}
                    </h2>

                    {/* Read · X min */}
                    <div className="text-xs text-theme-subtle/80 font-mono flex items-center gap-1.5">
                      <span>Read</span>
                      <span className="opacity-40">·</span>
                      <span>{post.readingTime ? `${post.readingTime} min` : '5 min'}</span>
                    </div>
                  </div>

                  {/* Scrollable Hidden Scrollbar Tags - Exact Original Pill Styling */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3.5 min-w-0">
                      <div
                        className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 flex-nowrap min-w-0 max-w-full"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {post.tags.map((tag, idx) => (
                          <div key={idx} className="tag shrink-0">
                            <p>{tag}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              )}
            </Link>
          ))}
        </div>

        {/* Empty state when no posts exist or match filter */}
        {filteredPosts.length === 0 && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <IconSparkles size={28} className="text-theme-subtle mb-3" />
            <p className="text-theme-text font-medium text-sm">
              {searchQuery || selectedTopic !== 'All' ? 'No articles found' : 'No articles published yet'}
            </p>
            <p className="text-theme-muted text-xs mt-1">
              {searchQuery || selectedTopic !== 'All'
                ? 'Try adjusting your search terms or selecting another topic.'
                : 'Check back soon for new articles and engineering notes.'}
            </p>
            {(searchQuery || selectedTopic !== 'All') && (
              <button
                onClick={() => {
                  hapticLight();
                  setSelectedTopic('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-3.5 py-1.5 rounded-lg border border-card-border text-xs font-medium text-theme-muted hover:text-theme-text hover:bg-theme-hover transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
