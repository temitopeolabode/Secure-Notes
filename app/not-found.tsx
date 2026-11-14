import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-shell">
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
      <div className="not-found-card">
        <span className="not-found-mark" aria-hidden="true">
          <svg fill="none" viewBox="0 0 36 36">
            <path
              d="M11 7h10l5 5v17H11V7Z"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M21 7v6h5m-10 5h5m-5 4h7"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </span>
        <p className="eyebrow dashboard-eyebrow">A PRIVATE NOTE</p>
        <h1>This note isn&apos;t here.</h1>
        <p>
          It may have been moved, deleted, or it may not belong to this
          notebook.
        </p>
        <Link className="primary-button not-found-button" href="/">
          Back to my notes
        </Link>
      </div>
    </main>
  );
}
