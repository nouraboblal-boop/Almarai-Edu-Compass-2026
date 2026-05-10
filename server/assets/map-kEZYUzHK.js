import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState, a as uid } from "./store-vqq0Rd-r.js";
import { B as Button, M as Modal, F as Field, I as Input, S as Select } from "./ui-kit-C66YvHU2.js";
import { Trophy, Plus, Lock, Crown, Star, Pencil, Trash2 } from "lucide-react";
import "framer-motion";
const defaultStations = [{
  id: uid(),
  name: "الحروف الأبجدية",
  status: "completed",
  classId: null
}, {
  id: uid(),
  name: "الحركات والتشكيل",
  status: "completed",
  classId: null
}, {
  id: uid(),
  name: "المد والسكون",
  status: "active",
  classId: null
}, {
  id: uid(),
  name: "الجملة الاسمية",
  status: "locked",
  classId: null
}, {
  id: uid(),
  name: "الجملة الفعلية",
  status: "locked",
  classId: null
}, {
  id: uid(),
  name: "قلعة الفصاحة",
  status: "locked",
  classId: null
}];
function MapPage() {
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
  const [stations, setStations] = usePersistedState("stations", defaultStations);
  const [modal, setModal] = useState({
    open: false
  });
  const save = (name, status, classId) => {
    const cid = classId || null;
    if (modal.edit) {
      setStations(stations.map((s) => s.id === modal.edit.id ? {
        ...s,
        name,
        status,
        classId: cid
      } : s));
    } else {
      setStations([...stations, {
        id: uid(),
        name,
        status,
        classId: cid
      }]);
    }
    setModal({
      open: false
    });
  };
  const classNameOf = (id) => classes.find((c) => c.id === id)?.name;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "glass-strong r-huge p-6 md:p-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-heading text-2xl md:text-3xl flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Trophy, { className: "text-amber-500" }),
            " ",
            t.adventureMap
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-sm mt-1", children: t.map })
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "gold", onClick: () => setModal({
          open: true
        }), children: [
          /* @__PURE__ */ jsx(Plus, { size: 16, className: "inline -mt-0.5" }),
          " ",
          t.addStation
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative py-8", children: /* @__PURE__ */ jsx("div", { className: "space-y-10", children: stations.map((s, i) => {
        const offset = i % 4;
        const offsetMap = ["ms-0", "ms-[18%]", "ms-[36%]", "ms-[18%]"];
        return /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-4 ${offsetMap[offset]}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: `w-20 h-20 md:w-24 md:h-24 rounded-full grid place-items-center shadow-xl border-4 border-white transition ${s.status === "completed" ? "gold-grad text-white" : s.status === "active" ? "primary-grad text-white animate-pulse" : "bg-white/70 text-foreground/40"}`, children: s.status === "locked" ? /* @__PURE__ */ jsx(Lock, { size: 28 }) : s.status === "completed" ? /* @__PURE__ */ jsx(Crown, { size: 32 }) : /* @__PURE__ */ jsx(Star, { size: 28 }) }),
            /* @__PURE__ */ jsx("span", { className: "absolute -top-2 -end-2 w-7 h-7 rounded-full bg-white text-primary text-xs font-black grid place-items-center shadow", children: i + 1 })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "glass r-mid px-4 py-3 flex-1 min-w-0 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold truncate", children: s.name }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-foreground/60 flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsx("span", { children: s.status === "completed" ? t.completed : s.status === "active" ? t.active : t.locked }),
                /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${s.classId ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`, children: s.classId ? `${t.classPath} • ${classNameOf(s.classId) ?? "—"}` : t.generalPath })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setModal({
                open: true,
                edit: s
              }), className: "w-8 h-8 rounded-full bg-white grid place-items-center hover:bg-primary/10", children: /* @__PURE__ */ jsx(Pencil, { size: 14 }) }),
              /* @__PURE__ */ jsx("button", { onClick: () => setStations(stations.filter((x) => x.id !== s.id)), className: "w-8 h-8 rounded-full bg-white grid place-items-center text-destructive hover:bg-destructive/10", children: /* @__PURE__ */ jsx(Trash2, { size: 14 }) })
            ] })
          ] })
        ] }, s.id);
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(StationModal, { state: modal, classes, onClose: () => setModal({
      open: false
    }), onSave: save })
  ] });
}
function StationModal({
  state,
  onClose,
  onSave,
  classes
}) {
  const {
    t
  } = useI18n();
  const [name, setName] = useState("");
  const [status, setStatus] = useState("locked");
  const [classId, setClassId] = useState("");
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setStatus(state.edit?.status ?? "locked");
      setClassId(state.edit?.classId ?? "");
    }
  }, [state]);
  return /* @__PURE__ */ jsx(Modal, { open: state.open, onClose, title: state.edit ? t.edit : t.addStation, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
    e.preventDefault();
    if (name.trim()) onSave(name.trim(), status, classId);
  }, children: [
    /* @__PURE__ */ jsx(Field, { label: t.stationName, children: /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value), required: true }) }),
    /* @__PURE__ */ jsx(Field, { label: t.pathType, children: /* @__PURE__ */ jsxs(Select, { value: classId, onChange: (e) => setClassId(e.target.value), children: [
      /* @__PURE__ */ jsx("option", { value: "", children: t.general }),
      classes.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name }, c.id))
    ] }) }),
    /* @__PURE__ */ jsx(Field, { label: t.status, children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["locked", "active", "completed"].map((s) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setStatus(s), className: `flex-1 px-3 py-2 rounded-2xl text-sm font-bold transition ${status === s ? "primary-grad text-white shadow" : "bg-white/70 text-foreground/70"}`, children: s === "locked" ? t.locked : s === "active" ? t.active : t.completed }, s)) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: onClose, children: t.cancel }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: t.save })
    ] })
  ] }) });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(MapPage, {}) });
export {
  SplitComponent as component
};
