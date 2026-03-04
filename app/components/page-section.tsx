"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


/* ─────────────────────────────────────────
   HOOK: simple intersection observer
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { value: "250+", label: "Businesses Supported" },
  { value: "99.9%", label: "Network Uptime" },
  { value: "24/7", label: "Monitoring & Support" },
  { value: "< 4 min", label: "Avg. Helpdesk Response" },
];

const SERVICES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 7.5l8.25-4.5 8.25 4.5-8.25 4.5-8.25-4.5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 12l8.25 4.5 8.25-4.5M3.75 16.5L12 21l8.25-4.5"
        />
      </svg>
    ),
    title: "Networking Services",
    desc: "Design, deploy, and maintain secure, high‑performance networks across your offices, branches, and remote teams.",
    tag: "Networking",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    ),
    title: "Managed IT Services",
    desc: "Proactive IT management, patching, and monitoring for servers, endpoints, and cloud so your team can focus on the business.",
    tag: "Managed IT",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 14.25a3.75 3.75 0 11-7.5 0M9.75 9A3.75 3.75 0 1118 9M4.5 19.5a4.5 4.5 0 019 0M3 9a3.75 3.75 0 107.5 0A3.75 3.75 0 003 9z"
        />
      </svg>
    ),
    title: "Customer IT Support",
    desc: "Friendly helpdesk and on‑site support for your staff—solving day‑to‑day IT issues quickly and keeping everyone productive.",
    tag: "Support",
  },
];


/* ─────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────── */
function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative bg-[#08080f] overflow-hidden py-28 px-6">

      {/* Amber left glow */}
      <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 70%)", filter: "blur(70px)" }} />
      {/* Amber right glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 w-[480px] h-[480px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.13) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
      >

        {/* LEFT — text */}
        <div className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Who We Are</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-6">
            IT that{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)" }}
            >
              connects &amp; supports
            </span>
          </h2>

          <p className="text-stone-400 text-base leading-relaxed mb-5">
            We deliver networking and managed IT services that keep your infrastructure stable, fast, and ready for
            growth. From switches and Wi‑Fi to servers and cloud, we design and run the backbone your business relies
            on.
          </p>
          <p className="text-stone-400 text-base leading-relaxed mb-8">
            By aligning technology with your operations, we reduce downtime, simplify day‑to‑day IT, and give your team
            a single partner for questions, projects, and support.
          </p>

          <Link href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors duration-200">
            Work with us
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* RIGHT — stats grid */}
        <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}>
          {STATS.map((s, i) => (
            <div key={i}
              className="relative group rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] p-7 transition-all duration-300 overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}>

              {/* Amber corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 0 0, rgba(251,191,36,0.2) 0%, transparent 70%)" }} />

              <div className="text-3xl font-extrabold text-amber-400 mb-1 tracking-tight">{s.value}</div>
              <div className="text-stone-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}

          {/* Wide card */}
          <div className="col-span-2 rounded-2xl border border-amber-400/15 bg-amber-400/5 p-6 flex items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center text-amber-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-0.5">Trusted IT partner, not just a vendor</div>
              <div className="text-stone-400 text-xs leading-relaxed">
                We embed within your team, shaping networking and IT decisions around your business objectives.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────── */
function ServicesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="services" className="relative bg-[#08080f] overflow-hidden py-28 px-6">

      {/* Top divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />

      {/* Center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(251,191,36,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">What We Do</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
            Three core services—Networking, Managed IT Services, and Customer IT Support—built to keep your business
            connected and productive.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-white/8 bg-white/[0.025] hover:bg-white/[0.05] hover:border-amber-400/25 p-7 transition-all duration-400 overflow-hidden cursor-pointer
                ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Hover amber glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 0%, rgba(251,191,36,0.08) 0%, transparent 60%)" }} />

              {/* Top line accent */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent group-hover:via-amber-400/50 transition-all duration-400" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-400/20 transition-colors duration-300">
                {svc.icon}
              </div>

              {/* Tag */}
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500/70 mb-2 block">{svc.tag}</span>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-3 leading-tight">{svc.title}</h3>

              {/* Desc */}
              <p className="text-stone-400 text-sm leading-relaxed">{svc.desc}</p>

              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1.5 text-amber-400 text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────
   DEFAULT EXPORT — all three together
───────────────────────────────────────── */
export default function PageSections() {
  return (
    <>
      <AboutSection />
      <ServicesSection />
     
    </>
  );
}