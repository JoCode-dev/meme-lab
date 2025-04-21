import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ImageIcon,
  SmilePlusIcon,
  StickerIcon,
  TextCursorIcon,
} from "lucide-react";
import { LabCarousel } from "./lab-carousel";

export const LabTools = () => {
  return (
    <div className="col-span-1 border-l w-full px-4 py-4 flex flex-col items-center gap-3">
      <div className="w-full">
        <p className="text-md font-semibold tracking-tight text-gray-400">
          Personalize your meme
        </p>
      </div>
      <Button
        className="w-full gap-2 font-medium bg-slate-400 dark:bg-white cursor-pointer"
        size="lg"
      >
        Add Text <TextCursorIcon className="w-4 h-4" />
      </Button>

      <Button
        className="w-full gap-2 font-medium bg-slate-400 dark:bg-white cursor-pointer"
        size="lg"
      >
        Add sticker <SmilePlusIcon className="w-4 h-4" />
      </Button>

      <Button
        className="w-full gap-2 font-medium bg-slate-400 dark:bg-white cursor-pointer"
        size="lg"
      >
        Add Image <ImageIcon className="w-4 h-4" />
      </Button>

      <Separator className="w-full" />

      <Button
        className="w-full my-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 font-bold cursor-pointer"
        size="lg"
      >
        Generate <StickerIcon className="w-4 h-4 stroke-3" />
      </Button>

      <Separator className="w-full" />

      <div className="w-full">
        <p className="text-md font-semibold tracking-tight text-gray-400">
          Choose a template
        </p>

        <LabCarousel />
      </div>
    </div>
  );
};
