import { createClient } from "./client";

export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("memes-bucket")
    .upload(path, file, {
      upsert: true,
    });

  if (error) {
    throw error;
  }

  // Get the public URL of the uploaded file
  const {
    data: { publicUrl },
  } = supabase.storage.from("memes-bucket").getPublicUrl(path);

  return publicUrl;
}
