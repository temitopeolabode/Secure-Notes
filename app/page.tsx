import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "./login/actions";
import { NoteComposer } from "./notes/note-composer";
import { createClient } from "@/lib/supabase/server";

type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

function Brand() {
  return (
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
  );
}

function formatNoteDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function Home() {
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

  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("id, title, body, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (notesError) {
    throw notesError;
  }

  const noteList = notes as Note[];
  const email = user.email ?? "Your account";

  return (
    <main className="dashboard-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Brand />
          <div className="account-menu">
            <div className="account-identity">
              <span className="avatar" aria-hidden="true">
                {email.slice(0, 1).toUpperCase()}
              </span>
              <span className="account-email">{email}</span>
            </div>
            <form action={signOut}>
              <button className="signout-button" type="submit">
                <svg fill="none" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M7.3 3.2H3.5v11.6h3.8m3.3-2.4L14.2 9l-3.6-3.4M6.7 9h7.1"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.4"
                  />
                </svg>
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow dashboard-eyebrow">YOUR PRIVATE SPACE</p>
            <h1 className="dashboard-title">
              Good to have you here<span className="title-period">.</span>
            </h1>
            <p className="welcome-copy">
              A quiet place to keep track of every student&apos;s next step.
            </p>
          </div>
          <div className="privacy-chip">
            <svg fill="none" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M9 2.3 14.5 4v4.1c0 3.4-2.4 6.1-5.5 7.6-3.1-1.5-5.5-4.2-5.5-7.6V4L9 2.3Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
              <path
                d="m6.8 8.8 1.5 1.5 3-3.1"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
            Only you can see these
          </div>
        </section>

        <div className="notes-workspace">
          <section aria-labelledby="new-note-heading" className="composer-card">
            <div className="composer-heading">
              <span className="composer-icon" aria-hidden="true">
                <svg fill="none" viewBox="0 0 20 20">
                  <path
                    d="M10 4v12m6-6H4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                  />
                </svg>
              </span>
              <div>
                <p className="section-kicker">CAPTURE A MOMENT</p>
                <h2 id="new-note-heading">New note</h2>
              </div>
            </div>
            <NoteComposer />
            <div className="composer-private">
              <svg fill="none" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M4.6 7V5.3a3.4 3.4 0 0 1 6.8 0V7m-7.4 0h8.6v6.2H4V7Zm4.3 2.4v1.4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                />
              </svg>
              Saved privately to your account
            </div>
          </section>

          <section aria-labelledby="notes-heading" className="notes-section">
            <div className="notes-heading-row">
              <div>
                <p className="section-kicker">YOUR NOTEBOOK</p>
                <h2 id="notes-heading">My notes</h2>
              </div>
              <span className="note-count">
                {noteList.length} {noteList.length === 1 ? "NOTE" : "NOTES"}
              </span>
            </div>

            {noteList.length > 0 ? (
              <div className="note-list">
                {noteList.map((note) => (
                  <article className="note-card" key={note.id}>
                    <div className="note-card-topline">
                      <span className="note-dot" aria-hidden="true" />
                      <time dateTime={note.created_at}>
                        {formatNoteDate(note.created_at)}
                      </time>
                    </div>
                    <h3>{note.title}</h3>
                    <p className="note-body">
                      {note.body || (
                        <span className="note-empty-body">No details added.</span>
                      )}
                    </p>
                    <div className="note-card-footer">
                      <span>Private to you</span>
                      <span aria-hidden="true">·</span>
                      <span>Student progress</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-notes">
                <span className="empty-note-icon" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 28 28">
                    <path
                      d="M7.2 4.7h10.3l3.3 3.4v14.2H7.2V4.7Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M11 12h6m-6 4h6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="1.4"
                    />
                  </svg>
                </span>
                <h3>Your notebook starts here</h3>
                <p>
                  Add a note about a student and you&apos;ll find it waiting
                  here, newest first.
                </p>
              </div>
            )}
          </section>
        </div>

        <footer className="dashboard-footer">
          <span>quietnote</span>
          <span>Thoughtful notes. A little more privacy.</span>
        </footer>
      </div>
    </main>
  );
}
