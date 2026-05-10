import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Outlet, useRouter, useLocation, Link } from "@tanstack/react-router";
import { t as translations, I as I18nContext, P as ParallaxScenery, a as PageTransition, u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { LayoutDashboard, Users, Map, Route, GraduationCap, Languages, UserCircle2, LogOut } from "lucide-react";
function AppShell({ children }) {
  const [lang, setLang] = useState("ar");
  useEffect(() => {
    const saved = typeof window !== "undefined" && localStorage.getItem("lang");
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      try {
        localStorage.setItem("lang", lang);
      } catch {
      }
    }
  }, [lang]);
  const value = useMemo(
    () => ({ lang, setLang, t: translations[lang] }),
    [lang]
  );
  return /* @__PURE__ */ jsx(I18nContext.Provider, { value, children: /* @__PURE__ */ jsxs("div", { className: "app-bg relative", children: [
    /* @__PURE__ */ jsx(ParallaxScenery, {}),
    /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(PageTransition, { children: children ?? /* @__PURE__ */ jsx(Outlet, {}) }) })
  ] }) });
}
function TopBar() {
  const { t, lang, setLang } = useI18n();
  const router = useRouter();
  const loc = useLocation();
  const pathname = loc?.pathname ?? "/";
  const nav = [
    { to: "/", label: t.dashboard, icon: LayoutDashboard },
    { to: "/classes", label: t.classes, icon: Users },
    { to: "/map", label: t.map, icon: Map },
    { to: "/paths", label: t.learningPaths, icon: Route }
    // { to: "/reports", label: t.reports, icon: BarChart3 }, // merged into dashboard
    // { to: "/grammar", label: t.grammar, icon: BookOpen }, // hidden (v1)
    // { to: "/tests", label: t.tests, icon: ClipboardList }, // hidden (v1)
  ];
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-3 z-30 mx-3 md:mx-6 mt-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "glass-strong r-big px-3 md:px-4 py-2.5 flex items-center gap-2 no-sticker", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 px-2 py-1.5 rounded-full", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-2xl primary-grad text-white grid place-items-center shadow-md", children: /* @__PURE__ */ jsx(GraduationCap, { size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-heading text-base hidden sm:block", children: t.appName })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden lg:flex items-center gap-1 mx-2 flex-1 overflow-x-auto", children: nav.map((n) => {
        const active = pathname === n.to;
        const Icon = n.icon;
        return /* @__PURE__ */ jsxs(
          Link,
          {
            to: n.to,
            className: `flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${active ? "bg-white text-primary shadow-md font-bold" : "text-foreground/70 hover:bg-white/60"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { size: 16 }),
              n.label
            ]
          },
          n.to
        );
      }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 lg:hidden" }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: toggleLang,
          className: "flex items-center gap-2 px-3 py-2 rounded-full glass hover:bg-white/80 transition text-sm font-bold",
          "aria-label": "Toggle language",
          children: [
            /* @__PURE__ */ jsx(Languages, { size: 16 }),
            lang === "ar" ? "EN" : "AR"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/profile",
          className: "w-10 h-10 rounded-full grid place-items-center bg-white shadow hover:scale-105 transition",
          "aria-label": t.profile,
          children: /* @__PURE__ */ jsx(UserCircle2, { className: "text-primary", size: 22 })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            localStorage.removeItem("authed");
            router.navigate({ to: "/login" });
          },
          className: "hidden md:grid w-10 h-10 rounded-full place-items-center bg-white/80 hover:bg-white shadow text-foreground/70 hover:text-destructive transition",
          "aria-label": t.logout,
          children: /* @__PURE__ */ jsx(LogOut, { size: 18 })
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "lg:hidden glass r-big mt-2 px-2 py-2 flex gap-1 overflow-x-auto", children: nav.map((n) => {
      const active = pathname === n.to;
      const Icon = n.icon;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: n.to,
          className: `flex items-center gap-2 px-3 py-2 rounded-full text-xs whitespace-nowrap ${active ? "bg-white text-primary font-bold shadow" : "text-foreground/70"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { size: 14 }),
            n.label
          ]
        },
        n.to
      );
    }) })
  ] });
}
export {
  AppShell as A,
  TopBar as T
};
