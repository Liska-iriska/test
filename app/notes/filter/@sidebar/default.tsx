// app/(public routes)/notes/filter/@sidebar/default.tsx

import Link from 'next/link';
import { getCategories } from '@/src/lib/api';
import css from './SidebarNotes.module.css';

const NotesSidebar = async () => {
  const categories = await getCategories();

  return (
    <>
      <Link href="/notes/action/create" className={css.menuLink}>
        Create note
      </Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {categories.map(category => (
          <li key={category.id} className={css.menuItem}>
            <Link className={css.menuLink} href={`/notes/filter/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotesSidebar;
