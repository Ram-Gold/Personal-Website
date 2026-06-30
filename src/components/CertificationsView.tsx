import React from 'react';
import { IconArrowLeft, IconCertificate } from '@tabler/icons-react';

interface CertificationsViewProps {
  onBack: () => void;
}

export const CertificationsView: React.FC<CertificationsViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <a 
        className="inline-flex items-center gap-1.5 text-sm text-neutral-400 mb-4 animate-fade-in hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-pink-500 outline-none rounded p-1 cursor-pointer group/back" 
        href="index.html"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        <IconArrowLeft size={16} className="text-neutral-400 group-hover:text-white transition-colors" /> Back to Home
      </a>
      <div className="card p-4 flex flex-col gap-y-3 animate-fade-in animate-slide-up animation-delay-100">
        <div className="flex items-center gap-2 mb-4 text-white group/cert">
          <IconCertificate size={22} className="text-neutral-400 group-hover/cert:text-pink-500 transition-colors" />
          <p className="font-semibold text-lg">Certifications</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <a 
            href="https://www.datacamp.com/skill-verification/AIF0029525974649"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
          >
            <p className="text-white font-semibold">AI Fundamentals</p>
            <p className="text-neutral-400 text-xs">Datacamp</p>
          </a>
          <a 
            href="https://www.codedex.io/certificates/c54f60ff-af06-41df-953d-a207d913f2d2"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
          >
            <p className="text-white font-semibold">The Origins III: JavaScript</p>
            <p className="text-neutral-400 text-xs">Codédex</p>
          </a>
          <a 
            href="https://www.codedex.io/certificates/705f30b7-b864-4549-98a4-9e27606e7b3c"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card transition-transform duration-200 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-pink-500 outline-none block cursor-pointer"
          >
            <p className="text-white font-semibold">The Origins I: HTML</p>
            <p className="text-neutral-400 text-xs">Codédex</p>
          </a>
        </div>
      </div>
    </div>
  );
};
