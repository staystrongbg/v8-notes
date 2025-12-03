import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Note } from "@prisma/client";
import Link from "next/link";

export function NotesTable({ notes }: { notes: Note[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent notes.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          {/* <TableHead>Text</TableHead> */}
          <TableHead>Starred</TableHead>
          <TableHead className="text-right">Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            <TableCell className="font-medium">
              {<Link href={`/notes/${note.id}`}>{note.title}</Link>}
            </TableCell>
            {/* <TableCell>{note.text}</TableCell> */}
            <TableCell>{note.isStarred && "true"}</TableCell>
            <TableCell className="text-right">
              {note.createdAt.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{notes.length}</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  );
}
