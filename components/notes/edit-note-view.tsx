'use client';

import { useState } from 'react';
import type { Note } from '@prisma/client';
import { TerminalWindow } from '@/components/shared/terminal';
import EditNoteForm from './edit-note-form';
import { VimStatusline } from './vim-statusline';

export const EditNoteView = ({ note }: { note: Note }) => {
  const [text, setText] = useState(note.text);
  const lines = text.length ? text.split('\n').length : 1;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <TerminalWindow
      title={`vim ./${note.id} --edit`}
      statusline={
        <VimStatusline
          mode="insert"
          file={`~/notes/${note.id}`}
          modified
          meta={[`Ln ${lines}`, `Wc ${words}`, ':wq to save']}
        />
      }
    >
      <EditNoteForm note={note} onTextChange={setText} />
    </TerminalWindow>
  );
};
