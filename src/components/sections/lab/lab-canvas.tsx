"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { LabDragzone } from "./lab-dragzone";
import useStore from "@/store";

import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { CustomShape } from "./tools/custom-shape";
import { Text } from "react-konva";

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
    />
  );
};

interface LabCanvasProps {
  onChange?: (files: File[]) => void;
  stageRef: React.RefObject<any>;
}

export const LabCanvas = ({ onChange, stageRef }: LabCanvasProps) => {
  const {
    shapes,
    selectShape,
    selectedShapeId,
    deselectShape,
    files,
    setFiles,
  } = useStore();
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

  const handleStageClick = (e: any) => {
    deselectShape();
  };

  const renderShape = (shape: any) => {
    const isSelected = selectedShapeId === shape.id;

    if (shape.type === "text") {
      // Créer une copie des props pour le texte sans les coordonnées
      const textProps = { ...shape.props };
      delete textProps.x;
      delete textProps.y;

      return (
        <CustomShape
          key={shape.id}
          id={shape.id}
          type={shape.type}
          isSelected={isSelected}
          shapeProps={shape.props}
          onSelect={selectShape}
          onChange={(newProps) => {
            const { shapes } = useStore.getState();
            const shapeToUpdate = shapes.find((s) => s.id === shape.id);
            if (shapeToUpdate) {
              const updatedProps = { ...shapeToUpdate.props, ...newProps };
              useStore.getState().transformShape(shape.id, updatedProps);
            }
          }}
          onDelete={() => useStore.getState().deleteShape(shape.id)}
        >
          <Text {...textProps} x={0} y={0} />
        </CustomShape>
      );
    }

    return null;
  };

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
          <Stage
            ref={stageRef}
            width={stageSize.width}
            height={stageSize.height}
            onClick={handleStageClick}
            onTap={handleStageClick}
            draggable
          >
            <Layer>
              {images.map((image, idx) => (
                <URLImage key={idx} image={image} />
              ))}
              {shapes.map(renderShape)}
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
        <LabDragzone
          files={files}
          setFiles={(value) => {
            if (typeof value === "function") {
              setFiles(value(files));
            } else {
              setFiles(value);
            }
          }}
          fileRef={fileInputRef}
        />
      )}
    </div>
  );
};
