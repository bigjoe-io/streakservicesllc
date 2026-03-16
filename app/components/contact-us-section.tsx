"use client";

import { useState, useRef, useEffect } from "react";

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



export default function ContactSection() {
  const { ref, inView } = useInView(0.1);

  const [form, setForm] = useState({
    name: "", email: "", company: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);


  const mailtoHref = (() => {
    const to = "support@streakservice.com";
    const subject = `Website enquiry from ${form.name || "a visitor"}`;
    const body = [
      "New enquiry from the website:",
      "",
      `Full name: ${form.name || ""}`,
      `Email: ${form.email || ""}`,
      `Company: ${form.company || ""}`,
      "",
      "Message:",
      form.message || "",
    ].join("\n");

    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  })();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#08080f] overflow-hidden py-28 px-6">

      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-amber-400/40 to-transparent" />

      {/* Glows */}
      <div className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.09) 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="pointer-events-none absolute -right-32 top-1/3 w-[450px] h-[450px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.11) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Arc left */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full opacity-10" viewBox="0 0 300 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="-50" cy="450" rx="220" ry="350" stroke="url(#clg)" strokeWidth="1" />
        <defs>
          <linearGradient id="clg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
            <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-amber-400/25 bg-amber-400/8">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let's streamline your{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #FDE68A 0%, #FBBF24 50%, #F59E0B 100%)" }}
            >
              IT & network
            </span>
          </h2>
          <p className="text-stone-400 text-base max-w-xl mx-auto leading-relaxed">
            Reach out for a free consultation or to discuss how our networking, managed IT, and support services can
            back your team.
          </p>
        </div>

        {/* Two-col layout */}
        <div className="flex flex-wrap w-full">

          

          {/* RIGHT — form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"} w-full`}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-8">

              {submitted ? (
                /* Success state */
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-2">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-2xl font-bold">Message Received!</h3>
                  <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
                    Thanks for reaching out. Our team will get back to you within 4 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", service: "", message: "" }); }}
                    className="mt-2 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
                  >
                    Send another message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Row 1 */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Full Name *</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        placeholder="John Smith"
                        className="bg-white/5 border border-white/10 focus:border-amber-400/50 focus:bg-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-stone-600 outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Email Address *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="john@company.com"
                        className="bg-white/5 border border-white/10 focus:border-amber-400/50 focus:bg-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-stone-600 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-1 gap-5 ">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Company</label>
                      <input
                        type="text" name="company" value={form.company} onChange={handleChange}
                        placeholder="Acme Corp"
                        className="bg-white/5 border border-white/10 focus:border-amber-400/50 focus:bg-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-stone-600 outline-none transition-all duration-200"
                      />
                    </div>
                    {/* <div className="flex flex-col gap-1.5">
                      <label className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Service Needed</label>
                      <select
                        name="service" value={form.service} onChange={handleChange}
                        className="bg-white/5 border border-white/10 focus:border-amber-400/50 focus:bg-white/8 rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
                        style={{ color: form.service ? "white" : "rgb(82,82,91)" }}
                      >
                        <option value="" disabled className="bg-[#0e0e1a] text-stone-400">Select a service…</option>
                        {SERVICES_OPTIONS.map((o) => (
                          <option key={o} value={o} className="bg-[#0e0e1a] text-white">{o}</option>
                        ))}
                      </select>
                    </div> */}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Message *</label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your IT, networking, or support needs…"
                      className="bg-white/5 border border-white/10 focus:border-amber-400/50 focus:bg-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-stone-600 outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <a
                    type="submit"
                    // disabled={loading}
                    href={mailtoHref}
                    className="group relative w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-70 text-stone-950 font-bold text-sm transition-all duration-200 overflow-hidden"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </>
                    )}
                  </a>

                 
                 
                  <p className="text-stone-500 text-xs text-center">
                    By submitting, you agree to our{" "}
                    <a href="#" className="text-amber-400/70 hover:text-amber-400 transition-colors">Privacy Policy</a>. We never share your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}