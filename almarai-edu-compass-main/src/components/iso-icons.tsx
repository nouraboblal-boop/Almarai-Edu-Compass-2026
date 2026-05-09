/* Lightweight SVG isometric-style 3D icons used across the dashboard. */
import { motion } from "framer-motion";

const floatAnim = { y: [0, -6, 0], rotate: [0, 1.5, 0] };
const floatTrans = { duration: 5, repeat: Infinity, ease: "easeInOut" as const };

export function IsoSchool({ size = 96 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={floatAnim} transition={floatTrans}
      style={{ filter: "drop-shadow(0 16px 24px rgba(60,80,160,.35))" }}>
      <defs>
        <linearGradient id="schRoof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ef4444" /><stop offset="1" stopColor="#b91c1c" />
        </linearGradient>
        <linearGradient id="schWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fef3c7" /><stop offset="1" stopColor="#fcd34d" />
        </linearGradient>
      </defs>
      {/* base shadow */}
      <ellipse cx="60" cy="108" rx="40" ry="6" fill="#000" opacity=".18" />
      {/* body left */}
      <polygon points="20,55 60,75 60,105 20,85" fill="#f59e0b" />
      <polygon points="60,75 100,55 100,85 60,105" fill="url(#schWall)" />
      {/* roof */}
      <polygon points="20,55 60,35 100,55 60,75" fill="url(#schRoof)" />
      {/* door */}
      <polygon points="55,80 65,75 65,95 55,100" fill="#7c2d12" />
      {/* window */}
      <polygon points="72,68 86,61 86,72 72,79" fill="#60a5fa" opacity=".9" />
      <polygon points="34,72 46,78 46,89 34,83" fill="#60a5fa" opacity=".9" />
      {/* flag */}
      <line x1="60" y1="35" x2="60" y2="20" stroke="#1f2937" strokeWidth="1.5" />
      <polygon points="60,20 72,24 60,28" fill="#22c55e" />
    </motion.svg>
  );
}

export function IsoBus({ size = 96 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={floatAnim} transition={floatTrans}
      style={{ filter: "drop-shadow(0 16px 24px rgba(180,140,20,.4))" }}>
      <defs>
        <linearGradient id="busBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde047" /><stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="105" rx="42" ry="6" fill="#000" opacity=".2" />
      {/* side */}
      <polygon points="15,55 85,55 95,75 25,75" fill="url(#busBody)" />
      <polygon points="85,55 105,45 115,65 95,75" fill="#a16207" />
      <polygon points="15,55 35,45 105,45 85,55" fill="#facc15" />
      {/* windows */}
      <rect x="30" y="58" width="10" height="8" fill="#bae6fd" />
      <rect x="44" y="58" width="10" height="8" fill="#bae6fd" />
      <rect x="58" y="58" width="10" height="8" fill="#bae6fd" />
      <rect x="72" y="58" width="10" height="8" fill="#bae6fd" />
      {/* wheels */}
      <ellipse cx="38" cy="80" rx="7" ry="5" fill="#1f2937" />
      <ellipse cx="78" cy="80" rx="7" ry="5" fill="#1f2937" />
      <ellipse cx="38" cy="80" rx="3" ry="2" fill="#9ca3af" />
      <ellipse cx="78" cy="80" rx="3" ry="2" fill="#9ca3af" />
    </motion.svg>
  );
}

export function IsoBook({ size = 96 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={floatAnim} transition={floatTrans}
      style={{ filter: "drop-shadow(0 16px 24px rgba(60,120,200,.35))" }}>
      <ellipse cx="60" cy="100" rx="38" ry="5" fill="#000" opacity=".18" />
      <polygon points="20,70 60,90 100,70 60,50" fill="#3b82f6" />
      <polygon points="20,70 60,90 60,55 20,35" fill="#1d4ed8" />
      <polygon points="100,70 60,90 60,55 100,35" fill="#2563eb" />
      <polygon points="30,55 60,70 60,80 30,65" fill="#fff" opacity=".7" />
      <polygon points="90,55 60,70 60,80 90,65" fill="#fff" opacity=".7" />
    </motion.svg>
  );
}

export function IsoTrophy({ size = 96 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={floatAnim} transition={floatTrans}
      style={{ filter: "drop-shadow(0 16px 24px rgba(200,160,30,.45))" }}>
      <defs>
        <linearGradient id="trGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" /><stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="28" ry="5" fill="#000" opacity=".22" />
      <rect x="50" y="85" width="20" height="10" fill="#92400e" />
      <polygon points="40,95 80,95 75,105 45,105" fill="#78350f" />
      <path d="M35 35 Q35 70 60 80 Q85 70 85 35 Z" fill="url(#trGold)" />
      <path d="M35 40 Q20 45 25 60 Q30 70 40 65" fill="none" stroke="#b45309" strokeWidth="3" />
      <path d="M85 40 Q100 45 95 60 Q90 70 80 65" fill="none" stroke="#b45309" strokeWidth="3" />
      <circle cx="60" cy="55" r="8" fill="#fff" opacity=".4" />
    </motion.svg>
  );
}

export function IsoStudents({ size = 96 }: { size?: number }) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={floatAnim} transition={floatTrans}
      style={{ filter: "drop-shadow(0 16px 24px rgba(120,80,200,.35))" }}>
      <ellipse cx="60" cy="108" rx="36" ry="5" fill="#000" opacity=".18" />
      {/* back kid */}
      <circle cx="42" cy="55" r="12" fill="#fcd34d" />
      <polygon points="30,67 54,67 58,95 26,95" fill="#8b5cf6" />
      {/* front kid */}
      <circle cx="75" cy="60" r="14" fill="#fde68a" />
      <polygon points="60,75 90,75 95,105 55,105" fill="#ec4899" />
      {/* caps */}
      <polygon points="32,46 52,46 42,38" fill="#1f2937" />
      <polygon points="63,52 87,52 75,42" fill="#1f2937" />
    </motion.svg>
  );
}
