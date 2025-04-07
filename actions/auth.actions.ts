"use server";
import { createClient } from "@/clients/action-client";

/**
 * Verifies user authentication on the server
 * @returns The user if authenticated, null otherwise
 */
export async function verifyAuth() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}
