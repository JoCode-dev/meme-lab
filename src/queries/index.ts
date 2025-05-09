import { createClient } from "@/lib/supabase/client";

export const getMemes = async (): Promise<Meme[]> => {
  const supabase = createClient();
  const { data } = await supabase
    .from("memes")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
};

interface Meme {
  name: string;
  image_url: string;
}

export const createMeme = async (meme: Partial<Meme>) => {
  const supabase = createClient();
  const { data } = await supabase.from("memes").insert([
    {
      name: meme.name,
      image_url: meme.image_url,
    },
  ]);

  return data;
};
