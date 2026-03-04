"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    alt: "Business network infrastructure",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
    alt: "IT specialists managing servers",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
    alt: "Enterprise network operations center",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    alt: "Team providing remote IT support",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "Customer support team assisting client",
  },
];

const TOTAL = SLIDES.length;

function getCardStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  const sign = Math.sign(offset);

  const xOffsets = [0, 290, 535];
  const scales  = [1, 0.78, 0.52];
  const heights = [420, 330, 240];
  const widths  = [270, 210, 130];

  const x       = sign * (xOffsets[abs] ?? 620);
  const scale   = scales[abs]  ?? 0.35;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.58;
  const zIndex  = 10 - abs * 3;
  const h       = heights[abs] ?? 180;
  const w       = widths[abs]  ?? 100;

  return {
    position:   "absolute",
    left:       "50%",
    top:        "50%",
    width:      w,
    height:     h,
    transform:  `translate(calc(-50% + ${x}px), -50%) scale(${scale})`,
    opacity,
    zIndex,
    transition: "all 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    pointerEvents: abs > 1 ? "none" : "auto",
  };
}

export default function HeroWithSlider() {
  const [active, setActive]   = useState(2);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoRef    = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setActive((a) => (a + 1) % TOTAL), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + TOTAL) % TOTAL), []);

  useEffect(() => {
    autoRef.current = setInterval(next, 4000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(next, 4000);
  };

  const handlePrev = () => { prev(); resetAuto(); };
  const handleNext = () => { next(); resetAuto(); };

  const onDragStart = (clientX: number) => { setDragging(true); dragStartX.current = clientX; };
  const onDragEnd   = (clientX: number) => {
    if (!dragging) return;
    setDragging(false);
    const diff = dragStartX.current - clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
  };

  return (
    <section className="relative w-full min-h-screen  overflow-hidden flex flex-col">

      {/* ════════════════════════════════
          BACKGROUND ATMOSPHERE
      ════════════════════════════════ */}

      {/* Left blue glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Right purple glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 w-[580px] h-[580px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(217,119,6,0.25)0%, rgba(90,10,140,0.12) 55%, transparent 70%)", filter: "blur(55px)" }} />

      {/* Bottom center glow under slider */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]"
        style={{ background: "radial-gradient(ellipse, rgba(100,30,180,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Left arc SVG */}
      <svg className="pointer-events-none absolute left-0 top-0 h-full opacity-20" viewBox="0 0 300 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="-50" cy="420" rx="230" ry="360" stroke="url(#lg)" strokeWidth="1" />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0" />
            <stop offset="45%" stopColor="#FBBF24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Right arc SVG */}
      <svg className="pointer-events-none absolute right-0 top-0 h-full opacity-28" viewBox="0 0 300 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="360" cy="440" rx="270" ry="400" stroke="url(#rg)" strokeWidth="1" />
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0" />
            <stop offset="48%" stopColor="#F97316" stopOpacity="1" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Scanline texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)", backgroundSize: "100% 3px" }} />

      {/* ════════════════════════════════
          HERO TEXT
      ════════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center text-center pt-38 pb-16 px-6">

        {/* Eyebrow badge */}
        {/* <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse" />
          <span className="text-[#FBBF24] text-xs font-semibold tracking-widest uppercase">Threat Detection Active</span>
        </div> */}

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[60px] font-extrabold text-white leading-[1.08] tracking-tight max-w-5xl mb-6 ">
          Networking, and IT services,{" "}
          <span className="relative inline-block">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #ca4413 100%)" }}
            >
              tailored to your business
            </span>
          </span>
        </h1>

        {/* Sub text */}
        <p className="text-stone-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
          Our team designs, monitors, and supports your networks, devices, and users so your business can run
          reliably without downtime or IT headaches.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-stone-100 text-stone-950 font-semibold text-sm transition-colors duration-200">
            Contact us
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </Link>

          <Link href="#video"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/20 hover:border-white/40 text-white font-medium text-sm transition-colors duration-200">
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/40 group-hover:border-white/70 transition-colors">
              <svg className="w-2.5 h-2.5 translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Learn more 
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════
          IMAGE SLIDER
      ════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-10">

        {/* Stage */}
        <div
          className="relative w-full mx-auto"
          style={{ height: 480 }}
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseUp={(e) => onDragEnd(e.clientX)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
        >
          {SLIDES.map((slide, i) => {
            let offset = i - active;
            if (offset > Math.floor(TOTAL / 2)) offset -= TOTAL;
            if (offset < -Math.floor(TOTAL / 2)) offset += TOTAL;

            const style = getCardStyle(offset);
            const isCenter = offset === 0;

            return (
              <div
                key={slide.id}
                style={style}
                onClick={() => { if (!isCenter) { setActive(i); resetAuto(); } }}
                className={`cursor-pointer`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl"
                  style={{
                    boxShadow: isCenter
                      ? "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(251,191,36,0.15)"
                      : "0 20px 60px rgba(251,191,36,0.15)",
                  }}>
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0"
                    style={{
                      background: isCenter
                        ? "linear-gradient(to bottom, rgba(8,8,15,0) 40%, rgba(0, 0, 0, 0.5) 100%)"
                        : "linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%)",
                    }} />

                  {/* Cyan scan line on active */}
                  {isCenter && (
                    <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.15), transparent)", animation: "scanDown 3s ease-in-out infinite" }} />
                  )}

                  {/* Active glow ring */}
                  {isCenter && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: "inset 0 0 0 1.5px rgba(251,191,36,0.15)" }} />
                  )}

                  {/* Corner brackets on center */}
                  {isCenter && (
                    <>
                      <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cyan-400/60 rounded-tl" />
                      <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-cyan-400/60 rounded-tr" />
                      <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-cyan-400/60 rounded-bl" />
                      <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-cyan-400/60 rounded-br" />
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="relative z-20 flex items-center justify-center gap-5 mt-6">
          <button onClick={handlePrev} aria-label="Previous"
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 backdrop-blur-sm">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setActive(i); resetAuto(); }} aria-label={`Slide ${i + 1}`}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{ width: i === active ? 28 : 6, background: i === active ? "rgba(150,180,255,0.9)" : "rgba(255,255,255,0.2)" }}>
                {i === active && (
                  <span className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: "rgba(0, 0, 0, 0.3)", animation: "progressFill 4s linear infinite" }} />
                )}
              </button>
            ))}
          </div>

          <button onClick={handleNext} aria-label="Next"
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white transition-all duration-200 backdrop-blur-sm">
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          from { width: 0% }
          to   { width: 100% }
        }
        @keyframes scanDown {
          0%   { top: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}