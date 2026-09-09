// src/data/assets.ts
export const ASSETS = {
    profile: {
        avatar: 'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-...png',
        textDark: 'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-text-...jpg',
        textLight: 'https://<your-hash>.public.blob.vercel-storage.com/ram-guinto-text-light-...jpg',
    },
    projects: {
        domodomo: 'https://<your-hash>.public.blob.vercel-storage.com/domodomo_preview-...png',
        idolChant: 'https://<your-hash>.public.blob.vercel-storage.com/idol_chant_preview-...png',
        koncentrate: 'https://<your-hash>.public.blob.vercel-storage.com/koncentrate_preview-...png',
    },
    pubmats: {
        quizBee: 'https://<your-hash>.public.blob.vercel-storage.com/BSIT_Quiz_Bee-...png',
        edsa: 'https://<your-hash>.public.blob.vercel-storage.com/EDSA-...jpg',
    },
} as const;
