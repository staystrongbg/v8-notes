"use client";

export const CharacterCounter = ({ value }: { value: string }) => {
  return (
    <p className="font-mono text-[11px] text-muted-foreground">
      wc -m {value.length}/2000
    </p>
  );
};
