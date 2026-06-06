// app/notes/[id]/page.tsx

import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getSingleNote } from '@/src/lib/api';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;

// app/profile/[id]/page.tsx

// import { notFound } from "next/navigation";

// export default async function ProfilePage({ params }: { params: { id: string } }) {
//   const user = await getUser(params.id);

//   if (!user) {
//     notFound(); // Показує /profile/not-found.tsx
//   }

//   return <div>{user.name}</div>;
// }
