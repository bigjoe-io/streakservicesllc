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
  { value: "500+", label: "Clients Protected" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "SOC Monitoring" },
  { value: "< 4 min", label: "Avg. Response Time" },
];

const SERVICES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Managed Security",
    desc: "End-to-end security management with real-time threat detection, incident response, and compliance reporting across your entire infrastructure.",
    tag: "Core Service",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: "Managed IT Services",
    desc: "Proactive IT management, helpdesk support, patch management, and infrastructure optimization so your team can focus on what matters.",
    tag: "Infrastructure",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "24/7 SOC Monitoring",
    desc: "Our Security Operations Center watches your environment around the clock — detecting anomalies, neutralizing threats before they escalate.",
    tag: "Always On",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Incident Response",
    desc: "Rapid containment, forensic analysis, and full recovery support when a breach occurs — minimising downtime and business impact.",
    tag: "Response",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: "Zero Trust Architecture",
    desc: "Design and deploy identity-first, least-privilege access models that assume breach and verify every request, user, and device.",
    tag: "Architecture",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: "Compliance & Auditing",
    desc: "Navigate ISO 27001, SOC 2, GDPR, HIPAA and more with guided assessments, gap analysis, and audit-ready documentation.",
    tag: "Compliance",
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
            Technology that{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)" }}>
              protects &amp; performs
            </span>
          </h2>

          <p className="text-stone-400 text-base leading-relaxed mb-5">
            We deliver managed IT services and cybersecurity solutions that keep businesses secure, resilient, and running at peak performance. Our team provides proactive IT management, 24/7 monitoring, and advanced security to protect systems, data, and operations.
          </p>
          <p className="text-stone-400 text-base leading-relaxed mb-8">
            By aligning technology with business goals, we reduce risk, strengthen infrastructure, and help organizations scale with confidence. We act as a trusted extension of our clients' teams — offering dependable support, strategic guidance, and peace of mind in an evolving threat landscape.
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
              <div className="text-white font-semibold text-sm mb-0.5">Trusted partner, not just a vendor</div>
              <div className="text-stone-400 text-xs leading-relaxed">We embed within your team, aligning security strategy with your business objectives.</div>
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
            A full spectrum of managed IT and cybersecurity services built for modern businesses navigating a complex threat landscape.
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