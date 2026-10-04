"use client";

import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import Link from "next/link";
import { SubmitButton } from "../shared/submit-button";

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

const FIELDS = [
  { name: "name", label: "./user", placeholder: "$ useradd --name 'jdoe'", autoComplete: "on", type: "text" },
  { name: "email", label: "./email", placeholder: "$ useradd --email user@example.com", autoComplete: "on", type: "email" },
  { name: "password", label: "./password", placeholder: "••••••••", autoComplete: "off", type: "password" },
  { name: "confirmPassword", label: "./password --confirm", placeholder: "••••••••", autoComplete: "off", type: "password" },
] as const;

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
      const { error } = await signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
        callbackURL: "/profile",
      });
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
        message: (err as string) || "An error occurred. Please try again.",
      });
    }
  };

  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors.root?.message;
  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="signup-form"
        className="space-y-4 w-full font-mono"
      >
        <FieldGroup>
          {FIELDS.map((item) => (
            <Controller
              key={item.name}
              name={item.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="font-mono text-xs tracking-wider uppercase">
                    <span className="text-primary">❯</span> {item.label}
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder={item.placeholder}
                    autoComplete={item.autoComplete}
                    type={item.type}
                    className="font-mono"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
          {error && <p className="font-mono text-xs text-destructive">[stderr] {error}</p>}
          <SubmitButton
            isLoading={isLoading}
            label="$ useradd --create"
            loadingLabel="$ creating..."
            className="font-mono"
          />
          <Link
            href="/sign-in"
            className="block text-center font-mono text-xs text-primary underline decoration-dotted decoration-primary/50 underline-offset-4 hover:decoration-solid"
          >
            $ have-account? --login
          </Link>
        </FieldGroup>
      </form>
    </>
  );
};
