import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { HomeView } from '@/src/components/HomeView';
import type { Post } from '@/payload-types';

export default async function Page() {
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
      limit: 2,
    });
    posts = docs;
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  return <HomeView initialPosts={posts} />;
}
