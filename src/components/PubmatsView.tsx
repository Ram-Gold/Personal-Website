import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

interface PubmatsViewProps {
  onBack: () => void;
}

export const PubmatsView: React.FC<PubmatsViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 mb-6 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back"
        href="index.html"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <IconArrowLeft size={16} className="text-neutral-400 group-hover/back:text-white transition-colors" /> Back to Home
      </a>

      {/* Grouped into a responsive grid layout aligned to the system design rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        <div className="card p-5 flex flex-col items-center text-center space-y-4 group animate-fade-in animate-slide-up animation-delay-100">
          <p className="font-semibold text-white">BSIT Quiz Bee</p>
          <div className="rounded-2xl overflow-hidden border border-card-border bg-[#111] max-w-md w-full aspect-square">
            <img className="w-full h-full object-cover" src="assets/images/BSIT_Quiz_Bee.png" alt="Quiz Bee Flyer" />
          </div>
        </div>
        <div className="card p-5 flex flex-col items-center text-center space-y-4 group animate-fade-in animate-slide-up animation-delay-200">
          <p className="font-semibold text-white">EDSA Revolution Anniv.</p>
          <div className="rounded-2xl overflow-hidden border border-card-border bg-[#111] max-w-md w-full aspect-square">
            <img className="w-full h-full object-cover" src="assets/images/EDSA.jpg" alt="EDSA Revolution Commemorative flyer" />
          </div>
        </div>
      </div>
    </div>
  );
};
