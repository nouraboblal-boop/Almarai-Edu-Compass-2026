import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useLocation } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

/* ---------- Magnetic wrapper ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Floating 3D Card (entry + tilt) ---------- */
export function Floating3DCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 40, rotateX: -15, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 90, damping: 16, mass: 0.8 }}
      style={{
        rotateX: tilt ? rx : 0,
        rotateY: tilt ? ry : 0,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Page transition wrapper ---------- */
export function PageTransition({ children }: { children: ReactNode }) {
  const loc = useLocation();
  const pathname = loc?.pathname ?? "/";
  const { lang } = useI18n();
  const dir = lang === "ar" ? -1 : 1;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 24 * dir, filter: "blur(6px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -24 * dir, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Confetti trigger={pathname} />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- Confetti burst on route change ---------- */
function Confetti({ trigger }: { trigger: string }) {
  // Client-only: random values would mismatch SSR HTML and break hydration.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const colors = ["#fbbf24", "#7dd3fc", "#86efac", "#f9a8d4", "#c4b5fd", "#fde68a"];
  const pieces = Array.from({ length: 18 });
  return (
    <div key={trigger} className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const dur = 1.6 + Math.random() * 1.4;
        const size = 8 + Math.random() * 8;
        const color = colors[i % colors.length];
        const rounded = i % 3 === 0;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "-10vh",
              width: size,
              height: size * (rounded ? 1 : 0.5),
              background: color,
              borderRadius: rounded ? "50%" : "2px",
              animation: `confetti-fall ${dur}s ${delay}s ease-in forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Parallax background scenery ---------- */
export function ParallaxScenery() {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    const onMouse = (e: globalThis.MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const clouds = [
    { top: "8%", size: 110, delay: 0, dur: 60, opacity: 0.85, depth: 12 },
    { top: "22%", size: 70, delay: 8, dur: 80, opacity: 0.6, depth: 6 },
    { top: "55%", size: 140, delay: 4, dur: 95, opacity: 0.7, depth: 18 },
    { top: "75%", size: 85, delay: 14, dur: 70, opacity: 0.55, depth: 9 },
  ];

  const butterflies = [
    { left: "12%", top: "65%", color: "#f472b6", delay: 0 },
    { left: "78%", top: "30%", color: "#fbbf24", delay: 3 },
    { left: "45%", top: "80%", color: "#a78bfa", delay: 6 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {clouds.map((c, i) => (
        <motion.div
          key={`c${i}`}
          initial={{ x: "-15vw" }}
          animate={{ x: "115vw" }}
          transition={{ duration: c.dur, repeat: Infinity, delay: c.delay, ease: "linear" }}
          style={{
            position: "absolute",
            top: c.top,
            transform: `translateY(${-scroll * 0.05 + mouse.y * c.depth}px) translateX(${mouse.x * c.depth}px)`,
            opacity: c.opacity,
          }}
        >
          <Cloud size={c.size} />
        </motion.div>
      ))}

      {butterflies.map((b, i) => (
        <motion.div
          key={`b${i}`}
          style={{
            position: "absolute",
            left: b.left,
            top: b.top,
            transform: `translate(${mouse.x * 20}px, ${-scroll * 0.1 + mouse.y * 20}px)`,
          }}
          animate={{
            y: [0, -30, 0, -20, 0],
            x: [0, 25, 0, -20, 0],
            rotate: [0, 8, -6, 4, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
        >
          <Butterfly color={b.color} />
        </motion.div>
      ))}
    </div>
  );
}

function Cloud({ size = 100 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" fill="white" style={{ filter: "drop-shadow(0 8px 20px rgba(255,255,255,.5))" }}>
      <ellipse cx="30" cy="40" rx="20" ry="15" />
      <ellipse cx="55" cy="32" rx="25" ry="20" />
      <ellipse cx="78" cy="42" rx="18" ry="13" />
      <ellipse cx="48" cy="45" rx="30" ry="13" />
    </svg>
  );
}

function Butterfly({ color = "#f472b6" }: { color?: string }) {
  return (
    <motion.svg
      width={36}
      height={28}
      viewBox="0 0 36 28"
      animate={{ scaleX: [1, 0.4, 1] }}
      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: `drop-shadow(0 4px 8px ${color}55)` }}
    >
      <ellipse cx="9" cy="10" rx="9" ry="7" fill={color} opacity={0.85} />
      <ellipse cx="27" cy="10" rx="9" ry="7" fill={color} opacity={0.85} />
      <ellipse cx="9" cy="20" rx="6" ry="5" fill={color} opacity={0.7} />
      <ellipse cx="27" cy="20" rx="6" ry="5" fill={color} opacity={0.7} />
      <rect x="17" y="6" width="2" height="18" rx="1" fill="#1f2937" />
    </motion.svg>
  );
}

/* ---------- Stat card with scale + entry ---------- */
export function HoverScaleCard({
  children,
  className = "",
  delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 16 }}
      whileHover={{ scale: 1.04, y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Tap ripple feedback ---------- */
export function TapPulse({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileTap={{ scale: 0.94 }} whileHover={{ scale: 1.03 }} className={className}>
      {children}
    </motion.div>
  );
}
