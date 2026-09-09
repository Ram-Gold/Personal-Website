// src/data/assets.ts

// Helper to safely use Vercel Blob URLs when configured, falling back to local paths
function getAsset(blobUrl: string, localPath: string): string {
  if (!blobUrl || blobUrl.includes('<') || blobUrl.includes('...')) {
    return localPath;
  }
  return blobUrl;
}

export const ASSETS = {
  profile: {
    avatar: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-...png',
      '/assets/images/ram-guinto.png'
    ),
    textDark: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-text-...jpg',
      '/assets/images/ram-guinto-text.jpg'
    ),
    textLight: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-text-light-...jpg',
      '/assets/images/ram-guinto-text-light.jpg'
    ),
  },
  projects: {
    domodomo: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/domodomo_preview-...png',
      '/assets/images/domodomo_preview.png'
    ),
    idolChant: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/idol_chant_preview-...png',
      '/assets/images/idol_chant_preview.png'
    ),
    koncentrate: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/koncentrate_preview-...png',
      '/assets/images/koncentrate_preview.png'
    ),
  },
  pubmats: {
    quizBee: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/BSIT_Quiz_Bee-...png',
      '/assets/images/BSIT_Quiz_Bee.png'
    ),
    edsa: getAsset(
      'https://<your-hash>.public.blob.vercel-storage.com/EDSA-...jpg',
      '/assets/images/EDSA.jpg'
    ),
  },
} as const;
