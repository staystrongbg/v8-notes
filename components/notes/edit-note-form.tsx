'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useVimActions } from '@/components/vim/vim-provider';
import { updateNote } from '@/fetchers/update-note';
import { zodResolver } from '@hookform/resolvers/zod';
import { Note } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { CharacterCounter } from '../shared/character-counter';
import { SubmitButton } from '../shared/submit-button';
import { MarkdownToolbar } from './markdown-toolbar';
import { NotePreview } from './note-preview';

const newNoteFormSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  text: z.string().min(1).max(2000).trim(),
  tags: z.string().max(200).trim(),
});

const parseTagsInput = (raw: string): string[] =>
  raw
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

const EditNoteForm = ({
  note,
  onTextChange,
}: {
  note: (Note & { tags?: { name: string }[] }) | null;
  onTextChange?: (text: string) => void;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof newNoteFormSchema>>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: note?.title || '',
      text: note?.text || '',
      tags: note?.tags?.map(tag => tag.name).join(', ') || '',
    },
  });
  const textValue = useWatch({ control: form.control, name: 'text' });
  const formEl = useRef<HTMLFormElement>(null);
  useVimActions({ save: () => formEl.current?.requestSubmit() });
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);
  const replaceBody = (next: string, selStart: number, selEnd: number) => {
    form.setValue('text', next, { shouldDirty: true, shouldValidate: true });
    requestAnimationFrame(() => {
      bodyRef.current?.focus();
      bodyRef.current?.setSelectionRange(selStart, selEnd);
    });
  };

  if (!note) {
    return <div>Note not found.</div>;
  }

  const onSubmit = async (data: z.infer<typeof newNoteFormSchema>) => {
    try {
      await updateNote({
        ...data,
        tags: parseTagsInput(data.tags),
        id: note.id,
        userId: note.userId,
        isStarred: note.isStarred,
      });
      router.push('/notes');
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message:
          error instanceof Error ? error.message : 'Failed to update note. Please try again.',
      });
    }
  };
  const isLoading = form.formState.isSubmitting;
  const error = form.formState.errors.root?.message;
  return (
    <form ref={formEl} onSubmit={form.handleSubmit(onSubmit)} className="font-mono">
      <div className="grid gap-4 lg:grid-cols-2">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs tracking-wider uppercase"
                >
                  <span className="text-primary">❯</span> ./title
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="$ note --title 'hello world'"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="text"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs tracking-wider uppercase"
                >
                  <span className="text-primary">❯</span> ./body.md
                </FieldLabel>
                <MarkdownToolbar editorRef={bodyRef} onReplace={replaceBody} />
                <Textarea
                  {...field}
                  onChange={e => {
                    field.onChange(e);
                    onTextChange?.(e.target.value);
                  }}
                  ref={el => {
                    field.ref(el);
                    bodyRef.current = el;
                  }}
                  id={field.name}
                  placeholder="# markdown supported · ```code``` · :emoji:"
                  aria-invalid={fieldState.invalid}
                  className="min-h-[220px] leading-relaxed"
                />
                <CharacterCounter value={field.value || ''} />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel
                  htmlFor={field.name}
                  className="text-xs tracking-wider uppercase"
                >
                  <span className="text-primary">❯</span> ./tags
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="$ tag --add work, urgent"
                  aria-invalid={fieldState.invalid}
                />
                <p className="font-mono text-[11px] text-muted-foreground/60">
                  comma-separated · a-z 0-9 - _ · max 10 tags
                </p>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {error && <p className="text-destructive text-xs">[stderr] {error}</p>}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              disabled={isLoading}
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              --cancel
            </Button>
            <SubmitButton
              className="flex-2"
              isLoading={isLoading}
              label="$ commit --update"
              loadingLabel="$ committing..."
            />
          </div>
        </FieldGroup>
        <NotePreview text={textValue || ''} />
      </div>
    </form>
  );
};

export default EditNoteForm;
