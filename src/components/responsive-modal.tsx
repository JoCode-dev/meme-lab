import { useMobile } from "@/hooks/use-mobile";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveModalProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export const ResponsiveModal = ({
  title,
  children,
  open,
  onOpenChange,
  className,
}: ResponsiveModalProps) => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn("bg-white dark:bg-gray-900", className)}>
          <DrawerHeader>
            <DrawerTitle className="text-gray-900 dark:text-gray-100">{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "bg-white dark:bg-gray-900 border-none rounded-2xl",
          "sm:max-w-lg md:max-w-2xl",
          "text-gray-900 dark:text-gray-100",
          "p-6",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
