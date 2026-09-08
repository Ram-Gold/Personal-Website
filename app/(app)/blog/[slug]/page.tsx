import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { RichText } from '@payloadcms/richtext-lexical/react';

type Args = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPostPage({ params }: Args) {
  const resolvedParams = await params;
  let post: any = null;
  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: resolvedParams.slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    });
    post = docs[0];
  } catch (err) {
    console.warn('Database connection skipped during build:', err instanceof Error ? err.message : err);
  }

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8">
        <Link href="/blog" className="text-theme-muted hover:text-theme-text transition-colors">
          ← Back to Blog
        </Link>
      </div>
      <article>
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4 text-theme-text">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-theme-subtle font-mono">
            {post.publishedDate && <time>{new Date(post.publishedDate).toLocaleDateString()}</time>}
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
        </header>
        {post.coverImage && typeof post.coverImage !== 'string' && (
          <div className="mb-10">
            <img 
              src={post.coverImage.url!} 
              alt={post.coverImage.alt || post.title} 
              className="rounded-xl w-full object-cover max-h-[500px]"
            />
          </div>
        )}
        <div className="prose prose-invert prose-pink max-w-none text-theme-text">
          <RichText data={post.content as any} />
        </div>
      </article>
    </main>
  );
}
