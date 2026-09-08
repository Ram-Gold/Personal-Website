import type { Post } from '@/payload-types';

export interface BlogPostItem {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  category?: string | null;
  publishedDate?: string | null;
  readingTime?: number | null;
  tags: string[];
  imageUrl?: string | null;
  isComingSoon?: boolean;
}

export const INITIAL_BLOG_POSTS: BlogPostItem[] = [
  {
    id: 'exploring-agentic-ai-mcp',
    title: 'Exploring Agentic AI & Model Context Protocol (MCP)',
    slug: 'exploring-agentic-ai-mcp',
    excerpt: 'A deep dive into building modular AI tools, serverless architectures, and reactive LLM integrations with MCP servers.',
    category: 'AI Engineering',
    publishedDate: '2026-09-01',
    readingTime: 4,
    tags: ['AI Engineering', 'MCP', 'Claude', 'Agentic'],
    imageUrl: '/assets/images/domodomo_preview.png',
  },
  {
    id: 'from-react-to-intelligent-interfaces',
    title: 'From Static Components to Intelligent Interfaces',
    slug: 'from-react-to-intelligent-interfaces',
    excerpt: 'Practical lessons learned transitioning standard React interfaces into responsive, AI-assisted frontend workflows.',
    category: 'Front-End',
    publishedDate: '2026-08-18',
    readingTime: 5,
    tags: ['React', 'Next.js', 'Tailwind CSS', 'UX'],
    imageUrl: '/assets/images/certifications/claude_in_action.jpg',
  },
  {
    id: 'building-koncentrate-kde-widget',
    title: 'Building Koncentrate: A Custom KDE Plasma Desktop Widget',
    slug: 'building-koncentrate-kde-widget',
    excerpt: 'Designing a lightweight desktop widget for focus and productivity on Linux with minimal resource footprint.',
    category: 'Systems & Tools',
    publishedDate: '2026-07-25',
    readingTime: 6,
    tags: ['Linux', 'KDE', 'Widget', 'Open Source'],
    imageUrl: '/assets/images/koncentrate_preview.png',
  },
  {
    id: 'wotagei-culture-meets-modern-web',
    title: 'Wotagei Culture Meets Modern Web Development',
    slug: 'wotagei-culture-meets-modern-web',
    excerpt: 'How creating Idol Chant & Mixes solved the challenge of discoverability and chant preservation in the idol fandom.',
    category: 'Projects',
    publishedDate: '2026-06-12',
    readingTime: 3,
    tags: ['Website', 'React', 'Community'],
    imageUrl: '/assets/images/idol_chant_preview.png',
  },
];

export const COMING_SOON_POSTS: BlogPostItem[] = [
  {
    id: 'benchmarking-local-llms-ollama',
    title: 'Benchmarking Local LLMs with Ollama & OpenRouter',
    slug: 'benchmarking-local-llms-ollama',
    excerpt: 'Comparing latency, reasoning capabilities, and token throughput across quantized models on personal hardware.',
    category: 'AI Engineering',
    publishedDate: null,
    readingTime: null,
    tags: ['Ollama', 'Local LLM', 'AI'],
    imageUrl: null,
    isComingSoon: true,
  },
  {
    id: 'fullstack-devtools-automation',
    title: 'Automated Frontend Auditing via Chrome DevTools Protocol',
    slug: 'fullstack-devtools-automation',
    excerpt: 'Leveraging modern browser protocols for continuous accessibility, memory leak detection, and Core Web Vitals checks.',
    category: 'Front-End',
    publishedDate: null,
    readingTime: null,
    tags: ['DevTools', 'Performance', 'A11y'],
    imageUrl: null,
    isComingSoon: true,
  },
];

/**
 * Normalizes a Payload CMS `Post` or fallback post item into a unified `BlogPostItem`.
 */
export function normalizePost(post: Post | BlogPostItem): BlogPostItem {
  if ('isComingSoon' in post && post.isComingSoon) {
    return post as BlogPostItem;
  }

  const rawTags = post.tags;
  let normalizedTags: string[] = [];

  if (Array.isArray(rawTags)) {
    normalizedTags = rawTags
      .map((t) => (typeof t === 'string' ? t : t?.tag))
      .filter((t): t is string => Boolean(t && t.trim().length > 0));
  }

  let resolvedImageUrl: string | null = null;
  if ('imageUrl' in post && post.imageUrl) {
    resolvedImageUrl = post.imageUrl;
  } else if ('coverImage' in post && post.coverImage) {
    if (typeof post.coverImage === 'object' && post.coverImage !== null && 'url' in post.coverImage) {
      resolvedImageUrl = (post.coverImage as { url?: string | null }).url || null;
    }
  }

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || null,
    category: post.category || (normalizedTags[0] ?? 'General'),
    publishedDate: post.publishedDate || null,
    readingTime: post.readingTime || null,
    tags: normalizedTags,
    imageUrl: resolvedImageUrl,
  };
}

/**
 * Formats published date string into human-readable format (e.g. "Sept 2026" or "2026").
 */
export function formatBlogDate(dateStr?: string | null): string {
  if (!dateStr) return '2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
