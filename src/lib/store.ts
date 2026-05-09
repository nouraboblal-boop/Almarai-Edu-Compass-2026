import { useEffect, useState } from "react";

export function usePersistedState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }, [key, value]);
  return [value, setValue] as const;
}

export type Student = { id: string; name: string; score: number };
export type ClassRoom = { id: string; name: string; grade: string; students: Student[] };

// classId is optional — when present the station/path belongs to a specific class,
// otherwise it is a "general" path visible to all classes.
export type Station = {
  id: string;
  name: string;
  status: "locked" | "active" | "completed";
  classId?: string | null;
};
export type TestItem = { id: string; title: string; questions: number; date: string };
export type Profile = { name: string; subject: string; school: string; email: string };

// Learning path system: each "rule" groups a set of typed nodes
// (explanation / example / test / game). Node status is read-only here —
// it will later be driven by student progress, not teacher input.
export type NodeType = "explanation" | "example" | "test" | "game";
export type NodeStatus = "locked" | "active" | "completed";
export type RuleNode = { id: string; title: string; type: NodeType; status: NodeStatus };
export type Rule = { id: string; title: string; nodes: RuleNode[] };
export type LearningPath = {
  id: string;
  name: string;
  classId?: string | null; // null/undefined => general path
  rules: Rule[];
};

// Predefined Arabic education grades — used by the grade dropdown
// in the Classes screen to enforce consistent values.
export const GRADE_OPTIONS_AR = [
  "الصف الأول",
  "الصف الثاني",
  "الصف الثالث",
  "الصف الرابع",
  "الصف الخامس",
  "الصف السادس",
  "الصف السابع",
  "الصف الثامن",
  "الصف التاسع",
];

export const uid = () => Math.random().toString(36).slice(2, 10);
