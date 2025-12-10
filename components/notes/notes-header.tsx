"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Grid, Table2Icon } from "lucide-react";
import { useCreatePageUrl } from "@/hooks/use-create-page-url";

export const NotesHeader = () => {
  const createPageUrl = useCreatePageUrl();
  return (
    <header className="flex sm:justify-end justify-center mb-4 items-center">
      {/* change view buttons */}
      <div className="sm:flex hidden items-baseline gap-2 ">
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <span>view</span>
        </div>
        <div className="flex items-center gap-2 justify-start w-fit">
          <Button variant={"outline"} asChild>
            <div className="flex items-center gap-1">
              <Grid className="h-4 w-4" />
              <Link href={createPageUrl("view", "grid")}>grid</Link>
            </div>
          </Button>
          <Button variant={"outline"} asChild>
            <div className="flex items-center gap-1">
              <Table2Icon className="h-4 w-4" />
              <Link href={createPageUrl("view", "table")}>table</Link>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};
