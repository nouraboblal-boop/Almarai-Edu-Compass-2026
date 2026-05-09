import { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({
  open, onClose, title, children, widthClass = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  widthClass?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative glass-strong r-big w-full ${widthClass} p-6 md:p-8 animate-in fade-in zoom-in-95`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading text-xl">{title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full grid place-items-center bg-white/70 hover:bg-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-foreground/70 mb-1.5 px-2">{label}</span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full bg-white/80 border border-white rounded-2xl py-3 px-4 outline-none " +
        "focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground placeholder-foreground/40 " +
        (props.className ?? "")
      }
    />
  );
}

// Reusable styled <select> dropdown — used for grade/class selection
// to replace free-text inputs and reduce data-entry mistakes.
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "w-full bg-white/80 border border-white rounded-2xl py-3 px-4 outline-none " +
        "focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground " +
        (props.className ?? "")
      }
    />
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" | "danger" | "gold" }) {
  const styles: Record<string, string> = {
    primary:
      "primary-grad text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95",
    ghost: "bg-white/70 hover:bg-white text-foreground border border-white",
    danger: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    gold: "gold-grad text-white shadow-lg hover:scale-[1.02] active:scale-95",
  };
  return (
    <button
      {...props}
      className={`px-5 py-3 rounded-2xl font-bold transition ${styles[variant]} ${className}`}
    />
  );
}
