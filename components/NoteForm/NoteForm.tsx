// components/NoteForm/NoteForm.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { Category, createNote, NewNoteData } from '@/src/lib/api/clientApi';
import css from './NoteForm.module.css';
import { useNoteDraftStore } from '@/src/lib/stores/noteStore';

type Props = {
  categories: Category[];
};

const NoteForm = ({ categories }: Props) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
    },
  });

  const handleCancel = () => router.push('/notes/filter/all');

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label>
          Title
          <input
            type="text"
            name="title"
            className={css.input}
            defaultValue={draft?.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={css.formGroup}>
        <label>
          Content
          <textarea
            name="content"
            className={css.textarea}
            defaultValue={draft?.content}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
      <div className={css.formGroup}>
        <label>
          Category
          <select
            className={css.select}
            name="category"
            defaultValue={draft?.categoryId}
            onChange={handleChange}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton}>
          Create
        </button>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
