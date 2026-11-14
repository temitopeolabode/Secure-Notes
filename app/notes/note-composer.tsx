"use client";

import { useActionState } from "react";
import { createNote, type NoteActionState } from "../actions";

const initialState: NoteActionState = {};

export function NoteComposer() {
  const [state, formAction, isPending] = useActionState(
    createNote,
    initialState,
  );

  return (
    <form action={formAction} className="note-form">
      <div className="form-field">
        <label htmlFor="note-title">Title</label>
        <input
          autoComplete="off"
          id="note-title"
          maxLength={120}
          name="title"
          placeholder="e.g. Tolu, mathematics"
        />
      </div>
      <div className="form-field">
        <label htmlFor="note-body">Your note</label>
        <textarea
          id="note-body"
          maxLength={20_000}
          name="body"
          placeholder="A small win, a question to follow up on, a next step…"
          rows={5}
        />
      </div>
      {state.error && (
        <p aria-live="polite" className="form-message" role="alert">
          {state.error}
        </p>
      )}
      <button className="primary-button save-note-button" disabled={isPending}>
        {isPending ? "Saving…" : "Save note"}
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
  );
}
