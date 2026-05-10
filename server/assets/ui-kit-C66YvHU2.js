import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { X } from "lucide-react";
function Modal({
  open,
  onClose,
  title,
  children,
  widthClass = "max-w-lg"
}) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: `relative glass-strong r-big w-full ${widthClass} p-6 md:p-8 animate-in fade-in zoom-in-95`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-heading text-xl", children: title }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "w-9 h-9 rounded-full grid place-items-center bg-white/70 hover:bg-white",
            "aria-label": "Close",
            children: /* @__PURE__ */ jsx(X, { size: 18 })
          }
        )
      ] }),
      children
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsx("span", { className: "block text-xs font-bold text-foreground/70 mb-1.5 px-2", children: label }),
    children
  ] });
}
function Input(props) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      ...props,
      className: "w-full bg-white/80 border border-white rounded-2xl py-3 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground placeholder-foreground/40 " + (props.className ?? "")
    }
  );
}
function Select(props) {
  return /* @__PURE__ */ jsx(
    "select",
    {
      ...props,
      className: "w-full bg-white/80 border border-white rounded-2xl py-3 px-4 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground " + (props.className ?? "")
    }
  );
}
function Button({
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary: "primary-grad text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95",
    ghost: "bg-white/70 hover:bg-white text-foreground border border-white",
    danger: "bg-destructive/10 text-destructive hover:bg-destructive/20",
    gold: "gold-grad text-white shadow-lg hover:scale-[1.02] active:scale-95"
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `px-5 py-3 rounded-2xl font-bold transition ${styles[variant]} ${className}`
    }
  );
}
export {
  Button as B,
  Field as F,
  Input as I,
  Modal as M,
  Select as S
};
