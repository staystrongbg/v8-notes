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
import { newNote } from "@/api/new-note";
import { Loader2 } from "lucide-react";

const newNoteFormSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  text: z.string().min(1).max(1000).trim(),
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
        message: error instanceof Error ? error.message : "Failed to create note. Please try again.",
      });
    }
  };

  const onCancel = () => {
    router.back();
    form.reset();
  };
  const isLoading = form.formState.isSubmitting
  const error = form.formState.errors.root?.message
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                placeholder="Note content"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2 items-center">
          <Button
            variant={"destructive"}
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant={"tertiary"}
            type="submit"
            disabled={isLoading}
            className="flex-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                <p>Creating...</p>
              </>
            ) : (
              <p>Create</p>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};
