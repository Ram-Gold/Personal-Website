'use client';

import React from 'react';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';
import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react';
import {
  IconArrowLeft,
  IconCalendar,
  IconClock,
  IconCopy,
  IconCheck,
  IconHome,
} from '@tabler/icons-react';
import { hapticLight } from '@/src/utils/haptics';
import { formatBlogDate } from '@/src/data/blogPosts';
import type { Post, Media } from '@/payload-types';

/* ─── Prism.js Syntax Highlighting ─── */
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';

/* ─── Code Block with Copy + Syntax Highlighting ─── */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false);
  const lang = language || 'text';

  const highlighted = React.useMemo(() => {
    const grammar = Prism.languages[lang];
    if (grammar) {
      return Prism.highlight(code, grammar, lang);
    }
    return code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }, [code, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      hapticLight();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silent fail */
    }
  };

  return (
    <div className="blog-code-block group">
      <div className="blog-code-header">
        <span className="blog-code-lang">{lang}</span>
        <button
          onClick={handleCopy}
          className="blog-code-copy"
          aria-label={copied ? "Code copied to clipboard" : `Copy ${lang} code to clipboard`}
        >
          {copied ? (
            <>
              <IconCheck size={13} aria-hidden="true" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <IconCopy size={13} aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
        <span className="sr-only" role="status" aria-live="polite">
          {copied ? "Code copied to clipboard" : ""}
        </span>
      </div>
      <pre className="blog-code-pre">
        <code
          className={`language-${lang}`}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}

/* ─── Extract text content from Lexical children ─── */
function extractText(children: any[]): string {
  if (!Array.isArray(children)) return '';
  return children
    .map((child) => {
      if (child.type === 'text') return child.text || '';
      if (child.type === 'linebreak') return '\n';
      if (child.type === 'tab') return '\t';
      if (child.children) return extractText(child.children);
      return '';
    })
    .join('');
}

/* ─── Custom JSX Converters for Styled Rich Text ─── */
const blogConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,

  heading: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });

    const Tag = node.tag as 'h2' | 'h3' | 'h4';
    const classMap: Record<string, string> = {
      h2: 'blog-h2',
      h3: 'blog-h3',
      h4: 'blog-h4',
    };

    return <Tag className={classMap[node.tag] || 'blog-h2'}>{children}</Tag>;
  },

  paragraph: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });

    // Check if paragraph only contains whitespace/empty
    const textContent = extractText(node.children);
    if (!textContent.trim()) {
      return <div className="blog-spacer" />;
    }

    // Check if this paragraph contains a single code block (Lexical stores code as paragraph with code formatting)
    const isCodeBlock =
      node.children?.length > 0 &&
      node.children.every(
        (child: any) =>
          (child.type === 'text' && child.format === 16) ||
          child.type === 'linebreak' ||
          child.type === 'tab'
      ) &&
      node.children.some(
        (child: any) => child.type === 'text' && child.format === 16
      );

    if (isCodeBlock) {
      const codeText = extractText(node.children);
      return <CodeBlock code={codeText} language="text" />;
    }

    return <p className="blog-p">{children}</p>;
  },

  quote: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });
    return <blockquote className="blog-blockquote">{children}</blockquote>;
  },

  list: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });
    if (node.listType === 'number') {
      return <ol className="blog-ol">{children}</ol>;
    }
    if (node.listType === 'check') {
      return <ul className="blog-checklist">{children}</ul>;
    }
    return <ul className="blog-ul">{children}</ul>;
  },

  listitem: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });
    return <li className="blog-li">{children}</li>;
  },

  upload: ({ node }) => {
    const upload = node as any;
    const value = upload.value;
    if (!value || typeof value === 'number' || typeof value === 'string') {
      return null;
    }

    const media = value as Media;
    const isImage = media.mimeType?.startsWith('image/');

    if (!isImage || !media.url) return null;

    return (
      <figure className="blog-figure">
        <img
          src={media.url}
          alt={media.alt || 'Blog image'}
          width={media.width ?? undefined}
          height={media.height ?? undefined}
          className="blog-img"
          loading="lazy"
        />
        {media.caption && (
          <figcaption className="blog-figcaption">{media.caption}</figcaption>
        )}
      </figure>
    );
  },

  link: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });

    const fields = node.fields;
    const url = fields?.url || '#';
    const newTab = fields?.newTab;

    return (
      <a
        href={url}
        className="blog-link"
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  },

  autolink: ({ node, nodesToJSX, converters }) => {
    const children = nodesToJSX({
      nodes: node.children,
      converters,
    });

    const fields = node.fields;
    const url = fields?.url || '#';

    return (
      <a href={url} className="blog-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },

  horizontalrule: () => {
    return <hr className="blog-hr" />;
  },

  blocks: {
    Code: ({ node }: any) => {
      const code = node.fields?.code || '';
      const language = node.fields?.language || 'text';
      return <CodeBlock code={code} language={language} />;
    },
  },
});

/* ─── Main Blog Post Content Component ─── */
export function BlogPostContent({ post }: { post: Post }) {
  const coverImage =
    post.coverImage && typeof post.coverImage !== 'number'
      ? (post.coverImage as Media)
      : null;
  const rawCoverUrl = coverImage?.url;
  const bannerUrl =
    (rawCoverUrl && !rawCoverUrl.startsWith('/api/media/file/') ? rawCoverUrl : null) ||
    post.imageUrl ||
    rawCoverUrl ||
    null;
  const bannerAlt = coverImage?.alt || post.title;

  const topicName =
    (post.topic && typeof post.topic === 'object' && 'name' in post.topic ? (post.topic as any).name : null) ||
    (typeof post.topic === 'string' ? post.topic : null) ||
    post.category ||
    null;

  const tags = (post.tags ?? [])
    .map((t) => (typeof t === 'string' ? t : (t as any)?.tag))
    .filter((t): t is string => Boolean(t?.trim()));

  return (
    <main id="main-content" className="max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back navigation */}
      <Link
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-8 hover:text-theme-text transition-colors focus-visible:ring-1 focus-visible:ring-theme-border-accent outline-none rounded p-1 cursor-pointer group/back"
        href="/blog"
        prefetch={true}
        onClick={hapticLight}
      >
        <IconArrowLeft
          size={16}
          className="text-theme-muted group-hover/back:text-theme-text transition-colors"
        />
        Back to Blog
      </Link>

      {/* Article */}
      <article className="animate-slide-up animation-delay-100">
        {/* Header */}
        <header className="mb-10">
          {/* Category / Topic */}
          {topicName && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-theme-subtle mb-3 block">
              {topicName}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-theme-text tracking-tight leading-tight mb-4">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-theme-muted text-base md:text-lg leading-relaxed mb-5">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-theme-subtle font-mono">
            {post.publishedDate && (
              <span className="inline-flex items-center gap-1.5">
                <IconCalendar size={13} className="text-theme-subtle" />
                <time>{formatBlogDate(post.publishedDate)}</time>
              </span>
            )}
            {post.readingTime && (
              <span className="inline-flex items-center gap-1.5">
                <IconClock size={13} className="text-theme-subtle" />
                {post.readingTime} min read
              </span>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag, idx) => (
                <div key={idx} className="tag">
                  <p>{tag}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Cover image */}
        {bannerUrl && (
          <div className="mb-10 rounded-xl overflow-hidden border border-card-border">
            <img
              src={bannerUrl}
              alt={bannerAlt}
              className="w-full object-cover max-h-[500px]"
            />
          </div>
        )}

        {/* Divider before content */}
        <hr className="blog-hr mb-10" />

        {/* Rich text content */}
        <div className="blog-content">
          <RichText
            data={post.content as any}
            converters={blogConverters}
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-card-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            className="inline-flex items-center gap-1.5 text-theme-muted hover:text-theme-text transition-colors cursor-pointer group/back"
            href="/blog"
            onClick={hapticLight}
          >
            <IconArrowLeft
              size={16}
              className="text-theme-muted group-hover/back:text-theme-text transition-colors"
            />
            Back to all posts
          </Link>
          <span className="text-theme-subtle/50 text-xs hidden sm:inline">&bull;</span>
          <Link
            className="inline-flex items-center gap-1.5 text-theme-muted hover:text-theme-text transition-colors cursor-pointer group/home"
            href="/"
            onClick={hapticLight}
          >
            <IconHome
              size={16}
              className="text-theme-muted group-hover/home:text-theme-text transition-colors"
            />
            Back to site
          </Link>
        </div>
        <p className="text-xs text-theme-subtle">
          &copy; 2026 Ram Guinto.
        </p>
      </footer>
    </main>
  );
}
