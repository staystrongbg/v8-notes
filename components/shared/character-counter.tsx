"use client";

export const CharacterCounter = ({ value }: { value: string }) => {
  return (
    <p className="text-xs text-muted-foreground">
      {value.length}/2000 characters
    </p>
  );
};
