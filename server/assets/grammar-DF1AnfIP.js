import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { A as AppShell, T as TopBar } from "./TopBar-Bed-3uX0.js";
import { u as useI18n } from "./motion-kit-CCOFZVYO.js";
import { M as Modal } from "./ui-kit-C66YvHU2.js";
import { BookOpen } from "lucide-react";
import "framer-motion";
const rules = [{
  title: "الجملة الاسمية",
  body: "تتكون من مبتدأ وخبر، وكلاهما مرفوع. مثال: الطالبُ مجتهدٌ."
}, {
  title: "الجملة الفعلية",
  body: "تبدأ بفعل ثم فاعل ثم مفعول به (إن وُجد). مثال: كتبَ المعلمُ الدرسَ."
}, {
  title: "كان وأخواتها",
  body: "ترفع المبتدأ (اسمها) وتنصب الخبر. مثال: كان الجوُّ جميلاً."
}, {
  title: "إنّ وأخواتها",
  body: "تنصب المبتدأ (اسمها) وترفع الخبر. مثال: إنّ العلمَ نورٌ."
}, {
  title: "الفاعل",
  body: "اسم مرفوع يدل على من قام بالفعل. مثال: قرأَ الطالبُ."
}, {
  title: "المفعول به",
  body: "اسم منصوب يقع عليه فعل الفاعل. مثال: قرأَ الطالبُ الكتابَ."
}, {
  title: "النعت (الصفة)",
  body: "يتبع المنعوت في إعرابه. مثال: جاءَ الطالبُ المجتهدُ."
}, {
  title: "الحال",
  body: "اسم منصوب يبيّن هيئة صاحبه. مثال: عادَ الجنودُ منتصرين."
}];
function GrammarPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({
      to: "/login"
    });
  }, [router]);
  const {
    t
  } = useI18n();
  const [active, setActive] = useState(null);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsxs("main", { className: "px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass-strong r-huge p-6 md:p-8 mb-6", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-heading text-2xl md:text-3xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(BookOpen, { className: "text-primary" }),
          " ",
          t.grammarRules
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground/60 mt-1 text-sm", children: "قواعد اللغة العربية الأساسية" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: rules.map((r, i) => /* @__PURE__ */ jsxs("button", { onClick: () => setActive(r), className: "glass r-big p-6 text-start hover:scale-[1.02] hover:shadow-xl transition group", children: [
        /* @__PURE__ */ jsx("div", { className: `w-12 h-12 rounded-2xl text-white grid place-items-center mb-3 shadow-md ${i % 3 === 0 ? "primary-grad" : i % 3 === 1 ? "gold-grad" : "bg-gradient-to-br from-emerald-500 to-teal-500"}`, children: /* @__PURE__ */ jsx(BookOpen, { size: 20 }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-heading text-lg mb-2 group-hover:text-primary transition", children: r.title }),
        /* @__PURE__ */ jsx("p", { className: "text-foreground/70 text-sm line-clamp-2", children: r.body })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx(Modal, { open: !!active, onClose: () => setActive(null), title: active?.title ?? "", children: /* @__PURE__ */ jsx("p", { className: "text-foreground/80 leading-relaxed text-base", children: active?.body }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(GrammarPage, {}) });
export {
  SplitComponent as component
};
