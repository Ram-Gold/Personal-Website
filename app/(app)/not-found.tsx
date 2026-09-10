import Link from 'next/link';
import { IconArrowLeft, IconArticleOff } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="card p-8 md:p-12 flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-theme-hover border border-card-border flex items-center justify-center text-theme-muted mb-2">
          <IconArticleOff size={28} />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-theme-subtle">
          404 &bull; Page Not Found
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-theme-text tracking-tight">
          This post doesn&apos;t exist
        </h1>
        <p className="text-theme-muted text-sm md:text-base max-w-md">
          The blog post you&apos;re looking for couldn&apos;t be found or hasn&apos;t been published yet.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-theme-hover border border-card-border text-sm font-medium text-theme-text hover:border-theme-border-accent transition-colors"
        >
          <IconArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
