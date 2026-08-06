import React from 'react';
import { IconArrowLeft, IconExternalLink, IconCode, IconInfoCircle } from '@tabler/icons-react';

interface KoncentrateViewProps {
  onBack: () => void;
}

export const KoncentrateView: React.FC<KoncentrateViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a 
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-6 hover:text-theme-text transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
        href="index.html"
      >
        <IconArrowLeft size={16} className="text-theme-muted group-hover/back:text-theme-text transition-colors" />
        Back to Home
      </a>

      <div className="card p-6 md:p-8 flex flex-col gap-y-6 animate-fade-in animate-slide-up animation-delay-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-6">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-bold text-2xl text-theme-text">Koncentrate</h1>
              <p className="text-theme-muted text-sm mt-1">A KDE Plasma 6 widget combining a Pomodoro timer & To-Do List</p>
            </div>
          </div>
          <a 
            href="https://github.com/Ram-Gold/koncentrate" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 border border-card-border hover:bg-theme-hover active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded-lg transition-all text-sm font-semibold text-theme-text w-full md:w-auto cursor-pointer group/livesite"
            style={{ background: `var(--theme-card-bg)` }}
          >
            <span>View on GitHub</span> <IconExternalLink size={16} className="text-theme-muted group-hover/livesite:text-theme-text transition-colors" />
          </a>
        </div>

        <div className="flex flex-col gap-8">
          {/* Preview Section */}
          <div className="w-full group animate-fade-in animate-slide-up animation-delay-200">
            <div className="w-full rounded-xl overflow-hidden border border-card-border relative shadow-2xl"
              style={{ background: `var(--theme-card-bg)` }}
            >
              <img 
                src="assets/images/koncentrate_preview.png" 
                alt="Koncentrate KDE Widget Banner"
                className="w-full h-auto object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" 
              />
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-300">
            <h2 className="text-sm font-semibold text-theme-text mb-3 flex items-center gap-2">
              <IconCode size={18} className="text-theme-subtle" />
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="tag">
                <p>KDE Plasma 6</p>
              </div>
              <div className="tag">
                <p>Qt / QML</p>
              </div>
              <div className="tag">
                <p>Linux</p>
              </div>
              <div className="tag">
                <p>C++</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-400">
            <h2 className="text-sm font-semibold text-theme-text mb-3 flex items-center gap-2">
              <IconInfoCircle size={18} className="text-theme-subtle" />
              About the Project
            </h2>
            <p className="text-theme-muted leading-relaxed text-sm max-w-4xl">
              A KDE Plasma 6 widget that combines a Pomodoro timer with a built-in To-Do List - so you can manage your tasks and stay focused, all from your desktop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
