"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// We use the Service Role Key here to bypass RLS for the admin
// This key must NEVER be prefixed with NEXT_PUBLIC_
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function createPostAction(formData: any, password: string) {
  // 1. Check the password
  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Unauthorized: Incorrect admin password." };
  }

  // 2. Prepare data
  const postData = {
    ...formData,
    tags: formData.tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    published_at: new Date().toISOString(),
  };

  // 3. Insert into database (Service Role Key bypasses RLS)
  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert([postData])
    .select();

  if (error) {
    console.error("Database error:", error);
    return { error: error.message };
  }

  // 4. Refresh the blog cache
  revalidatePath("/blog");
  return { success: true };
}
