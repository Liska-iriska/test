// app/notes/action/create/page.tsx

import { getCategories } from '@/src/lib/api/clientApi';
import NoteForm from '@/components/NoteForm/NoteForm';

const CreateNote = async () => {
  const categories = await getCategories();

  return (
    <>
      <NoteForm categories={categories} />
    </>
  );
};

export default CreateNote;
