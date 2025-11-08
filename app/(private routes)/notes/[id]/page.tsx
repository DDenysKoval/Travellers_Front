import { fetchServerNotebyId } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";


interface Props {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props):Promise<Metadata> {
  const { id } = await params;
  const note = await fetchServerNotebyId(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 20),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 50),
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1374,
          height: 916,
          alt: "NoteHub logo"
        },
      ],
    }
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: ()=>fetchServerNotebyId(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>)
}

export default NoteDetails;