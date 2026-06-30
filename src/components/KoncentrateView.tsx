import React from 'react';
import { IconArrowLeft, IconExternalLink, IconCode, IconInfoCircle } from '@tabler/icons-react';

interface KoncentrateViewProps {
  onBack: () => void;
}

export const KoncentrateView: React.FC<KoncentrateViewProps> = ({ onBack }) => {
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
              <h1 className="font-bold text-2xl text-white">Koncentrate</h1>
              <p className="text-neutral-400 text-sm mt-1">A KDE Plasma 6 Pomodoro timer with a built-in To-Do List</p>
            </div>
          </div>
          <a 
            href="https://github.com/Ram-Gold/koncentrate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-card-border bg-card-bg hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded-lg transition-all text-sm font-semibold text-white w-full md:w-auto cursor-pointer group/livesite"
          >
            <span>View on GitHub</span> <IconExternalLink size={16} className="text-neutral-400 group-hover/livesite:text-white transition-colors" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          {/* Preview Section */}
          <div className="w-full group animate-fade-in animate-slide-up animation-delay-200">
            <div className="w-full rounded-xl overflow-hidden border border-card-border bg-card-bg relative shadow-2xl">
              <img 
                src="assets/images/koncentrate_preview.png" 
                alt="Koncentrate KDE Widget Preview"
                className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
              />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-300">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <IconCode size={18} className="text-neutral-500" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="tag">
                <p>QT</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-400">
            <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <IconInfoCircle size={18} className="text-neutral-500" />
              About the Project
            </h2>
            <p className="text-neutral-400 leading-relaxed text-sm max-w-4xl">
              {/* About section left intentionally empty for the user to fill in */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
