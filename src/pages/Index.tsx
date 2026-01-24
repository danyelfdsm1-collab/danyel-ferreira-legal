import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PracticeAreasSection } from '@/components/home/PracticeAreasSection';
import { AIPreviewSection } from '@/components/home/AIPreviewSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <HowItWorksSection />
      <PracticeAreasSection />
      <AIPreviewSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
