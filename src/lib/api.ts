import axios from 'axios';

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

//axios.defaults.baseURL = 'https://next-v1-notes-api.goit.study';
// axios.defaults.baseURL = 'http://localhost:3000/api';
const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});

export const getNotes = async (categoryId?: string) => {
  const res = await nextServer.get<NoteListResponse>('/notes', {
    params: { categoryId },
  });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await nextServer<Category[]>('/categories');
  return res.data;
};

export const createNote = async (data: NewNoteData) => {
  const res = await nextServer.post<Note>('/notes', data);
  return res.data;
};
