import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, Languages, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { u as useI18n, P as ParallaxScenery, M as Magnetic } from "./motion-kit-CCOFZVYO.js";
import { F as Field, I as Input, B as Button } from "./ui-kit-C66YvHU2.js";
import { I as IsoSchool } from "./iso-icons-BiKMLhxU.js";
function LoginPage() {
  const {
    t,
    lang,
    setLang
  } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("teacher@school.com");
  const [password, setPassword] = useState("123456");
  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    localStorage.setItem("authed", "1");
    router.navigate({
      to: "/"
    });
  };
  const toggleLang = () => setLang(lang === "ar" ? "en" : "ar");
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden", style: {
    backgroundImage: "linear-gradient(135deg, rgba(125, 211, 252, 0.35) 0%, rgba(129, 140, 248, 0.38) 50%, rgba(255, 255, 255, 0.55) 100%), url('/bg-login.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }, children: [
    /* @__PURE__ */ jsx(ParallaxScenery, {}),
    /* @__PURE__ */ jsxs("nav", { className: "absolute top-0 inset-x-0 px-4 md:px-8 py-4 flex items-center justify-between z-20", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: -20
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 primary-grad rounded-2xl grid place-items-center text-white shadow-lg", children: /* @__PURE__ */ jsx(GraduationCap, { size: 20 }) }),
        /* @__PURE__ */ jsx("span", { className: "text-heading text-foreground", children: t.appName })
      ] }),
      /* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsxs("button", { onClick: toggleLang, className: "glass r-mid px-4 py-2 flex items-center gap-2 text-sm font-bold hover:bg-white/80 transition active:scale-95", children: [
        /* @__PURE__ */ jsx(Languages, { size: 16 }),
        " ",
        lang === "ar" ? "EN" : "AR"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30,
      scale: 0.96
    }, animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }, transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }, className: "glass-strong r-huge w-full max-w-md p-8 md:p-10 mt-16 z-10 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-28 h-28 mx-auto mb-4 grid place-items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 primary-grad blur-2xl opacity-40 rounded-full" }),
        /* @__PURE__ */ jsx(IsoSchool, { size: 112 })
      ] }),
      /* @__PURE__ */ jsx(motion.h2, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.15
      }, className: "text-heading text-3xl text-center mb-2", children: t.welcome }),
      /* @__PURE__ */ jsx("p", { className: "text-foreground/60 text-center text-sm mb-8", children: t.loginSubtitle }),
      /* @__PURE__ */ jsxs("form", { className: "space-y-4", onSubmit: submit, children: [
        /* @__PURE__ */ jsx(Field, { label: t.email, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-1/2 -translate-y-1/2 text-foreground/40", style: {
            insetInlineEnd: "1rem"
          }, children: /* @__PURE__ */ jsx(Mail, { size: 18 }) }),
          /* @__PURE__ */ jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@school.com", style: {
            paddingInlineEnd: "2.75rem"
          }, required: true })
        ] }) }),
        /* @__PURE__ */ jsx(Field, { label: t.password, children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-1/2 -translate-y-1/2 text-foreground/40", style: {
            insetInlineEnd: "1rem"
          }, children: /* @__PURE__ */ jsx(Lock, { size: 18 }) }),
          /* @__PURE__ */ jsx(Input, { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", style: {
            paddingInlineEnd: "2.75rem"
          }, required: true })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-1 text-xs", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-foreground/70 cursor-pointer", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", defaultChecked: true, className: "rounded" }),
            t.remember
          ] }),
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-primary font-bold hover:underline", children: t.forgot })
        ] }),
        /* @__PURE__ */ jsx(Magnetic, { children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-2", children: t.signIn }) })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-center text-foreground/60 text-xs mt-8", children: [
        t.noAccount,
        " ",
        /* @__PURE__ */ jsx("a", { href: "#", className: "text-primary font-bold hover:underline", children: t.contactAdmin })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
