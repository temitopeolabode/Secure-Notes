"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type NoteActionState = {
  error?: string;
};

function readText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : null;
}

export async function createNote(
  _previousState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const title = readText(formData, "title")?.trim() ?? "";
  const bodyValue = formData.get("body");

  if (!title) {
    return { error: "Add a title so you can find this note later." };
  }

  if (title.length > 120) {
    return { error: "Keep the title to 120 characters or fewer." };
  }

  if (
    (bodyValue !== null && typeof bodyValue !== "string") ||
    (typeof bodyValue === "string" && bodyValue.length > 20_000)
  ) {
    return { error: "Note text must be 20,000 characters or fewer." };
  }

  const body = typeof bodyValue === "string" ? bodyValue : "";
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

  const { error } = await supabase.from("notes").insert({ title, body });

  if (error) {
    throw error;
  }

  revalidatePath("/");
  redirect("/");
}
