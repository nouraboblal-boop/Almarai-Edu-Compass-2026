import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n, M as Magnetic, H as HoverScaleCard } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState } from "./store-vqq0Rd-r.js";
import { ArrowUpRight, TrendingUp, Users, Award, ClipboardList, BookOpen } from "lucide-react";
import { a as IsoStudents, I as IsoSchool, b as IsoTrophy, c as IsoBook } from "./iso-icons-BiKMLhxU.js";
import "framer-motion";
function formatStat(value, unit) {
  if (!unit) return String(value);
  return `${value}${unit}`;
}
function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({
        to: "/login"
      });
    }
  }, [router]);
  const {
    t
  } = useI18n();
  const [classes] = usePersistedState("classes", []);
  const [tests] = usePersistedState("tests", []);
  const [profile] = usePersistedState("profile", {
    name: "أ. هبة",
    subject: "اللغة العربية",
    school: "مدرسة الفصاحة",
    email: "teacher@school.com"
  });
  const studentsCount = classes.reduce((s, c) => s + c.students.length, 0);
  const allScores = classes.flatMap((c) => c.students.map((s) => s.score));
  const avg = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;
  const stats = [{
    label: t.students,
    value: studentsCount,
    unit: "",
    Icon: IsoStudents
  }, {
    label: t.classesCount,
    value: classes.length,
    unit: "",
    Icon: IsoSchool
  }, {
    label: t.progress,
    value: avg,
    unit: "%",
    Icon: IsoTrophy
  }, {
    label: t.completedTests,
    value: tests.length,
    unit: "",
    Icon: IsoBook
  }];
  const classAverages = classes.map((c) => {
    const sc = c.students.map((s) => s.score);
    return {
      name: c.name,
      avg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : 0
    };
  });
  const maxAvg = Math.max(100, ...classAverages.map((c) => c.avg));
  const allStudents = classes.flatMap((c) => c.students.map((s) => ({
    ...s,
    className: c.name
  })));
  const topStudents = [...allStudents].sort((a, b) => b.score - a.score).slice(0, 6);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsxs("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxs("section", { className: "glass-strong r-huge p-6 md:p-10 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "text-foreground/60 text-sm mb-2", children: [
            t.welcomeBack,
            " 👋"
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-heading text-3xl md:text-4xl", children: profile.name }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/70 mt-2", children: t.today })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsxs(Link, { to: "/classes", className: "primary-grad text-white font-bold px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 active:scale-95 transition", children: [
            t.addClass,
            " ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })
          ] }) }),
          /* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsxs(Link, { to: "/paths", className: "bg-white/80 px-5 py-3 rounded-2xl font-bold flex items-center gap-2 active:scale-95 transition", children: [
            t.learningPaths,
            " ",
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 16 })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", style: {
        perspective: 1200
      }, children: stats.map((s, i) => {
        const Icon = s.Icon;
        return /* @__PURE__ */ jsxs(HoverScaleCard, { delay: i * 0.07, className: "glass r-big p-5 cursor-pointer", children: [
          /* @__PURE__ */ jsx("div", { className: "grid place-items-center mb-2", children: /* @__PURE__ */ jsx(Icon, { size: 84 }) }),
          /* @__PURE__ */ jsx("div", { className: "text-3xl text-heading text-center", children: formatStat(s.value, s.unit) }),
          /* @__PURE__ */ jsx("div", { className: "text-foreground/60 text-sm mt-1 text-center", children: s.label })
        ] }, s.label);
      }) }),
      /* @__PURE__ */ jsxs("section", { className: "glass-strong r-huge p-6 md:p-8 mb-6", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-heading text-xl md:text-2xl flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsx(TrendingUp, { className: "text-primary" }),
          " ",
          t.reports
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-heading text-base mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Users, { size: 16 }),
              " ",
              t.classProgress
            ] }),
            classAverages.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: classAverages.map((c) => /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: c.name }),
                /* @__PURE__ */ jsxs("span", { className: "text-foreground/60", children: [
                  c.avg,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-3 bg-white/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full primary-grad rounded-full transition-all", style: {
                width: `${c.avg / maxAvg * 100}%`
              } }) })
            ] }, c.name)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-heading text-base mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Award, { size: 16, className: "text-amber-500" }),
              " ",
              t.studentProgress
            ] }),
            topStudents.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: topStudents.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "bg-white/70 rounded-2xl p-3 flex items-center gap-3", children: [
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
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "grid lg:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass-strong r-big p-6 lg:col-span-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-heading text-xl mb-4", children: t.classProgress }),
          classes.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: t.selectClass }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: classes.map((c) => {
            const scores = c.students.map((s) => s.score);
            const a = scores.length ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length) : 0;
            return /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm mb-1", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: c.name }),
                /* @__PURE__ */ jsxs("span", { className: "text-foreground/60", children: [
                  a,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "h-3 bg-white/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full primary-grad rounded-full", style: {
                width: `${a}%`
              } }) })
            ] }, c.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass-strong r-big p-6", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-heading text-xl mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ClipboardList, { size: 20 }),
            " ",
            t.upcoming
          ] }),
          tests.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: tests.slice(0, 5).map((tt) => /* @__PURE__ */ jsxs("li", { className: "bg-white/70 rounded-2xl p-3 flex justify-between items-center", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold text-sm", children: tt.title }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-foreground/60", children: [
                tt.questions,
                " • ",
                tt.date
              ] })
            ] }),
            /* @__PURE__ */ jsx(BookOpen, { size: 18, className: "text-primary" })
          ] }, tt.id)) })
        ] })
      ] })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(DashboardPage, {}) });
export {
  SplitComponent as component
};
