import { useState } from 'react';
import { ThemeProvider } from './utils/ThemeContext';
import { HomeView } from './components/HomeView';
import { CertificationsView } from './components/CertificationsView';
import { TechStackView } from './components/TechStackView';
import { IdolChantView } from './components/IdolChantView';
import { PubmatsView } from './components/PubmatsView';
import { KoncentrateView } from './components/KoncentrateView';
import { DomoDomoView } from './components/DomoDomoView';
import { GearView } from './components/GearView';
import { ThemeToggle } from './components/ThemeToggle';
import { hapticLight } from './utils/haptics';

export default function App() {
  const [view, setView] = useState<'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats' | 'project_koncentrate' | 'project_domodomo' | 'gear'>('home');

  const handleBack = () => {
    hapticLight();
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (targetView: 'home' | 'certifications' | 'tech_stack' | 'project_idol_chant' | 'pubmats' | 'project_koncentrate' | 'project_domodomo' | 'gear') => {
    hapticLight();
    setView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (view) {
      case 'certifications':
        return <CertificationsView onBack={handleBack} />;
      case 'tech_stack':
        return <TechStackView onBack={handleBack} />;
      case 'project_idol_chant':
        return <IdolChantView onBack={handleBack} />;
      case 'pubmats':
        return <PubmatsView onBack={handleBack} />;
      case 'project_koncentrate':
        return <KoncentrateView onBack={handleBack} />;
      case 'project_domodomo':
        return <DomoDomoView onBack={handleBack} />;
      case 'gear':
        return <GearView onBack={handleBack} />;
      case 'home':
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <ThemeToggle />
      {renderView()}
    </ThemeProvider>
  );
}
