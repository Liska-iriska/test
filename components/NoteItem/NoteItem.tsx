import Link from 'next/link';
import { Note } from '@/src/lib/api';
import css from '../NoteList/NoteList.module.css';

type Props = {
  item: Note;
};

const NoteItem = ({ item }: Props) => {
  return (
    <li className={css.listItem}>
      <Link className={css.link} href={`/notes/${item.id}`}>
        {item.title}
      </Link>
    </li>
  );
};

export default NoteItem;
