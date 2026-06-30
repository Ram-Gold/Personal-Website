import { useState } from 'react';
import { HomeView } from './components/HomeView';
import { CertificationsView } from './components/CertificationsView';
import { TechStackView } from './components/TechStackView';
import { IdolChantView } from './components/IdolChantView';
import { PubmatsView } from './components/PubmatsView';

export default function App() {
  const [view, setView] = useState<'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats'>('home');

  const handleBack = () => {
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (targetView: 'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats') => {
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  switch (view) {
    case 'certifications':
      return <CertificationsView onBack={handleBack} />;
    case 'tech_stack':
      return <TechStackView onBack={handleBack} />;
    case 'project_idol_chant':
      return <IdolChantView onBack={handleBack} />;
    case 'pubmats':
      return <PubmatsView onBack={handleBack} />;
    case 'home':
    default:
      return <HomeView onNavigate={handleNavigate} />;
  }
}
