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
  { value: "13", label: "Roles working together" },
  { value: "210", label: "Credits = $1 raised" },
  { value: "180", label: "Credits = $1 spent" },
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
  <section className="bg-teal-light/50 text-cream py-20">
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

    <div className="max-w-6xl mx-auto px-5 mt-16">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] items-center gap-8">
          <div>
            <span className="text-amber text-sm font-medium">Why it matters</span>
            <h3 className="text-3xl mt-2">Ideas get resources, not just attention.</h3>
            <p className="mt-4 text-base text-cream/70 leading-relaxed">
              RiseFlow helps creators turn early momentum into real support. Instead of chasing scattered donations,
              they gain a clear path to funding, updates, and community trust. Supporters can back projects they believe in,
              track progress, and see the outcomes of each contribution in a transparent system.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-teal/10 border border-teal/20 p-5">
              <p className="text-sm text-amber font-medium">For creators</p>
              <p className="mt-2 text-sm text-cream/75">Launch faster, validate demand, and keep supporters engaged through every milestone.</p>
            </div>
            <div className="rounded-2xl bg-amber/10 border border-amber/20 p-5">
              <p className="text-sm text-amber font-medium">For supporters</p>
              <p className="mt-2 text-sm text-cream/75">Back meaningful ideas with confidence, monitor progress, and help turn local momentum into public impact.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
