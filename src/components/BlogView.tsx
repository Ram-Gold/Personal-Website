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
} from '@tabler/icons-react';
import { hapticLight, hapticSelection } from '../utils/haptics';
import {
  BlogPostItem,
  normalizePost,
  formatBlogDate,
} from '../data/blogPosts';
import type { Post } from '@/payload-types';

interface BlogViewProps {
  initialPosts?: (Post | BlogPostItem)[];
}

export const BlogView: React.FC<BlogViewProps> = ({ initialPosts = [] }) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Normalize server CMS posts
  const activePosts: BlogPostItem[] = useMemo(() => {
    return initialPosts.map(normalizePost);
  }, [initialPosts]);

  // Extract distinct topics dynamically from published posts
  const topics: string[] = useMemo(() => {
    const set = new Set<string>();
    activePosts.forEach((post) => {
      const t = post.topic || post.category;
      if (t) set.add(t);
    });
    return ['All', ...Array.from(set)];
  }, [activePosts]);

  // Filter posts based on topic and live search query
  const filteredPosts = useMemo(() => {
    return activePosts.filter((post) => {
      const topicValue = post.topic || post.category;
      const matchesTopic =
        selectedTopic === 'All' || topicValue === selectedTopic;

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

      {/* Main Card Container */}
      <div className="card p-6 md:p-8 flex flex-col gap-y-6 animate-fade-in animate-slide-up animation-delay-100">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-6">
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

        {/* Dynamic Topic Filter Pills */}
        {topics.length > 1 && (
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
        )}

        {/* Posts List */}
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              prefetch={true}
              onClick={hapticLight}
              className="block outline-none focus-visible:ring-1 focus-visible:ring-theme-border-accent rounded-xl"
            >
              <article
                className="project-card flex flex-col sm:flex-row items-stretch gap-4 md:gap-5 focus-visible:ring-1 focus-visible:ring-theme-border-accent outline-none group cursor-pointer !mb-0 !p-4 md:!p-5 active:scale-[0.99] transition-all duration-200"
              >
                {/* Left Side: Article Preview Image */}
                <div className="w-full sm:w-44 md:w-48 lg:w-52 shrink-0 aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden border border-card-border relative bg-theme-hover flex items-center justify-center p-0.5">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover rounded-[6px] transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-theme-hover text-theme-subtle">
                      <IconArticle size={24} className="opacity-40" />
                    </div>
                  )}
                </div>

                {/* Right Side: Article Details */}
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between mb-1.5 gap-2">
                      <span className="text-[11px] font-mono text-theme-subtle uppercase tracking-wider">
                        {post.topic || post.category || 'Article'}
                      </span>
                      <span className="text-theme-subtle text-[11px] font-mono shrink-0">
                        {formatBlogDate(post.publishedDate)}
                        {post.readingTime ? ` • ${post.readingTime} min read` : ''}
                      </span>
                    </div>

                    <h2 className="text-theme-text font-semibold text-base leading-snug group-hover:text-theme-hover-text transition-colors duration-200 mb-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-theme-muted text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-card-border/60 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag, idx) => (
                        <div key={idx} className="tag">
                          <p>{tag}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
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
