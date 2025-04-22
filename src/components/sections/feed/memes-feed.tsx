"use client";

import { MemeDetail } from "@/components/shared/meme-detail";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import type { Meme } from "@/types";

interface MemeFeedProps {
  memes: Meme[];
}

export const MemesFeed = ({ memes }: MemeFeedProps) => {
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-6",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        "w-full"
      )}
    >
      {memes.map((meme) => (
        <Card
          key={meme.id}
          id="meme-card"
          className={cn(
            "overflow-hidden h-full flex flex-col",
            "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
            "transition-all duration-200 hover:shadow-md"
          )}
        >
          <CardHeader className="pb-0 pt-3 px-3 sm:px-4">
            <CardTitle className="truncate text-sm sm:text-base text-gray-900 dark:text-gray-100">
              {meme.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-3 sm:p-4">
            <MemeDetail name={meme.name} imageUrl={meme.image_url} compact />
          </CardContent>
          <CardFooter className="py-2 px-3 sm:px-4 text-xs sm:text-sm text-muted-foreground border-t border-gray-100 dark:border-gray-800">
            {formatDate(meme.created_at)}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
