import { NoteContentLoading } from "@/components/notes/note-content-loading";

export default function NewNoteLoading() {
  return (
    <div className="w-full">
      <div className="max-w-2xl p-4 mx-auto">
        <h1>New Note</h1>
        <NoteContentLoading />
      </div>
    </div>
  );
}
