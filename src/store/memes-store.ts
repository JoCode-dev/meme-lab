import { getMemes } from "@/queries";
import type { Meme } from "@/types";
import { create } from "zustand";

interface MemesStore {
  memes: Meme[];
  isLoading: boolean;
  fetchMemes: () => Promise<void>;
  addMeme: (meme: Partial<Meme> & { name: string, image_url: string }) => void;
}

const useMemesStore = create<MemesStore>((set) => ({
  memes: [],
  isLoading: false,
  fetchMemes: async () => {
    set({ isLoading: true });
    try {
      const memes = await getMemes();
      set({ memes: memes as Meme[], isLoading: false });
    } catch (error) {
      console.error("Failed to fetch memes:", error);
      set({ isLoading: false });
    }
  },
  addMeme: (meme) => 
    set((state) => {
      // Créer un nouveau meme avec l'ID et la date
      const newMeme: Meme = {
        id: `temp-${Date.now()}`,
        name: meme.name,
        image_url: meme.image_url,
        created_at: new Date().toISOString(),
      };
      
      return { memes: [newMeme, ...state.memes] };
    }),
}));

export default useMemesStore; 