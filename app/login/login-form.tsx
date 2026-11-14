"use client";

import { useActionState, useState } from "react";
import { authenticate, type AuthState } from "./actions";

const initialState: AuthState = {};

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );
  const shownMessage = state.mode === mode ? state.error ?? state.notice : null;

  return (
    <>
      <div className="auth-tabs" role="group" aria-label="Account action">
        <button
          aria-pressed={mode === "login"}
          className="auth-tab"
          onClick={() => setMode("login")}
          type="button"
        >
          Log in
        </button>
        <button
          aria-pressed={mode === "signup"}
          className="auth-tab"
          onClick={() => setMode("signup")}
          type="button"
        >
          Create account
        </button>
      </div>

      <form action={formAction}>
        <input name="mode" type="hidden" value={mode} />
        <div className="form-field">
          <label htmlFor="email">Email address</label>
          <input
            autoComplete="email"
            autoCapitalize="none"
            id="email"
            name="email"
            placeholder="you@school.com"
            required
            type="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            id="password"
            maxLength={128}
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
        </div>

        {shownMessage && (
          <p
            aria-live="polite"
            className="form-message"
            data-kind={state.notice ? "success" : "error"}
            role={state.error ? "alert" : "status"}
          >
            {shownMessage}
          </p>
        )}

        <button className="primary-button auth-submit" disabled={isPending}>
          {isPending
            ? "Please wait…"
            : mode === "login"
              ? "Log in to your notes"
              : "Create your account"}
          {!isPending && (
            <svg
              aria-hidden="true"
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
            >
              <path
                d="M3.3 8h9.4m-3.7-3.7L12.7 8 9 11.7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </button>
      </form>

      <p className="auth-footnote">
        Your notes are private to your account. We never share them with other
        tutors.
      </p>
    </>
  );
}
