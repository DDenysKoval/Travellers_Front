import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";
import { fetchServerNotebyId } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
  }

const NotePreview = async({ params }:Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: ()=>fetchServerNotebyId(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient/>
    </HydrationBoundary>
  )
}

export default NotePreview;