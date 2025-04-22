"use client";

import { Button } from "@/components/ui/button";
import { Download, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn, downloadURI } from "@/lib/utils";

interface MemeDetailProps {
  name: string;
  imageUrl: string;
  onDownload?: () => void;
  compact?: boolean;
}

export const MemeDetail = ({
  name,
  imageUrl,
  onDownload,
  compact = false,
}: MemeDetailProps) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      downloadURI(imageUrl, `${name || "meme"}.png`);
    }
  };

  if (compact) {
    return (
      <div className="flex flex-col space-y-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center aspect-square p-0 h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            onClick={handleDownload}
          >
            <Download size={14} className="text-gray-800 dark:text-gray-200" />
          </Button>
          <Link
            href={`https://twitter.com/intent/tweet?url=${imageUrl}`}
            target="_blank"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center aspect-square p-0 h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <Twitter size={14} className="text-gray-800 dark:text-gray-200" />
            </Button>
          </Link>
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`}
            target="_blank"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center aspect-square p-0 h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <Facebook size={14} className="text-gray-800 dark:text-gray-200" />
            </Button>
          </Link>
          <Link
            href={`https://www.instagram.com/share?url=${imageUrl}`}
            target="_blank"
          >
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center aspect-square p-0 h-8 w-8 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <Instagram size={14} className="text-gray-800 dark:text-gray-200" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
      {/* Left side - Meme image */}
      <div className="flex justify-center items-center border rounded-lg p-3 sm:p-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="max-w-full max-h-[200px] sm:max-h-[300px] object-contain"
        />
      </div>

      {/* Right side - Info and actions */}
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">{name}</h3>

        <div className="space-y-3">
          <Button
            className={cn(
              "w-full flex items-center justify-center gap-2",
              "bg-cyan-500 hover:bg-cyan-600 text-white",
              "dark:bg-cyan-600 dark:hover:bg-cyan-700",
              "transition-colors"
            )}
            size="lg"
            onClick={handleDownload}
          >
            <Download size={18} /> 
            Download
          </Button>

          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4">
            Share on social media
          </h4>

          <div className="flex flex-wrap gap-2">
            <Link
              href={`https://twitter.com/intent/tweet?url=${imageUrl}`}
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Twitter size={16} className="text-gray-800 dark:text-gray-200" />
                <span className="hidden xs:inline">Twitter</span>
              </Button>
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`}
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Facebook size={16} className="text-gray-800 dark:text-gray-200" />
                <span className="hidden xs:inline">Facebook</span>
              </Button>
            </Link>
            <Link
              href={`https://www.instagram.com/share?url=${imageUrl}`}
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <Instagram size={16} className="text-gray-800 dark:text-gray-200" />
                <span className="hidden xs:inline">Instagram</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
