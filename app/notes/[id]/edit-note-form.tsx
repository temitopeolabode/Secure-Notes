"use client";

import Link from "next/link";
import { useActionState } from "react";
import { deleteNote, updateNote, type NoteActionState } from "../../actions";

type Note = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
};

const initialState: NoteActionState = {};

export function EditNoteForm({ note }: { note: Note }) {
  const saveAction = updateNote.bind(null, String(note.id));
  const [state, formAction, isPending] = useActionState(
    saveAction,
    initialState,
  );

  return (
    <div className="edit-card">
      <form action={formAction} className="note-form">
        <div className="form-field">
          <label htmlFor="edit-title">Title</label>
          <input
            autoComplete="off"
            defaultValue={note.title}
            id="edit-title"
            maxLength={120}
            name="title"
          />
        </div>
        <div className="form-field">
          <label htmlFor="edit-body">Your note</label>
          <textarea
            defaultValue={note.body}
            id="edit-body"
            maxLength={20_000}
            name="body"
            rows={10}
          />
        </div>
        {state.error && (
          <p aria-live="polite" className="form-message" role="alert">
            {state.error}
          </p>
        )}
        <div className="edit-actions">
          <Link className="secondary-button" href="/">
            Cancel
          </Link>
          <button className="primary-button save-note-button" disabled={isPending}>
            {isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>

      <div className="delete-note-row">
        <div>
          <h2>Remove this note</h2>
          <p>This action can&apos;t be undone.</p>
        </div>
        <form
          action={deleteNote.bind(null, String(note.id))}
          onSubmit={(event) => {
            if (!window.confirm("Delete this note? This cannot be undone.")) {
              event.preventDefault();
            }
          }}
        >
          <button className="delete-note-button" type="submit">
            Delete note
          </button>
        </form>
      </div>
    </div>
  );
}
