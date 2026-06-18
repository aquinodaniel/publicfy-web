import { useCallback } from 'react';
import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import BlueprintSeam from './components/BlueprintSeam';
import ThreeNightsSection from './components/ThreeNightsSection';
import SystemBuilder from './components/SystemBuilder';
import AboutLeoSection from './components/AboutLeoSection';
import OfferSection from './components/OfferSection';
import FAQSection from './components/FAQSection';
import StickyCTA from './components/StickyCTA';

export default function App() {
  const handleCTA = useCallback(() => {
    const pricing = document.getElementById('pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Em produção: window.location.href = 'URL_DO_CHECKOUT';
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <TopBar onCTAClick={handleCTA} />
      <main>
        <HeroSection onCTAClick={handleCTA} />
        <BlueprintSeam label="Próxima fase" />
        <ThreeNightsSection onCTAClick={handleCTA} />
        <SystemBuilder />
        <BlueprintSeam label="Quem entrega" />
        <AboutLeoSection />
        <OfferSection onCTAClick={handleCTA} />
        <FAQSection />
      </main>
      <StickyCTA onCTAClick={handleCTA} />
    </div>
  );
}
