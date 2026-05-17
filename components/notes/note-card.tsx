import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Note } from "@prisma/client";
import { StarIcon, ArrowRightIcon } from "lucide-react";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="group relative rounded-xl p-[2px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 dark:from-orange-400 dark:via-purple-400 dark:to-blue-500 transition-opacity duration-300 group-hover:opacity-0" />
      <div className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#f97316,#ec4899,#a855f7,#3b82f6,#06b6d4,#10b981,#f97316)] animate-spin-border" />
      </div>
      <Card
        key={note.id}
        className="relative w-full snap-start sm:h-auto rounded-[calc(0.625rem-2px)] bg-background/95 backdrop-blur-sm border-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 dark:from-orange-500/10 dark:to-purple-500/10 pointer-events-none" />

        <CardHeader className="relative pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle>
                <h3 className="line-clamp-1 text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {note.title}
                </h3>
              </CardTitle>
              <time className="text-xs text-muted-foreground/80 font-medium mt-1 block">
                {note.updatedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            {note.isStarred && (
              <StarIcon
                className="w-5 h-5 text-amber-400 fill-amber-400 shrink-0 drop-shadow-sm"
                aria-label="Starred note"
              />
            )}
          </div>
        </CardHeader>

        <CardContent className="relative pt-0">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-purple-500 dark:from-orange-400 dark:to-blue-400 rounded-full opacity-60" />
          <p className="line-clamp-3 font-roboto-mono text-sm leading-relaxed text-muted-foreground pl-3">
            {note.text}
          </p>
        </CardContent>

        <CardFooter className="relative pt-3">
          <Link
            href={`/notes/${note.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold font-cyber tracking-wider text-primary hover:text-primary/80 transition-colors group/link"
          >
            Read more
            <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
