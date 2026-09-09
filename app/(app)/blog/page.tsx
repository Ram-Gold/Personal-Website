import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { BlogView } from '@/src/components/BlogView';
import type { Post, Topic } from '@/payload-types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Blog Posts | Ram Guinto',
  description: 'Articles, technical notes, and explorations by Ram Guinto — Front-End Developer and AI Engineering Associate.',
};

export default async function BlogPage() {
  let posts: Post[] = [];
  let topics: Topic[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const [postsResult, topicsResult] = await Promise.all([
      payload.find({
        collection: 'posts',
        where: {
          status: {
            equals: 'published',
          },
        },
        depth: 2,
        sort: '-publishedDate',
      }),
      payload.find({
        collection: 'topics',
        sort: 'name',
        limit: 100,
      }),
    ]);
    posts = postsResult.docs;
    topics = topicsResult.docs;
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  return <BlogView initialPosts={posts} initialTopics={topics} />;
}

