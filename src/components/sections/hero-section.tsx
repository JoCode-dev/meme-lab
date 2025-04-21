"use client";

import { motion } from "framer-motion";
import { PaletteIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["creative", "viral", "hilarious", "trending", "shareable"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-32 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col items-center">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-slate-200 dark:text-white/50">
                Create something
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-cyan-500 dark:text-white"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-sm md:text-xl leading-tight tracking-tight text-muted-foreground max-w-3xl text-center w-96 sm:w-full">
              Express yourself through memes in seconds. Upload images, add
              text, or let AI generate the perfect meme for you.
            </p>
          </div>

          <div className="flex flex-row gap-3">
            <Link href={"#lab"}>
              <Button
                size="lg"
                className="gap-2 bg-cyan-500 dark:bg-white dark:text-black text-white dark:hover:bg-white/90 hover:bg-cyan-600 cursor-pointer transition duration-200"
              >
                Start creating <PaletteIcon className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
