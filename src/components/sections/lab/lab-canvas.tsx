"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LabDragzone } from "./lab-dragzone";

import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

interface ImageObject {
  url: string;
  x: number;
  y: number;
}

const URLImage = ({ image }: { image: ImageObject }) => {
  const [img] = useImage(image.url);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
    />
  );
};

export const LabCanvas = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<ImageObject[]>([]);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Create object URLs for the files
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      x: stageSize.width / 2,
      y: stageSize.height / 2,
    }));
    setImages(newImages);

    // Update onChange callback if provided
    if (onChange) onChange(files);

    // Clean up object URLs when component unmounts or files change
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [files, onChange]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="col-span-2 w-full h-full flex flex-col items-center justify-center pl-3"
    >
      {files.length > 0 ? (
        <motion.div
          layoutId="file-upload"
          className={cn(
            "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center h-full p-4 mt-4 w-full mx-auto rounded-md",
            "shadow-sm"
          )}
        >
          <Stage width={stageSize.width} height={stageSize.height}>
            <Layer>
              {images.map((image, idx) => (
                <URLImage key={idx} image={image} />
              ))}
            </Layer>
          </Stage>
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setFiles([]);
              setImages([]);
            }}
            className="absolute top-2 right-2 bg-red-500 cursor-pointer"
          >
            <XIcon className="size-4" />
          </Button>
        </motion.div>
      ) : (
        <LabDragzone files={files} setFiles={setFiles} fileRef={fileInputRef} />
      )}
    </div>
  );
};
