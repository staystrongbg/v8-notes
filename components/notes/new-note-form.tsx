"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { FieldError } from "../ui/field";
import { newNote } from "@/fetchers/new-note";
import { SubmitButton } from "../shared/submit-button";
import { CharacterCounter } from "../shared/character-counter";

const newNoteFormSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  text: z.string().min(1).max(2000).trim(),
});

export const NewNoteForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof newNoteFormSchema>>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof newNoteFormSchema>) => {
    try {
      await newNote({
        ...data,
        userId,
      });
      router.push("/notes");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Failed to create note. Please try again.",
      });
    }
  };

  const onCancel = () => {
    router.back();
    form.reset();
  };
  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors.root?.message;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="font-mono">
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="font-mono text-xs tracking-wider uppercase">
                <span className="text-primary">❯</span> ./title
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="$ note --title 'hello world'"
                aria-invalid={fieldState.invalid}
                className="font-mono"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name} className="font-mono text-xs tracking-wider uppercase">
                <span className="text-primary">❯</span> ./body.md
              </FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="# markdown supported · ```code``` · :emoji:"
                aria-invalid={fieldState.invalid}
                className="min-h-[220px] font-mono leading-relaxed"
                maxLength={2000}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              <CharacterCounter value={field.value || ""} />
            </Field>
          )}
        />
        {error && <p className="font-mono text-xs text-destructive">[stderr] {error}</p>}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 font-mono"
          >
            --cancel
          </Button>
          <SubmitButton
            className="flex-2 font-mono"
            isLoading={isLoading}
            label="$ commit --new"
            loadingLabel="$ committing..."
          />
        </div>
      </FieldGroup>
    </form>
  );
};
