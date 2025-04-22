"use client";

import React, { useRef, useEffect } from "react";
import { Group, Transformer } from "react-konva";
import Konva from "konva";

interface CustomShapeProps {
  id: string;
  type: string;
  isSelected: boolean;
  shapeProps: Konva.ShapeConfig;
  onSelect: (id: string) => void;
  onChange: (newProps: Konva.ShapeConfig) => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export const CustomShape = ({
  id,
  type,
  isSelected,
  shapeProps,
  onSelect,
  onChange,
  onDelete,
  children,
}: CustomShapeProps) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  // Handle text specifically
  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);

      // Configure transformer differently for text elements
      if (type === "text") {
        // Allow resizing with middle anchors for text
        trRef.current.enabledAnchors(["middle-left", "middle-right"]);
      } else {
        // Reset to default anchors for other shape types
        trRef.current.enabledAnchors([
          "top-left",
          "top-center",
          "top-right",
          "middle-right",
          "middle-left",
          "bottom-left",
          "bottom-center",
          "bottom-right",
        ]);
      }

      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected, id, type]);

  const handleSelect = (e: any) => {
    e.cancelBubble = true; // Stop propagation
    onSelect(id);
  };

  return (
    <React.Fragment>
      <Group
        id={id}
        onClick={handleSelect}
        onTap={handleSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragStart={() => {
          // Ensure selection when dragging starts
          if (!isSelected) {
            onSelect(id);
          }
        }}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // Update the shape props with the new width and height
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();

          // Different handling based on shape type
          if (type === "text") {
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              scaleX: 1,
              scaleY: 1,
              rotation: rotation,
            });
          } else {
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              width: node.width() * scaleX,
              height: node.height() * scaleY,
              rotation: rotation,
            });
          }
        }}
      >
        {children}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          boundBoxFunc={(oldBox, newBox) => {
            // special handling for text - only allow horizontal resizing
            if (type === "text") {
              newBox.height = oldBox.height;

              // limit minimum width
              if (Math.abs(newBox.width) < 20) {
                return oldBox;
              }
            } else {
              // limit resize for other shapes
              if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                return oldBox;
              }
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
