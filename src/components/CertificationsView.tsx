"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconArrowUpRight, IconCertificate, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { hapticLight, hapticSelection } from '../utils/haptics';

interface CertificationsViewProps {
  onBack?: () => void;
}

interface Certification {
  title: string;
  issuer: string;
  url: string;
  imageUrl?: string;
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
      }
    ]
  },
  {
    categoryName: "Claude",
    items: [
      {
        title: "Anthropic AI Fluency",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/t9ib9g662pif",
        imageUrl: "/assets/images/certifications/anthropic_ai_fluency.jpg"
      },
      {
        title: "Claude 101",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/a4x6zrxetdwu",
        imageUrl: "/assets/images/certifications/claude_101.png"
      },
      {
        title: "Claude in Action",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/nmwxvt77zodt",
        imageUrl: "/assets/images/certifications/claude_in_action.jpg"
      },
      {
        title: "AI Fluency: Framework and Foundations",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/dc6orjbugk2x"
      },
      {
        title: "Introduction to Claude Cowork",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/rnoxhcmrtjhh"
      },
      {
        title: "AI Capabilities and Limitations",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/mk8mygz99uev"
      },
      {
        title: "AI Fluency for Small Business",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/t7uhsrg24cxn"
      },
      {
        title: "AI Fluency for Educators",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/ygytkkiyqt6q"
      },
      {
        title: "Teaching AI Fluency",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/qx83e5uuizwr"
      },
      {
        title: "AI Fluency for Nonprofits",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/66dqj7g3wyqv"
      },
      {
        title: "AI Fluency for Builders",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/6myco6q3kstp"
      },
      {
        title: "Claude Code 101",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/74uxx4yaqycp"
      },
      {
        title: "Claude Platform 101",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/j9fesk52o3dq"
      },
      {
        title: "Building with the Claude API",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/y84jd29s9gsn"
      },
      {
        title: "Introduction to Model Context Protocol",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/vjyzyh5cfvny"
      },
      {
        title: "Model Context Protocol: Advanced Topics",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/dyswnsfvvbzg"
      },
      {
        title: "Introduction to Agent Skills",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/gdu32o57xbya"
      },
      {
        title: "Introduction to Subagents",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/tcjeh3yqr55r"
      },
      {
        title: "Claude with Amazon Bedrock",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/4iyvjm7y2u9f"
      },
      {
        title: "Claude on Google Cloud",
        issuer: "Anthropic",
        url: "https://verify.skilljar.com/c/p89juuop5r4h"
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

export const CertificationsView: React.FC<CertificationsViewProps> = () => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryName: string) => {
    hapticSelection();
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const INITIAL_LIMIT = 6; // 2x3 grid on desktop

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link 
        className="inline-flex items-center gap-1.5 text-sm text-theme-muted mb-6 hover:text-theme-text transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer animate-fade-in group/back" 
        href="/"
        prefetch={true}
        onClick={hapticLight}
      >
        <IconArrowLeft size={16} className="text-theme-muted group-hover/back:text-theme-text transition-colors" /> Back to Home
      </Link>
      
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
          {categorizedCertifications.map((group, groupIndex) => {
            const isExpanded = !!expandedCategories[group.categoryName];
            const visibleItems = (group.items.length > INITIAL_LIMIT && !isExpanded)
              ? group.items.slice(0, INITIAL_LIMIT)
              : group.items;

            return (
              <div key={groupIndex} className="flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-theme-text border-l-2 border-theme-border-accent pl-3">
                    {group.categoryName}
                  </h2>
                  {group.items.length > INITIAL_LIMIT && (
                    <span className="text-xs text-theme-muted font-mono">
                      Showing {visibleItems.length} of {group.items.length}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleItems.map((cert, certIndex) => (
                    <div 
                      key={certIndex}
                      className="card border border-card-border rounded-xl p-5 flex flex-col justify-between gap-y-4 hover:border-theme-border-accent active:scale-[0.98] transition-all duration-200 transform hover:-translate-y-1 group animate-fade-in"
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

                {group.items.length > INITIAL_LIMIT && (
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => toggleCategory(group.categoryName)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-card-border hover:border-theme-border-accent hover:bg-theme-hover active:scale-[0.97] transition-all duration-200 text-xs font-semibold text-theme-text cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
                      style={{ background: `color-mix(in srgb, var(--theme-card-bg) 60%, transparent)` }}
                    >
                      <span>
                        {isExpanded 
                          ? 'View Less' 
                          : `View More (${group.items.length - INITIAL_LIMIT} more)`}
                      </span>
                      {isExpanded ? (
                        <IconChevronUp size={16} className="text-theme-muted" />
                      ) : (
                        <IconChevronDown size={16} className="text-theme-muted" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
