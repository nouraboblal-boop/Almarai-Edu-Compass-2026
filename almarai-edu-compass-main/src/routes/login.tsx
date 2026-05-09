import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, GraduationCap, Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n, type Lang } from "@/lib/i18n";
import { Field, Input, Button } from "@/components/ui-kit";
import { Magnetic, ParallaxScenery } from "@/components/motion-kit";
import { IsoSchool } from "@/components/iso-icons";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | بوابة المعلم الذكية" },
      { name: "description", content: "بوابة المعلم الذكية - سجل دخولك لإدارة فصولك" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t, lang, setLang } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("teacher@school.com");
  const [password, setPassword] = useState("123456");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    localStorage.setItem("authed", "1");
    router.navigate({ to: "/" });
  };

  const toggleLang = () => setLang((lang === "ar" ? "en" : "ar") as Lang);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(125, 211, 252, 0.35) 0%, rgba(129, 140, 248, 0.38) 50%, rgba(255, 255, 255, 0.55) 100%), url('/bg-login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <ParallaxScenery />
      <nav className="absolute top-0 inset-x-0 px-4 md:px-8 py-4 flex items-center justify-between z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 primary-grad rounded-2xl grid place-items-center text-white shadow-lg">
            <GraduationCap size={20} />
          </div>
          <span className="text-heading text-foreground">{t.appName}</span>
        </motion.div>
        <Magnetic>
          <button
            onClick={toggleLang}
            className="glass r-mid px-4 py-2 flex items-center gap-2 text-sm font-bold hover:bg-white/80 transition active:scale-95"
          >
            <Languages size={16} /> {lang === "ar" ? "EN" : "AR"}
          </button>
        </Magnetic>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong r-huge w-full max-w-md p-8 md:p-10 mt-16 z-10 relative"
      >
        <div className="relative w-28 h-28 mx-auto mb-4 grid place-items-center">
          <div className="absolute inset-0 primary-grad blur-2xl opacity-40 rounded-full" />
          <IsoSchool size={112} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-heading text-3xl text-center mb-2"
        >
          {t.welcome}
        </motion.h2>
        <p className="text-foreground/60 text-center text-sm mb-8">{t.loginSubtitle}</p>

        <form className="space-y-4" onSubmit={submit}>
          <Field label={t.email}>
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 text-foreground/40" style={{ insetInlineEnd: "1rem" }}>
                <Mail size={18} />
              </span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@school.com"
                style={{ paddingInlineEnd: "2.75rem" }}
                required
              />
            </div>
          </Field>

          <Field label={t.password}>
            <div className="relative">
              <span className="absolute top-1/2 -translate-y-1/2 text-foreground/40" style={{ insetInlineEnd: "1rem" }}>
                <Lock size={18} />
              </span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ paddingInlineEnd: "2.75rem" }}
                required
              />
            </div>
          </Field>


          <div className="flex justify-between items-center px-1 text-xs">
            <label className="flex items-center gap-2 text-foreground/70 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded" />
              {t.remember}
            </label>
            <a href="#" className="text-primary font-bold hover:underline">{t.forgot}</a>
          </div>

          <Magnetic>
            <Button type="submit" className="w-full mt-2">{t.signIn}</Button>
          </Magnetic>
        </form>

        <p className="text-center text-foreground/60 text-xs mt-8">
          {t.noAccount}{" "}
          <a href="#" className="text-primary font-bold hover:underline">{t.contactAdmin}</a>
        </p>
      </motion.div>
    </div>
  );
}

