import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditNoteForm } from "./edit-note-form";

type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

export default async function EditNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    redirect("/login");
  }

  const { data: note, error } = await supabase
    .from("notes")
    .select("id, title, body, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!note) {
    notFound();
  }

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Link aria-label="Quietnote home" className="brand dashboard-brand" href="/">
            <span className="brand-mark" aria-hidden="true">
              <svg fill="none" viewBox="0 0 20 20">
                <path
                  d="M5 3.8h7.4l2.6 2.6v9.8H5V3.8Z"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                />
                <path
                  d="M8 9h4m-4 3h4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.4"
                />
              </svg>
            </span>
            quietnote
          </Link>
          <span className="edit-account-email">{user.email}</span>
        </div>
      </header>

      <div className="edit-page-content">
        <Link className="back-link" href="/">
          <svg fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M12.7 8H3.3m3.7 3.7L3.3 8 7 4.3"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
            />
          </svg>
          Back to my notes
        </Link>
        <div className="edit-intro">
          <p className="eyebrow dashboard-eyebrow">YOUR PRIVATE SPACE</p>
          <h1 className="dashboard-title">A note worth keeping.</h1>
          <p className="welcome-copy">
            Make a change or remove this note from your notebook.
          </p>
        </div>
        <EditNoteForm note={note as Note} />
      </div>
    </main>
  );
}
