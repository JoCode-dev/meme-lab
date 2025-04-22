import React, { useEffect, useRef } from "react";
import { Html } from "react-konva-utils";

function getStyle(width, height) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
  const baseStyle = {
    width: `${width}px`,
    height: `${height}px`,
    border: "1px solid blue",
    padding: "5px",
    margin: "0px",
    background: "white",
    outline: "none",
    resize: "none",
    color: "black",
    fontSize: "24px",
    fontFamily: "sans-serif",
    position: "absolute",
    zIndex: 1000,
  };
  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: "-4px",
  };
}

export function EditableTextInput({
  id,
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
}) {
  const textareaRef = useRef(null);
  const style = getStyle(width, height);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1, position: "absolute", zIndex: 1000 } }}>
      <textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={style}
      />
    </Html>
  );
}
