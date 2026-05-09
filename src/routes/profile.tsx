import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";
import { usePersistedState, type Profile } from "@/lib/store";
import { Modal, Field, Input, Button } from "@/components/ui-kit";
import { UserCircle2, Mail, BookOpen, School, Pencil, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: () => (
    <AppShell>
      <ProfilePage />
    </AppShell>
  ),
});

function ProfilePage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("authed") !== "1") router.navigate({ to: "/login" });
  }, [router]);

  const { t } = useI18n();
  const [profile, setProfile] = usePersistedState<Profile>("profile", {
    name: "أ. هبة", subject: "اللغة العربية", school: "مدرسة الفصاحة", email: "teacher@school.com",
  });
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);

  useEffect(() => { if (open) setDraft(profile); }, [open, profile]);

  const items = [
    { icon: Mail, label: t.email, value: profile.email },
    { icon: BookOpen, label: t.subject, value: profile.subject },
    { icon: School, label: t.school, value: profile.school },
  ];

  return (
    <>
      <TopBar />
      <main className="px-3 md:px-6 pb-12 pt-6 max-w-3xl mx-auto">
        <div className="glass-strong r-huge p-8 md:p-10 text-center">
          <div className="relative w-28 h-28 mx-auto mb-5">
            <div className="absolute inset-0 primary-grad blur-2xl opacity-40 rounded-full" />
            <div className="relative w-28 h-28 rounded-full primary-grad grid place-items-center text-white shadow-xl border-4 border-white">
              <UserCircle2 size={56} />
            </div>
          </div>
          <h1 className="text-heading text-3xl">{profile.name}</h1>
          <p className="text-foreground/60 mt-1">{profile.subject}</p>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 text-start">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <div key={it.label} className="glass r-mid p-4">
                  <div className="flex items-center gap-2 text-foreground/60 text-xs mb-1">
                    <Icon size={14} /> {it.label}
                  </div>
                  <div className="font-bold text-sm truncate">{it.value}</div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 justify-center mt-8 flex-wrap">
            <Button onClick={() => setOpen(true)}>
              <Pencil size={16} className="inline -mt-0.5" /> {t.editProfile}
            </Button>
            <Button
              variant="ghost"
              onClick={() => { localStorage.removeItem("authed"); router.navigate({ to: "/login" }); }}
            >
              <LogOut size={16} className="inline -mt-0.5" /> {t.logout}
            </Button>
          </div>
        </div>
      </main>

      <Modal open={open} onClose={() => setOpen(false)} title={t.editProfile}>
        <form
          className="space-y-4"
          onSubmit={(e) => { e.preventDefault(); setProfile(draft); setOpen(false); }}
        >
          <Field label={t.teacherName}><Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></Field>
          <Field label={t.email}><Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
          <Field label={t.subject}><Input value={draft.subject} onChange={(e) => setDraft({ ...draft, subject: e.target.value })} /></Field>
          <Field label={t.school}><Input value={draft.school} onChange={(e) => setDraft({ ...draft, school: e.target.value })} /></Field>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>{t.cancel}</Button>
            <Button type="submit">{t.save}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
