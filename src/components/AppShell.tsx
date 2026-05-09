import { useEffect, useMemo, useState } from "react";
import { Outlet, useRouter } from "@tanstack/react-router";
import { I18nContext, translations, type Lang } from "@/lib/i18n";
import { ParallaxScenery, PageTransition } from "@/components/motion-kit";

export function AppShell({ children }: { children?: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      try { localStorage.setItem("lang", lang); } catch {}
    }
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  );

  return (
    <I18nContext.Provider value={value}>
      <div className="app-bg relative">
        <ParallaxScenery />
        <div className="relative z-10">
          <PageTransition>{children ?? <Outlet />}</PageTransition>
        </div>
      </div>
    </I18nContext.Provider>
  );
}

export function useAuthRedirect() {
  const router = useRouter();
  useEffect(() => {
    const isAuthed = typeof window !== "undefined" && localStorage.getItem("authed") === "1";
    if (!isAuthed) router.navigate({ to: "/login" });
  }, [router]);
}
