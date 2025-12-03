"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

export const NotesHeader = () => {
  const pathname = usePathname();
  const url = pathname === "/starred-notes" ? "/starred-notes" : "/notes";
  return (
    <header className="max-w-4xl mx-auto flex sm:justify-between justify-center mb-4 items-center">
       {/* change view buttons */}
       <div className="sm:flex hidden items-baseline gap-2 ">
         <span className="text-sm text-muted-foreground">View</span>
         <div className="flex items-center gap-2 justify-start w-fit">
           <Button variant={"outline"} asChild>
             <Link href={`${url}?view=grid`}>Grid</Link>
           </Button>
           <Button variant={"outline"} asChild>
             <Link href={`${url}?view=table`}>Table</Link>
           </Button>
         </div>
       </div>
       {/* add new note button */}
       <Button variant={"tertiary"} asChild title="Add new note">
         <Link href="/notes/new">
           <Newspaper className="h-4 w-4" />
           Add new note
         </Link>
       </Button>
    </header>
  );
};
