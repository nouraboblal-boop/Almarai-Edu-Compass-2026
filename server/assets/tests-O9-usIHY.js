import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState, a as uid } from "./store-vqq0Rd-r.js";
import { B as Button, M as Modal, F as Field, I as Input } from "./ui-kit-C66YvHU2.js";
import { ClipboardList, Plus, Trash2, Calendar } from "lucide-react";
import "framer-motion";
function TestsPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({
      to: "/login"
    });
  }, [router]);
  const {
    t
  } = useI18n();
  const [tests, setTests] = usePersistedState("tests", []);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState(5);
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const create = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTests([{
      id: uid(),
      title: title.trim(),
      questions,
      date
    }, ...tests]);
    setOpen(false);
    setTitle("");
    setQuestions(5);
    setDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsxs("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass-strong r-huge p-6 md:p-8 mb-6 flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-heading text-2xl md:text-3xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(ClipboardList, { className: "text-primary" }),
          " ",
          t.tests
        ] }),
        /* @__PURE__ */ jsxs(Button, { onClick: () => setOpen(true), children: [
          /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
          " ",
          t.newTest
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
        tests.length === 0 && /* @__PURE__ */ jsx("div", { className: "glass r-big p-8 col-span-full text-center text-foreground/60", children: "—" }),
        tests.map((tt) => /* @__PURE__ */ jsxs("div", { className: "glass r-big p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl primary-grad text-white grid place-items-center shadow-md", children: /* @__PURE__ */ jsx(ClipboardList, { size: 20 }) }),
            /* @__PURE__ */ jsx("button", { onClick: () => setTests(tests.filter((x) => x.id !== tt.id)), className: "w-8 h-8 rounded-full bg-white/80 hover:bg-destructive/10 text-destructive grid place-items-center", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "text-heading text-lg mb-1", children: tt.title }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground/60 flex items-center gap-3 mt-2", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              tt.questions,
              " ",
              t.questions
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Calendar, { size: 14 }),
              " ",
              tt.date
            ] })
          ] })
        ] }, tt.id))
      ] })
    ] }),
    /* @__PURE__ */ jsx(Modal, { open, onClose: () => setOpen(false), title: t.newTest, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: create, children: [
      /* @__PURE__ */ jsx(Field, { label: t.testTitle, children: /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), required: true }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Field, { label: t.questions, children: /* @__PURE__ */ jsx(Input, { type: "number", min: 1, value: questions, onChange: (e) => setQuestions(Number(e.target.value)) }) }),
        /* @__PURE__ */ jsx(Field, { label: "التاريخ", children: /* @__PURE__ */ jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: t.cancel }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: t.create })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(TestsPage, {}) });
export {
  SplitComponent as component
};
