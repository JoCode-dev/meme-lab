"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useStore from "@/store";
import type Konva from "konva";
import {
  Bold,
  Italic,
  SmilePlusIcon,
  StickerIcon,
  TextCursorIcon,
  TrashIcon,
  Underline,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn, genID } from "@/lib/utils";
import type { ShapeOpts } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Text } from "react-konva";

interface LabToolsProps {
  saveMeme: () => void;
}

// Définir quelques catégories d'emojis populaires
const EMOJI_CATEGORIES = [
  {
    name: "Visages",
    emojis: [
      "😀",
      "😂",
      "🤣",
      "😍",
      "🥰",
      "😎",
      "🤔",
      "🙄",
      "😴",
      "😭",
      "😱",
      "🥺",
      "😡",
      "🤬",
      "🤮",
    ],
  },
  {
    name: "Animaux",
    emojis: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
    ],
  },
  {
    name: "Objets",
    emojis: [
      "💩",
      "👻",
      "💀",
      "👽",
      "🤖",
      "💣",
      "💯",
      "💥",
      "🔥",
      "🌟",
      "💫",
      "🎉",
      "🎊",
      "🎈",
      "🎁",
    ],
  },
  {
    name: "Mains",
    emojis: [
      "👍",
      "👎",
      "👌",
      "✌️",
      "🤞",
      "👊",
      "🤛",
      "🤜",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤝",
      "🙏",
      "✍️",
    ],
  },
];

export const LabTools = ({ saveMeme }: LabToolsProps) => {
  const {
    files,
    addShape,
    transformShape,
    deleteShape,
    selectShape,
    deselectShape,
    selectedShapeId,
    shapes,
  } = useStore();

  const [textInputValue, setTextInputValue] = useState("Edit me");
  const [selectedShape, setSelectedShape] = useState<ShapeOpts | null>(null);
  const [isEmojiSelectorOpen, setIsEmojiSelectorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  // State for text formatting toggles
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);
  const [emojiSize, setEmojiSize] = useState(40);

  // Mettre à jour l'input quand on sélectionne un texte
  useEffect(() => {
    if (selectedShapeId) {
      const el = shapes.find((shape) => shape.id === selectedShapeId);
      if (el) {
        setSelectedShape(el);
        if (el.type === "text") {
          const text = el.props.text as string;
          setTextInputValue(text || "Edit me");

          // Update toggle states based on selected text properties
          setIsBold(
            el.props.fontStyle === "bold" ||
              el.props.fontStyle === "italic bold"
          );
          setIsItalic(
            el.props.fontStyle === "italic" ||
              el.props.fontStyle === "italic bold"
          );
          setIsUnderlined(el.props.textDecoration === "underline");
          setTextColor((el.props.fill as string) || "#000000");
          setFontSize((el.props.fontSize as number) || 24);
        }
      }
    } else {
      // Reset states when no text is selected
      setSelectedShape(null);
      setIsBold(false);
      setIsItalic(false);
      setIsUnderlined(false);
      setFontSize(24);
    }
  }, [selectedShapeId, shapes]);

  // Mettre à jour le texte quand l'input change
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setTextInputValue(newText);

    if (selectedShapeId) {
      if (selectedShape && selectedShape.type === "text") {
        transformShape(selectedShapeId, { text: newText });
      }
    }
  };

  // Handle bold, italic, underline
  const handleBold = () => {
    if (selectedShape && selectedShape.type === "text") {
      const newBoldState = !isBold;
      setIsBold(newBoldState);

      // Préserver l'état italic quand on toggle le bold
      const currentStyle =
        (selectedShape.props.fontStyle as string) || "normal";
      const hasItalic = currentStyle.includes("italic");

      let newStyle = "normal";
      if (newBoldState && hasItalic) {
        newStyle = "italic bold";
      } else if (newBoldState) {
        newStyle = "bold";
      } else if (hasItalic) {
        newStyle = "italic";
      }

      transformShape(selectedShape.id, {
        fontStyle: newStyle,
      });
    }
  };

  const handleItalic = () => {
    if (selectedShape && selectedShape.type === "text") {
      const newItalicState = !isItalic;
      setIsItalic(newItalicState);

      // Préserver l'état bold quand on toggle l'italic
      const currentStyle =
        (selectedShape.props.fontStyle as string) || "normal";
      const hasBold = currentStyle.includes("bold");

      let newStyle = "normal";
      if (newItalicState && hasBold) {
        newStyle = "italic bold";
      } else if (newItalicState) {
        newStyle = "italic";
      } else if (hasBold) {
        newStyle = "bold";
      }

      transformShape(selectedShape.id, {
        fontStyle: newStyle,
      });
    }
  };

  const handleStrikethrough = () => {
    if (selectedShape && selectedShape.type === "text") {
      const newUnderlineState = !isUnderlined;
      setIsUnderlined(newUnderlineState);
      transformShape(selectedShape.id, {
        textDecoration: newUnderlineState ? "underline" : "none",
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);

    if (selectedShape && selectedShape.type === "text") {
      transformShape(selectedShape.id, {
        fill: newColor,
      });
    }
  };

  // Handle font size change
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value);
    setFontSize(newSize);

    if (selectedShape && selectedShape.type === "text") {
      transformShape(selectedShape.id, {
        fontSize: newSize,
      });
    }
  };

  // Handle emoji size change
  const handleEmojiSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value);
    setEmojiSize(newSize);
  };

  const handleSaveMeme = () => {
    deselectShape();
    setIsEmojiSelectorOpen(false);
    setTextInputValue("Edit me");
    setSelectedShape(null);
    setIsBold(false);
    setIsItalic(false);
    setIsUnderlined(false);
    setFontSize(24);
    setEmojiSize(40);
    setTimeout(() => {
      saveMeme();
    }, 100);
  };

  const handleAddText = () => {
    const id = genID();
    const initialText = textInputValue;

    const props: Konva.TextConfig = {
      x: 50,
      y: 50,
      width: 200,
      height: 30,
      fill: "black",
      fontSize: 24,
      fontFamily: "Arial",
      fontWeight: "normal",
      text: initialText,
      align: "center",
    };

    const shape: ShapeOpts = {
      id,
      type: "text",
      props,
      component: <Text text={initialText} />,
    };

    addShape(shape);
    selectShape(id);
  };

  const handleAddEmoji = (emoji: string) => {
    const id = genID();

    const props: Konva.TextConfig = {
      x: 100,
      y: 100,
      width: emojiSize * 1.2,
      height: emojiSize * 1.2,
      fontSize: emojiSize,
      text: emoji,
      align: "center",
      verticalAlign: "middle",
    };

    const shape: ShapeOpts = {
      id,
      type: "text",
      props,
      component: <Text text={emoji} />,
    };

    addShape(shape);
    selectShape(id);
    setIsEmojiSelectorOpen(false);
  };

  const handleDelete = () => {
    if (selectedShapeId) {
      deleteShape(selectedShapeId);
      deselectShape();
    }
  };

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
        onClick={handleAddText}
        disabled={files.length === 0}
        id="text-tool"
      >
        Add Text <TextCursorIcon className="w-4 h-4" />
      </Button>

      <Popover open={isEmojiSelectorOpen} onOpenChange={setIsEmojiSelectorOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-full gap-2 font-medium bg-slate-400 dark:bg-white cursor-pointer"
            size="lg"
            disabled={files.length === 0}
          >
            Add sticker <SmilePlusIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-0" align="end">
          <div className="flex flex-col">
            <div className="flex items-center justify-between bg-slate-100 dark:bg-gray-800 p-2 border-b">
              <div className="flex items-center gap-2">
                <span className="font-medium">Emojis</span>
                <span className="text-xs text-gray-500">
                  Taille: {emojiSize}px
                </span>
              </div>
              <Input
                type="range"
                min="20"
                max="80"
                value={emojiSize}
                onChange={handleEmojiSizeChange}
                className="w-24"
              />
            </div>

            <div className="p-2 border-b">
              <div className="flex gap-1 overflow-x-auto pb-1">
                {EMOJI_CATEGORIES.map((category, index) => (
                  <Button
                    key={index}
                    variant={selectedCategory === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(index)}
                    className={cn(
                      "whitespace-nowrap bg-slate-400 dark:bg-gray-800 text-white dark:text-white",
                      selectedCategory === index &&
                        "bg-slate-500 dark:bg-gray-700"
                    )}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 p-3 max-h-60 overflow-y-auto">
              {EMOJI_CATEGORIES[selectedCategory].emojis.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-10 w-10 p-0 text-xl hover:bg-slate-100 dark:hover:bg-gray-700"
                  onClick={() => handleAddEmoji(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Separator className="w-full" />

      <AnimatePresence>
        {selectedShape && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full overflow-hidden"
            transition={{ duration: 0.3 }}
          >
            <Input
              value={textInputValue}
              onChange={handleTextInputChange}
              placeholder="Enter text here"
              className="w-full text-black dark:text-white"
            />

            <div className="flex items-center justify-center gap-6 py-2">
              <ToggleGroup
                type="multiple"
                value={[
                  isBold ? "bold" : "",
                  isItalic ? "italic" : "",
                  isUnderlined ? "strikethrough" : "",
                ].filter(Boolean)}
              >
                <ToggleGroupItem
                  value="bold"
                  aria-label="Toggle bold"
                  onClick={handleBold}
                  data-state={isBold ? "on" : "off"}
                >
                  <Bold className="h-4 w-4 text-slate-500 dark:text-white" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="italic"
                  aria-label="Toggle italic"
                  onClick={handleItalic}
                  data-state={isItalic ? "on" : "off"}
                >
                  <Italic className="h-4 w-4 text-slate-500 dark:text-white" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="strikethrough"
                  aria-label="Toggle strikethrough"
                  onClick={handleStrikethrough}
                  data-state={isUnderlined ? "on" : "off"}
                >
                  <Underline className="h-4 w-4 text-slate-500 dark:text-white" />
                </ToggleGroupItem>
              </ToggleGroup>

              {/* Delete button */}
              <Button
                className="gap-2 w-8 h-8 font-medium bg-slate-400 dark:bg-white hover:bg-red-500 cursor-pointer transition-all duration-300"
                size="icon"
                onClick={() => handleDelete()}
              >
                <TrashIcon className="size-4" />
              </Button>
            </div>

            {/* Color picker */}
            <Label className="text-sm font-medium text-gray-400">Color</Label>
            <Input
              type="color"
              className="w-full h-10"
              value={textColor}
              onChange={handleColorChange}
            />

            {/* Font size control */}
            <div className="mt-3">
              <Label className="text-sm font-medium text-gray-400">
                Font Size: {fontSize}px
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="range"
                  min="8"
                  max="72"
                  step="1"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-full text-black dark:text-white"
                />
                <Input
                  type="number"
                  min="8"
                  max="72"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-16"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className="w-full my-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 font-bold cursor-pointer"
        size="lg"
        disabled={files.length === 0}
        onClick={handleSaveMeme}
      >
        Save <StickerIcon className="w-4 h-4 stroke-3" />
      </Button>
    </div>
  );
};
