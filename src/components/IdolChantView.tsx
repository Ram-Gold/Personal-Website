import React from 'react';
import { IconArrowLeft, IconExternalLink, IconCode, IconInfoCircle } from '@tabler/icons-react';

interface IdolChantViewProps {
  onBack: () => void;
}

export const IdolChantView: React.FC<IdolChantViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a 
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 mb-6 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
        href="index.html"
      >
        <IconArrowLeft size={16} className="text-neutral-400 group-hover/back:text-white transition-colors" />
        Back to Home
      </a>

      <div className="card p-6 md:p-8 flex flex-col gap-y-6 animate-fade-in animate-slide-up animation-delay-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-bold text-2xl text-white">Idol Chant & Mixes</h1>
              <p className="text-neutral-400 text-sm mt-1">A centralized hub for wotagei culture</p>
            </div>
          </div>
          <a 
            href="https://idol-mixes.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-card-border bg-card-bg hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded-lg transition-all text-sm font-semibold text-white w-full md:w-auto cursor-pointer group/livesite"
          >
            <span>Visit Live Site</span> <IconExternalLink size={16} className="text-neutral-400 group-hover/livesite:text-pink-400 transition-colors" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          {/* Preview Section */}
          <div className="w-full group animate-fade-in animate-slide-up animation-delay-200">
            <div className="w-full rounded-xl overflow-hidden border border-card-border bg-card-bg relative shadow-2xl transition-transform duration-500 hover:-translate-y-1">
              <img 
                src="assets/images/idol_chant_preview.png" 
                alt="Idol Chant Finder Preview"
                className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
              />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-300">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2 group/tech">
              <IconCode size={18} className="text-neutral-500 group-hover/tech:text-pink-500 transition-colors" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="tag">
                <p>Next.js</p>
              </div>
              <div className="tag">
                <p>React</p>
              </div>
              <div className="tag">
                <p>Tailwind CSS</p>
              </div>
              <div className="tag">
                <p>Vercel</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-400">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2 group/info">
              <IconInfoCircle size={18} className="text-neutral-500 group-hover/info:text-pink-500 transition-colors" />
              About the Project
            </h2>
            <p className="text-neutral-400 leading-relaxed text-sm max-w-4xl">
              Inspired by wotagei, this website solves the problem of finding and organizing chants, which I
              and others in the community have historically struggled with. It provides a centralized,
              easy-to-use platform for learning wotagei calls and mixes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
