import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, uid, type TestItem } from "@/lib/store";
import { Modal, Field, Input, Button } from "@/components/ui-kit";
import { ClipboardList, Plus, Trash2, Calendar } from "lucide-react";

export const Route = createFileRoute("/tests")({
  component: () => (
    <AppShell>
      <TestsPage />
    </AppShell>
  ),
});

function TestsPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({ to: "/login" });
  }, [router]);

  const { t } = useI18n();
  const [tests, setTests] = usePersistedState<TestItem[]>("tests", []);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState(5);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTests([{ id: uid(), title: title.trim(), questions, date }, ...tests]);
    setOpen(false);
    setTitle(""); setQuestions(5); setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-5xl mx-auto">
        <div className="glass-strong r-huge p-6 md:p-8 mb-6 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-heading text-2xl md:text-3xl flex items-center gap-2">
            <ClipboardList className="text-primary" /> {t.tests}
          </h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} className="inline -mt-0.5" /> {t.newTest}
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.length === 0 && (
            <div className="glass r-big p-8 col-span-full text-center text-foreground/60">—</div>
          )}
          {tests.map((tt) => (
            <div key={tt.id} className="glass r-big p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-2xl primary-grad text-white grid place-items-center shadow-md">
                  <ClipboardList size={20} />
                </div>
                <button
                  onClick={() => setTests(tests.filter((x) => x.id !== tt.id))}
                  className="w-8 h-8 rounded-full bg-white/80 hover:bg-destructive/10 text-destructive grid place-items-center"
                ><Trash2 size={14} /></button>
              </div>
              <h3 className="text-heading text-lg mb-1">{tt.title}</h3>
              <div className="text-sm text-foreground/60 flex items-center gap-3 mt-2">
                <span>{tt.questions} {t.questions}</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {tt.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title={t.newTest}>
        <form className="space-y-4" onSubmit={create}>
          <Field label={t.testTitle}><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label={t.questions}>
              <Input type="number" min={1} value={questions} onChange={(e) => setQuestions(Number(e.target.value))} />
            </Field>
            <Field label="التاريخ">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>{t.cancel}</Button>
            <Button type="submit">{t.create}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
