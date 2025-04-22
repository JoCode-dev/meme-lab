"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateImage } from "@/lib/ai";
import useStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  text: z.string().min(1),
});

export const LabForm = () => {
  const { setFiles } = useStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const image = await generateImage(values.text);

      const myFile = new File([image], "image.jpeg", {
        type: image.type,
      });

      setFiles([myFile]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate meme, upgrade to PRO to generate memes");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  return (
    <div className="p-2 flex w-full gap-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-row gap-2"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Create a meme with text..."
                    className="w-full border-0 border-b border-gray-300 rounded-none placeholder:text-gray-300 text-black dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="p-2 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <SparklesIcon className="size-4" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
