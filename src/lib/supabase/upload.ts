import { createClient } from "./client";

/**
 * Upload a file to the Supabase storage bucket.
 *
 * @param file - The file to upload.
 * @param path - The path to upload the file to.
 * @returns The public URL of the uploaded file.
 */
export async function uploadFile(file: File, path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage
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
