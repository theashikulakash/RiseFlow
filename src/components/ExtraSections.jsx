import { Link } from "react-router-dom";
import { FiCompass, FiEdit3, FiCheckCircle, FiTrendingUp } from "react-icons/fi";

const steps = [
  { icon: FiCompass, title: "Discover", body: "Browse live campaigns by category, deadline, or how close they are to their goal." },
  { icon: FiEdit3, title: "Contribute", body: "Put credits behind a campaign — every contribution starts as pending until the creator confirms it." },
  { icon: FiCheckCircle, title: "Track", body: "Watch your contribution move from pending to approved, with a notification the moment it does." },
  { icon: FiTrendingUp, title: "See it through", body: "Follow the campaign to its deadline and see the impact your credits helped fund." },
];

const categories = [
  { name: "Technologies", count: "Hardware, apps & tools" },
  { name: "Art", count: "Film, music & design" },
  { name: "Community", count: "Local & civic projects" },
  { name: "Health", count: "Care & wellbeing" },
];

const stats = [
  { value: "3", label: "Roles working together" },
  { value: "20", label: "Credits = $1 raised" },
  { value: "10", label: "Credits = $1 spent" },
  { value: "24/7", label: "Campaign tracking" },
];

export const HowItWorks = () => (
  <section className="max-w-6xl mx-auto px-5 py-20">
    <div className="mb-12">
      <span className="text-amber-dark text-sm font-medium">The process</span>
      <h2 className="text-3xl mt-2">How RiseFlow works</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((s, i) => (
        <div key={i} className="relative">
          <s.icon size={28} className="text-teal mb-4" />
          <h3 className="text-lg mb-2">{s.title}</h3>
          <p className="text-sm text-ink/60 leading-relaxed">{s.body}</p>
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-3.5 left-full w-8 border-t border-dashed border-teal/25 -translate-x-4" />
          )}
        </div>
      ))}
    </div>
  </section>
);

export const ExploreByCategory = () => (
  <section className="max-w-6xl mx-auto px-5 py-20">
    <div className="mb-12">
      <span className="text-amber-dark text-sm font-medium">Find your interest</span>
      <h2 className="text-3xl mt-2">Explore by category</h2>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((c) => (
        <Link
          key={c.name}
          to={`/campaigns?category=${encodeURIComponent(c.name)}`}
          className="card p-6 hover:border-teal/40 hover:-translate-y-0.5 transition-all"
        >
          <h3 className="text-lg mb-1">{c.name}</h3>
          <p className="text-sm text-ink/50">{c.count}</p>
        </Link>
      ))}
    </div>
  </section>
);

export const PlatformImpact = () => (
  <section className="bg-ink text-cream py-20">
    <div className="max-w-6xl mx-auto px-5">
      <div className="mb-12">
        <span className="text-amber text-sm font-medium">By the numbers</span>
        <h2 className="text-3xl mt-2">Platform impact</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i}>
            <p className="text-4xl font-display text-amber">{s.value}</p>
            <p className="text-sm text-cream/60 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
