import { jsxs, jsx } from "react/jsx-runtime";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { useContext, createContext, useState, useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
const translations = {
  ar: {
    appName: "بوابة المعلم الذكية",
    welcome: "مرحباً بك مجدداً",
    loginSubtitle: "سجل دخولك لإدارة فصولك التعليمية",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    remember: "تذكرني",
    forgot: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    contactAdmin: "اتصل بالإدارة",
    home: "الرئيسية",
    support: "الدعم التقني",
    dashboard: "لوحة التحكم",
    classes: "الصفوف والطلاب",
    map: "خريطة المسار",
    reports: "التقارير",
    grammar: "قواعد اللغة العربية",
    tests: "الاختبارات",
    profile: "الملف الشخصي",
    logout: "تسجيل الخروج",
    students: "الطلاب",
    classesCount: "الفصول",
    progress: "التقدم العام",
    completedTests: "اختبارات منجزة",
    addClass: "إضافة صف",
    addStudent: "إضافة طالب",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    name: "الاسم",
    grade: "المرحلة",
    selectClass: "اختر صفاً لعرض الطلاب",
    studentName: "اسم الطالب",
    score: "النتيجة",
    adventureMap: "مسار المغامرة",
    stationName: "اسم المحطة",
    status: "الحالة",
    locked: "مغلق",
    active: "نشط",
    completed: "مكتمل",
    addStation: "إضافة محطة",
    classProgress: "تقدم الصفوف",
    studentProgress: "تقدم الطلاب",
    grammarRules: "قواعد اللغة",
    newTest: "اختبار جديد",
    testTitle: "عنوان الاختبار",
    questions: "عدد الأسئلة",
    create: "إنشاء",
    editProfile: "تعديل الملف الشخصي",
    teacherName: "اسم المعلم",
    subject: "المادة",
    school: "المدرسة",
    addQuestion: "إضافة سؤال",
    question: "السؤال",
    answer: "الإجابة",
    upcoming: "اختبارات قادمة",
    quickActions: "إجراءات سريعة",
    welcomeBack: "أهلاً بك",
    today: "إليك ملخص يومك التعليمي",
    learningPaths: "عرض مسارات التعلم",
    pathType: "نوع المسار",
    classPath: "مسار صف",
    generalPath: "مسار عام",
    addPath: "إضافة مسار",
    addRule: "إضافة قاعدة",
    addNode: "إضافة عقدة",
    nodeType: "نوع العقدة",
    explanation: "شرح",
    example: "مثال",
    test: "اختبار",
    game: "لعبة",
    rules: "القواعد",
    nodes: "العقد",
    readonly: "للقراءة فقط",
    overview: "نظرة عامة",
    selectGrade: "اختر المرحلة",
    selectClassOpt: "اختر الصف (أو عام)",
    general: "عام"
  },
  en: {
    appName: "Smart Teacher Portal",
    welcome: "Welcome Back",
    loginSubtitle: "Sign in to manage your classes",
    email: "Email",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot password?",
    signIn: "Sign In",
    noAccount: "Don't have an account?",
    contactAdmin: "Contact admin",
    home: "Home",
    support: "Support",
    dashboard: "Dashboard",
    classes: "Classes & Students",
    map: "Adventure Map",
    reports: "Reports",
    grammar: "Arabic Grammar",
    tests: "Tests",
    profile: "Profile",
    logout: "Log out",
    students: "Students",
    classesCount: "Classes",
    progress: "Overall Progress",
    completedTests: "Tests completed",
    addClass: "Add Class",
    addStudent: "Add Student",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    grade: "Grade",
    selectClass: "Select a class to view students",
    studentName: "Student name",
    score: "Score",
    adventureMap: "Adventure Path",
    stationName: "Station name",
    status: "Status",
    locked: "Locked",
    active: "Active",
    completed: "Completed",
    addStation: "Add Station",
    classProgress: "Class Progress",
    studentProgress: "Student Progress",
    grammarRules: "Grammar Rules",
    newTest: "New Test",
    testTitle: "Test title",
    questions: "Questions",
    create: "Create",
    editProfile: "Edit Profile",
    teacherName: "Teacher name",
    subject: "Subject",
    school: "School",
    addQuestion: "Add Question",
    question: "Question",
    answer: "Answer",
    upcoming: "Upcoming Tests",
    quickActions: "Quick Actions",
    welcomeBack: "Welcome back",
    today: "Here's your teaching summary today",
    learningPaths: "Learning Paths",
    pathType: "Path type",
    classPath: "Class path",
    generalPath: "General path",
    addPath: "Add Path",
    addRule: "Add Rule",
    addNode: "Add Node",
    nodeType: "Node type",
    explanation: "Explanation",
    example: "Example",
    test: "Test",
    game: "Game",
    rules: "Rules",
    nodes: "Nodes",
    readonly: "Read only",
    overview: "Overview",
    selectGrade: "Select grade",
    selectClassOpt: "Select class (or general)",
    general: "General"
  }
};
const I18nContext = createContext({ lang: "ar", setLang: () => {
}, t: translations.ar });
const useI18n = () => useContext(I18nContext);
function Magnetic({
  children,
  strength = 0.35,
  className = ""
}) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.4 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      onMouseMove: onMove,
      onMouseLeave: onLeave,
      style: { x, y },
      className,
      children
    }
  );
}
function PageTransition({ children }) {
  const loc = useLocation();
  const pathname = loc?.pathname ?? "/";
  const { lang } = useI18n();
  const dir = lang === "ar" ? -1 : 1;
  return /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 24 * dir, filter: "blur(6px)" },
      animate: { opacity: 1, x: 0, filter: "blur(0px)" },
      exit: { opacity: 0, x: -24 * dir, filter: "blur(6px)" },
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsx(Confetti, { trigger: pathname }),
        children
      ]
    },
    pathname
  ) });
}
function Confetti({ trigger }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const colors = ["#fbbf24", "#7dd3fc", "#86efac", "#f9a8d4", "#c4b5fd", "#fde68a"];
  const pieces = Array.from({ length: 18 });
  return /* @__PURE__ */ jsx("div", { className: "pointer-events-none fixed inset-0 z-50 overflow-hidden", children: pieces.map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 0.3;
    const dur = 1.6 + Math.random() * 1.4;
    const size = 8 + Math.random() * 8;
    const color = colors[i % colors.length];
    const rounded = i % 3 === 0;
    return /* @__PURE__ */ jsx(
      "span",
      {
        style: {
          position: "absolute",
          left: `${left}%`,
          top: "-10vh",
          width: size,
          height: size * (rounded ? 1 : 0.5),
          background: color,
          borderRadius: rounded ? "50%" : "2px",
          animation: `confetti-fall ${dur}s ${delay}s ease-in forwards`
        }
      },
      i
    );
  }) }, trigger);
}
function ParallaxScenery() {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    const onMouse = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);
  const clouds = [
    { top: "8%", size: 110, delay: 0, dur: 60, opacity: 0.85, depth: 12 },
    { top: "22%", size: 70, delay: 8, dur: 80, opacity: 0.6, depth: 6 },
    { top: "55%", size: 140, delay: 4, dur: 95, opacity: 0.7, depth: 18 },
    { top: "75%", size: 85, delay: 14, dur: 70, opacity: 0.55, depth: 9 }
  ];
  const butterflies = [
    { left: "12%", top: "65%", color: "#f472b6", delay: 0 },
    { left: "78%", top: "30%", color: "#fbbf24", delay: 3 },
    { left: "45%", top: "80%", color: "#a78bfa", delay: 6 }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "pointer-events-none fixed inset-0 z-0 overflow-hidden", children: [
    clouds.map((c, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { x: "-15vw" },
        animate: { x: "115vw" },
        transition: { duration: c.dur, repeat: Infinity, delay: c.delay, ease: "linear" },
        style: {
          position: "absolute",
          top: c.top,
          transform: `translateY(${-scroll * 0.05 + mouse.y * c.depth}px) translateX(${mouse.x * c.depth}px)`,
          opacity: c.opacity
        },
        children: /* @__PURE__ */ jsx(Cloud, { size: c.size })
      },
      `c${i}`
    )),
    butterflies.map((b, i) => /* @__PURE__ */ jsx(
      motion.div,
      {
        style: {
          position: "absolute",
          left: b.left,
          top: b.top,
          transform: `translate(${mouse.x * 20}px, ${-scroll * 0.1 + mouse.y * 20}px)`
        },
        animate: {
          y: [0, -30, 0, -20, 0],
          x: [0, 25, 0, -20, 0],
          rotate: [0, 8, -6, 4, 0]
        },
        transition: { duration: 12, repeat: Infinity, delay: b.delay, ease: "easeInOut" },
        children: /* @__PURE__ */ jsx(Butterfly, { color: b.color })
      },
      `b${i}`
    ))
  ] });
}
function Cloud({ size = 100 }) {
  return /* @__PURE__ */ jsxs("svg", { width: size, height: size * 0.6, viewBox: "0 0 100 60", fill: "white", style: { filter: "drop-shadow(0 8px 20px rgba(255,255,255,.5))" }, children: [
    /* @__PURE__ */ jsx("ellipse", { cx: "30", cy: "40", rx: "20", ry: "15" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "55", cy: "32", rx: "25", ry: "20" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "78", cy: "42", rx: "18", ry: "13" }),
    /* @__PURE__ */ jsx("ellipse", { cx: "48", cy: "45", rx: "30", ry: "13" })
  ] });
}
function Butterfly({ color = "#f472b6" }) {
  return /* @__PURE__ */ jsxs(
    motion.svg,
    {
      width: 36,
      height: 28,
      viewBox: "0 0 36 28",
      animate: { scaleX: [1, 0.4, 1] },
      transition: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
      style: { filter: `drop-shadow(0 4px 8px ${color}55)` },
      children: [
        /* @__PURE__ */ jsx("ellipse", { cx: "9", cy: "10", rx: "9", ry: "7", fill: color, opacity: 0.85 }),
        /* @__PURE__ */ jsx("ellipse", { cx: "27", cy: "10", rx: "9", ry: "7", fill: color, opacity: 0.85 }),
        /* @__PURE__ */ jsx("ellipse", { cx: "9", cy: "20", rx: "6", ry: "5", fill: color, opacity: 0.7 }),
        /* @__PURE__ */ jsx("ellipse", { cx: "27", cy: "20", rx: "6", ry: "5", fill: color, opacity: 0.7 }),
        /* @__PURE__ */ jsx("rect", { x: "17", y: "6", width: "2", height: "18", rx: "1", fill: "#1f2937" })
      ]
    }
  );
}
function HoverScaleCard({
  children,
  className = "",
  delay = 0
}) {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { delay, type: "spring", stiffness: 120, damping: 16 },
      whileHover: { scale: 1.04, y: -4, transition: { type: "spring", stiffness: 300, damping: 18 } },
      whileTap: { scale: 0.97 },
      className,
      children
    }
  );
}
export {
  HoverScaleCard as H,
  I18nContext as I,
  Magnetic as M,
  ParallaxScenery as P,
  PageTransition as a,
  translations as t,
  useI18n as u
};
