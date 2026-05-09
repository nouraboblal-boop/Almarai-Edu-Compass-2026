import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, type ClassRoom, type TestItem } from "@/lib/store";
import { ArrowUpRight, ClipboardList, BookOpen, TrendingUp, Award, Users } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { HoverScaleCard, Magnetic } from "@/components/motion-kit";
import { IsoStudents, IsoSchool, IsoTrophy, IsoBook } from "@/components/iso-icons";

export const Route = createFileRoute("/")({
  component: () => (
    <AppShell>
      <DashboardPage />
    </AppShell>
  ),
});

/**
 * Formats a stat value with a unit only when meaningful.
 *  - If `unit` is "%" the value is a percentage (0-100) → append %.
 *  - If `unit` is undefined / "" the value is a raw count → no symbol.
 * This keeps stat tiles honest: counts show as plain integers,
 * ratios/scores show as percentages.
 */
function formatStat(value: number, unit?: string): string {
  if (!unit) return String(value);
  return `${value}${unit}`;
}

function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const { t } = useI18n();
  const [classes] = usePersistedState<ClassRoom[]>("classes", []);
  const [tests] = usePersistedState<TestItem[]>("tests", []);
  const [profile] = usePersistedState("profile", { name: "أ. هبة", subject: "اللغة العربية", school: "مدرسة الفصاحة", email: "teacher@school.com" });

  // ── Aggregate calculations ──────────────────────────────────────────────
  // studentsCount: sum of students across all classes (raw integer → no unit)
  // avg: arithmetic mean of every student's score across every class.
  //   Formula: avg = Σ(student.score) / count(students)        ∈ [0, 100]
  //   Source: usePersistedState('classes') in localStorage.
  const studentsCount = classes.reduce((s, c) => s + c.students.length, 0);
  const allScores = classes.flatMap((c) => c.students.map((s) => s.score));
  const avg = allScores.length ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  // Each stat carries a numeric value + an optional unit. Unit is "%" only
  // for percentage-style metrics (progress); counts have no unit.
  const stats = [
    { label: t.students, value: studentsCount, unit: "", Icon: IsoStudents },
    { label: t.classesCount, value: classes.length, unit: "", Icon: IsoSchool },
    { label: t.progress, value: avg, unit: "%", Icon: IsoTrophy },
    { label: t.completedTests, value: tests.length, unit: "", Icon: IsoBook },
  ];

  // ── Reports data (merged from former /reports route) ─────────────────────
  // Per-class average using same formula as `avg` but scoped per class.
  const classAverages = classes.map((c) => {
    const sc = c.students.map((s) => s.score);
    return {
      name: c.name,
      avg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : 0,
    };
  });
  const maxAvg = Math.max(100, ...classAverages.map((c) => c.avg));
  // Top students: flatten all students with their class name, sort desc by score.
  const allStudents = classes.flatMap((c) => c.students.map((s) => ({ ...s, className: c.name })));
  const topStudents = [...allStudents].sort((a, b) => b.score - a.score).slice(0, 6);

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto">
        <section className="glass-strong r-huge p-6 md:p-10 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-foreground/60 text-sm mb-2">{t.welcomeBack} 👋</p>
            <h1 className="text-heading text-3xl md:text-4xl">{profile.name}</h1>
            <p className="text-foreground/70 mt-2">{t.today}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Magnetic>
              <Link to="/classes" className="primary-grad text-white font-bold px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 active:scale-95 transition">
                {t.addClass} <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to="/paths" className="bg-white/80 px-5 py-3 rounded-2xl font-bold flex items-center gap-2 active:scale-95 transition">
                {t.learningPaths} <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
          </div>
        </section>

        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6" style={{ perspective: 1200 }}>
          {stats.map((s, i) => {
            const Icon = s.Icon;
            return (
              <HoverScaleCard key={s.label} delay={i * 0.07} className="glass r-big p-5 cursor-pointer">
                <div className="grid place-items-center mb-2">
                  <Icon size={84} />
                </div>
                {/* Value rendered through formatStat → only shows % when unit is set */}
                <div className="text-3xl text-heading text-center">{formatStat(s.value, s.unit)}</div>
                <div className="text-foreground/60 text-sm mt-1 text-center">{s.label}</div>
              </HoverScaleCard>
            );
          })}
        </section>

        {/* Reports section — previously a standalone /reports route, merged here */}
        <section className="glass-strong r-huge p-6 md:p-8 mb-6">
          <h2 className="text-heading text-xl md:text-2xl flex items-center gap-2 mb-5">
            <TrendingUp className="text-primary" /> {t.reports}
          </h2>

          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <h3 className="text-heading text-base mb-3 flex items-center gap-2">
                <Users size={16} /> {t.classProgress}
              </h3>
              {classAverages.length === 0 ? (
                <p className="text-foreground/60 text-sm">—</p>
              ) : (
                <div className="space-y-3">
                  {classAverages.map((c) => (
                    <div key={c.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold">{c.name}</span>
                        {/* % shown because c.avg is a percentage metric */}
                        <span className="text-foreground/60">{c.avg}%</span>
                      </div>
                      <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                        <div
                          className="h-full primary-grad rounded-full transition-all"
                          style={{ width: `${(c.avg / maxAvg) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-heading text-base mb-3 flex items-center gap-2">
                <Award size={16} className="text-amber-500" /> {t.studentProgress}
              </h3>
              {topStudents.length === 0 ? (
                <p className="text-foreground/60 text-sm">—</p>
              ) : (
                <ul className="space-y-2">
                  {topStudents.map((s, i) => (
                    <li key={s.id} className="bg-white/70 rounded-2xl p-3 flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full grid place-items-center text-white font-black text-sm ${
                        i === 0 ? "gold-grad" : i < 3 ? "primary-grad" : "bg-foreground/30"
                      }`}>{i + 1}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{s.name}</div>
                        <div className="text-xs text-foreground/60">{s.className}</div>
                      </div>
                      <div className="font-black text-primary">{s.score}%</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-4">
          <div className="glass-strong r-big p-6 lg:col-span-2">
            <h2 className="text-heading text-xl mb-4">{t.classProgress}</h2>
            {classes.length === 0 ? (
              <p className="text-foreground/60 text-sm">{t.selectClass}</p>
            ) : (
              <div className="space-y-3">
                {classes.map((c) => {
                  const scores = c.students.map((s) => s.score);
                  // Per-class avg formula: Σ(scores)/n  → percentage 0..100
                  const a = scores.length ? Math.round(scores.reduce((x, y) => x + y, 0) / scores.length) : 0;
                  return (
                    <div key={c.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-bold">{c.name}</span>
                        <span className="text-foreground/60">{a}%</span>
                      </div>
                      <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                        <div className="h-full primary-grad rounded-full" style={{ width: `${a}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="glass-strong r-big p-6">
            <h2 className="text-heading text-xl mb-4 flex items-center gap-2">
              <ClipboardList size={20} /> {t.upcoming}
            </h2>
            {tests.length === 0 ? (
              <p className="text-foreground/60 text-sm">—</p>
            ) : (
              <ul className="space-y-2">
                {tests.slice(0, 5).map((tt) => (
                  <li key={tt.id} className="bg-white/70 rounded-2xl p-3 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-sm">{tt.title}</div>
                      <div className="text-xs text-foreground/60">{tt.questions} • {tt.date}</div>
                    </div>
                    <BookOpen size={18} className="text-primary" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
