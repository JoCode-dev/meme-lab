import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const MemeSkeleton = () => {
  return (
    <Card className={cn(
      "overflow-hidden h-full flex flex-col",
      "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
    )}>
      <CardHeader className="pb-0 pt-3 px-3 sm:px-4">
        <Skeleton className="h-5 sm:h-6 w-3/4" />
      </CardHeader>
      <CardContent className="flex-grow p-3 sm:p-4">
        <div className="flex flex-col space-y-2">
          <div className="relative aspect-square w-full">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="py-2 px-3 sm:px-4 border-t border-gray-100 dark:border-gray-800">
        <Skeleton className="h-4 w-1/3" />
      </CardFooter>
    </Card>
  );
};

export const MemeSkeletonGrid = () => {
  return (
    <div className={cn(
      "grid gap-4 sm:gap-6",
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      "w-full"
    )}>
      {Array.from({ length: 8 }).map((_, index) => (
        <MemeSkeleton key={index} />
      ))}
    </div>
  );
};
