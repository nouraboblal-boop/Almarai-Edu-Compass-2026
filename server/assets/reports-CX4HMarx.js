import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState } from "./store-vqq0Rd-r.js";
import { TrendingUp, Users, Award } from "lucide-react";
import "framer-motion";
function ReportsPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({
      to: "/login"
    });
  }, [router]);
  const {
    t
  } = useI18n();
  const [classes] = usePersistedState("classes", []);
  const classAverages = classes.map((c) => {
    const sc = c.students.map((s) => s.score);
    return {
      name: c.name,
      avg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : 0,
      count: sc.length
    };
  });
  const allStudents = classes.flatMap((c) => c.students.map((s) => ({
    ...s,
    className: c.name
  })));
  const top = [...allStudents].sort((a, b) => b.score - a.score).slice(0, 6);
  const max = Math.max(100, ...classAverages.map((c) => c.avg));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsxs("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "glass-strong r-huge p-6 md:p-8", children: /* @__PURE__ */ jsxs("h1", { className: "text-heading text-2xl md:text-3xl flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(TrendingUp, { className: "text-primary" }),
        " ",
        t.reports
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "glass-strong r-big p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-heading text-lg mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Users, { size: 18 }),
            " ",
            t.classProgress
          ] }),
          classAverages.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: classAverages.map((c) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: c.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-foreground/60", children: [
                c.avg,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-4 bg-white/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full primary-grad rounded-full transition-all", style: {
              width: `${c.avg / max * 100}%`
            } }) })
          ] }, c.name)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "glass-strong r-big p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-heading text-lg mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Award, { size: 18, className: "text-amber-500" }),
            " ",
            t.studentProgress
          ] }),
          top.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: top.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "bg-white/70 rounded-2xl p-3 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: `w-9 h-9 rounded-full grid place-items-center text-white font-black text-sm ${i === 0 ? "gold-grad" : i < 3 ? "primary-grad" : "bg-foreground/30"}`, children: i + 1 }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: s.name }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground/60", children: s.className })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "font-black text-primary", children: [
              s.score,
              "%"
            ] })
          ] }, s.id)) })
        ] })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ReportsPage, {}) });
export {
  SplitComponent as component
};
