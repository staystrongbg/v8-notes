"use client";

export const CharacterCounter = ({ value }: { value: string }) => {
  return (
    <p className="text-xs text-muted-foreground">
      {value.length}/1000 characters
    </p>
  );
};
