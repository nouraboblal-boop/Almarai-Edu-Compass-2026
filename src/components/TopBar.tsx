import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import {
  LayoutDashboard, Users, Map,
  // BarChart3, // reports merged into dashboard
  // BookOpen, ClipboardList, // tests & grammar temporarily hidden
  Route as RouteIcon,
  UserCircle2, LogOut, Languages, GraduationCap,
} from "lucide-react";

export function TopBar() {
  const { t, lang, setLang } = useI18n();
  const router = useRouter();
  const loc = useLocation();
  const pathname = loc?.pathname ?? "/";

  // Navigation items. Tests & Grammar tabs are temporarily disabled per
  // first-release scope — kept here as commented references so we can
  // re-enable them later without recreating links/translations.
  const nav = [
    { to: "/", label: t.dashboard, icon: LayoutDashboard },
    { to: "/classes", label: t.classes, icon: Users },
    { to: "/map", label: t.map, icon: Map },
    { to: "/paths", label: t.learningPaths, icon: RouteIcon },
    // { to: "/reports", label: t.reports, icon: BarChart3 }, // merged into dashboard
    // { to: "/grammar", label: t.grammar, icon: BookOpen }, // hidden (v1)
    // { to: "/tests", label: t.tests, icon: ClipboardList }, // hidden (v1)
  ] as const;

  const toggleLang = () => setLang((lang === "ar" ? "en" : "ar") as Lang);

  return (
    <header className="sticky top-3 z-30 mx-3 md:mx-6 mt-3">
      <div className="glass-strong r-big px-3 md:px-4 py-2.5 flex items-center gap-2 no-sticker">
        <Link to="/" className="flex items-center gap-2 px-2 py-1.5 rounded-full">
          <div className="w-9 h-9 rounded-2xl primary-grad text-white grid place-items-center shadow-md">
            <GraduationCap size={20} />
          </div>
          <span className="text-heading text-base hidden sm:block">{t.appName}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 mx-2 flex-1 overflow-x-auto">
          {nav.map((n) => {
            const active = pathname === n.to;
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                  active
                    ? "bg-white text-primary shadow-md font-bold"
                    : "text-foreground/70 hover:bg-white/60"
                }`}
              >
                <Icon size={16} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1 lg:hidden" />

        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/80 transition text-sm font-bold"
          aria-label="Toggle language"
        >
          <Languages size={16} />
          {lang === "ar" ? "EN" : "AR"}
        </button>

        <Link
          to="/profile"
          className="w-10 h-10 rounded-full grid place-items-center bg-white shadow hover:scale-105 transition"
          aria-label={t.profile}
        >
          <UserCircle2 className="text-primary" size={22} />
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("authed");
            router.navigate({ to: "/login" });
          }}
          className="hidden md:grid w-10 h-10 rounded-full place-items-center bg-white/80 hover:bg-white shadow text-foreground/70 hover:text-destructive transition"
          aria-label={t.logout}
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden glass r-big mt-2 px-2 py-2 flex gap-1 overflow-x-auto">
        {nav.map((n) => {
          const active = pathname === n.to;
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs whitespace-nowrap ${
                active ? "bg-white text-primary font-bold shadow" : "text-foreground/70"
              }`}
            >
              <Icon size={14} />
              {n.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
