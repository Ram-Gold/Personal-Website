import React from 'react';
import { IconArrowLeft, IconArrowUpRight } from '@tabler/icons-react';
import { hapticLight } from '../utils/haptics';

interface GearViewProps {
  onBack: () => void;
}

const StyledLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  iconSize?: number;
  showDot?: boolean;
  parentHover?: boolean;
}> = ({ href, children, className = '', iconSize = 14, showDot = false, parentHover = false }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      onClick={hapticLight}
      className={`inline-flex items-center gap-1.5 transition-colors group/link cursor-pointer ${className}`}
    >
      {showDot && (
        <span className={`w-1 h-1 rounded-full bg-theme-faint transition-colors duration-200 mr-0.5 shrink-0 ${
          parentHover ? 'group-hover:bg-theme-muted' : 'group-hover/link:bg-theme-muted'
        }`} />
      )}
      <span className={`transition-colors duration-200 border-b border-transparent pb-[0.5px] leading-tight ${
        parentHover ? 'group-hover:text-theme-text group-hover:border-theme-muted' : 'hover:text-theme-text hover:border-theme-muted'
      }`}>
        {children}
      </span>
      <span className="relative flex items-center justify-center shrink-0 w-3.5 h-3.5 overflow-hidden">
        <IconArrowUpRight 
          size={iconSize} 
          className={`absolute opacity-0 -translate-x-1.5 translate-y-1.5 transition-all duration-300 ease-out text-theme-muted ${
            parentHover 
              ? 'group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0' 
              : 'group-hover/link:opacity-100 group-hover/link:translate-x-0 group-hover/link:translate-y-0'
          }`} 
        />
      </span>
    </a>
  );
};

export const GearView: React.FC<GearViewProps> = ({ onBack }) => {
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
              <h1 className="font-bold text-2xl text-theme-text">My Gear</h1>
              <p className="text-theme-muted text-sm mt-1">Tools and equipment I use daily</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Main Workstation */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-200">
            <h2 className="text-lg font-semibold text-theme-text mb-4">Main Workstation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card overflow-hidden border border-card-border rounded-xl flex flex-col h-full group hover:border-theme-border-accent transition-all duration-300">
                <a 
                  href="https://psref.lenovo.com/syspool/Sys/PDF/IdeaPad/IdeaPad_1_15ALC7/IdeaPad_1_15ALC7_Spec.html?ver=68fa65d3-d5b2-40db-8dfe-c584ac7f3fd9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={hapticLight}
                  className="w-full aspect-square bg-white flex items-center justify-center border-b border-card-border overflow-hidden shrink-0 block cursor-pointer p-6"
                >
                  <img 
                    src="https://easypc.com.ph/cdn/shop/files/Lenovo_IdeaPad_1_15ALC7_15.6_FHD_AMD_Ryzen_5-5500U_8GB_DDR4_256GB_SSD_Win11_Laptop_MN-a_2048x.jpg?v=1714717472" 
                    alt="Lenovo Ideapad 1 15ALC7" 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </a>
                <div className="p-5 flex flex-col flex-grow justify-between gap-y-4">
                  <div>
                    <h3 className="font-semibold text-theme-text text-base mb-2">
                      <StyledLink 
                        href="https://psref.lenovo.com/syspool/Sys/PDF/IdeaPad/IdeaPad_1_15ALC7/IdeaPad_1_15ALC7_Spec.html?ver=68fa65d3-d5b2-40db-8dfe-c584ac7f3fd9" 
                        className="text-theme-text hover:text-theme-text"
                        iconSize={16}
                        showDot={false}
                        parentHover={true}
                      >
                        Lenovo Ideapad 1 15ALC7
                      </StyledLink>
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-theme-muted pl-3 border-l border-theme-timeline-line">
                      <li className="flex items-center">
                        <StyledLink href="https://cachyos.org/" className="text-theme-muted hover:text-theme-text" showDot={true}>
                          Linux CachyOS w/ Niri
                        </StyledLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Everyday Carry */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-300">
            <h2 className="text-lg font-semibold text-theme-text mb-4">Everyday Carry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Phone 1 */}
              <div className="card overflow-hidden border border-card-border rounded-xl flex flex-col h-full group hover:border-theme-border-accent transition-all duration-300">
                <a 
                  href="https://www.mi.com/global/product/redmi-15-5g/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={hapticLight}
                  className="w-full aspect-square bg-white flex items-center justify-center border-b border-card-border overflow-hidden shrink-0 block cursor-pointer p-6"
                >
                  <img 
                    src="https://www.greentelcom.ph/wp-content/uploads/2025/12/Xiaomi-Redmi-15-5g-3.png" 
                    alt="Redmi 15 5G" 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </a>
                <div className="p-5 flex flex-col flex-grow justify-between gap-y-4">
                  <h3 className="font-semibold text-theme-text text-base">
                    <StyledLink 
                      href="https://www.mi.com/global/product/redmi-15-5g/" 
                      className="text-theme-text hover:text-theme-text"
                      iconSize={16}
                      showDot={false}
                      parentHover={true}
                    >
                      Redmi 15 5G
                    </StyledLink>
                  </h3>
                </div>
              </div>

              {/* Earbuds */}
              <div className="card overflow-hidden border border-card-border rounded-xl flex flex-col h-full group hover:border-theme-border-accent transition-all duration-300">
                <div className="w-full aspect-square bg-white flex items-center justify-center border-b border-card-border overflow-hidden shrink-0 p-6">
                  <img 
                    src="https://cdn.supercommerce.io/etisal-store/uploads/a3981011_td01.jpg" 
                    alt="Soundcore R100" 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between gap-y-4">
                  <h3 className="font-semibold text-theme-text text-base">Soundcore R100</h3>
                </div>
              </div>

              {/* Notebook & Pen */}
              <div className="card overflow-hidden border border-card-border rounded-xl flex flex-col h-full group hover:border-theme-border-accent transition-all duration-300">
                <div className="w-full aspect-square bg-white flex items-center justify-center border-b border-card-border overflow-hidden shrink-0 p-6">
                  <img 
                    src="https://static.wixstatic.com/media/e57753_1f037a4f92f2475a855c52b407d0d8bf~mv2.jpg/v1/fill/w_498,h_498,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/e57753_1f037a4f92f2475a855c52b407d0d8bf~mv2.jpg" 
                    alt="Small notebook and pen" 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between gap-y-4">
                  <div>
                    <h3 className="font-semibold text-theme-text text-base mb-2">Small notebook and pen</h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-theme-muted pl-3 border-l border-theme-timeline-line">
                      <li className="flex items-center">
                        <StyledLink href="https://www.mujiph.com/product-page/double-ring-ruled-notebook-with-band" showDot={true}>
                          Muji Double-wire notebook
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://www.mujiph.com/product-page/gel-ink-pen-cap-type-0-38mm" showDot={true}>
                          Muji Gel Ink Ballpoint pen
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://www.mujiph.com/product-page/twin-highlighter-green" showDot={true}>
                          Muji Highlighter
                        </StyledLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Home Server */}
          <div className="w-full animate-fade-in animate-slide-up animation-delay-400">
            <h2 className="text-lg font-semibold text-theme-text mb-4">Home Server</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="card overflow-hidden border border-card-border rounded-xl flex flex-col h-full group hover:border-theme-border-accent transition-all duration-300">
                <a 
                  href="https://www.asus.com/laptops/for-home/everyday-use/asus-m509/techspec/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={hapticLight}
                  className="w-full aspect-square bg-white flex items-center justify-center border-b border-card-border overflow-hidden shrink-0 block cursor-pointer p-6"
                >
                  <img 
                    src="https://www.asus.com/media/global/gallery/58snr34omoyksjl9_setting_xxx_0_90_end_2000.png" 
                    alt="Acer M509D" 
                    className="max-w-full max-h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </a>
                <div className="p-5 flex flex-col flex-grow justify-between gap-y-4">
                  <div>
                    <h3 className="font-semibold text-theme-text text-base mb-2">
                      <StyledLink 
                        href="https://www.asus.com/laptops/for-home/everyday-use/asus-m509/techspec/" 
                        className="text-theme-text hover:text-theme-text"
                        iconSize={16}
                        showDot={false}
                        parentHover={true}
                      >
                        Acer M509D
                      </StyledLink>
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1.5 text-sm text-theme-muted pl-3 border-l border-theme-timeline-line">
                      <li className="flex items-center">
                        <StyledLink href="https://ubuntu.com/download/server" showDot={true}>
                          Ubuntu Server
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://tailscale.com/" showDot={true}>
                          Tailscale
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://www.navidrome.org/" showDot={true}>
                          Navidrome (Music)
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://jellyfin.org/" showDot={true}>
                          Jellyfin (Movies/Videos)
                        </StyledLink>
                      </li>
                      <li className="flex items-center">
                        <StyledLink href="https://pi-hole.net/" showDot={true}>
                          Pi-Hole (Adblocking)
                        </StyledLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
