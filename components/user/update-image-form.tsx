"use client";

import { Field, FieldGroup } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { FieldError } from "@/components/ui/field";
import { updateUser, useSession } from "@/lib/auth-client";
import Image from "next/image";
import { SubmitButton } from "../shared/submit-button";

const updateImageSchema = z.object({
  image: z.instanceof(File).optional().nullable(),
  name: z.string().min(3, "Name is required."),
});

export default function UpdateImageForm() {
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(updateImageSchema),
    defaultValues: {
      name: session?.user?.name || "",
      image: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateImageSchema>) => {
    let imageUrl = null;
    const file = data.image;
    if (file) {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      imageUrl = base64;
    }
    const { error } = await updateUser({
      name: data.name,
      image: imageUrl,
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
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="image"
          control={form.control}
          render={({ field, fieldState }) => {
            const { value, ...fieldProps } = field;
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  <Image
                    src={
                      session?.user?.image || "/placeholder-image-person.png"
                    }
                    alt=""
                    width={60}
                    height={60}
                    className="aspect-square rounded-full object-cover"
                  />
                  Change Image
                </FieldLabel>
                <Input
                  {...fieldProps}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={field.name}
                  type="file"
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                  hidden
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            );
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
        <SubmitButton
          isLoading={isLoading}
          label="Update Image"
          loadingLabel="Updating image..."
        />
      </FieldGroup>
      {form.formState.isSubmitSuccessful ? (
        <p className="text-green-500">Image updated successfully.</p>
      ) : null}
    </form>
  );
}
