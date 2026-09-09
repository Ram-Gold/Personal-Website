import type { Post } from '@/payload-types';

export interface BlogPostItem {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  topic?: string | null;
  category?: string | null;
  publishedDate?: string | null;
  readingTime?: number | null;
  tags: string[];
  imageUrl?: string | null;
}

/**
 * Normalizes a Payload CMS `Post` or post item into a unified `BlogPostItem`.
 */
export function normalizePost(post: Post | BlogPostItem): BlogPostItem {
  const rawTags = post.tags;
  let normalizedTags: string[] = [];

  if (Array.isArray(rawTags)) {
    normalizedTags = (rawTags as any[])
      .map((t) => (typeof t === 'string' ? t : t?.tag))
      .filter((t): t is string => Boolean(t && t.trim().length > 0));
  }

  let resolvedImageUrl: string | null = null;

  // 1. Prefer uploaded coverImage from Payload CMS / Vercel Blob
  if ('coverImage' in post && post.coverImage && typeof post.coverImage === 'object') {
    const coverUrl = (post.coverImage as { url?: string | null }).url;
    // Prefer remote / Vercel Blob URLs or valid local paths
    if (coverUrl && !coverUrl.startsWith('/api/media/file/')) {
      resolvedImageUrl = coverUrl;
    } else if (coverUrl && (!('imageUrl' in post) || !post.imageUrl)) {
      resolvedImageUrl = coverUrl;
    }
  }

  // 2. Fallback to manual imageUrl / local asset path (e.g. /assets/images/blog/...)
  if (!resolvedImageUrl && 'imageUrl' in post && post.imageUrl) {
    resolvedImageUrl = post.imageUrl;
  }

  // 3. Last fallback to coverImage URL if available
  if (!resolvedImageUrl && 'coverImage' in post && post.coverImage && typeof post.coverImage === 'object') {
    resolvedImageUrl = (post.coverImage as { url?: string | null }).url || null;
  }

  // Resolve topic display name (handles populated Topic object, string, or fallback category)
  let topicName: string | null = null;
  if ('topic' in post && post.topic) {
    if (typeof post.topic === 'object' && post.topic !== null && 'name' in post.topic) {
      topicName = post.topic.name;
    } else if (typeof post.topic === 'string') {
      topicName = post.topic;
    }
  }

  const primaryCategory = topicName || post.category || (normalizedTags[0] ?? 'General');

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || null,
    topic: topicName || primaryCategory,
    category: primaryCategory,
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
