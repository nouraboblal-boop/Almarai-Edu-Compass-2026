import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState, a as uid } from "./store-vqq0Rd-r.js";
import { B as Button, I as Input, M as Modal, F as Field, S as Select } from "./ui-kit-C66YvHU2.js";
import { Route, Plus, Trash2, Gamepad2, ClipboardCheck, Lightbulb, BookOpen, CheckCircle2, Circle, Lock } from "lucide-react";
import "framer-motion";
const NODE_THEME = {
  explanation: {
    Icon: BookOpen,
    grad: "primary-grad",
    ring: "ring-sky-300"
  },
  example: {
    Icon: Lightbulb,
    grad: "gold-grad",
    ring: "ring-amber-300"
  },
  test: {
    Icon: ClipboardCheck,
    grad: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
    ring: "ring-emerald-300"
  },
  game: {
    Icon: Gamepad2,
    grad: "bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white",
    ring: "ring-pink-300"
  }
};
function PathsPage() {
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
  const [paths, setPaths] = usePersistedState("learning-paths", []);
  const [pathModal, setPathModal] = useState({
    open: false
  });
  const [activeId, setActiveId] = useState(null);
  const active = paths.find((p) => p.id === activeId) ?? null;
  const addPath = (name, classId) => {
    const np = {
      id: uid(),
      name,
      classId: classId || null,
      rules: []
    };
    setPaths([...paths, np]);
    setActiveId(np.id);
    setPathModal({
      open: false
    });
  };
  const deletePath = (id) => {
    setPaths(paths.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  };
  const addRule = (title) => {
    if (!active) return;
    const r = {
      id: uid(),
      title,
      nodes: []
    };
    setPaths(paths.map((p) => p.id === active.id ? {
      ...p,
      rules: [...p.rules, r]
    } : p));
  };
  const addNode = (ruleId, title, type) => {
    if (!active) return;
    const node = {
      id: uid(),
      title,
      type,
      status: "locked"
    };
    setPaths(paths.map((p) => p.id !== active.id ? p : {
      ...p,
      rules: p.rules.map((r) => r.id === ruleId ? {
        ...r,
        nodes: [...r.nodes, node]
      } : r)
    }));
  };
  const deleteRule = (ruleId) => {
    if (!active) return;
    setPaths(paths.map((p) => p.id !== active.id ? p : {
      ...p,
      rules: p.rules.filter((r) => r.id !== ruleId)
    }));
  };
  const deleteNode = (ruleId, nodeId) => {
    if (!active) return;
    setPaths(paths.map((p) => p.id !== active.id ? p : {
      ...p,
      rules: p.rules.map((r) => r.id !== ruleId ? r : {
        ...r,
        nodes: r.nodes.filter((n) => n.id !== nodeId)
      })
    }));
  };
  const classNameOf = (id) => classes.find((c) => c.id === id)?.name;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-[360px_1fr] gap-4", children: [
      /* @__PURE__ */ jsxs("section", { className: "glass-strong r-big p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-heading text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Route, { size: 18 }),
            " ",
            t.learningPaths
          ] }),
          /* @__PURE__ */ jsxs(Button, { onClick: () => setPathModal({
            open: true
          }), className: "!py-2 !px-3 text-sm", children: [
            /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
            " ",
            t.addPath
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          paths.length === 0 && /* @__PURE__ */ jsx("li", { className: "text-foreground/60 text-sm", children: "—" }),
          paths.map((p) => {
            const isClassPath = !!p.classId;
            return /* @__PURE__ */ jsxs("li", { className: `group rounded-2xl p-3 cursor-pointer transition flex items-center justify-between ${activeId === p.id ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/80"}`, onClick: () => setActiveId(p.id), children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("div", { className: "font-bold truncate", children: p.name }),
                /* @__PURE__ */ jsx("span", { className: `inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${isClassPath ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`, children: isClassPath ? `${t.classPath} • ${classNameOf(p.classId) ?? "—"}` : t.generalPath })
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: (e) => {
                e.stopPropagation();
                deletePath(p.id);
              }, className: "w-8 h-8 rounded-full grid place-items-center bg-white text-destructive hover:bg-destructive/10", "aria-label": t.delete, children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
            ] }, p.id);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "glass-strong r-big p-5 min-h-[400px]", children: !active ? /* @__PURE__ */ jsx("div", { className: "h-full grid place-items-center text-foreground/60 py-20", children: /* @__PURE__ */ jsx("p", { children: t.selectClass }) }) : /* @__PURE__ */ jsx(PathDetail, { path: active, classNameOf, onAddRule: addRule, onDeleteRule: deleteRule, onAddNode: addNode, onDeleteNode: deleteNode }) })
    ] }) }),
    /* @__PURE__ */ jsx(PathFormModal, { open: pathModal.open, classes, onClose: () => setPathModal({
      open: false
    }), onSave: addPath })
  ] });
}
function PathDetail({
  path,
  classNameOf,
  onAddRule,
  onDeleteRule,
  onAddNode,
  onDeleteNode
}) {
  const {
    t
  } = useI18n();
  const [ruleTitle, setRuleTitle] = useState("");
  const isClass = !!path.classId;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-heading text-xl", children: path.name }),
      /* @__PURE__ */ jsx("span", { className: `inline-block mt-1 text-xs px-2 py-1 rounded-full font-bold ${isClass ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`, children: isClass ? `${t.classPath} • ${classNameOf(path.classId) ?? "—"}` : t.generalPath })
    ] }) }),
    /* @__PURE__ */ jsxs("form", { className: "flex gap-2 mb-5", onSubmit: (e) => {
      e.preventDefault();
      if (ruleTitle.trim()) {
        onAddRule(ruleTitle.trim());
        setRuleTitle("");
      }
    }, children: [
      /* @__PURE__ */ jsx(Input, { value: ruleTitle, onChange: (e) => setRuleTitle(e.target.value), placeholder: t.addRule }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "!py-2 !px-4 text-sm whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
        " ",
        t.addRule
      ] })
    ] }),
    path.rules.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm", children: "—" }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: path.rules.map((r) => /* @__PURE__ */ jsx(RuleCard, { rule: r, onDelete: () => onDeleteRule(r.id), onAddNode: (title, type) => onAddNode(r.id, title, type), onDeleteNode: (nid) => onDeleteNode(r.id, nid) }, r.id)) })
  ] });
}
function RuleCard({
  rule,
  onDelete,
  onAddNode,
  onDeleteNode
}) {
  const {
    t
  } = useI18n();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("explanation");
  return /* @__PURE__ */ jsxs("div", { className: "bg-white/70 rounded-3xl p-4 border-2 border-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-heading text-base", children: rule.title }),
      /* @__PURE__ */ jsx("button", { onClick: onDelete, className: "w-8 h-8 rounded-full bg-white text-destructive hover:bg-destructive/10 grid place-items-center", "aria-label": t.delete, children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
    ] }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col sm:flex-row gap-2 mb-3", onSubmit: (e) => {
      e.preventDefault();
      if (title.trim()) {
        onAddNode(title.trim(), type);
        setTitle("");
      }
    }, children: [
      /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: t.addNode }),
      /* @__PURE__ */ jsxs(Select, { value: type, onChange: (e) => setType(e.target.value), className: "sm:!w-44", children: [
        /* @__PURE__ */ jsx("option", { value: "explanation", children: t.explanation }),
        /* @__PURE__ */ jsx("option", { value: "example", children: t.example }),
        /* @__PURE__ */ jsx("option", { value: "test", children: t.test }),
        /* @__PURE__ */ jsx("option", { value: "game", children: t.game })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "!py-2 !px-3 text-sm whitespace-nowrap", children: t.addNode })
    ] }),
    rule.nodes.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-foreground/50 text-xs", children: "—" }) : /* @__PURE__ */ jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: rule.nodes.map((n) => {
      const theme = NODE_THEME[n.type];
      const TypeIcon = theme.Icon;
      const StatusIcon = n.status === "completed" ? CheckCircle2 : n.status === "active" ? Circle : Lock;
      return /* @__PURE__ */ jsxs("li", { className: `flex items-center gap-3 bg-white rounded-2xl p-3 ring-2 ${theme.ring}`, children: [
        /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-2xl grid place-items-center text-white ${theme.grad}`, children: /* @__PURE__ */ jsx(TypeIcon, { size: 18 }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-sm truncate", children: n.title }),
          /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-foreground/60 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(StatusIcon, { size: 12 }),
            /* @__PURE__ */ jsx("span", { children: n.status === "completed" ? t.completed : n.status === "active" ? t.active : t.locked }),
            /* @__PURE__ */ jsxs("span", { className: "opacity-60", children: [
              "• ",
              t.readonly
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => onDeleteNode(n.id), className: "w-8 h-8 rounded-full bg-white text-destructive hover:bg-destructive/10 grid place-items-center", "aria-label": t.delete, children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
      ] }, n.id);
    }) })
  ] });
}
function PathFormModal({
  open,
  onClose,
  onSave,
  classes
}) {
  const {
    t
  } = useI18n();
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setClassId("");
    }
  }, [open]);
  return /* @__PURE__ */ jsx(Modal, { open, onClose, title: t.addPath, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    if (name.trim()) onSave(name.trim(), classId);
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: t.name, children: /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true }) }),
    /* @__PURE__ */ jsx(Field, { label: t.pathType, children: /* @__PURE__ */ jsxs(Select, { value: classId, onChange: (e) => setClassId(e.target.value), children: [
      /* @__PURE__ */ jsx("option", { value: "", children: t.general }),
      classes.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onClose, children: t.cancel }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: t.save })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(PathsPage, {}) });
export {
  SplitComponent as component
};
