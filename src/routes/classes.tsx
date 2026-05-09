import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, uid, GRADE_OPTIONS_AR, type ClassRoom, type Student } from "@/lib/store";
import { Modal, Field, Input, Select, Button } from "@/components/ui-kit";
import { Plus, Pencil, Trash2, Users, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/classes")({
  component: () => (
    <AppShell>
      <ClassesPage />
    </AppShell>
  ),
});

function ClassesPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const { t, lang } = useI18n();
  const [classes, setClasses] = usePersistedState<ClassRoom[]>("classes", []);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [classModal, setClassModal] = useState<{ open: boolean; edit?: ClassRoom }>({ open: false });
  const [studentModal, setStudentModal] = useState<{ open: boolean; edit?: Student }>({ open: false });

  const selected = classes.find((c) => c.id === selectedId) ?? null;

  const saveClass = (name: string, grade: string) => {
    if (classModal.edit) {
      setClasses(classes.map((c) => (c.id === classModal.edit!.id ? { ...c, name, grade } : c)));
    } else {
      const newC: ClassRoom = { id: uid(), name, grade, students: [] };
      setClasses([...classes, newC]);
      setSelectedId(newC.id);
    }
    setClassModal({ open: false });
  };

  const deleteClass = (id: string) => {
    if (!confirm(lang === "ar" ? "حذف الصف وجميع طلابه؟" : "Delete class and all students?")) return;
    setClasses(classes.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const saveStudent = (name: string, score: number) => {
    if (!selected) return;
    const updated = studentModal.edit
      ? selected.students.map((s) => (s.id === studentModal.edit!.id ? { ...s, name, score } : s))
      : [...selected.students, { id: uid(), name, score }];
    setClasses(classes.map((c) => (c.id === selected.id ? { ...c, students: updated } : c)));
    setStudentModal({ open: false });
  };

  const deleteStudent = (id: string) => {
    if (!selected) return;
    setClasses(classes.map((c) => (c.id === selected.id ? { ...c, students: c.students.filter((s) => s.id !== id) } : c)));
  };

  const ChevStart = lang === "ar" ? ChevronRight : ChevronLeft;

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[360px_1fr] gap-4">
          {/* Classes list */}
          <section className="glass-strong r-big p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading text-lg">{t.classes}</h2>
              <Button onClick={() => setClassModal({ open: true })} className="!py-2 !px-3 text-sm">
                <Plus size={16} className="inline -mt-0.5" /> {t.addClass}
              </Button>
            </div>
            <ul className="space-y-2">
              {classes.length === 0 && <li className="text-foreground/60 text-sm">{t.selectClass}</li>}
              {classes.map((c) => (
                <li
                  key={c.id}
                  className={`group rounded-2xl p-3 cursor-pointer transition flex items-center justify-between ${
                    selectedId === c.id ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/80"
                  }`}
                  onClick={() => setSelectedId(c.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl primary-grad text-white grid place-items-center">
                      <Users size={18} />
                    </div>
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs text-foreground/60">{c.grade} • {c.students.length} {t.students}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-70 group-hover:opacity-100">
                    <button
                      onClick={(e) => { e.stopPropagation(); setClassModal({ open: true, edit: c }); }}
                      className="w-8 h-8 rounded-full grid place-items-center bg-white hover:bg-primary/10"
                      aria-label={t.edit}
                    ><Pencil size={14} /></button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteClass(c.id); }}
                      className="w-8 h-8 rounded-full grid place-items-center bg-white hover:bg-destructive/10 text-destructive"
                      aria-label={t.delete}
                    ><Trash2 size={14} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Students panel */}
          <section className="glass-strong r-big p-5 min-h-[400px]">
            {!selected ? (
              <div className="h-full grid place-items-center text-center text-foreground/60 py-20">
                <div>
                  <ChevStart size={32} className="mx-auto mb-2 opacity-50" />
                  <p>{t.selectClass}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-heading text-xl">{selected.name}</h2>
                    <p className="text-foreground/60 text-sm">{selected.grade}</p>
                  </div>
                  <Button onClick={() => setStudentModal({ open: true })} className="!py-2 !px-3 text-sm">
                    <Plus size={16} className="inline -mt-0.5" /> {t.addStudent}
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-foreground/60 text-xs">
                        <th className="text-start p-3">#</th>
                        <th className="text-start p-3">{t.studentName}</th>
                        <th className="text-start p-3">{t.score}</th>
                        <th className="p-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.students.length === 0 && (
                        <tr><td colSpan={4} className="text-center text-foreground/50 py-8">—</td></tr>
                      )}
                      {selected.students.map((s, i) => (
                        <tr key={s.id} className="bg-white/60 rounded-2xl">
                          <td className="p-3 rounded-s-2xl">{i + 1}</td>
                          <td className="p-3 font-bold">{s.name}</td>
                          <td className="p-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">{s.score}%</span>
                          </td>
                          <td className="p-3 rounded-e-2xl text-end">
                            <button
                              onClick={() => setStudentModal({ open: true, edit: s })}
                              className="w-8 h-8 rounded-full bg-white hover:bg-primary/10 inline-grid place-items-center mx-1"
                            ><Pencil size={14} /></button>
                            <button
                              onClick={() => deleteStudent(s.id)}
                              className="w-8 h-8 rounded-full bg-white hover:bg-destructive/10 text-destructive inline-grid place-items-center"
                            ><Trash2 size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      <ClassFormModal
        state={classModal}
        onClose={() => setClassModal({ open: false })}
        onSave={saveClass}
      />
      <StudentFormModal
        state={studentModal}
        onClose={() => setStudentModal({ open: false })}
        onSave={saveStudent}
      />
    </>
  );
}

function ClassFormModal({
  state, onClose, onSave,
}: { state: { open: boolean; edit?: ClassRoom }; onClose: () => void; onSave: (n: string, g: string) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setGrade(state.edit?.grade ?? "");
    }
  }, [state]);
  return (
    <Modal open={state.open} onClose={onClose} title={state.edit ? t.edit : t.addClass}>
      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSave(name.trim(), grade.trim()); }}
      >
        <Field label={t.name}><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
        {/* Grade is now a Dropdown (Select) instead of free-text input.
            Source values: GRADE_OPTIONS_AR in src/lib/store.ts.
            Reduces typos and enforces consistent grade naming. */}
        <Field label={t.grade}>
          <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option value="">{t.selectGrade}</option>
            {GRADE_OPTIONS_AR.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Select>
        </Field>
        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>{t.cancel}</Button>
          <Button type="submit">{t.save}</Button>
        </div>
      </form>
    </Modal>
  );
}

function StudentFormModal({
  state, onClose, onSave,
}: { state: { open: boolean; edit?: Student }; onClose: () => void; onSave: (n: string, s: number) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setScore(state.edit?.score ?? 0);
    }
  }, [state]);
  return (
    <Modal open={state.open} onClose={onClose} title={state.edit ? t.edit : t.addStudent}>
      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSave(name.trim(), Math.max(0, Math.min(100, score))); }}
      >
        <Field label={t.studentName}><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
        <Field label={t.score}>
          <Input type="number" min={0} max={100} value={score} onChange={(e) => setScore(Number(e.target.value))} />
        </Field>
        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>{t.cancel}</Button>
          <Button type="submit">{t.save}</Button>
        </div>
      </form>
    </Modal>
  );
}
