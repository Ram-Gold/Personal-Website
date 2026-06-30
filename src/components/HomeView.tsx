import React from 'react';
import { 
  IconMapPin, 
  IconUser, 
  IconSchool, 
  IconDownload, 
  IconMail, 
  IconFlask, 
  IconChevronRight, 
  IconCompass, 
  IconCertificate, 
  IconBriefcase, 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandFacebook, 
  IconBrandInstagram 
} from '@tabler/icons-react';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <main className="animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <section className="mb-8 animate-fade-in animate-slide-up">
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
            <img 
              className="w-36 h-36 rounded-2xl object-cover overflow-hidden shrink-0 border border-solid border-card-border"
              src="assets/images/ram-guinto.png" 
              alt="Ram Guinto" 
            />
            <div className="flex flex-col justify-between py-1 self-stretch">
              <div>
                <img 
                  className="rounded-sm w-fit mb-2" 
                  src="assets/images/ram-guinto-text-light.jpg" 
                  alt="Ram Guinto" 
                />
                <div className="flex items-center gap-1.5 text-[13px] text-neutral-400 mb-1">
                  <IconMapPin size={14} className="text-neutral-500 shrink-0" />
                  <span>Manila, Philippines</span>
                </div>
                <p className="text-neutral-400 text-[13px] md:text-[14px] leading-relaxed">
                  Front-end developer, Graphic Designer and College Student
                </p>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <a 
                  href="https://github.com/Ram-Gold" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-card-border bg-card-bg/50 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded transition-all text-xs font-semibold text-white cursor-pointer"
                  aria-label="Visit Ram Guinto's GitHub Profile"
                >
                  <IconBrandGithub size={14} className="shrink-0" />
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/ram-guinto/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 border border-card-border bg-card-bg/50 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded transition-all text-xs font-semibold text-white cursor-pointer"
                  aria-label="Visit Ram Guinto's LinkedIn Profile"
                >
                  <IconBrandLinkedin size={14} className="shrink-0" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-8 gap-6">
          {/* About Me */}
          <div className="card p-4 col-span-1 md:col-span-5 md:row-span-2 space-y-2 group animate-fade-in animate-slide-up">
            <div className="flex items-center gap-2 mb-4 text-white">
              <IconUser size={20} className="text-neutral-400 group-hover:text-pink-500 transition-colors" />
              <p className="font-semibold text-white">About Me</p>
            </div>
            <p className="text-neutral-400">
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

          {/* Education */}
          <div className="card p-4 col-span-1 md:col-span-3 md:row-span-2 space-y-2 group animate-fade-in animate-slide-up animation-delay-200 flex flex-col gap-y-5">
            <div className="flex items-center gap-2 text-white">
              <IconSchool size={20} className="text-neutral-400 group-hover:text-pink-500 transition-colors" />
              <p className="font-semibold">Education</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="tag text-xs w-fit">
                <p>2023-Pres</p>
              </div>
              <div className="flex flex-col">
                <p className="text-white mb-0">BS in Information Technology</p>
                <p className="text-[#8C8C8C] text-sm">National Teacher's College</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="tag text-xs w-fit">
                <p>2011-2023</p>
              </div>
              <div className="flex flex-col">
                <p className="text-white mb-0">St. Anthony School</p>
                <p className="text-[#8C8C8C] text-sm">Elementary to Senior High</p>
              </div>
            </div>
          </div>

          {/* Download CV */}
          <a 
            href="mailto:ramgolds@proton.me"
            className="action-card p-4 col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-center gap-y-3.5 items-center focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-white font-semibold w-full animate-fade-in animate-slide-up animation-delay-300 group"
          >
            <div className="flex justify-center gap-2 px-4 py-2 w-full">
              <IconDownload size={20} className="text-neutral-400 group-hover:text-white transition-colors" />
              <span>Download CV</span>
            </div>
          </a>

          {/* Send Email */}
          <a 
            href="mailto:ramgolds@proton.me"
            className="action-card p-4 col-span-1 md:col-span-2 md:row-span-1 flex flex-col justify-center gap-y-3.5 items-center focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-white font-semibold w-full animate-fade-in animate-slide-up animation-delay-300 group"
          >
            <div className="flex justify-center gap-2 px-4 py-2 w-full">
              <IconMail size={20} className="text-neutral-400 group-hover:text-white transition-colors" />
              <span>Send Email</span>
            </div>
          </a>

          {/* Tech Stack */}
          <div className="card p-4 col-span-1 md:col-span-4 md:row-span-2 flex flex-col gap-y-3 animate-fade-in animate-slide-up animation-delay-400 group/tech">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-white">
                <IconFlask size={20} className="text-neutral-400 group-hover/tech:text-pink-500 transition-colors" />
                <p className="font-semibold">Tech Stack</p>
              </div>
              <a 
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 transition-colors cursor-pointer group/viewall" 
                href="tech_stack.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('tech_stack');
                }}
              >
                <span>View All</span>
                <IconChevronRight size={16} className="text-neutral-400 group-hover/viewall:text-white transition-colors" />
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-white">Frontend</p>
              <div className="flex gap-2">
                <div className="tag"><p>Javascript</p></div>
                <div className="tag"><p>Tailwind CSS</p></div>
                <div className="tag"><p>React</p></div>
              </div>
              <p className="font-semibold text-white">Backend</p>
              <div className="flex gap-2">
                <div className="tag"><p>MySQL</p></div>
                <div className="tag"><p>Supabase</p></div>
              </div>
              <p className="font-semibold text-white">CMS & No-Code</p>
              <div className="flex gap-2">
                <div className="tag"><p>Carrd</p></div>
                <div className="tag"><p>WebFlow</p></div>
              </div>
              <p className="font-semibold text-white">Dev Tools</p>
              <div className="flex flex-wrap gap-2">
                <div className="tag"><p>JetBrains Webstorm</p></div>
                <div className="tag"><p>VS Code</p></div>
                <div className="tag"><p>Github</p></div>
                <div className="tag"><p>Figma</p></div>
                <div className="tag"><p>Notion</p></div>
                <div className="tag"><p>Discord</p></div>
                <div className="tag"><p>Linux</p></div>
              </div>
            </div>
          </div>

          {/* Currently Exploring */}
          <div className="card p-4 col-span-1 md:col-span-4 md:row-span-1 space-y-2 group animate-fade-in animate-slide-up animation-delay-400 flex flex-col gap-y-3.5">
            <div className="flex items-center gap-2 mb-4 text-white">
              <IconCompass size={20} className="text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              <p className="font-semibold">Currently Exploring</p>
            </div>
            <p className="text-neutral-400">
              I'm actively expanding into <span className="text-white font-medium">AI engineering</span>.
              I have completed certifications in AI Engineering and AI Fundamentals,
              with hands-on experience working with the <span className="text-white font-medium">OpenAI
                API</span>, embeddings, and semantic search.
              I am always learning by doing, and I'm currently experimenting with <span
                className="text-white font-medium">OpenRouter</span> and the <span
                className="text-white font-medium">Gemini API</span>.
            </p>
          </div>

          {/* Certifications */}
          <div className="card p-4 col-span-1 md:col-span-3 md:row-span-2 flex flex-col gap-y-3 animate-fade-in animate-slide-up animation-delay-500 group/cert">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 text-white">
                <IconCertificate size={20} className="text-neutral-400 group-hover/cert:text-pink-500 transition-colors" />
                <p className="font-semibold">Certificates</p>
              </div>
              <a 
                className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 transition-colors cursor-pointer group/viewcert" 
                href="certifications.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('certifications');
                }}
              >
                <span>View All</span>
                <IconChevronRight size={16} className="text-neutral-400 group-hover/viewcert:text-white transition-colors" />
              </a>
            </div>
            <a 
              href="https://www.datacamp.com/certificate/AIEDA0017163812667"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
            >
              <p className="text-white font-semibold">AI Engineer for Developers Associate</p>
              <p className="text-neutral-400 text-xs">Datacamp</p>
            </a>
            <a 
              href="https://www.coursera.org/account/accomplishments/verify/5PYDS4SXI81S"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
            >
              <p className="text-white font-semibold">System Administration and IT Infrastructure Services</p>
              <p className="text-neutral-400 text-xs">Coursera</p>
            </a>
            <a 
              href="https://www.coursera.org/account/accomplishments/verify/HYCSR8DB3KWC"
              target="_blank"
              rel="noopener noreferrer"
              className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
            >
              <p className="text-white font-semibold">Operating Systems: Overview, Administration, and Security</p>
              <p className="text-neutral-400 text-xs">Coursera</p>
            </a>
          </div>

          {/* Projects */}
          <div className="card p-4 col-span-1 md:col-span-5 md:row-span-2 flex flex-col gap-y-3 animate-fade-in animate-slide-up animation-delay-500 group/proj">
            <div className="flex items-center gap-2 mb-4 text-white">
              <IconBriefcase size={20} className="text-neutral-400 group-hover/proj:text-pink-500 transition-colors" />
              <p className="font-semibold">Projects</p>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <a 
                href="project_idol_chant.html"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('project_idol_chant');
                }}
                className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
              >
                <div className="flex flex-wrap items-center mb-3 gap-2">
                  <p className="text-white font-semibold">Idol Chant & Mixes</p>
                  <p className="text-white text-xs">2026</p>
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
                className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
              >
                <div className="flex flex-wrap items-center mb-3 gap-2">
                  <p className="text-white font-semibold">Pubmats</p>
                  <p className="text-white text-xs">2026</p>
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
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="col-span-1 mt-8 animate-fade-in animation-delay-600">
          <hr className="my-4 border-card-border" />
          <div className="flex justify-between items-center">
            <p className="text-neutral-400 text-xs text-left">
              © 2026 Ram Guinto. <br />
              Email: ramgolds@proton.me
            </p>
            <div className="flex justify-end gap-2">
              <a 
                href="https://www.facebook.com/ramachilles.guinto" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800/40 hover:text-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-neutral-400"
                aria-label="Facebook Profile"
              >
                <IconBrandFacebook size={22} />
              </a>
              <a 
                href="https://www.instagram.com/ramgold.png/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800/40 hover:text-pink-500 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-neutral-400"
                aria-label="Instagram Profile"
              >
                <IconBrandInstagram size={22} />
              </a>
              <a 
                href="https://www.linkedin.com/in/ram-guinto/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800/40 hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-neutral-400"
                aria-label="LinkedIn Profile"
              >
                <IconBrandLinkedin size={22} />
              </a>
              <a 
                href="https://github.com/Ram-Gold" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-neutral-800/40 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none text-neutral-400"
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
