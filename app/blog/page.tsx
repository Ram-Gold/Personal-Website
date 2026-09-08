import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedDate',
    });
    posts = docs;
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="text-theme-muted hover:text-theme-text transition-colors">
          ← Back
        </Link>
        <h1 className="text-3xl font-bold text-theme-text">Blog</h1>
      </div>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
            <article className="card p-6 border border-card-border hover:bg-theme-hover transition-colors rounded-xl">
              <h2 className="text-xl font-semibold mb-2 group-hover:text-pink-500 transition-colors text-theme-text">
                {post.title}
              </h2>
              {post.excerpt && <p className="text-theme-muted mb-4 text-sm leading-relaxed">{post.excerpt}</p>}
              <div className="text-xs text-theme-subtle font-mono">
                {post.publishedDate && new Date(post.publishedDate).toLocaleDateString()}
                {post.readingTime && ` • ${post.readingTime} min read`}
              </div>
            </article>
          </Link>
        ))}
        {posts.length === 0 && <p className="text-theme-muted">No posts found.</p>}
      </div>
    </main>
  );
}
