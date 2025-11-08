
import NotesClient from "./Notes.client"
import { Metadata } from "next";
import { fetchServerNotes } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props):Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  
  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes to management`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes to management`,
      url: `https://notehub.com/notes/filter/${tag}`,
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


export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0]
  const initialData = await fetchServerNotes("", 1, tag );

  return (
    <main >
      <NotesClient initialData={initialData} tag={ tag } />
    </main>
  )
}