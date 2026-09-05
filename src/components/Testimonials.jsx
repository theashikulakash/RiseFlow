import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Amara Osei",
    role: "Backed 6 campaigns",
    photo: "https://i.pravatar.cc/100?img=32",
    quote:
      "I found a community garden project two streets from mine and watched it hit its goal in three weeks. Seeing my credits actually move a number made it real.",
  },
  {
    name: "Devraj Malhotra",
    role: "Creator, solar water pumps",
    photo: "https://i.pravatar.cc/100?img=12",
    quote:
      "The review step before a campaign goes live felt strict at first, but it meant supporters trusted us immediately once we were approved.",
  },
  {
    name: "Lucia Ferreira",
    role: "Backed 14 campaigns",
    photo: "https://i.pravatar.cc/100?img=47",
    quote:
      "Getting a notification the moment my contribution was approved, with the exact credit amount, is such a small thing that made me trust the platform more.",
  },
];

const Testimonials = () => (
  <section className="bg-teal-light/50 py-20">
    <div className="max-w-4xl mx-auto px-5">
      <div className="text-center mb-10">
        <span className="text-amber-dark text-sm font-medium">From the community</span>
        <h2 className="text-3xl mt-2">What backers and creators say</h2>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 6000 }}
        pagination={{ clickable: true }}
        className="pb-12"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="card p-10 text-center">
              <img src={t.photo} alt={t.name} className="h-16 w-16 rounded-full mx-auto mb-5 object-cover" />
              <p className="text-lg text-ink/80 italic mb-5">"{t.quote}"</p>
              <p className="font-semibold">{t.name}</p>
              <p className="text-sm text-ink/50">{t.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default Testimonials;
