import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import {
  usePersistedState, uid,
  type ClassRoom, type LearningPath, type Rule, type RuleNode, type NodeType,
} from "@/lib/store";
import { Modal, Field, Input, Select, Button } from "@/components/ui-kit";
import {
  Plus, Trash2, Route as RouteIcon, BookOpen, Lightbulb,
  ClipboardCheck, Gamepad2, Lock, CheckCircle2, Circle,
} from "lucide-react";

export const Route = createFileRoute("/paths")({
  component: () => (
    <AppShell>
      <PathsPage />
    </AppShell>
  ),
});

/**
 * Visual theme per node type.
 * Each NodeType maps to its own icon + gradient class so the UI for a node
 * changes based on its kind (explanation/example/test/game). Future
 * navigation per type would branch off this same map.
 */
const NODE_THEME: Record<NodeType, { Icon: typeof BookOpen; grad: string; ring: string }> = {
  explanation: { Icon: BookOpen,        grad: "primary-grad",                            ring: "ring-sky-300" },
  example:     { Icon: Lightbulb,       grad: "gold-grad",                               ring: "ring-amber-300" },
  test:        { Icon: ClipboardCheck,  grad: "bg-gradient-to-br from-emerald-400 to-teal-500 text-white", ring: "ring-emerald-300" },
  game:        { Icon: Gamepad2,        grad: "bg-gradient-to-br from-pink-400 to-fuchsia-500 text-white", ring: "ring-pink-300" },
};

function PathsPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") {
      router.navigate({ to: "/login" });
    }
  }, [router]);

  const { t } = useI18n();
  const [classes] = usePersistedState<ClassRoom[]>("classes", []);
  const [paths, setPaths] = usePersistedState<LearningPath[]>("learning-paths", []);
  const [pathModal, setPathModal] = useState<{ open: boolean }>({ open: false });
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = paths.find((p) => p.id === activeId) ?? null;

  // Create a new path. classId = "" (general) or specific class id.
  const addPath = (name: string, classId: string) => {
    const np: LearningPath = { id: uid(), name, classId: classId || null, rules: [] };
    setPaths([...paths, np]);
    setActiveId(np.id);
    setPathModal({ open: false });
  };

  const deletePath = (id: string) => {
    setPaths(paths.filter((p) => p.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const addRule = (title: string) => {
    if (!active) return;
    const r: Rule = { id: uid(), title, nodes: [] };
    setPaths(paths.map((p) => (p.id === active.id ? { ...p, rules: [...p.rules, r] } : p)));
  };

  const addNode = (ruleId: string, title: string, type: NodeType) => {
    if (!active) return;
    // New nodes start "locked"; status will later be derived from student
    // progress. Teachers cannot edit it manually (read-only here).
    const node: RuleNode = { id: uid(), title, type, status: "locked" };
    setPaths(paths.map((p) => p.id !== active.id ? p : {
      ...p,
      rules: p.rules.map((r) => r.id === ruleId ? { ...r, nodes: [...r.nodes, node] } : r),
    }));
  };

  const deleteRule = (ruleId: string) => {
    if (!active) return;
    setPaths(paths.map((p) => p.id !== active.id ? p : { ...p, rules: p.rules.filter((r) => r.id !== ruleId) }));
  };

  const deleteNode = (ruleId: string, nodeId: string) => {
    if (!active) return;
    setPaths(paths.map((p) => p.id !== active.id ? p : {
      ...p,
      rules: p.rules.map((r) => r.id !== ruleId ? r : { ...r, nodes: r.nodes.filter((n) => n.id !== nodeId) }),
    }));
  };

  const classNameOf = (id?: string | null) => classes.find((c) => c.id === id)?.name;

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[360px_1fr] gap-4">
          {/* Paths list */}
          <section className="glass-strong r-big p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-heading text-lg flex items-center gap-2">
                <RouteIcon size={18} /> {t.learningPaths}
              </h2>
              <Button onClick={() => setPathModal({ open: true })} className="!py-2 !px-3 text-sm">
                <Plus size={16} className="inline -mt-0.5" /> {t.addPath}
              </Button>
            </div>

            <ul className="space-y-2">
              {paths.length === 0 && <li className="text-foreground/60 text-sm">—</li>}
              {paths.map((p) => {
                const isClassPath = !!p.classId;
                return (
                  <li
                    key={p.id}
                    className={`group rounded-2xl p-3 cursor-pointer transition flex items-center justify-between ${
                      activeId === p.id ? "bg-white shadow-md" : "bg-white/50 hover:bg-white/80"
                    }`}
                    onClick={() => setActiveId(p.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{p.name}</div>
                      {/* Path-type tag (class vs general) */}
                      <span className={`inline-block mt-1 text-[11px] px-2 py-0.5 rounded-full font-bold ${
                        isClassPath
                          ? "bg-sky-100 text-sky-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {isClassPath ? `${t.classPath} • ${classNameOf(p.classId) ?? "—"}` : t.generalPath}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); deletePath(p.id); }}
                      className="w-8 h-8 rounded-full grid place-items-center bg-white text-destructive hover:bg-destructive/10"
                      aria-label={t.delete}
                    ><Trash2 size={14} /></button>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Active path detail */}
          <section className="glass-strong r-big p-5 min-h-[400px]">
            {!active ? (
              <div className="h-full grid place-items-center text-foreground/60 py-20">
                <p>{t.selectClass}</p>
              </div>
            ) : (
              <PathDetail
                path={active}
                classNameOf={classNameOf}
                onAddRule={addRule}
                onDeleteRule={deleteRule}
                onAddNode={addNode}
                onDeleteNode={deleteNode}
              />
            )}
          </section>
        </div>
      </main>

      <PathFormModal
        open={pathModal.open}
        classes={classes}
        onClose={() => setPathModal({ open: false })}
        onSave={addPath}
      />
    </>
  );
}

function PathDetail({
  path, classNameOf, onAddRule, onDeleteRule, onAddNode, onDeleteNode,
}: {
  path: LearningPath;
  classNameOf: (id?: string | null) => string | undefined;
  onAddRule: (title: string) => void;
  onDeleteRule: (id: string) => void;
  onAddNode: (ruleId: string, title: string, type: NodeType) => void;
  onDeleteNode: (ruleId: string, nodeId: string) => void;
}) {
  const { t } = useI18n();
  const [ruleTitle, setRuleTitle] = useState("");
  const isClass = !!path.classId;

  return (
    <>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="text-heading text-xl">{path.name}</h2>
          <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full font-bold ${
            isClass ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"
          }`}>
            {isClass ? `${t.classPath} • ${classNameOf(path.classId) ?? "—"}` : t.generalPath}
          </span>
        </div>
      </div>

      {/* Add rule */}
      <form
        className="flex gap-2 mb-5"
        onSubmit={(e) => { e.preventDefault(); if (ruleTitle.trim()) { onAddRule(ruleTitle.trim()); setRuleTitle(""); } }}
      >
        <Input
          value={ruleTitle}
          onChange={(e) => setRuleTitle(e.target.value)}
          placeholder={t.addRule}
        />
        <Button type="submit" className="!py-2 !px-4 text-sm whitespace-nowrap">
          <Plus size={16} className="inline -mt-0.5" /> {t.addRule}
        </Button>
      </form>

      {path.rules.length === 0 ? (
        <p className="text-foreground/60 text-sm">—</p>
      ) : (
        <div className="space-y-4">
          {path.rules.map((r) => (
            <RuleCard key={r.id} rule={r} onDelete={() => onDeleteRule(r.id)} onAddNode={(title, type) => onAddNode(r.id, title, type)} onDeleteNode={(nid) => onDeleteNode(r.id, nid)} />
          ))}
        </div>
      )}
    </>
  );
}

function RuleCard({
  rule, onDelete, onAddNode, onDeleteNode,
}: { rule: Rule; onDelete: () => void; onAddNode: (title: string, type: NodeType) => void; onDeleteNode: (id: string) => void }) {
  const { t } = useI18n();
  const [title, setTitle] = useState("");
  const [type, setType] = useState<NodeType>("explanation");

  return (
    <div className="bg-white/70 rounded-3xl p-4 border-2 border-white">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-heading text-base">{rule.title}</h3>
        <button onClick={onDelete} className="w-8 h-8 rounded-full bg-white text-destructive hover:bg-destructive/10 grid place-items-center" aria-label={t.delete}>
          <Trash2 size={14} />
        </button>
      </div>

      {/* Add node */}
      <form
        className="flex flex-col sm:flex-row gap-2 mb-3"
        onSubmit={(e) => { e.preventDefault(); if (title.trim()) { onAddNode(title.trim(), type); setTitle(""); } }}
      >
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t.addNode} />
        {/* Dropdown for node type — visual theme of the node will follow its type */}
        <Select value={type} onChange={(e) => setType(e.target.value as NodeType)} className="sm:!w-44">
          <option value="explanation">{t.explanation}</option>
          <option value="example">{t.example}</option>
          <option value="test">{t.test}</option>
          <option value="game">{t.game}</option>
        </Select>
        <Button type="submit" className="!py-2 !px-3 text-sm whitespace-nowrap">{t.addNode}</Button>
      </form>

      {rule.nodes.length === 0 ? (
        <p className="text-foreground/50 text-xs">—</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-2">
          {rule.nodes.map((n) => {
            const theme = NODE_THEME[n.type];
            const TypeIcon = theme.Icon;
            // Status icon — kept READ-ONLY (no click handlers). Will later be
            // updated automatically by student-progress signals.
            const StatusIcon = n.status === "completed" ? CheckCircle2 : n.status === "active" ? Circle : Lock;
            return (
              <li key={n.id} className={`flex items-center gap-3 bg-white rounded-2xl p-3 ring-2 ${theme.ring}`}>
                <div className={`w-10 h-10 rounded-2xl grid place-items-center text-white ${theme.grad}`}>
                  <TypeIcon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate">{n.title}</div>
                  <div className="text-[11px] text-foreground/60 flex items-center gap-1">
                    {/* Status badge (locked/active/completed) — read only */}
                    <StatusIcon size={12} />
                    <span>{n.status === "completed" ? t.completed : n.status === "active" ? t.active : t.locked}</span>
                    <span className="opacity-60">• {t.readonly}</span>
                  </div>
                </div>
                <button onClick={() => onDeleteNode(n.id)} className="w-8 h-8 rounded-full bg-white text-destructive hover:bg-destructive/10 grid place-items-center" aria-label={t.delete}>
                  <Trash2 size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function PathFormModal({
  open, onClose, onSave, classes,
}: { open: boolean; onClose: () => void; onSave: (name: string, classId: string) => void; classes: ClassRoom[] }) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");
  useEffect(() => { if (open) { setName(""); setClassId(""); } }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={t.addPath}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); if (name.trim()) onSave(name.trim(), classId); }}>
        <Field label={t.name}><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
        {/* Class dropdown: empty value = general (cross-class) path */}
        <Field label={t.pathType}>
          <Select value={classId} onChange={(e) => setClassId(e.target.value)}>
            <option value="">{t.general}</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
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
