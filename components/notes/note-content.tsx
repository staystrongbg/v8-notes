import { Note } from "@prisma/client"

export const NoteContent = ({ note }: { note: Note }) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">{note?.title}</h2>
      <p className="text-lg leading-relaxed text-gray-700 mb-6 whitespace-pre-wrap">{note?.text}</p>
      <p className="text-sm text-gray-500">
        Last updated: {note?.updatedAt.toLocaleDateString()} at {note?.updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  )
}
