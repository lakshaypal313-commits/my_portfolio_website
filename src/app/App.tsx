import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  Menu, X, ArrowRight, Send, ExternalLink,
  Layers, Monitor, Smartphone, PenTool, Figma,
  Mail, MapPin, Briefcase, Award, Zap,
  ChevronRight, Star, Layout, MousePointer2, Grid, Phone,
  Sun, Moon,
} from "lucide-react";
import { clsx } from "clsx";

const cn = (...args: Parameters<typeof clsx>) => clsx(...args);

// ─── Floating icon bubble ───────────────────────────────────────────────────
function FloatingIcon({
  children, className = "", delay = 0, duration = 6, bgStyle,
}: { children: React.ReactNode; className?: string; delay?: number; duration?: number; bgStyle?: React.CSSProperties }) {
  return (
    <motion.div
      className={cn(
        "absolute flex items-center justify-center rounded-2xl backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        className,
      )}
      style={bgStyle}
      animate={{ y: [-12, 12, -12], rotate: [-4, 4, -4] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scroll-reveal wrapper ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ───────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    const start = Date.now();
    const dur = 2000;
    const tick = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(eased * end));
      if (p >= 1) clearInterval(tick);
    }, 16);
    return () => clearInterval(tick);
  }, [isInView, end]);
  return <span ref={ref}>{value}{suffix}</span>;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home", "About", "Services", "Resume", "Projects", "Contact"];

const SERVICES = [
  {
    icon: <Figma size={26} />,
    title: "UI/UX Design",
    desc: "End-to-end product design from research and wireframes to polished high-fidelity interfaces that users love.",
    gradFrom: "from-orange-500/20", gradTo: "to-orange-600/5",
    border: "border-orange-500/30 hover:border-orange-400/60",
    iconBg: "bg-orange-500/20 text-orange-400",
  },
  {
    icon: <Smartphone size={26} />,
    title: "Mobile App Design",
    desc: "Native iOS and Android experiences with intuitive flows, gesture patterns, and pixel-perfect visuals.",
    gradFrom: "from-sky-500/20", gradTo: "to-sky-600/5",
    border: "border-sky-500/30 hover:border-sky-400/60",
    iconBg: "bg-sky-500/20 text-sky-400",
  },
  {
    icon: <Monitor size={26} />,
    title: "Website Design",
    desc: "Conversion-focused landing pages and full product websites designed with intent and precision.",
    gradFrom: "from-purple-500/20", gradTo: "to-purple-600/5",
    border: "border-purple-500/30 hover:border-purple-400/60",
    iconBg: "bg-purple-500/20 text-purple-400",
  },
  {
    icon: <Layers size={26} />,
    title: "Wireframing & Prototyping",
    desc: "Interactive prototypes and structured wireframes that validate concepts before a single line of code is written.",
    gradFrom: "from-emerald-500/20", gradTo: "to-emerald-600/5",
    border: "border-emerald-500/30 hover:border-emerald-400/60",
    iconBg: "bg-emerald-500/20 text-emerald-400",
  },
];

const EXPERIENCES = [
  {
    role: "UI/UX Designer",
    company: "Truncate Technology",
    period: "2022 – Present",
    desc: "Leading design for B2B SaaS products. Established the design system, improved onboarding conversion by 38%, and shipped 12 major product features.",
    tags: ["Figma", "Design System", "User Research"],
    accent: "orange",
  },
  {
    role: "Website & Mobile App Designer",
    company: "Freelance",
    period: "2021 – 2022",
    desc: "Designed websites and mobile applications for 8+ clients across e-commerce, fintech, and healthcare sectors with a focus on conversion and clarity.",
    tags: ["Mobile Design", "Web Design", "Prototyping"],
    accent: "sky",
  },
  {
    role: "E-commerce UI Designer",
    company: "Digital Commerce Studio",
    period: "2020 – 2021",
    desc: "Redesigned product pages and checkout flows, resulting in a 24% increase in conversion rate and a 40% drop in cart abandonment.",
    tags: ["E-commerce", "Conversion Optimisation", "A/B Testing"],
    accent: "purple",
  },
];

const PROJECTS = [
  { title: "Bike Rental App", cat: "Mobile App Design", tags: ["iOS", "UX Research", "Figma"], g: "from-orange-600 via-orange-500 to-amber-400", year: "2024" },
  { title: "Taxi Booking Website", cat: "Web Design", tags: ["Web", "Dashboard", "Design System"], g: "from-sky-600 via-blue-500 to-indigo-400", year: "2024" },
  { title: "Perfskin Website UI", cat: "Website Design", tags: ["Landing Page", "Branding", "Webflow"], g: "from-purple-600 via-violet-500 to-pink-400", year: "2023" },
  { title: "ClickURL Marketing", cat: "Marketing Design", tags: ["Marketing", "SaaS", "Figma"], g: "from-emerald-600 via-green-500 to-teal-400", year: "2023" },
  { title: "E-commerce App Redesign", cat: "Mobile App Design", tags: ["iOS", "Android", "UX Audit"], g: "from-rose-600 via-red-500 to-orange-400", year: "2023" },
];

const SKILL_GROUPS = [
  {
    category: "Design Tools",
    items: [
      { name: "Figma", bars: 5 }, { name: "Adobe XD", bars: 4 },
      { name: "Sketch", bars: 4 }, { name: "Zeplin", bars: 4 }, { name: "InVision", bars: 3 },
    ],
  },
  {
    category: "Design Skills",
    items: [
      { name: "Auto Layout", bars: 5 }, { name: "Components", bars: 5 },
      { name: "Design System", bars: 5 }, { name: "Prototyping", bars: 4 }, { name: "Responsive Design", bars: 5 },
    ],
  },
  {
    category: "UX Methods",
    items: [
      { name: "UX Research", bars: 4 }, { name: "User Flow", bars: 5 },
      { name: "Wireframes", bars: 5 }, { name: "Usability Testing", bars: 4 }, { name: "Info Architecture", bars: 4 },
    ],
  },
];

const SKILL_TAGS = [
  { name: "Figma", tier: "a" }, { name: "Auto Layout", tier: "a" }, { name: "Components", tier: "a" },
  { name: "Prototyping", tier: "b" }, { name: "UX Research", tier: "b" }, { name: "User Flow", tier: "b" },
  { name: "Wireframes", tier: "b" }, { name: "Design System", tier: "a" }, { name: "Responsive Design", tier: "a" },
  { name: "Usability Testing", tier: "b" }, { name: "Motion Design", tier: "c" }, { name: "Brand Identity", tier: "c" },
];

// ─── Profile SVG avatar ──────────────────────────────────────────────────────
function AvatarSVG({ size = 280, isDark = true }: { size?: number; isDark?: boolean }) {
  return (
    <svg viewBox="0 0 280 280" width={size} height={size} aria-label="Lakshya Pal portrait illustration">
      <defs>
        <radialGradient id="avBg" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor={isDark ? "#1e1040" : "#e8e0f8"} />
          <stop offset="100%" stopColor={isDark ? "#08080f" : "#d8eeff"} />
        </radialGradient>
        <radialGradient id="avSkin" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#f4a571" />
          <stop offset="100%" stopColor="#d97f50" />
        </radialGradient>
        <linearGradient id="avShirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id="avGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="280" height="280" fill="url(#avBg)" />
      {/* Glow circle */}
      <circle cx="140" cy="260" r="130" fill="url(#avGlow)" />
      {/* Shirt */}
      <path d="M 70 280 C 70 220 100 205 140 200 C 180 205 210 220 210 280 Z" fill="url(#avShirt)" />
      {/* Collar detail */}
      <path d="M 124 200 L 140 218 L 156 200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
      {/* Neck */}
      <rect x="126" y="178" width="28" height="26" rx="12" fill="url(#avSkin)" />
      {/* Head */}
      <ellipse cx="140" cy="148" rx="46" ry="52" fill="url(#avSkin)" />
      {/* Hair top */}
      <path d="M 94 140 C 94 94 186 94 186 140 C 186 108 180 88 140 84 C 100 88 94 108 94 140 Z" fill="#150800" />
      {/* Hair sides */}
      <path d="M 94 132 C 90 124 89 150 94 162" stroke="#150800" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M 186 132 C 190 124 191 150 186 162" stroke="#150800" strokeWidth="9" fill="none" strokeLinecap="round" />
      {/* Left eye */}
      <ellipse cx="122" cy="148" rx="8" ry="9" fill="#150800" />
      <circle cx="125" cy="144" r="3" fill="white" opacity="0.9" />
      {/* Right eye */}
      <ellipse cx="158" cy="148" rx="8" ry="9" fill="#150800" />
      <circle cx="161" cy="144" r="3" fill="white" opacity="0.9" />
      {/* Eyebrows */}
      <path d="M 112 136 Q 122 130 132 136" stroke="#150800" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 148 136 Q 158 130 168 136" stroke="#150800" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Nose */}
      <path d="M 140 154 Q 136 164 139 167 Q 141 168 143 167 Q 146 164 140 154" fill="#c07040" opacity="0.55" />
      {/* Smile */}
      <path d="M 128 176 Q 140 186 152 176" stroke="#b06030" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Ear left */}
      <ellipse cx="94" cy="152" rx="7" ry="10" fill="url(#avSkin)" />
      {/* Ear right */}
      <ellipse cx="186" cy="152" rx="7" ry="10" fill="url(#avSkin)" />
    </svg>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [sent, setSent] = useState(false);

  const bg = isDark ? "#08080f" : "#f8f7f4";
  const fg = isDark ? "#f0f0f8" : "#0f0e0c";
  const cardBg = isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.04)";
  const borderCol = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)";
  const mutedText = isDark ? "rgba(240,240,248,0.45)" : "rgba(15,14,12,0.5)";
  const subtleText = isDark ? "rgba(240,240,248,0.25)" : "rgba(15,14,12,0.35)";
  const navBg = isDark ? "rgba(0,0,0,0.5)" : "rgba(248,247,244,0.85)";
  const navBorder = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)";
  const inputBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
  const inputBorder = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.12)";
  const sectionAlt = isDark ? "#0d0d18" : "#f0ede8";
  const orb1Op = isDark ? "0.18" : "0.12";
  const orb2Op = isDark ? "0.14" : "0.10";

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", projectType: "", message: "" });
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden selection:bg-orange-500/30 transition-colors duration-500"
      style={{ fontFamily: "'Urbanist', sans-serif", background: bg, color: fg }}
    >
      {/* ── Global ambient orbs ── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, #f97316, transparent 68%)", opacity: orb1Op }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, #38bdf8, transparent 68%)", opacity: orb2Op }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full transition-opacity duration-500"
          style={{ background: "radial-gradient(circle, #a855f7, transparent 70%)", opacity: isDark ? "0.08" : "0.06" }} />
      </div>

      {/* ════════════════════════ NAVBAR ════════════════════════ */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(24px)" : undefined,
          background: scrolled ? navBg : "transparent",
          borderBottom: scrolled ? `1px solid ${navBorder}` : "none",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-black tracking-tighter cursor-pointer select-none"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            onClick={() => scrollTo("home")}
          >
            <span className="text-[#f97316]">L</span>
            <span style={{ color: fg }}>P</span>
            <span className="text-[#f97316]">.</span>
          </motion.div>

          {/* Desktop links */}
          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-xl relative group"
                style={{ color: mutedText }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = mutedText)}
              >
                {link}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-[#f97316] transition-all duration-300 group-hover:w-4 rounded-full" />
              </button>
            ))}
          </motion.div>

          {/* CTA + theme toggle + hamburger */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Theme toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300"
              style={{
                background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
                color: isDark ? "#f0f0f8" : "#0f0e0c",
              }}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </motion.div>
            </motion.button>

            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f97316] text-white text-sm font-bold transition-all duration-300 hover:bg-[#ea6b0c] hover:shadow-[0_0_24px_rgba(249,115,22,0.45)] hover:-translate-y-px"
            >
              Hire Me
            </button>
            <button
              className="md:hidden p-2"
              style={{ color: fg }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full inset-x-0 backdrop-blur-2xl border-b px-6 pb-6 pt-4"
            style={{ background: navBg, borderColor: navBorder }}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left px-4 py-3 rounded-xl transition-colors font-semibold"
                  style={{ color: mutedText }}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 py-3 rounded-xl bg-[#f97316] text-white font-bold text-center"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center pt-20" style={{ position: "relative", clipPath: "inset(0)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden />
        <motion.div
          className="max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* ── Left ── */}
          <div className="space-y-8 z-10">
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#f97316]/40 bg-[#f97316]/10 text-[#f97316] text-sm font-bold"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
              Available for new projects
            </motion.div>

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black leading-[1.04] tracking-tight"
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
            >
              <span className="text-3xl sm:text-4xl font-bold block mb-1" style={{ color: mutedText }}>
                {"I'm"}
              </span>
              <span style={{ background: "linear-gradient(135deg, #f97316 0%, #fb923c 55%, #fbbf24 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Lakshya Pal
              </span>
              <br />
              <span style={{ color: fg }}>UI/UX Designer</span>
            </motion.h1>

            <motion.p
              className="text-lg max-w-md leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, color: mutedText }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            >
              I design clean, modern and user-friendly mobile apps, websites and digital products that people love to use.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
            >
              <button
                onClick={() => scrollTo("projects")}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#f97316] text-white font-bold text-base transition-all duration-300 hover:bg-[#ea6b0c] hover:shadow-[0_0_36px_rgba(249,115,22,0.5)] hover:-translate-y-1"
              >
                View Portfolio
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-base backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                style={{ border: `1px solid ${borderCol}`, color: fg, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
              >
                Hire Me
              </button>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              className="flex gap-8 pt-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.85 }}
            >
              {[
                { value: "4+", label: "Years Exp." },
                { value: "20+", label: "Projects" },
                { value: "15+", label: "Clients" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-[#f97316]">{s.value}</div>
                  <div className="text-xs font-semibold tracking-wide mt-0.5" style={{ fontFamily: "'DM Sans', sans-serif", color: subtleText }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: hero visual ── */}
          <motion.div
            className="relative flex items-center justify-center h-[480px] lg:h-[560px]"
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Rotating rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div className="w-[340px] h-[340px] rounded-full border border-[#f97316]/20"
                animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div className="w-[420px] h-[420px] rounded-full border border-[#38bdf8]/12"
                animate={{ rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div className="w-[460px] h-[460px] rounded-full border border-dashed border-white/[0.05]"
                animate={{ rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: "linear" }} />
            </div>

            {/* Profile circle */}
            <div className="relative z-10">
              <div className="relative w-64 h-64 md:w-[280px] md:h-[280px] rounded-full overflow-hidden">
                {/* Conic gradient ring */}
                <div className="absolute inset-[-3px] rounded-full z-20 pointer-events-none"
                  style={{ background: "conic-gradient(from 0deg, #f97316, #38bdf8, #a855f7, #f97316)", padding: "3px", borderRadius: "9999px" }}>
                  <div className="w-full h-full rounded-full" style={{ background: isDark ? "#0e0e1a" : "#f0edf8" }} />
                </div>
                <div className="relative z-10 w-full h-full rounded-full overflow-hidden"
                  style={{ background: isDark ? "linear-gradient(160deg, #1a0c30 0%, #0a1a30 100%)" : "linear-gradient(160deg, #e8e0f8 0%, #d8eeff 100%)" }}>
                  <AvatarSVG size={280} isDark={isDark} />
                </div>
              </div>
            </div>

            {/* ── Floating icons ── */}

            {/* TOP-RIGHT: Figma */}
            <FloatingIcon
              className="top-8 right-4 w-14 h-14"
              bgStyle={{ background: isDark ? "rgba(26,16,48,0.85)" : "rgba(240,232,255,0.85)", border: `1px solid ${isDark ? "rgba(249,115,22,0.3)" : "rgba(249,115,22,0.25)"}` }}
              delay={0} duration={5}
            >
              <Figma size={24} className="text-[#f97316]" />
            </FloatingIcon>

            {/* MID-LEFT: Smartphone */}
            <FloatingIcon
              className="top-[42%] -left-4 w-12 h-12"
              bgStyle={{ background: isDark ? "rgba(10,24,40,0.85)" : "rgba(224,240,255,0.85)", border: `1px solid ${isDark ? "rgba(56,189,248,0.25)" : "rgba(56,189,248,0.3)"}` }}
              delay={1.1} duration={6.2}
            >
              <Smartphone size={20} className="text-[#38bdf8]" />
            </FloatingIcon>

            {/* MID-RIGHT: Cursor */}
            <FloatingIcon
              className="top-[40%] -right-3 w-12 h-12"
              bgStyle={{ background: isDark ? "rgba(24,10,40,0.85)" : "rgba(245,232,255,0.85)", border: `1px solid ${isDark ? "rgba(168,85,247,0.25)" : "rgba(168,85,247,0.3)"}` }}
              delay={1.8} duration={7}
            >
              <MousePointer2 size={19} className="text-purple-500" />
            </FloatingIcon>

            {/* BOTTOM-LEFT: Layout */}
            <FloatingIcon
              className="bottom-16 left-2 w-14 h-14"
              bgStyle={{ background: isDark ? "rgba(10,24,10,0.85)" : "rgba(220,255,235,0.85)", border: `1px solid ${isDark ? "rgba(52,211,153,0.25)" : "rgba(16,185,129,0.3)"}` }}
              delay={0.5} duration={5.5}
            >
              <Layout size={22} className="text-emerald-500" />
            </FloatingIcon>

            {/* BOTTOM-RIGHT: Grid */}
            <FloatingIcon
              className="bottom-10 right-4 w-11 h-11"
              bgStyle={{ background: isDark ? "rgba(26,21,5,0.85)" : "rgba(255,248,224,0.85)", border: `1px solid ${isDark ? "rgba(251,191,36,0.25)" : "rgba(245,158,11,0.3)"}` }}
              delay={2.2} duration={6.6}
            >
              <Grid size={17} className="text-amber-500" />
            </FloatingIcon>

            {/* ── Skill badges ── */}
            {/* Figma Expert: bottom-right side */}
            <motion.div
              className="absolute bottom-4 -right-3 px-4 py-2 rounded-xl bg-[#f97316]/20 border border-[#f97316]/50 backdrop-blur-xl text-[#f97316] text-xs font-black tracking-wide whitespace-nowrap"
              animate={{ y: [-6, 6, -6] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            >
              Figma Expert ✦
            </motion.div>

            {/* UX Researcher: top-left — its own clear zone (no icon there) */}
            <motion.div
              className="absolute top-6 -left-3 px-4 py-2 rounded-xl bg-[#38bdf8]/20 border border-[#38bdf8]/50 backdrop-blur-xl text-[#38bdf8] text-xs font-black tracking-wide whitespace-nowrap"
              animate={{ y: [-6, 6, -6] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
            >
              UX Researcher ✦
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: subtleText }}>Scroll</span>
          <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${subtleText}, transparent)` }} />
        </motion.div>
      </section>

      {/* ════════════════════════ MARQUEE TICKER ════════════════════════ */}
      <div
        className="relative overflow-hidden py-5 border-y"
        style={{
          background: isDark ? "rgba(249,115,22,0.06)" : "rgba(249,115,22,0.05)",
          borderColor: isDark ? "rgba(249,115,22,0.18)" : "rgba(249,115,22,0.2)",
        }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${bg}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${bg}, transparent)` }} />

        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex items-center gap-0 flex-shrink-0">
              {[
                "UX Research", "Mobile Apps", "Web Design", "Prototyping",
                "Design Systems", "Wireframing", "Figma", "User Flows",
                "Auto Layout", "Responsive Design", "UI Design", "Branding",
              ].map((item) => (
                <span key={item} className="flex items-center gap-6 px-6">
                  <span
                    className="text-sm font-bold tracking-widest uppercase"
                    style={{ color: mutedText, fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item}
                  </span>
                  <span className="text-[#f97316] text-base">✦</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section id="services" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase mb-4">What I Do</p>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: fg }}>My Services</h2>
            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
              I craft digital experiences that are both beautiful and functional — from early-stage concepts to production-ready designs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 0.1}>
                <div
                  className={cn(
                    "group relative p-7 rounded-3xl border transition-all duration-500 h-full overflow-hidden cursor-default",
                    "hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.25)]",
                    svc.border,
                  )}
                  style={{ backdropFilter: "blur(20px)", background: cardBg }}
                >
                  <div className={cn("absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", svc.gradFrom, svc.gradTo)} />
                  <div className={cn("relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6", svc.iconBg)}>
                    {svc.icon}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-black mb-3" style={{ color: fg }}>{svc.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>{svc.desc}</p>
                  </div>
                  <div className="relative z-10 mt-6 flex items-center gap-1.5 text-xs font-bold transition-colors" style={{ color: subtleText }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ EXPERIENCE ════════════════════════ */}
      <section id="resume" className="py-28 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase mb-4">My Journey</p>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: fg }}>Experience</h2>
          </Reveal>

          <div className="relative">
            {/* Timeline spine */}
            <div className="absolute left-6 top-4 bottom-4 w-px"
              style={{ background: "linear-gradient(to bottom, #f97316, #38bdf8 50%, transparent)" }} />

            <div className="space-y-8">
              {EXPERIENCES.map((exp, i) => (
                <Reveal key={exp.role} delay={i * 0.15}>
                  <div className="relative pl-20">
                    {/* Timeline node */}
                    <div
                      className="absolute left-0 top-1 w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: i === 0 ? "rgba(249,115,22,0.15)" : i === 1 ? "rgba(56,189,248,0.12)" : "rgba(168,85,247,0.12)",
                        border: `1px solid ${i === 0 ? "rgba(249,115,22,0.4)" : i === 1 ? "rgba(56,189,248,0.35)" : "rgba(168,85,247,0.35)"}`,
                      }}
                    >
                      <Briefcase size={18} style={{ color: i === 0 ? "#f97316" : i === 1 ? "#38bdf8" : "#a855f7" }} />
                    </div>

                    <div className="p-7 rounded-3xl backdrop-blur-xl transition-all duration-300"
                      style={{ border: `1px solid ${borderCol}`, background: cardBg }}>
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-xl font-black" style={{ color: fg }}>{exp.role}</h3>
                          <p className="font-bold text-sm mt-0.5"
                            style={{ color: i === 0 ? "#f97316" : i === 1 ? "#38bdf8" : "#a855f7" }}
                          >
                            {exp.company}
                          </p>
                        </div>
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold" style={{ background: cardBg, border: `1px solid ${borderCol}`, color: subtleText }}>
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
                        {exp.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 rounded-lg bg-[#f97316]/10 border border-[#f97316]/25 text-[#f97316] text-xs font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ WHY HIRE ME ════════════════════════ */}
      <section id="about" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Profile image column */}
            <Reveal>
              <div className="relative flex justify-center">
                <div className="relative z-10 w-72">
                  <div className="rounded-[2.5rem] overflow-hidden" style={{ border: `1px solid ${borderCol}`, background: isDark ? "linear-gradient(140deg, #160a2e 0%, #0a1628 100%)" : "linear-gradient(140deg, #e8e0f8 0%, #ddeeff 100%)" }}>
                    <AvatarSVG size={320} isDark={isDark} />
                  </div>
                  {/* Floating badge */}
                  <motion.div
                    className="absolute -bottom-5 -right-5 px-5 py-3 rounded-2xl bg-[#f97316] text-white font-black text-sm shadow-[0_10px_40px_rgba(249,115,22,0.45)]"
                    animate={{ y: [-5, 5, -5] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    4+ Years ✦
                  </motion.div>
                  <motion.div
                    className="absolute -top-4 -left-4 px-4 py-2.5 rounded-2xl bg-[#38bdf8]/20 border border-[#38bdf8]/50 backdrop-blur-xl text-[#38bdf8] text-xs font-black"
                    animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    20+ Projects ✦
                  </motion.div>
                </div>
                {/* Decorative rings */}
                <div className="absolute top-0 left-8 w-36 h-36 rounded-full border border-[#f97316]/15 pointer-events-none" />
                <div className="absolute bottom-0 right-8 w-24 h-24 rounded-full border border-[#38bdf8]/15 pointer-events-none" />
              </div>
            </Reveal>

            {/* Copy column */}
            <div className="space-y-8">
              <Reveal delay={0.1}>
                <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase">Why Choose Me</p>
                <h2 className="text-4xl md:text-5xl font-black mt-3 leading-tight" style={{ color: fg }}>
                  Designing products<br />
                  <span style={{ background: "linear-gradient(135deg, #f97316, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    users actually love
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
                  With 4+ years of hands-on experience designing for startups and enterprises, I bridge the gap between great business goals and exceptional user experiences. Every pixel is intentional.
                </p>
              </Reveal>

              {/* Stats */}
              <Reveal delay={0.3}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { end: 4, suffix: "+", label: "Years Experience", icon: <Award size={18} /> },
                    { end: 20, suffix: "+", label: "Projects Done", icon: <Zap size={18} /> },
                    { end: 15, suffix: "+", label: "Happy Clients", icon: <Star size={18} /> },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl text-center" style={{ border: `1px solid ${borderCol}`, background: cardBg }}>
                      <div className="text-[#f97316] mb-2 flex justify-center">{stat.icon}</div>
                      <div className="text-3xl font-black" style={{ color: fg }}><Counter end={stat.end} suffix={stat.suffix} /></div>
                      <div className="text-[11px] mt-1 font-semibold leading-tight" style={{ fontFamily: "'DM Sans', sans-serif", color: subtleText }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="space-y-3">
                  {[
                    "Mobile & Web Design Expert with cross-platform proficiency",
                    "Deep mastery of Figma, Auto Layout & scalable Design Systems",
                    "User research and data-driven design decisions at every step",
                  ].map((pt) => (
                    <div key={pt} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#f97316]/15 border border-[#f97316]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight size={10} className="text-[#f97316]" />
                      </div>
                      <span className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════ PORTFOLIO ════════════════════════ */}
      <section id="projects" className="py-28 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase mb-4">Selected Work</p>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: fg }}>Portfolio</h2>
            <p className="text-base max-w-lg mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
              A curated selection of design work across mobile apps, websites, and digital products.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj, i) => (
              <Reveal key={proj.title} delay={i * 0.07}>
                <div className="group relative rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(0,0,0,0.3)] cursor-pointer"
                  style={{ border: `1px solid ${borderCol}` }}>
                  {/* Visual */}
                  <div className={`h-56 bg-gradient-to-br ${proj.g} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="w-44 h-32 rounded-2xl border-2 border-white bg-white/10 flex flex-col p-4 gap-2.5">
                        <div className="w-full h-2 rounded-full bg-white/70" />
                        <div className="w-3/4 h-2 rounded-full bg-white/50" />
                        <div className="flex gap-2 mt-1">
                          <div className="w-14 h-9 rounded-xl bg-white/35" />
                          <div className="w-14 h-9 rounded-xl bg-white/25" />
                        </div>
                        <div className="w-1/2 h-2 rounded-full bg-white/35" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-bold">
                      {proj.year}
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/35">
                        <ExternalLink size={19} className="text-white" />
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-6" style={{ background: sectionAlt, borderTop: `1px solid ${borderCol}` }}>
                    <p className="text-[#f97316] text-[11px] font-black tracking-[0.2em] uppercase mb-1.5">{proj.cat}</p>
                    <h3 className="font-black text-lg mb-3" style={{ color: fg }}>{proj.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: cardBg, border: `1px solid ${borderCol}`, color: mutedText }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ SKILLS ════════════════════════ */}
      <section id="skills" className="py-28 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase mb-4">My Toolkit</p>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: fg }}>Skills & Expertise</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {SKILL_GROUPS.map((group, gi) => (
              <Reveal key={group.category} delay={gi * 0.1}>
                <div className="p-7 rounded-3xl h-full" style={{ border: `1px solid ${borderCol}`, background: cardBg }}>
                  <h3 className="text-[#f97316] font-black text-[11px] tracking-[0.3em] uppercase mb-6">{group.category}</h3>
                  <div className="space-y-4">
                    {group.items.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f97316] flex-shrink-0" />
                        <span className="font-semibold text-sm flex-1" style={{ color: mutedText }}>{skill.name}</span>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }, (_, k) => (
                            <div key={k} className={cn("w-1.5 h-4 rounded-full", k < skill.bars ? "bg-[#f97316]" : "")}
                              style={k < skill.bars ? {} : { background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Tag cloud */}
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-3 justify-center">
              {SKILL_TAGS.map((skill) => (
                <span
                  key={skill.name}
                  className={cn(
                    "px-4 py-2 rounded-full border font-bold text-sm transition-all duration-300 hover:-translate-y-1 cursor-default",
                    skill.tier === "a" ? "bg-[#f97316]/10 border-[#f97316]/35 text-[#f97316] hover:bg-[#f97316]/20"
                      : skill.tier === "b" ? "bg-[#38bdf8]/10 border-[#38bdf8]/35 text-[#38bdf8] hover:bg-[#38bdf8]/20"
                        : "",
                  )}
                  style={skill.tier === "c" ? { background: cardBg, borderColor: borderCol, color: mutedText } : {}}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════ CONTACT ════════════════════════ */}
      <section id="contact" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <p className="text-[#f97316] text-xs font-black tracking-[0.35em] uppercase mb-4">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: fg }}>{"Let's Work Together"}</h2>
            <p className="text-base max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
              Have a project in mind? {"I'd"} love to hear about it. {"Let's"} create something amazing together.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <Reveal className="lg:col-span-2" delay={0.1}>
              <div className="space-y-5 h-full">
                <div className="p-7 rounded-3xl" style={{ border: `1px solid ${borderCol}`, background: cardBg }}>
                  <h3 className="font-black text-xl mb-7" style={{ color: fg }}>Contact Info</h3>
                  {[
                    { icon: <Mail size={17} />, label: "Email", value: "hello@lakshyapal.design" },
                    { icon: <Phone size={17} />, label: "Phone", value: "+91 98765 43210" },
                    { icon: <MapPin size={17} />, label: "Location", value: "India" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 py-3.5 last:border-0" style={{ borderBottom: `1px solid ${borderCol}` }}>
                      <div className="w-10 h-10 rounded-xl bg-[#f97316]/10 border border-[#f97316]/25 flex items-center justify-center text-[#f97316] flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: subtleText }}>{item.label}</p>
                        <p className="font-semibold text-sm mt-0.5" style={{ color: fg }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-3xl border border-[#f97316]/25 bg-[#f97316]/[0.05]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-black tracking-wider">AVAILABLE NOW</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", color: mutedText }}>
                    Open to new projects and collaborations. Response time within 24 hours.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal className="lg:col-span-3" delay={0.2}>
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl backdrop-blur-xl space-y-5"
                style={{ border: `1px solid ${borderCol}`, background: cardBg }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: mutedText }}>Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none transition-colors"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: mutedText }}>Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none transition-colors"
                      style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: mutedText }}>Project Type</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none transition-colors appearance-none"
                    style={{ background: isDark ? "#0d0d1a" : "#f0ede8", border: `1px solid ${inputBorder}`, color: fg }}
                    required
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="mobile">Mobile App Design</option>
                    <option value="website">Website Design</option>
                    <option value="wireframe">Wireframing & Prototyping</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider uppercase mb-2" style={{ color: mutedText }}>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none transition-colors resize-none"
                    style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: fg }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#f97316] text-white font-black text-base transition-all duration-300 hover:bg-[#ea6b0c] hover:shadow-[0_0_36px_rgba(249,115,22,0.45)] hover:-translate-y-px active:scale-[0.99]"
                >
                  {sent ? "Message Sent! ✓" : <><span>Send Message</span><Send size={17} /></>}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="py-10 px-6 transition-colors duration-500" style={{ borderTop: `1px solid ${borderCol}` }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-2xl font-black cursor-pointer" onClick={() => scrollTo("home")}>
            <span className="text-[#f97316]">L</span>
            <span style={{ color: fg }}>P</span>
            <span className="text-[#f97316]">.</span>
          </div>
          <p className="text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: subtleText }}>
            © 2024 Lakshya Pal · Designed with passion
          </p>
          <div className="flex gap-5">
            {["Dribbble", "Behance", "LinkedIn"].map((s) => (
              <a key={s} href="#" className="text-sm font-semibold transition-colors hover:text-[#f97316]" style={{ color: subtleText }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
