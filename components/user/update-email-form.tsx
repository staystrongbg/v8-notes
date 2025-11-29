"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field";
import { changeEmail } from "@/lib/auth-client";
import { useSession } from "@/lib/auth-client";
import { SubmitButton } from "../shared/submit-button";

const updateEmailSchema = z.object({
  newEmail: z.email("Invalid email"),
});

export default function UpdateEmailForm() {
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: session?.user?.email || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updateEmailSchema>) => {
    const { error } = await changeEmail({
      newEmail: data.newEmail,
    });
    if (error) {
      form.setError("root", {
        type: "manual",
        message: error.message,
      });
    }
  };

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors.root?.message;
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="newEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder={field.name}
                autoComplete="off"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <SubmitButton
          isLoading={isLoading}
          label="Update Email"
          loadingLabel="Updating email..."
        />
      </FieldGroup>
      {form.formState.isSubmitSuccessful ? (
        <p className="text-green-500">Email updated successfully.</p>
      ) : null}
    </form>
  );
}
