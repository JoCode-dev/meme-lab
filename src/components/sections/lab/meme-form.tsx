"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const memeFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

interface MemeFormProps {
  onSubmit: (values: z.infer<typeof memeFormSchema>) => void;
  isLoading: boolean;
}

export function MemeForm({ onSubmit, isLoading }: MemeFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof memeFormSchema>>({
    resolver: zodResolver(memeFormSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Handle form submission
  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter meme name"
                  {...field}
                  className="text-black dark:text-white"
                />
              </FormControl>
              <FormDescription>Choose a name for your meme.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <LoaderIcon className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
