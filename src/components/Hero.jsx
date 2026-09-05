import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    eyebrow: "For makers & organizers",
    title: "Give a good idea its first hundred backers",
    body: "Launch a campaign, tell your story, and let a community of supporters carry it forward — credit by credit.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "For supporters",
    title: "Put your credits behind work you believe in",
    body: "Browse campaigns across technology, art, health and community projects, and track every contribution you make.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    eyebrow: "Transparent, always",
    title: "Every raise, reviewed and accounted for",
    body: "Campaigns are approved before they go live, and every withdrawal is tracked from raised credit to paid dollar.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1600&auto=format&fit=crop",
  },
];

const Hero = () => (
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{ delay: 5500, disableOnInteraction: false }}
    loop
    className="h-[520px] md:h-[580px]"
  >
    {slides.map((s, i) => (
      <SwiperSlide key={i}>
        <div className="relative h-full w-full">
          <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-ink/10" />
          <div className="relative h-full max-w-6xl mx-auto px-5 flex items-center">
            <div className="max-w-xl animate-[fadeUp_0.8s_ease-out]">
              <span className="text-amber text-sm font-medium tracking-wide">{s.eyebrow}</span>
              <h1 className="text-cream text-4xl md:text-5xl leading-tight mt-3 mb-5">
                {s.title}
              </h1>
              <p className="text-cream/80 text-base md:text-lg mb-7">{s.body}</p>
              <div className="flex gap-3">
                <Link to="/campaigns" className="btn-amber">Explore campaigns</Link>
                <Link to="/register" className="bg-transparent border border-cream/40 text-cream px-5 py-2.5 rounded-md font-medium hover:bg-cream/10 transition-colors">
                  Start a campaign
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default Hero;
