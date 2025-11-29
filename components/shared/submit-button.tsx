"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";

interface SubmitButtonProps extends VariantProps<typeof buttonVariants> {
  label: string;
  isLoading: boolean;
  loadingLabel?: string;
  className?: string;
}

export const SubmitButton = ({
  isLoading,
  label,
  loadingLabel,
  className,
  ...props
}: SubmitButtonProps & {
  asChild?: boolean;
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      variant={"tertiary"}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <p>{loadingLabel}</p>
        </div>
      ) : (
        <p>{label}</p>
      )}
    </Button>
  );
};
