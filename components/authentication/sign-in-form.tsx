"use client";

import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const signInSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const { error } = await signIn.email(data);
      if (error) {
        form.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        toast.success("Signed in successfully");
        router.push(redirect || "/notes");
        form.reset();
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
        id="signin-form"
        className="space-y-4 w-full"
      >
        <FieldGroup>
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
                  type="text"
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
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" variant="tertiary" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </FieldGroup>
        <div className="text-sm text-center">
          or sign in with Google or GitHub
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/notes" })
            }
            disabled={isLoading}
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            Google
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: "/notes" })
            }
            disabled={isLoading}
          >
            <Image src="/git-icon.svg" alt="GitHub" width={20} height={20} />
            GitHub
          </Button>
        </div>

        <Link href="/sign-up">Don&apos;t have an account? Sign up</Link>
      </form>
    </>
  );
};
