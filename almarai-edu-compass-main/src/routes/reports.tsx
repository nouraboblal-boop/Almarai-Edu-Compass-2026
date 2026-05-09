import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, type ClassRoom } from "@/lib/store";
import { TrendingUp, Users, Award } from "lucide-react";

export const Route = createFileRoute("/reports")({
  component: () => (
    <AppShell>
      <ReportsPage />
    </AppShell>
  ),
});

function ReportsPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({ to: "/login" });
  }, [router]);

  const { t } = useI18n();
  const [classes] = usePersistedState<ClassRoom[]>("classes", []);

  const classAverages = classes.map((c) => {
    const sc = c.students.map((s) => s.score);
    return { name: c.name, avg: sc.length ? Math.round(sc.reduce((a, b) => a + b, 0) / sc.length) : 0, count: sc.length };
  });

  const allStudents = classes.flatMap((c) => c.students.map((s) => ({ ...s, className: c.name })));
  const top = [...allStudents].sort((a, b) => b.score - a.score).slice(0, 6);

  const max = Math.max(100, ...classAverages.map((c) => c.avg));

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto space-y-4">
        <div className="glass-strong r-huge p-6 md:p-8">
          <h1 className="text-heading text-2xl md:text-3xl flex items-center gap-2">
            <TrendingUp className="text-primary" /> {t.reports}
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <section className="glass-strong r-big p-6">
            <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
              <Users size={18} /> {t.classProgress}
            </h2>
            {classAverages.length === 0 ? (
              <p className="text-foreground/60 text-sm">—</p>
            ) : (
              <div className="space-y-4">
                {classAverages.map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold">{c.name}</span>
                      <span className="text-foreground/60">{c.avg}%</span>
                    </div>
                    <div className="h-4 bg-white/60 rounded-full overflow-hidden">
                      <div
                        className="h-full primary-grad rounded-full transition-all"
                        style={{ width: `${(c.avg / max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="glass-strong r-big p-6">
            <h2 className="text-heading text-lg mb-4 flex items-center gap-2">
              <Award size={18} className="text-amber-500" /> {t.studentProgress}
            </h2>
            {top.length === 0 ? (
              <p className="text-foreground/60 text-sm">—</p>
            ) : (
              <ul className="space-y-2">
                {top.map((s, i) => (
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
          </section>
        </div>
      </main>
    </>
  );
}
