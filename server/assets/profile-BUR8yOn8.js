import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { u as usePersistedState } from "./store-vqq0Rd-r.js";
import { B as Button, M as Modal, F as Field, I as Input } from "./ui-kit-C66YvHU2.js";
import { Mail, BookOpen, School, UserCircle2, Pencil, LogOut } from "lucide-react";
import "framer-motion";
function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({
      to: "/login"
    });
  }, [router]);
  const {
    t
  } = useI18n();
  const [profile, setProfile] = usePersistedState("profile", {
    name: "أ. هبة",
    subject: "اللغة العربية",
    school: "مدرسة الفصاحة",
    email: "teacher@school.com"
  });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(profile);
  useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);
  const items = [{
    icon: Mail,
    label: t.email,
    value: profile.email
  }, {
    icon: BookOpen,
    label: t.subject,
    value: profile.subject
  }, {
    icon: School,
    label: t.school,
    value: profile.school
  }];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "glass-strong r-huge p-8 md:p-10 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-28 h-28 mx-auto mb-5", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 primary-grad blur-2xl opacity-40 rounded-full" }),
        /* @__PURE__ */ jsx("div", { className: "relative w-28 h-28 rounded-full primary-grad grid place-items-center text-white shadow-xl border-4 border-white", children: /* @__PURE__ */ jsx(UserCircle2, { size: 56 }) })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-heading text-3xl", children: profile.name }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground/60 mt-1", children: profile.subject }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-3 gap-3 mt-8 text-start", children: items.map((it) => {
        const Icon = it.icon;
        return /* @__PURE__ */ jsxs("div", { className: "glass r-mid p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-foreground/60 text-xs mb-1", children: [
            /* @__PURE__ */ jsx(Icon, { size: 14 }),
            " ",
            it.label
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-bold text-sm truncate", children: it.value })
        ] }, it.label);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-center mt-8 flex-wrap", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: () => setOpen(true), children: [
          /* @__PURE__ */ jsx(Pencil, { size: 16, className: "inline -mt-0.5" }),
          " ",
          t.editProfile
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "ghost", onClick: () => {
          localStorage.removeItem("authed");
          router.navigate({
            to: "/login"
          });
        }, children: [
          /* @__PURE__ */ jsx(LogOut, { size: 16, className: "inline -mt-0.5" }),
          " ",
          t.logout
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Modal, { open, onClose: () => setOpen(false), title: t.editProfile, children: /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: (e) => {
      e.preventDefault();
      setProfile(draft);
      setOpen(false);
    }, children: [
      /* @__PURE__ */ jsx(Field, { label: t.teacherName, children: /* @__PURE__ */ jsx(Input, { value: draft.name, onChange: (e) => setDraft({
        ...draft,
        name: e.target.value
      }), required: true }) }),
      /* @__PURE__ */ jsx(Field, { label: t.email, children: /* @__PURE__ */ jsx(Input, { type: "email", value: draft.email, onChange: (e) => setDraft({
        ...draft,
        email: e.target.value
      }) }) }),
      /* @__PURE__ */ jsx(Field, { label: t.subject, children: /* @__PURE__ */ jsx(Input, { value: draft.subject, onChange: (e) => setDraft({
        ...draft,
        subject: e.target.value
      }) }) }),
      /* @__PURE__ */ jsx(Field, { label: t.school, children: /* @__PURE__ */ jsx(Input, { value: draft.school, onChange: (e) => setDraft({
        ...draft,
        school: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-end pt-2", children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "ghost", onClick: () => setOpen(false), children: t.cancel }),
        /* @__PURE__ */ jsx(Button, { type: "submit", children: t.save })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ProfilePage, {}) });
export {
  SplitComponent as component
};
