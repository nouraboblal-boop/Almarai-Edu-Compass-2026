import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { Modal } from "@/components/ui-kit";
import { BookOpen } from "lucide-react";

const rules = [
  { title: "الجملة الاسمية", body: "تتكون من مبتدأ وخبر، وكلاهما مرفوع. مثال: الطالبُ مجتهدٌ." },
  { title: "الجملة الفعلية", body: "تبدأ بفعل ثم فاعل ثم مفعول به (إن وُجد). مثال: كتبَ المعلمُ الدرسَ." },
  { title: "كان وأخواتها", body: "ترفع المبتدأ (اسمها) وتنصب الخبر. مثال: كان الجوُّ جميلاً." },
  { title: "إنّ وأخواتها", body: "تنصب المبتدأ (اسمها) وترفع الخبر. مثال: إنّ العلمَ نورٌ." },
  { title: "الفاعل", body: "اسم مرفوع يدل على من قام بالفعل. مثال: قرأَ الطالبُ." },
  { title: "المفعول به", body: "اسم منصوب يقع عليه فعل الفاعل. مثال: قرأَ الطالبُ الكتابَ." },
  { title: "النعت (الصفة)", body: "يتبع المنعوت في إعرابه. مثال: جاءَ الطالبُ المجتهدُ." },
  { title: "الحال", body: "اسم منصوب يبيّن هيئة صاحبه. مثال: عادَ الجنودُ منتصرين." },
];

export const Route = createFileRoute("/grammar")({
  component: () => (
    <AppShell>
      <GrammarPage />
    </AppShell>
  ),
});

function GrammarPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({ to: "/login" });
  }, [router]);

  const { t } = useI18n();
  const [active, setActive] = useState<typeof rules[number] | null>(null);

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-6xl mx-auto">
        <div className="glass-strong r-huge p-6 md:p-8 mb-6">
          <h1 className="text-heading text-2xl md:text-3xl flex items-center gap-2">
            <BookOpen className="text-primary" /> {t.grammarRules}
          </h1>
          <p className="text-foreground/60 mt-1 text-sm">قواعد اللغة العربية الأساسية</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rules.map((r, i) => (
            <button
              key={i}
              onClick={() => setActive(r)}
              className="glass r-big p-6 text-start hover:scale-[1.02] hover:shadow-xl transition group"
            >
              <div className={`w-12 h-12 rounded-2xl text-white grid place-items-center mb-3 shadow-md ${
                i % 3 === 0 ? "primary-grad" : i % 3 === 1 ? "gold-grad" : "bg-gradient-to-br from-emerald-500 to-teal-500"
              }`}>
                <BookOpen size={20} />
              </div>
              <h3 className="text-heading text-lg mb-2 group-hover:text-primary transition">{r.title}</h3>
              <p className="text-foreground/70 text-sm line-clamp-2">{r.body}</p>
            </button>
          ))}
        </div>
      </main>

      <Modal open={!!active} onClose={() => setActive(null)} title={active?.title ?? ""}>
        <p className="text-foreground/80 leading-relaxed text-base">{active?.body}</p>
      </Modal>
    </>
  );
}
