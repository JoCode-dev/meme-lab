"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store";
import { motion } from "framer-motion";
import { XIcon, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { LabDragzone } from "./lab-dragzone";

import { Image, Layer, Stage, Text, Transformer } from "react-konva";
import useImage from "use-image";
import { CustomShape } from "./tools/custom-shape";

interface ImageObject {
  url: string;
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

const URLImage = ({
  image,
  isSelected,
  onSelect,
  onTransform,
}: {
  image: ImageObject;
  isSelected: boolean;
  onSelect: () => void;
  onTransform: (newProps: {
    scaleX: number;
    scaleY: number;
    x: number;
    y: number;
  }) => void;
}) => {
  const [img] = useImage(image.url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && imageRef.current) {
      // Attach transformer to image
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransformEnd = () => {
    if (imageRef.current) {
      const node = imageRef.current;
      onTransform({
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        x: node.x(),
        y: node.y(),
      });
    }
  };

  return (
    <>
      <Image
        ref={imageRef}
        image={img}
        alt="Image"
        x={image.x}
        y={image.y}
        scaleX={image.scaleX}
        scaleY={image.scaleY}
        width={500}
        height={500}
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={() => {
          if (imageRef.current) {
            onTransform({
              scaleX: image.scaleX,
              scaleY: image.scaleY,
              x: imageRef.current.x(),
              y: imageRef.current.y(),
            });
          }
        }}
        onTransformEnd={handleTransformEnd}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limiter la taille minimale
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

interface LabCanvasProps {
  onChange?: (files: File[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [stageSize, setStageSize] = useState({ width: 800, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Fonction pour modifier l'échelle de l'image
  const handleResize = (action: "increase" | "decrease" | "reset") => {
    setImages((prevImages) => {
      if (prevImages.length === 0) return prevImages;

      return prevImages.map((image, index) => {
        if (index === 0) {
          // Modifier seulement la première image (image de base)
          let newScaleX = image.scaleX;
          let newScaleY = image.scaleY;

          if (action === "increase") {
            newScaleX = Math.min(image.scaleX + 0.1, 3); // Limiter le zoom max à 3x
            newScaleY = Math.min(image.scaleY + 0.1, 3);
          } else if (action === "decrease") {
            newScaleX = Math.max(image.scaleX - 0.1, 0.2); // Limiter le zoom min à 0.2x
            newScaleY = Math.max(image.scaleY - 0.1, 0.2);
          } else if (action === "reset") {
            newScaleX = 1;
            newScaleY = 1;
          }

          return { ...image, scaleX: newScaleX, scaleY: newScaleY };
        }
        return image;
      });
    });
  };

  useEffect(() => {
    // Create object URLs for the files
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      x: stageSize.width / 1,
      y: stageSize.height / 1,
      scaleX: 1,
      scaleY: 1,
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStageClick = (e: any) => {
    // Si on clique sur le stage (et non sur un élément)
    if (e.target === e.currentTarget) {
      deselectShape();
      setSelectedImageIndex(null);
    }
  };

  // Fonction pour mettre à jour les propriétés d'une image
  const handleImageTransform = (
    index: number,
    newProps: Partial<ImageObject>
  ) => {
    setImages((prevImages) => {
      return prevImages.map((image, i) => {
        if (i === index) {
          return { ...image, ...newProps };
        }
        return image;
      });
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          {/* Contrôles de redimensionnement */}
          <div className="absolute top-2 left-2 flex gap-2 z-10">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleResize("increase")}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              title="Agrandir l'image"
            >
              <ZoomIn className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleResize("decrease")}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              title="Réduire l'image"
            >
              <ZoomOut className="size-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => handleResize("reset")}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
              title="Réinitialiser la taille"
            >
              <RefreshCw className="size-4" />
            </Button>
          </div>

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
                <URLImage
                  key={idx}
                  image={image}
                  isSelected={selectedImageIndex === idx}
                  onSelect={() => {
                    setSelectedImageIndex(idx);
                    deselectShape(); // Désélectionner les shapes quand on sélectionne une image
                  }}
                  onTransform={(newProps) =>
                    handleImageTransform(idx, newProps)
                  }
                />
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
