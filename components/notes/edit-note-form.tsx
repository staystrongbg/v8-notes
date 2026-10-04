"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FieldLabel, FieldError } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Note } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateNote } from "@/fetchers/update-note";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../shared/submit-button";
import { CharacterCounter } from "../shared/character-counter";

const newNoteFormSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  text: z.string().min(1).max(2000).trim(),
});

const EditNoteForm = ({ note }: { note: Note | null }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof newNoteFormSchema>>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: note?.title || "",
      text: note?.text || "",
    },
  });

  if (!note) {
    return <div>Note not found.</div>;
  }

  const onSubmit = async (data: z.infer<typeof newNoteFormSchema>) => {
    try {
      await updateNote({
        ...data,
        id: note.id,
        userId: note.userId,
        isStarred: note.isStarred,
      });
      router.push("/notes");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update note. Please try again.",
      });
    }
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
              />
              <CharacterCounter value={field.value || ""} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <p className="font-mono text-xs text-destructive">[stderr] {error}</p>}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            disabled={isLoading}
            variant="outline"
            onClick={() => router.back()}
            className="flex-1 font-mono"
          >
            --cancel
          </Button>
          <SubmitButton
            className="flex-2 font-mono"
            isLoading={isLoading}
            label="$ commit --update"
            loadingLabel="$ committing..."
          />
        </div>
      </FieldGroup>
    </form>
  );
};

export default EditNoteForm;
