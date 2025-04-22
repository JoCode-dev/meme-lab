import React from "react";
import { ResizableText } from "./resizable-text";

interface EditableTextProps {
  id: string;
  x: number;
  y: number;
  isTransforming: boolean;
  onToggleTransform: () => void;
  onResize: (width: number, height: number) => void;
  text: string;
  width: number;
  height: number;
  onDoubleClick: () => void;
}

export function EditableText({
  id,
  x,
  y,
  isTransforming,
  onToggleTransform,
  onResize,
  text,
  width,
  height,
  onDoubleClick,
}: EditableTextProps) {
  return (
    <ResizableText
      id={id}
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onResize={(newWidth, newHeight) => {
        onResize(newWidth, newHeight);
      }}
      text={text}
      width={width}
      onDoubleClick={onDoubleClick}
    />
  );
}
