import React from 'react';
import { IconArrowLeft, IconArrowUpRight, IconCertificate } from '@tabler/icons-react';

interface CertificationsViewProps {
  onBack: () => void;
}

interface Certification {
  title: string;
  issuer: string;
  url: string;
  isImageLink?: boolean;
}

interface CategoryGroup {
  categoryName: string;
  items: Certification[];
}

const categorizedCertifications: CategoryGroup[] = [
  {
    categoryName: "Artificial Intelligence",
    items: [
      {
        title: "AI Engineer for Developers Associate",
        issuer: "Datacamp",
        url: "https://www.datacamp.com/certificate/AIEDA0017163812667"
      },
      {
        title: "AI Fundamentals",
        issuer: "Datacamp",
        url: "https://www.datacamp.com/skill-verification/AIF0029525974649"
      },
      {
        title: "Anthropic AI Fluency",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/t9ib9g662pif"
      }
    ]
  },
  {
    categoryName: "Web Development",
    items: [
      {
        title: "The Origins III: JavaScript",
        issuer: "Codédex",
        url: "https://www.codedex.io/certificates/c54f60ff-af06-41df-953d-a207d913f2d2"
      },
      {
        title: "The Origins I: HTML",
        issuer: "Codédex",
        url: "https://www.codedex.io/certificates/705f30b7-b864-4549-98a4-9e27606e7b3c"
      }
    ]
  },
  {
    categoryName: "IT & System Administration",
    items: [
      {
        title: "System Administration and IT Infrastructure Services",
        issuer: "Google (via Coursera)",
        url: "https://www.coursera.org/account/accomplishments/verify/5PYDS4SXI81S"
      },
      {
        title: "Operating Systems: Overview, Administration, and Security",
        issuer: "Google (via Coursera)",
        url: "https://www.coursera.org/account/accomplishments/verify/HYCSR8DB3KWC?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course"
      }
    ]
  },
  {
    categoryName: "Hackathons & Achievements",
    items: [
      {
        title: "ASEAN AI Hackathon 2026 Certificate",
        issuer: "Contact ASEAN / P2A",
        url: "https://contactasean.org/@connect?view=certificate&tab=verify&code=P2A2026AI0409"
      },
      {
        title: "KadaKareer x Home Credit Hackathon Certificate",
        issuer: "KadaKareer x Home Credit",
        url: "/assets/images/certifications/HacKadaKareer.jpg",
        isImageLink: true
      }
    ]
  }
];

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

export const CertificationsView: React.FC<CertificationsViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a 
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-6 hover:text-theme-text transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back" 
        href="index.html"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <IconArrowLeft size={16} className="text-theme-muted group-hover/back:text-theme-text transition-colors" /> Back to Home
      </a>
      
      <div className="card p-6 md:p-8 flex flex-col gap-y-6 animate-fade-in animate-slide-up animation-delay-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-card-border pb-6">
          <div className="flex items-center gap-3">
            <IconCertificate size={24} className="text-theme-muted" />
            <div>
              <h1 className="font-bold text-2xl text-theme-text">Certifications</h1>
              <p className="text-theme-muted text-sm mt-1">Courses, hackathons, and technical achievements</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-8">
          {categorizedCertifications.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-y-4">
              <h2 className="text-lg font-semibold text-theme-text border-l-2 border-theme-border-accent pl-3">
                {group.categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((cert, certIndex) => (
                  <div 
                    key={certIndex}
                    className="card border border-card-border rounded-xl p-5 flex flex-col justify-between gap-y-4 hover:border-theme-border-accent transition-all duration-300 transform hover:-translate-y-1 group"
                    style={{ boxShadow: `0 4px 20px var(--theme-shadow)` }}
                  >
                    {/* Certificate Details */}
                    <div className="flex flex-col gap-y-1">
                      <h3 className="font-semibold text-theme-text text-base leading-snug group-hover:text-theme-text transition-colors duration-200">
                        {cert.title}
                      </h3>
                      <p className="text-theme-muted text-xs">{cert.issuer}</p>
                    </div>
                    
                    <div className="mt-auto pt-2 border-t border-card-border">
                      <StyledLink 
                        href={cert.url}
                        className="text-theme-muted hover:text-theme-text text-xs"
                        parentHover={true}
                      >
                        {cert.isImageLink ? 'View Certificate Image' : 'Verify Certificate'}
                      </StyledLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
