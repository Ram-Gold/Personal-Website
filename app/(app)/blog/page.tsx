import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { BlogView } from '@/src/components/BlogView';
import type { Post } from '@/payload-types';

export const metadata: Metadata = {
  title: 'Blog Posts | Ram Guinto',
  description: 'Articles, technical notes, and explorations by Ram Guinto — Front-End Developer and AI Engineering Associate.',
};

export default async function BlogPage() {
  let posts: Post[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      depth: 2,
      sort: '-publishedDate',
    });
    posts = docs;
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  return <BlogView initialPosts={posts} />;
}

