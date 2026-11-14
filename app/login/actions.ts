"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  mode?: "login" | "signup";
  error?: string;
  notice?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function authenticate(
  _previousState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const mode = formData.get("mode") === "signup" ? "signup" : "login";
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!emailPattern.test(email)) {
    return { mode, error: "Enter a valid email address." };
  }

  if (password.length < 8 || password.length > 128) {
    return { mode, error: "Your password must be between 8 and 128 characters." };
  }

  const supabase = await createClient();

  if (mode === "signup") {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return {
        mode,
        error: "Unable to create your account. Check your details and try again.",
      };
    }

    if (!data.session) {
      return {
        mode,
        notice: "Your account was created. Check your email to finish signing in.",
      };
    }
  } else {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { mode, error: "Wrong email or password" };
    }
  }

  redirect("/");
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }

  redirect("/login");
}
