import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TechStackSection } from './components/sections/TechStackSection';
import { TeamSection } from './components/sections/TeamSection';
import { ContactSection } from './components/sections/ContactSection';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash;
      setCurrentHash(newHash);
      
      // Only force scroll to top if navigating to a completely new page view
      // Otherwise, let the browser naturally scroll to the section anchor (#services, etc)
      if (['#privacy', '#terms', '', '#'].includes(newHash)) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {currentHash === '#privacy' ? (
          <PrivacyPolicyPage />
        ) : currentHash === '#terms' ? (
          <TermsPage />
        ) : (
          <>
            <HeroSection />
            <ServicesSection />
            <ProjectsSection />
            <TechStackSection />
            <TeamSection />
            <ContactSection />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
