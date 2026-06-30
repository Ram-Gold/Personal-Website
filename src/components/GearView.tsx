import React from 'react';
import { IconArrowLeft } from '@tabler/icons-react';

interface GearViewProps {
  onBack: () => void;
}

export const GearView: React.FC<GearViewProps> = ({ onBack }) => {
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
              <h1 className="font-bold text-2xl text-white">My Gear</h1>
              <p className="text-neutral-400 text-sm mt-1">Tools and equipment I use daily</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Main Workstation */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-200">
            <h2 className="text-lg font-semibold text-white mb-4">Main Workstation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">Lenovo Ideapad 1 15ALC7</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-neutral-400 list-disc list-inside">
                    <li>Linux CachyOS w/ Niri</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Everyday Carry */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-300">
            <h2 className="text-lg font-semibold text-white mb-4">Everyday Carry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Phone 1 */}
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">Redmi 15 5G</h3>
                </div>
              </div>
              
              {/* Phone 2 */}
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">iPhone XS Pro Max</h3>
                </div>
              </div>

              {/* Earbuds */}
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">Soundcore R100</h3>
                </div>
              </div>

              {/* Notebook & Pen */}
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">Small notebook and pen</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-neutral-400 list-disc list-inside">
                    <li>Muji Double-wire notebook</li>
                    <li>Muji Gel Ink Ballpoint pen</li>
                    <li>Muji Highlighter</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Home Server */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-400">
            <h2 className="text-lg font-semibold text-white mb-4">Home Server</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card border border-card-border bg-card-bg p-4 rounded-xl flex flex-col h-full">
                <div className="w-full h-48 bg-neutral-900 rounded-lg mb-4 flex items-center justify-center border border-card-border overflow-hidden shrink-0">
                  <span className="text-neutral-600 text-sm font-medium">Image Placeholder</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-semibold text-white text-base">Acer M509D</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-sm text-neutral-400 list-disc list-inside">
                    <li>Ubuntu Server</li>
                    <li>Tailscale</li>
                    <li>Navidrome (Music)</li>
                    <li>Jellyfin (Movies/Videos)</li>
                    <li>Pi-Hole (Adblocking)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
