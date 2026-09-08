"use client";
import React from 'react';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface PubmatsViewProps {
  onBack?: () => void;
}

export const PubmatsView: React.FC<PubmatsViewProps> = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-6 hover:text-theme-text transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back"
        href="/"
        prefetch={true}
        onClick={hapticLight}
      >
        <IconArrowLeft size={16} className="text-theme-muted group-hover/back:text-theme-text transition-colors" /> Back to Home
      </Link>

      <div className="mb-4">
        <h1 className="font-bold text-2xl text-theme-text">Pubmats</h1>
        <p className="text-theme-muted text-sm mt-1">Graphic design and promotional event materials</p>
      </div>

      {/* Grouped into a responsive grid layout aligned to the system design rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div className="card p-5 flex flex-col items-center text-center space-y-4 group animate-fade-in animate-slide-up animation-delay-100">
          <h2 className="font-semibold text-theme-text">BSIT Quiz Bee</h2>
          <div className="rounded-2xl overflow-hidden border border-card-border max-w-md w-full aspect-square"
            style={{ background: `var(--theme-pubmat-bg)` }}
          >
            <img className="w-full h-full object-cover" src="/assets/images/BSIT_Quiz_Bee.png" alt="BSIT Quiz Bee Flyer designed by Ram Guinto" />
          </div>
        </div>
        <div className="card p-5 flex flex-col items-center text-center space-y-4 group animate-fade-in animate-slide-up animation-delay-200">
          <h2 className="font-semibold text-theme-text">EDSA Revolution Anniv.</h2>
          <div className="rounded-2xl overflow-hidden border border-card-border max-w-md w-full aspect-square"
            style={{ background: `var(--theme-pubmat-bg)` }}
          >
            <img className="w-full h-full object-cover" src="/assets/images/EDSA.jpg" alt="EDSA Revolution Commemorative flyer designed by Ram Guinto" />
          </div>
        </div>
      </div>
    </div>
  );
};
