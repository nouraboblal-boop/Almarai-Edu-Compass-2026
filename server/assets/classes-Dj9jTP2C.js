import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState, G as GRADE_OPTIONS_AR, a as uid } from "./store-vqq0Rd-r.js";
import { B as Button, M as Modal, F as Field, I as Input, S as Select } from "./ui-kit-C66YvHU2.js";
import { Plus, Users, Pencil, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import "framer-motion";
function ClassesPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({
        to: "/login"
      });
    }
  }, [router]);
  const {
    t,
    lang
  } = useI18n();
  const [classes, setClasses] = usePersistedState("classes", []);
  const [selectedId, setSelectedId] = useState(null);
  const [classModal, setClassModal] = useState({
    open: false
  });
  const [studentModal, setStudentModal] = useState({
    open: false
  });
  const selected = classes.find((c) => c.id === selectedId) ?? null;
  const saveClass = (name, grade) => {
    if (classModal.edit) {
      setClasses(classes.map((c) => c.id === classModal.edit.id ? {
        ...c,
        name,
        grade
      } : c));
    } else {
      const newC = {
        id: uid(),
        name,
        grade,
        students: []
      };
      setClasses([...classes, newC]);
      setSelectedId(newC.id);
    }
    setClassModal({
      open: false
    });
  };
  const deleteClass = (id) => {
    if (!confirm(lang === "ar" ? "حذف الصف وجميع طلابه؟" : "Delete class and all students?")) return;
    setClasses(classes.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };
  const saveStudent = (name, score) => {
    if (!selected) return;
    const updated = studentModal.edit ? selected.students.map((s) => s.id === studentModal.edit.id ? {
      ...s,
      name,
      score
    } : s) : [...selected.students, {
      id: uid(),
      name,
      score
    }];
    setClasses(classes.map((c) => c.id === selected.id ? {
      ...c,
      students: updated
    } : c));
    setStudentModal({
      open: false
    });
  };
  const deleteStudent = (id) => {
    if (!selected) return;
    setClasses(classes.map((c) => c.id === selected.id ? {
      ...c,
      students: c.students.filter((s) => s.id !== id)
    } : c));
  };
  const ChevStart = lang === "ar" ? ChevronRight : ChevronLeft;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[360px_1fr] gap-4", children: [
      /* @__PURE__ */ jsxs("section", { className: "glass-strong r-big p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-heading text-lg", children: t.classes }),
          /* @__PURE__ */ jsxs(Button, { onClick: () => setClassModal({
            open: true
          }), className: "!py-2 !px-3 text-sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
            " ",
            t.addClass
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          classes.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-foreground/60 text-sm", children: t.selectClass }),
          classes.map((c) => /* @__PURE__ */ jsxs("li", { className: `group rounded-2xl p-3 cursor-pointer transition flex items-center justify-between ${selectedId === c.id ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/80"}`, onClick: () => setSelectedId(c.id), children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl primary-grad text-white grid place-items-center", children: /* @__PURE__ */ jsx(Users, { size: 18 }) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold", children: c.name }),
                /* @__PURE__ */ jsxs("div", { className: "text-xs text-foreground/60", children: [
                  c.grade,
                  " • ",
                  c.students.length,
                  " ",
                  t.students
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1 opacity-70 group-hover:opacity-100", children: [
              /* @__PURE__ */ jsx("button", { onClick: (e) => {
                e.stopPropagation();
                setClassModal({
                  open: true,
                  edit: c
                });
              }, className: "w-8 h-8 rounded-full grid place-items-center bg-white hover:bg-primary/10", "aria-label": t.edit, children: /* @__PURE__ */ jsx(Pencil, { size: 14 }) }),
              /* @__PURE__ */ jsx("button", { onClick: (e) => {
                e.stopPropagation();
                deleteClass(c.id);
              }, className: "w-8 h-8 rounded-full grid place-items-center bg-white hover:bg-destructive/10 text-destructive", "aria-label": t.delete, children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
            ] })
          ] }, c.id))
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "glass-strong r-big p-5 min-h-[400px]", children: !selected ? /* @__PURE__ */ jsx("div", { className: "h-full grid place-items-center text-center text-foreground/60 py-20", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ChevStart, { size: 32, className: "mx-auto mb-2 opacity-50" }),
        /* @__PURE__ */ jsx("p", { children: t.selectClass })
      ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "text-heading text-xl", children: selected.name }),
            /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: selected.grade })
          ] }),
          /* @__PURE__ */ jsxs(Button, { onClick: () => setStudentModal({
            open: true
          }), className: "!py-2 !px-3 text-sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
            " ",
            t.addStudent
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "text-foreground/60 text-xs", children: [
            /* @__PURE__ */ jsx("th", { className: "text-start p-3", children: "#" }),
            /* @__PURE__ */ jsx("th", { className: "text-start p-3", children: t.studentName }),
            /* @__PURE__ */ jsx("th", { className: "text-start p-3", children: t.score }),
            /* @__PURE__ */ jsx("th", { className: "p-3" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            selected.students.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-center text-foreground/50 py-8", children: "—" }) }),
            selected.students.map((s, i) => /* @__PURE__ */ jsxs("tr", { className: "bg-white/60 rounded-2xl", children: [
              /* @__PURE__ */ jsx("td", { className: "p-3 rounded-s-2xl", children: i + 1 }),
              /* @__PURE__ */ jsx("td", { className: "p-3 font-bold", children: s.name }),
              /* @__PURE__ */ jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 rounded-full bg-primary/10 text-primary font-bold", children: [
                s.score,
                "%"
              ] }) }),
              /* @__PURE__ */ jsxs("td", { className: "p-3 rounded-e-2xl text-end", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setStudentModal({
                  open: true,
                  edit: s
                }), className: "w-8 h-8 rounded-full bg-white hover:bg-primary/10 inline-grid place-items-center mx-1", children: /* @__PURE__ */ jsx(Pencil, { size: 14 }) }),
                /* @__PURE__ */ jsx("button", { onClick: () => deleteStudent(s.id), className: "w-8 h-8 rounded-full bg-white hover:bg-destructive/10 text-destructive inline-grid place-items-center", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
              ] })
            ] }, s.id))
          ] })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(ClassFormModal, { state: classModal, onClose: () => setClassModal({
      open: false
    }), onSave: saveClass }),
    /* @__PURE__ */ jsx(StudentFormModal, { state: studentModal, onClose: () => setStudentModal({
      open: false
    }), onSave: saveStudent })
  ] });
}
function ClassFormModal({
  state,
  onClose,
  onSave
}) {
  const {
    t
  } = useI18n();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setGrade(state.edit?.grade ?? "");
    }
  }, [state]);
  return /* @__PURE__ */ jsx(Modal, { open: state.open, onClose, title: state.edit ? t.edit : t.addClass, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    if (name.trim()) onSave(name.trim(), grade.trim());
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: t.name, children: /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true }) }),
    /* @__PURE__ */ jsx(Field, { label: t.grade, children: /* @__PURE__ */ jsxs(Select, { value: grade, onChange: (e) => setGrade(e.target.value), children: [
      /* @__PURE__ */ jsx("option", { value: "", children: t.selectGrade }),
      GRADE_OPTIONS_AR.map((g) => /* @__PURE__ */ jsx("option", { value: g, children: g }, g))
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onClose, children: t.cancel }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: t.save })
    ] })
  ] }) });
}
function StudentFormModal({
  state,
  onClose,
  onSave
}) {
  const {
    t
  } = useI18n();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setScore(state.edit?.score ?? 0);
    }
  }, [state]);
  return /* @__PURE__ */ jsx(Modal, { open: state.open, onClose, title: state.edit ? t.edit : t.addStudent, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    if (name.trim()) onSave(name.trim(), Math.max(0, Math.min(100, score)));
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: t.studentName, children: /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true }) }),
    /* @__PURE__ */ jsx(Field, { label: t.score, children: /* @__PURE__ */ jsx(Input, { type: "number", min: 0, max: 100, value: score, onChange: (e) => setScore(Number(e.target.value)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onClose, children: t.cancel }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: t.save })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ClassesPage, {}) });
export {
  SplitComponent as component
};
