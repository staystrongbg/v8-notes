"use client";

import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const signupSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignUpForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    try {
      const { error } = await signUp.email(data);
      if (error) {
        form.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        router.push("/notes");
      }
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: "An error occurred. Please try again.",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors.root?.message;
  return (
    <>
      <form
        onSubmit={(e) => { e.preventDefault(); form.handleSubmit(onSubmit)(e); }}
        id="signup-form"
        className="space-y-4 w-full"
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={field.name}
                  autoComplete="on"
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{field.name}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={field.name}
                  autoComplete="on"
                  type="email"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button disabled={isLoading} type="submit" variant="tertiary">
            {isLoading ? (
              <>
                <span>
                  <Loader2 />
                  Signing up...
                </span>
              </>
            ) : (
              "Sign up"
            )}
          </Button>
          <Link href="/sign-in">Already have an account? Sign in</Link>
        </FieldGroup>
      </form>
    </>
  );
};
