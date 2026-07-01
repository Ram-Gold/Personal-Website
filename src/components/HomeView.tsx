import React from 'react';
import { GitHubContributions } from './GitHubContributions';
import { useTheme } from '../utils/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import {
  IconMapPin,
  IconUser,
  IconDownload,
  IconMail,
  IconFlask,
  IconChevronRight,
  IconCompass,
  IconCertificate,
  IconBriefcase,
  IconCode,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconArrowUpRight
} from '@tabler/icons-react';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats' | 'project_koncentrate' | 'project_domodomo' | 'gear') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { theme } = useTheme();

  return (
    <main className="animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <section className="mb-8 animate-fade-in animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 flex-grow">
              <img
                className="w-36 h-36 rounded-2xl object-cover overflow-hidden shrink-0 border border-solid border-card-border"
                src="assets/images/ram-guinto.png"
                alt="Ram Guinto"
              />
              <div className="flex flex-col justify-between py-1 self-stretch flex-grow">
                <div>
                  <img
                    className="rounded-sm w-fit mb-2"
                    src={theme === 'dark' ? 'assets/images/ram-guinto-text-light.jpg' : 'assets/images/ram-guinto-text.jpg'}
                    alt="Ram Guinto"
                  />
                  <div className="flex items-center gap-1.5 text-[13px] text-theme-muted mb-1">
                    <IconMapPin size={14} className="text-theme-subtle shrink-0" />
                    <span>Manila, Philippines</span>
                  </div>
                  <p className="text-theme-muted text-[13px] md:text-[14px] leading-relaxed">
                    Front-end developer, Graphic Designer and College Student
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href="https://github.com/Ram-Gold"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-card-border hover:bg-theme-hover focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded transition-all text-xs font-semibold text-theme-text cursor-pointer"
                    style={{ background: `color-mix(in srgb, var(--theme-card-bg) 50%, transparent)` }}
                    aria-label="Visit Ram Guinto's GitHub Profile"
                  >
                    <IconBrandGithub size={14} className="shrink-0" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ram-guinto/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-card-border hover:bg-theme-hover focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded transition-all text-xs font-semibold text-theme-text cursor-pointer"
                    style={{ background: `color-mix(in srgb, var(--theme-card-bg) 50%, transparent)` }}
                    aria-label="Visit Ram Guinto's LinkedIn Profile"
                  >
                    <IconBrandLinkedin size={14} className="shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Theme Toggle positioned at the top right of the profile header */}
            <div className="sm:self-start">
              <ThemeToggle />
            </div>
          </div>
        </section>
        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-8 gap-6">
          {/* About Me */}
          <div className="card p-4 col-span-1 md:col-span-5 md:row-span-2 flex flex-col h-full group animate-fade-in animate-slide-up">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconUser size={20} className="text-theme-muted" />
                <p className="font-semibold">About Me</p>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-start">
              <p className="text-theme-muted leading-relaxed text-sm">
                I'm a front-end developer and aspiring AI engineer in Manila, Philippines, studying BS
                Information Technology at National Teacher's College.
                <br />
                <br />
                I build responsive web interfaces with
                React, Tailwind CSS, and JavaScript. I'm interested in the intersection of practical web
                development and intelligent systems, building things that are fast, functional, and actually useful.
                <br />
                <br />
                Open to internships and entry-level roles in front-end development or AI engineering, feel free
                to reach out or explore my projects below.
              </p>
            </div>
            <div className="mt-4 shrink-0 flex items-center">
              <a
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-card-border hover:bg-theme-hover hover:text-theme-text focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded transition-all text-xs font-semibold text-theme-muted cursor-pointer"
                style={{ background: `color-mix(in srgb, var(--theme-card-bg) 30%, transparent)` }}
                href="gear.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('gear');
                }}
              >
                <span>My Gear</span>
                <IconArrowUpRight size={14} className="text-theme-muted" />
              </a>
            </div>
          </div>

          {/* Experience */}
          <div className="card p-4 col-span-1 md:col-span-3 md:row-span-2 flex flex-col h-full group animate-fade-in animate-slide-up animation-delay-200">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconBriefcase size={20} className="text-theme-muted" />
                <p className="font-semibold">Experience</p>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-start">
              <div className="relative flex flex-col gap-y-6 pl-1 mt-1">
                {/* Timeline Connector Line */}
                <div className="absolute left-[24px] top-5 bottom-5 w-[1px] bg-theme-timeline-line z-0"></div>

                {/* FlyrankAI */}
                <div className="relative flex flex-row gap-4 items-start">
                  <div className="z-10 w-10 h-10 rounded-xl bg-theme-timeline-icon border border-card-border flex items-center justify-center shrink-0 font-bold text-xs text-theme-muted">
                    FR
                  </div>
                  <div className="flex flex-col pt-1">
                    <p className="text-theme-text font-semibold text-sm leading-tight">Front-End AI Engineering</p>
                    <p className="text-theme-muted text-xs mt-0.5">FlyrankAI - Intern</p>
                    <p className="text-theme-subtle text-[11px] mt-1 font-mono">July 2026 - August 2026 • 6 weeks</p>
                  </div>
                </div>

                {/* National Teacher's College */}
                <div className="relative flex flex-row gap-4 items-start">
                  <div className="z-10 w-10 h-10 rounded-xl bg-theme-timeline-icon border border-card-border flex items-center justify-center shrink-0 font-bold text-xs text-theme-muted">
                    NTC
                  </div>
                  <div className="flex flex-col pt-1">
                    <p className="text-theme-text font-semibold text-sm leading-tight">BS in Information Technology</p>
                    <p className="text-theme-muted text-xs mt-0.5">National Teacher's College</p>
                    <p className="text-theme-subtle text-[11px] mt-1 font-mono">2023 - Present • 3 years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download CV */}
          <a
            href="mailto:ramgolds@proton.me"
            className="action-card p-4 col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-center gap-y-3.5 items-center focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-text font-semibold w-full animate-fade-in animate-slide-up animation-delay-300 group"
          >
            <div className="flex justify-center gap-2 px-4 py-2 w-full">
              <IconDownload size={20} className="text-theme-muted" />
              <span>Download CV</span>
            </div>
          </a>

          {/* Send Email */}
          <a
            href="mailto:ramgolds@proton.me"
            className="action-card p-4 col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-center gap-y-3.5 items-center focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-text font-semibold w-full animate-fade-in animate-slide-up animation-delay-300 group"
          >
            <div className="flex justify-center gap-2 px-4 py-2 w-full">
              <IconMail size={20} className="text-theme-muted" />
              <span>Send Email</span>
            </div>
          </a>

          {/* Tech Stack */}
          <div className="card p-4 col-span-1 md:col-span-4 md:row-span-2 flex flex-col h-full group/tech animate-fade-in animate-slide-up animation-delay-400">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconFlask size={20} className="text-theme-muted" />
                <p className="font-semibold">Tech Stack</p>
              </div>
              <a
                className="inline-flex items-center gap-1.5 text-sm text-theme-muted hover:text-theme-text focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 transition-colors cursor-pointer group/viewall"
                href="tech_stack.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('tech_stack');
                }}
              >
                <span>View All</span>
                <IconChevronRight size={16} className="text-theme-muted" />
              </a>
            </div>
            <div className="flex-grow flex flex-col justify-start">
              <div className="flex flex-col gap-y-3">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-theme-text text-sm">Frontend</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag"><p>Javascript</p></div>
                    <div className="tag"><p>Tailwind CSS</p></div>
                    <div className="tag"><p>React</p></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-theme-text text-sm">Backend</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag"><p>MySQL</p></div>
                    <div className="tag"><p>Supabase</p></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-theme-text text-sm">CMS & No-Code</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag"><p>Carrd</p></div>
                    <div className="tag"><p>WebFlow</p></div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-theme-text text-sm">Dev Tools</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag"><p>JetBrains Webstorm</p></div>
                    <div className="tag"><p>VS Code</p></div>
                    <div className="tag"><p>Github</p></div>
                    <div className="tag"><p>Figma</p></div>
                    <div className="tag"><p>Notion</p></div>
                    <div className="tag"><p>Discord</p></div>
                    <div className="tag"><p>Linux</p></div>
                    <div className="tag-more"><p>more +</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Currently Exploring */}
          <div className="card p-4 col-span-1 md:col-span-4 md:row-span-1 flex flex-col h-full group animate-fade-in animate-slide-up animation-delay-400">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconCompass size={20} className="text-blue-400" />
                <p className="font-semibold">Currently Exploring</p>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-start">
              <p className="text-theme-muted leading-relaxed text-sm">
                I'm actively expanding into <span className="text-theme-text font-medium">AI engineering</span>.
                I have completed certifications in AI Engineering and AI Fundamentals,
                with hands-on experience working with the <span className="text-theme-text font-medium">OpenAI
                  API</span>, embeddings, and semantic search.
                I am always learning by doing, and I'm currently experimenting with <span
                  className="text-theme-text font-medium">OpenRouter</span> and the <span
                    className="text-theme-text font-medium">Gemini API</span>.
              </p>
            </div>
          </div>

          {/* Certifications */}
          <div className="card p-4 col-span-1 md:col-span-3 md:row-span-2 flex flex-col h-full group/cert animate-fade-in animate-slide-up animation-delay-500">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconCertificate size={20} className="text-theme-muted" />
                <p className="font-semibold">Certificates</p>
              </div>
              <a
                className="inline-flex items-center gap-1.5 text-sm text-theme-muted hover:text-theme-text focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 transition-colors cursor-pointer group/viewcert"
                href="certifications.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('certifications');
                }}
              >
                <span>View All</span>
                <IconChevronRight size={16} className="text-theme-muted" />
              </a>
            </div>
            <div className="flex-grow flex flex-col justify-start gap-y-3">
              <a
                href="https://www.datacamp.com/certificate/AIEDA0017163812667"
                target="_blank"
                rel="noopener noreferrer"
                className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
              >
                <p className="text-theme-text font-semibold text-sm leading-tight">AI Engineer for Developers Associate</p>
                <p className="text-theme-muted text-xs mt-1">Datacamp</p>
              </a>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/5PYDS4SXI81S"
                target="_blank"
                rel="noopener noreferrer"
                className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
              >
                <p className="text-theme-text font-semibold text-sm leading-tight">System Administration and IT Infrastructure Services</p>
                <p className="text-theme-muted text-xs mt-1">Coursera</p>
              </a>
              <a
                href="https://www.coursera.org/account/accomplishments/verify/HYCSR8DB3KWC"
                target="_blank"
                rel="noopener noreferrer"
                className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
              >
                <p className="text-theme-text font-semibold text-sm leading-tight">Operating Systems: Overview, Administration, and Security</p>
                <p className="text-theme-muted text-xs mt-1">Coursera</p>
              </a>
            </div>
          </div>

          {/* Projects */}
          <div className="card p-4 col-span-1 md:col-span-5 md:row-span-2 flex flex-col h-full group/proj animate-fade-in animate-slide-up animation-delay-500">
            <div className="flex items-center justify-between text-theme-text mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <IconCode size={20} className="text-theme-muted" />
                <p className="font-semibold">Projects</p>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="project_idol_chant.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('project_idol_chant');
                  }}
                  className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                    <p className="text-theme-text font-semibold text-sm leading-tight">Idol Chant & Mixes</p>
                    <span className="text-theme-subtle text-[11px] font-mono">2026</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag">
                      <p>Website</p>
                    </div>
                  </div>
                </a>
                <a
                  href="pubmats.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('pubmats');
                  }}
                  className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                    <p className="text-theme-text font-semibold text-sm leading-tight">Pubmats</p>
                    <span className="text-theme-subtle text-[11px] font-mono">2026</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag">
                      <p>Graphic Design</p>
                    </div>
                    <div className="tag">
                      <p>Miscellaneous</p>
                    </div>
                  </div>
                </a>
                <a
                  href="project_koncentrate.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('project_koncentrate');
                  }}
                  className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                    <p className="text-theme-text font-semibold text-sm leading-tight">Koncentrate</p>
                    <span className="text-theme-subtle text-[11px] font-mono">2026</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag">
                      <p>Linux</p>
                    </div>
                    <div className="tag">
                      <p>Widget</p>
                    </div>
                    <div className="tag">
                      <p>KDE</p>
                    </div>
                  </div>
                </a>
                <a
                  href="project_domodomo.html"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('project_domodomo');
                  }}
                  className="project-card focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
                >
                  <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
                    <p className="text-theme-text font-semibold text-sm leading-tight">DomoDomo</p>
                    <span className="text-theme-subtle text-[11px] font-mono">2026</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="tag">
                      <p>Co-Founded</p>
                    </div>
                    <div className="tag">
                      <p>AI</p>
                    </div>
                    <div className="tag-more">
                      <p>more +</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Contributions Calendar */}
        <GitHubContributions />

        {/* Footer */}
        <footer className="col-span-1 mt-8 animate-fade-in animation-delay-600">
          <hr className="my-4 border-card-border" />
          <div className="flex justify-between items-center">
            <p className="text-theme-muted text-xs text-left">
              © 2026 Ram Guinto. <br />
              Email: ramgolds@proton.me
            </p>
            <div className="flex justify-end gap-2">
              <a
                href="https://www.facebook.com/ramachilles.guinto"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-theme-hover hover:text-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-muted"
                aria-label="Facebook Profile"
              >
                <IconBrandFacebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/ramgold.png/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-theme-hover hover:text-pink-500 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-muted"
                aria-label="Instagram Profile"
              >
                <IconBrandInstagram size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/ram-guinto/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-theme-hover hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-muted"
                aria-label="LinkedIn Profile"
              >
                <IconBrandLinkedin size={22} />
              </a>
              <a
                href="https://github.com/Ram-Gold"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-theme-hover hover:text-theme-text transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-theme-muted"
                aria-label="GitHub Profile"
              >
                <IconBrandGithub size={22} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};
