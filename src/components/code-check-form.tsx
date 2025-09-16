'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Github, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  repoUrl: z
    .string()
    .url({
      message: 'Please enter a valid URL.',
    })
    .refine((val) => val.includes('github.com'), {
      message: 'Please enter a GitHub repository URL.',
    }),
});

type CodeCheckFormProps = {
  onFormSubmit: (repoUrl: string) => void;
  isLoading: boolean;
};

export function CodeCheckForm({ onFormSubmit, isLoading }: CodeCheckFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      repoUrl: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onFormSubmit(data.repoUrl);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <FormField
            control={form.control}
            name="repoUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only">GitHub Repository URL</FormLabel>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <FormControl>
                    <Input
                      placeholder="https://github.com/username/repository"
                      className="pl-10 h-12 text-base"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="text-left" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto h-12 text-base px-6 flex-shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
