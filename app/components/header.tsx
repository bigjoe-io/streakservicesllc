"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


const NAV_LINKS = [
  { label: "Home", href: "#Home" },
  { label: "About ", href: "#about" },
  { label: "Services", href: "#services" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Sticky header bar ── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? "bg-stone-950/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
              : "bg-transparent"
          }
        `}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 md:h-[92px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 z-50"
            aria-label="Home"
          >
            {/* Animated logo mark */}
            <span className="relative flex h-7 w-7 items-center justify-center">
                 
              <span className="absolute inset-0 rounded-md bg-amber-400 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
             
              <span className="relative font-black text-stone-950 text-md leading-none">
                S
              </span>
            </span>
            <span className="font-extrabold tracking-tight text-white text-[24px] leading-none">
              streakservices
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="
                  relative px-4 py-2 text-[16px] font-medium text-stone-300
                  rounded-full
                  hover:text-white hover:bg-white/10
                  transition-colors duration-200
                  after:absolute after:bottom-1.5 after:left-1/2 after:-translate-x-1/2
                  after:w-1 after:h-1 after:rounded-full after:bg-amber-400
                  after:scale-0 hover:after:scale-100 after:transition-transform after:duration-200
                "
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="#contact"
              className="
                group relative inline-flex items-center gap-2
                px-4 py-2 rounded-full
                bg-amber-400 hover:bg-amber-300
                text-stone-950 text-[16px] font-bold
                transition-colors duration-200
                overflow-hidden
              "
            >
              Contact us
              <svg
                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="
              md:hidden z-50 flex flex-col justify-center items-center
              w-9 h-9 rounded-lg
              hover:bg-white/10 transition-colors
              gap-[5px]
            "
          >
            <span
              className={`
                block h-0.5 w-5 bg-white rounded-full
                transition-all duration-300 origin-center
                ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}
              `}
            />
            <span
              className={`
                block h-0.5 w-5 bg-white rounded-full
                transition-all duration-300
                ${menuOpen ? "opacity-0 scale-x-0" : ""}
              `}
            />
            <span
              className={`
                block h-0.5 w-5 bg-white rounded-full
                transition-all duration-300 origin-center
                ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}
              `}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu overlay ── */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          bg-stone-950 flex flex-col
          transition-all duration-400 ease-in-out
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        aria-hidden={!menuOpen}
      >
        {/* Decorative amber blob */}
        <div className="absolute top-1/4 right-0 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl -translate-x-8 pointer-events-none" />

        <nav
          className="flex flex-col justify-center flex-1 px-8 gap-2"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`
                group flex items-center justify-between
                py-4 border-b border-white/10
                text-3xl font-bold tracking-tight text-white
                hover:text-amber-400 transition-colors duration-200
                ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
              style={{
                transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms",
                transitionProperty: "opacity, transform, color",
                transitionDuration: "300ms",
              }}
            >
              {link.label}
              <svg
                className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          ))}

          {/* Mobile CTAs */}
          <div
            className={`
              flex flex-col gap-3 mt-8
              transition-all duration-300
              ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{ transitionDelay: menuOpen ? "340ms" : "0ms" }}
          >
            <Link
              href="#start"
              onClick={() => setMenuOpen(false)}
              className="
                flex items-center justify-center gap-2
                w-full py-3.5 rounded-xl
                bg-amber-400 hover:bg-amber-300
                text-stone-950 font-bold text-base
                transition-colors duration-200
              "
            >
              Contact us
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
            
          </div>
        </nav>
      </div>
    </>
  );
}
