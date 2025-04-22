"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { MemeDetail } from "@/components/shared/meme-detail";
import { base64ToFile } from "@/lib/supabase/file";
import { uploadFile } from "@/lib/supabase/upload";
import { cn, downloadURI } from "@/lib/utils";
import { createMeme } from "@/queries";
import useStore from "@/store";
import useModalStore from "@/store/modal-store";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { LabCanvas } from "./lab-canvas";
import { LabForm } from "./lab-form";
import { LabTools } from "./lab-tools";
import { MemeForm, type memeFormSchema } from "./meme-form";

export const LabSection = () => {
  const { reset } = useStore();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stageRef = useRef<any>(null);
  const { isOpen, onOpen, onClose } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [memeData, setMemeData] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);

  const saveMeme = async (name: string) => {
    if (!stageRef.current) return;

    const meme = stageRef.current.toDataURL();
    const file = await base64ToFile(meme, name);

    const fileName = `${Date.now()}-${file.name}`;
    const publicUrl = await uploadFile(file, fileName);
    return publicUrl;
  };

  const handleSubmit = async (values: z.infer<typeof memeFormSchema>) => {
    setIsLoading(true);

    try {
      const memeUrl = await saveMeme(values.name);

      await createMeme({
        name: values.name,
        image_url: memeUrl || "",
      });

      // Save meme data
      setMemeData({
        name: values.name,
        imageUrl: memeUrl || "",
      });

      setSaved(true);
      router.refresh();
    } catch (error) {
      console.error("Error saving meme:", error);
      toast.error("Error saving meme");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (memeData?.imageUrl) {
      downloadURI(memeData.imageUrl, `${memeData.name || "meme"}.png`);
    }
  };

  const handleReset = () => {
    setSaved(false);
    setMemeData(null);
    onClose();
    reset();

    if (saved) {
      router.push("/#memes-feed");
      router.refresh();
    }
  };

  return (
    <React.Fragment>
      <div
        className={cn(
          "w-full flex flex-col items-center justify-center",
          "py-8 md:py-12",
          "px-4 sm:px-6 md:px-8"
        )}
        id="lab"
      >
        <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center">
          <div
            className={cn(
              "w-full border border-gray-200 dark:border-gray-800",
              "rounded-xl overflow-hidden",
              "bg-white dark:bg-gray-900",
              "shadow-sm"
            )}
          >
            <div className="w-full">
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4",
                  "p-2 md:p-4"
                )}
              >
                <LabCanvas stageRef={stageRef} />
                <LabTools
                  saveMeme={() => {
                    onOpen();
                  }}
                />
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800 w-full py-2 px-2 md:px-4">
              <LabForm />
            </div>
          </div>
        </div>
      </div>
      <ResponsiveModal
        title={saved ? "Your Meme is Ready!" : "Meme Lab Creator"}
        open={isOpen}
        onOpenChange={handleReset}
        className="bg-white dark:bg-gray-900"
      >
        <div className="flex flex-col items-center justify-center my-4 md:my-6 w-full">
          {saved && memeData ? (
            <MemeDetail
              name={memeData.name}
              imageUrl={memeData.imageUrl}
              onDownload={handleDownload}
            />
          ) : (
            <MemeForm onSubmit={handleSubmit} isLoading={isLoading} />
          )}
        </div>
      </ResponsiveModal>
    </React.Fragment>
  );
};
