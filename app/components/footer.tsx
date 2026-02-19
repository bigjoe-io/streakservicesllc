import Link from "next/link";
const FOOTER_LINKS = {
    Services: ["Managed Security", "Managed IT", "SOC Monitoring", "Incident Response", "Zero Trust", "Compliance"],
    Company:  ["About Us", "Careers", "Blog", "Press", "Partners"],
    Legal:    ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"],
  };
  

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
    return (
      <footer className="relative bg-[#060609] border-t border-white/8 overflow-hidden">
  
        {/* Subtle amber glow bottom-left */}
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
  
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
  
          {/* Top row */}
          <div className="grid lg:grid-cols-5 gap-12 pb-12 border-b border-white/8">
  
            {/* Brand col */}
            <div className="lg:col-span-2">
              {/* Logo */}
              <Link href="/" className="group inline-flex items-center gap-2.5 mb-5">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute inset-0 rounded-lg bg-amber-400 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                  <span className="relative font-black text-stone-950 text-sm">S</span>
                </span>
                <span className="font-extrabold tracking-tight text-white text-lg">streakservices</span>
              </Link>
  
              <p className="text-stone-400 text-sm leading-relaxed max-w-xs mb-6">
                Managed IT services and cybersecurity solutions that keep businesses secure, resilient, and running at peak performance.
              </p>
  
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {["twitter", "linkedin", "github"].map((s) => (
                  <a key={s} href="#" aria-label={s}
                    className="w-9 h-9 rounded-lg border border-white/12 bg-white/4 hover:bg-amber-400/15 hover:border-amber-400/30 flex items-center justify-center text-stone-400 hover:text-amber-400 transition-all duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {s === "twitter"  && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>}
                      {s === "linkedin" && <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>}
                      {s === "github"   && <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
  
            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-white text-sm font-bold mb-4 tracking-wide">{heading}</h4>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-200">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* CTA bar
          <div className="my-10 rounded-2xl border border-amber-400/15 bg-amber-400/5 px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div>
              <div className="text-white font-bold text-lg mb-1">Ready to secure your business?</div>
              <div className="text-stone-400 text-sm">Get a free security assessment — no strings attached.</div>
            </div>
            <Link href="#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm transition-colors duration-200 whitespace-nowrap">
              Get Free Assessment
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
   */}
          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 mt-[12px]">
            <span>© {new Date().getFullYear()} nextstudio. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
            
            </div>
          </div>
        </div>
      </footer>
    );
  }
  

  export default function Footers() {
    return (
      <>
       
        <Footer/>
       
      </>
    );
  }