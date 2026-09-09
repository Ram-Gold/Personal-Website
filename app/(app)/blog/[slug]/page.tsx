import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Metadata } from 'next';
import type { Post, Media } from '@/payload-types';
import NotFound from '@/app/(app)/not-found';
import { BlogPostContent } from './BlogPostContent';

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
      depth: 2,
    });
    if (docs[0]) return docs[0];
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  return null;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);
  if (!post) return { title: 'Post Not Found' };

  const coverUrl =
    post.coverImage && typeof post.coverImage !== 'number'
      ? (post.coverImage as Media).url ?? undefined
      : post.imageUrl ?? undefined;

  return {
    title: `${post.title} | Ram Guinto`,
    description: post.excerpt ?? `Blog post by Ram Guinto — ${post.title}`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedDate ?? undefined,
      images: coverUrl ? [{ url: coverUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? undefined,
      images: coverUrl ? [coverUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Args) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    return <NotFound />;
  }

  return <BlogPostContent post={post} />;
}
