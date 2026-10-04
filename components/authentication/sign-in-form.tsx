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
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SubmitButton } from "../shared/submit-button";

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
        className="space-y-4 w-full font-mono"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="font-mono text-xs tracking-wider uppercase">
                  <span className="text-primary">❯</span> ./email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="$ auth --email user@example.com"
                  autoComplete="on"
                  type="text"
                  className="font-mono"
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
                <FieldLabel htmlFor={field.name} className="font-mono text-xs tracking-wider uppercase">
                  <span className="text-primary">❯</span> ./password
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="••••••••"
                  autoComplete="off"
                  type="password"
                  className="font-mono"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {error && <p className="font-mono text-xs text-destructive">[stderr] {error}</p>}
          <SubmitButton
            isLoading={isLoading}
            label="$ ssh --login"
            loadingLabel="$ connecting..."
            className="font-mono"
          />
        </FieldGroup>
        <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground/70">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          <span>{'// ---- oauth ----'}</span>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn.social({ provider: "google", callbackURL: "/notes" })
            }
            disabled={isLoading}
            className="font-mono"
          >
            <Image src="/google-icon.svg" alt="Google" width={20} height={20} />
            google
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() =>
              signIn.social({ provider: "github", callbackURL: "/notes" })
            }
            disabled={isLoading}
            className="font-mono"
          >
            <Image src="/git-icon.svg" alt="GitHub" width={20} height={20} />
            github
          </Button>
        </div>

        <Link
          href="/sign-up"
          className="block text-center font-mono text-xs text-primary underline decoration-dotted decoration-primary/50 underline-offset-4 hover:decoration-solid"
        >
          $ no-account? --register
        </Link>
      </form>
    </>
  );
};
