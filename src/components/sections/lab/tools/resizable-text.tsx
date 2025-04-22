import Konva from "konva";
import React, { useRef, useEffect } from "react";
import { Text, Transformer } from "react-konva";
interface ResizableTextProps {
  id: string;
  x: number;
  y: number;
  text: string;
  isSelected: boolean;
  width: number;
  onResize: (width: number, height: number) => void;
  onClick: () => void;
  onDoubleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export function ResizableText({
  id,
  x,
  y,
  text,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
}: ResizableTextProps) {
  const textRef = useRef<Konva.Text>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      console.log("isSelected", isSelected);
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  function handleResize() {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        height: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
      onResize(newWidth, newHeight);
    }
  }

  function handleDoubleClick(e: any) {
    // Stop propagation to prevent other events from firing
    e.cancelBubble = true;

    // Call the provided double click handler
    if (onDoubleClick) {
      // Make sure the click target is the text node itself
      if (e.target === textRef.current) {
        onDoubleClick(e);
      }
    }
  }

  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={["middle-left", "middle-right"]}
      boundBoxFunc={(oldBox, newBox) => {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }}
    />
  ) : null;

  return (
    <>
      <Text
        x={x}
        y={y}
        ref={textRef}
        text={text}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        perfectDrawEnabled={false}
        onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={handleDoubleClick}
        onDblTap={handleDoubleClick}
        width={width}
        padding={10}
        draggable
      />
      {transformer}
    </>
  );
}
