"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const LabCarousel = () => {
  return (
    <ScrollArea className="h-40 w-full grid grid-cols-4 gap-2 overflow-x-auto">
      {Array.from({ length: 15 }).map((_, index) => (
        <Card className="w-15 h-15 flex items-center justify-center cursor-pointer">
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <span className="text-lg font-semibold">{index + 1}</span>
          </CardContent>
        </Card>
      ))}
    </ScrollArea>
  );
};
