"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field";
import { changePassword } from "@/lib/auth-client";
import { SubmitButton } from "../shared/submit-button";

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required."),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters long."),
});

export default function UpdatePasswordForm() {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof updatePasswordSchema>) => {
    console.log(data);
    const { error } = await changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
      revokeOtherSessions: true,
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
          name="currentPassword"
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
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
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
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <SubmitButton
          isLoading={isLoading}
          label="Update Password"
          loadingLabel="Updating Password..."
        />
      </FieldGroup>
      {form.formState.isSubmitSuccessful ? (
        <p className="text-green-500">Password updated successfully.</p>
      ) : null}
    </form>
  );
}
