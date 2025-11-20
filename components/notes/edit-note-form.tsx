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
import { Loader2 } from "lucide-react";
import { updateNote } from "@/api/update-note";
import { useRouter } from "next/navigation";

const newNoteFormSchema = z.object({
  title: z.string().min(1).trim(),
  text: z.string().min(1).max(1000).trim(),
});

export const EditNoteForm = ({ note }: { note: Note | null }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof newNoteFormSchema>>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: note
      ? {
          title: note.title,
          text: note.text,
        }
      : {
          title: "",
          text: "",
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
      });
      router.push("/notes");
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "Failed to update note. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="Note title"
                aria-invalid={fieldState.invalid}
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
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Note title"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div className="flex gap-2 items-center">
          <Button
            type="button"
            disabled={form.formState.isSubmitting}
            variant={"destructive"}
            onClick={() => router.back()}
          >
            <p>Cancel</p>
          </Button>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant={"tertiary"}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Updating...</p>
              </>
            ) : (
              <p>Update</p>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
