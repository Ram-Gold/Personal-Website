import React from 'react';
import { IconArrowLeft, IconFlask } from '@tabler/icons-react';

interface TechStackViewProps {
  onBack: () => void;
}

export const TechStackView: React.FC<TechStackViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 mb-4 animate-fade-in hover:text-white transition-colors cursor-pointer group/back"
        href="index.html"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <IconArrowLeft size={16} className="text-neutral-400 group-hover:text-white transition-colors" /> Back to Home
      </a>
      <div className="card p-4 col-span-1 md:col-span-4 md:row-span-2 flex flex-col gap-y-3 animate-fade-in animate-slide-up animation-delay-100">
        <div className="flex items-center gap-2 mb-4 text-white">
          <IconFlask size={20} className="text-neutral-400" />
          <p className="font-semibold">Tech Stack</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Frontend</p>
          <div className="flex gap-2">
            <div className="tag"><p>Javascript</p></div>
            <div className="tag"><p>Tailwind CSS</p></div>
            <div className="tag"><p>React</p></div>
          </div>

          <p className="font-semibold">Backend</p>
          <div className="flex gap-2">
            <div className="tag"><p>MySQL</p></div>
            <div className="tag"><p>Supabase</p></div>
          </div>

          <p className="font-semibold">CMS & No-Code</p>
          <div className="flex gap-2">
            <div className="tag"><p>Carrd</p></div>
            <div className="tag"><p>WebFlow</p></div>
          </div>

          <p className="font-semibold">AI & Machine Learning</p>
          <div className="flex flex-wrap gap-2">
            <div className="tag"><p>Ollama</p></div>
            <div className="tag"><p>Hugging Face</p></div>
            <div className="tag"><p>OpenAI</p></div>
          </div>

          <p className="font-semibold">AI IDE</p>
          <div className="flex flex-wrap gap-2">
            <div className="tag"><p>Cursor</p></div>
            <div className="tag"><p>Antigravity</p></div>
            <div className="tag"><p>Claude Code CLI</p></div>
            <div className="tag"><p>JetBrains Junie</p></div>
            <div className="tag"><p>Github Copilot</p></div>
          </div>

          <p className="font-semibold">Dev Tools</p>
          <div className="flex flex-wrap gap-2">
            <div className="tag"><p>Git</p></div>
            <div className="tag"><p>Github</p></div>
            <div className="tag"><p>JetBrains Webstorm</p></div>
            <div className="tag"><p>JetBrains DataSpell</p></div>
            <div className="tag"><p>Android Studio</p></div>
            <div className="tag"><p>Figma</p></div>
            <div className="tag"><p>Notion</p></div>
            <div className="tag"><p>Obsidian</p></div>
            <div className="tag"><p>Discord</p></div>
            <div className="tag"><p>Linux</p></div>
            <div className="tag"><p>Docker</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};
