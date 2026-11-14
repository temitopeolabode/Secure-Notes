import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quietnote — your private notes",
  description: "A calm, private space for your student progress notes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
