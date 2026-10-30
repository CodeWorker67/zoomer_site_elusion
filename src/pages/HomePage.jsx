import { RouteMeta } from '@components/seo/PageMeta';
import HomeRaffleSection from '@components/sections/HomeRaffleSection';
import HeroSection from '@components/sections/HeroSection';
import Ticker from '@components/sections/Ticker';
import FeaturesSection from '@components/sections/FeaturesSection';
import StepsSection from '@components/sections/StepsSection';
import PricingSection from '@components/sections/PricingSection';
import FaqSection from '@components/sections/FaqSection';
import CtaSection from '@components/sections/CtaSection';
import { HOME_FAQ, ROUTES } from '@utils/constants';

export default function HomePage() {
  return (
    <div style={{ width: '100%', fontFamily: 'Manrope,-apple-system,sans-serif', color: '#0F0F0F' }}>
      <RouteMeta path={ROUTES.HOME} />
      <HomeRaffleSection />
      <HeroSection />
      <Ticker />
      <FeaturesSection />
      <StepsSection />
      <PricingSection />
      <FaqSection items={HOME_FAQ} />
      <CtaSection />
    </div>
  );
}
