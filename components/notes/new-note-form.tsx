'use client';

import { useVimActions } from '@/components/vim/vim-provider';
import { newNote } from '@/fetchers/new-note';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { CharacterCounter } from '../shared/character-counter';
import { SubmitButton } from '../shared/submit-button';
import { Button } from '../ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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

export const NewNoteForm = ({ userId }: { userId: string }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof newNoteFormSchema>>({
    resolver: zodResolver(newNoteFormSchema),
    defaultValues: {
      title: '',
      text: '',
      tags: '',
    },
  });

  const {
    mutate,
    isPending: isMutating,
    isError,
    error: mutationError,
  } = useMutation({
    mutationFn: (data: z.infer<typeof newNoteFormSchema>) =>
      newNote({
        ...data,
        tags: parseTagsInput(data.tags),
        userId,
      }),
    onSuccess: () => router.push('/notes'),
  });

  const onSubmit = (data: z.infer<typeof newNoteFormSchema>) => {
    mutate(data);
  };

  const onCancel = () => {
    router.back();
    form.reset();
  };
  const isLoading = isMutating;
  const error = isError
    ? mutationError instanceof Error
      ? mutationError.message
      : 'Failed to create note. Please try again.'
    : undefined;

  const textValue = useWatch({ control: form.control, name: 'text' });
  const formEl = useRef<HTMLFormElement>(null);
  useVimActions({ save: () => formEl.current?.requestSubmit() });
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  //1. sets the form value
  //2. focuses the body
  //3. sets the selection range
  const replaceBody = (next: string, selStart: number, selEnd: number) => {
    form.setValue('text', next, { shouldDirty: true, shouldValidate: true });
    requestAnimationFrame(() => {
      bodyRef.current?.focus();
      bodyRef.current?.setSelectionRange(selStart, selEnd);
    });
  };
  return (
    <form ref={formEl} onSubmit={form.handleSubmit(onSubmit)} className="font-mono">
      <div className="grid gap-4 lg:grid-cols-2">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-xs tracking-wider uppercase">
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
                <FieldLabel htmlFor={field.name} className="text-xs tracking-wider uppercase">
                  <span className="text-primary">❯</span> ./body.md
                </FieldLabel>
                <MarkdownToolbar editorRef={bodyRef} onReplace={replaceBody} />
                <Textarea
                  {...field}
                  ref={el => {
                    field.ref(el);
                    bodyRef.current = el;
                  }}
                  id={field.name}
                  placeholder="# markdown supported · ```code``` · :emoji:"
                  aria-invalid={fieldState.invalid}
                  className="min-h-[220px] leading-relaxed"
                  maxLength={2000}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                <CharacterCounter value={field.value || ''} />
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-xs tracking-wider uppercase">
                  <span className="text-primary">❯</span> ./tags
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="$ tag --add work, urgent"
                  aria-invalid={fieldState.invalid}
                />
                <p className="text-muted-foreground/60 font-mono text-[11px]">
                  comma-separated · a-z 0-9 - _ · max 10 tags
                </p>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          {error && <p className="text-destructive text-xs">[stderr] {error}</p>}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1"
            >
              --cancel
            </Button>
            <SubmitButton
              className="flex-2"
              isLoading={isLoading}
              label="$ commit --new"
              loadingLabel="$ committing..."
            />
          </div>
        </FieldGroup>
        <NotePreview text={textValue || ''} />
      </div>
    </form>
  );
};
