import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, uid, type Station, type ClassRoom } from "@/lib/store";
import { Modal, Field, Input, Select, Button } from "@/components/ui-kit";
import { Crown, Lock, Star, Plus, Pencil, Trash2, Trophy } from "lucide-react";

const defaultStations: Station[] = [
  { id: uid(), name: "الحروف الأبجدية", status: "completed", classId: null },
  { id: uid(), name: "الحركات والتشكيل", status: "completed", classId: null },
  { id: uid(), name: "المد والسكون", status: "active", classId: null },
  { id: uid(), name: "الجملة الاسمية", status: "locked", classId: null },
  { id: uid(), name: "الجملة الفعلية", status: "locked", classId: null },
  { id: uid(), name: "قلعة الفصاحة", status: "locked", classId: null },
];

export const Route = createFileRoute("/map")({
  component: () => (
    <AppShell>
      <MapPage />
    </AppShell>
  ),
});

function MapPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const { t } = useI18n();
  const [classes] = usePersistedState<ClassRoom[]>("classes", []);
  const [stations, setStations] = usePersistedState<Station[]>("stations", defaultStations);
  const [modal, setModal] = useState<{ open: boolean; edit?: Station }>({ open: false });

  // Save station. classId === "" → general path (null).
  const save = (name: string, status: Station["status"], classId: string) => {
    const cid = classId || null;
    if (modal.edit) {
      setStations(stations.map((s) => (s.id === modal.edit!.id ? { ...s, name, status, classId: cid } : s)));
    } else {
      setStations([...stations, { id: uid(), name, status, classId: cid }]);
    }
    setModal({ open: false });
  };

  const classNameOf = (id?: string | null) => classes.find((c) => c.id === id)?.name;

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto">
        <div className="glass-strong r-huge p-6 md:p-10">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-heading text-2xl md:text-3xl flex items-center gap-2">
                <Trophy className="text-amber-500" /> {t.adventureMap}
              </h1>
              <p className="text-foreground/60 text-sm mt-1">{t.map}</p>
            </div>
            <Button variant="gold" onClick={() => setModal({ open: true })}>
              <Plus size={16} className="inline -mt-0.5" /> {t.addStation}
            </Button>
          </div>

          <div className="relative py-8">
            <div className="space-y-10">
              {stations.map((s, i) => {
                const offset = i % 4;
                const offsetMap = ["ms-0", "ms-[18%]", "ms-[36%]", "ms-[18%]"];
                return (
                  <div key={s.id} className={`flex items-center gap-4 ${offsetMap[offset]}`}>
                    <div className="relative">
                      <div
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-full grid place-items-center shadow-xl border-4 border-white transition ${
                          s.status === "completed"
                            ? "gold-grad text-white"
                            : s.status === "active"
                            ? "primary-grad text-white animate-pulse"
                            : "bg-white/70 text-foreground/40"
                        }`}
                      >
                        {s.status === "locked" ? <Lock size={28} /> : s.status === "completed" ? <Crown size={32} /> : <Star size={28} />}
                      </div>
                      <span className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-white text-primary text-xs font-black grid place-items-center shadow">
                        {i + 1}
                      </span>
                    </div>
                    <div className="glass r-mid px-4 py-3 flex-1 min-w-0 flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-bold truncate">{s.name}</div>
                        <div className="text-xs text-foreground/60 flex items-center gap-2 flex-wrap">
                          <span>
                            {s.status === "completed" ? t.completed : s.status === "active" ? t.active : t.locked}
                          </span>
                          {/* Path-type tag — class-specific or general */}
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.classId
                              ? "bg-sky-100 text-sky-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {s.classId ? `${t.classPath} • ${classNameOf(s.classId) ?? "—"}` : t.generalPath}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setModal({ open: true, edit: s })}
                          className="w-8 h-8 rounded-full bg-white grid place-items-center hover:bg-primary/10"
                        ><Pencil size={14} /></button>
                        <button
                          onClick={() => setStations(stations.filter((x) => x.id !== s.id))}
                          className="w-8 h-8 rounded-full bg-white grid place-items-center text-destructive hover:bg-destructive/10"
                        ><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <StationModal state={modal} classes={classes} onClose={() => setModal({ open: false })} onSave={save} />
    </>
  );
}

function StationModal({
  state, onClose, onSave, classes,
}: {
  state: { open: boolean; edit?: Station };
  onClose: () => void;
  onSave: (n: string, st: Station["status"], classId: string) => void;
  classes: ClassRoom[];
}) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Station["status"]>("locked");
  const [classId, setClassId] = useState<string>("");
  useEffect(() => {
    if (state.open) {
      setName(state.edit?.name ?? "");
      setStatus(state.edit?.status ?? "locked");
      setClassId(state.edit?.classId ?? "");
    }
  }, [state]);

  return (
    <Modal open={state.open} onClose={onClose} title={state.edit ? t.edit : t.addStation}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSave(name.trim(), status, classId); }}>
        <Field label={t.stationName}><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
        {/* Path-type dropdown: empty = general; otherwise specific class */}
        <Field label={t.pathType}>
          <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">{t.general}</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Select>
        </Field>
        <Field label={t.status}>
          <div className="flex gap-2">
            {(["locked", "active", "completed"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`flex-1 px-3 py-2 rounded-2xl text-sm font-bold transition ${
                  status === s ? "primary-grad text-white shadow" : "bg-white/70 text-foreground/70"
                }`}
              >
                {s === "locked" ? t.locked : s === "active" ? t.active : t.completed}
              </button>
            ))}
          </div>
        </Field>
        <div className="flex gap-2 justify-end pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>{t.cancel}</Button>
          <Button type="submit">{t.save}</Button>
        </div>
      </form>
    </Modal>
  );
}
