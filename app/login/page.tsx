import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";
import { createClient, getCurrentUser } from "@/lib/supabase/server";

export const instant = false;

function Brand() {
  return (
    <Link aria-label="Quietnote home" className="brand" href="/">
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

export default async function LoginPage() {
  const supabase = await createClient();
  const user = await getCurrentUser(supabase);

  if (user) {
    redirect("/");
  }

  return (
    <main className="auth-shell">
      <div className="auth-layout">
        <aside className="auth-story">
          <Brand />
          <div className="story-copy">
            <p className="eyebrow">A little more peace of mind</p>
            <h1>Your work,<br />kept yours.</h1>
            <p>
              Keep the details that help every student move forward, in a space
              that belongs only to you.
            </p>
          </div>
          <div className="story-note">
            <svg fill="none" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5.2 9V6.8a4.8 4.8 0 0 1 9.6 0V9m-10.4 0h11.2v8H4.4V9Zm5.6 3.2v1.7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.4"
              />
            </svg>
            Private by design. Only you can see your notes.
          </div>
        </aside>

        <section className="auth-panel" aria-labelledby="auth-title">
          <div className="mobile-brand">
            <Brand />
          </div>
          <p className="eyebrow" style={{ color: "var(--green)" }}>
            Welcome to quietnote
          </p>
          <h2 className="auth-heading" id="auth-title">
            A thoughtful place to begin.
          </h2>
          <p className="auth-subheading">
            Sign in to pick up where you left off, or create your private space.
          </p>
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
