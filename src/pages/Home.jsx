import Hero from "../components/Hero.jsx";
import TopFundedCampaigns from "../components/TopFundedCampaigns.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { HowItWorks, ExploreByCategory, PlatformImpact } from "../components/ExtraSections.jsx";

const Home = () => (
  <div>
    <Hero />
    <TopFundedCampaigns />
    <HowItWorks />
    <Testimonials />
    <ExploreByCategory />
    <PlatformImpact />
  </div>
);

export default Home;
