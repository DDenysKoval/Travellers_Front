import css from "./EditStoryPage.module.css";

import { Metadata } from "next";
import CreateStoryClient from "../../create/CreateStory.client";
import { getCategories } from "@/lib/api/serverApi";
import { fetchNoteById } from "@/lib/api/clientApi";
import EditStoryClient from "./EditStoryPage.client";

export const metadata: Metadata = {
  title: "",
  description: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    images: [
      {
        url: "",
        width: 1374,
        height: 916,
        alt: "",
      },
    ],
  },
};

type Props = {
  params: Promise<{ id: string }>
}

const EditStoryPage = async ({ params }: Props) => {
  const { id } = await params;
  const categories = await getCategories();
  const entity = await fetchNoteById(id);

  return (
    <main className={`container ${css.stories}`}>
      <h1 className={css.title}>Створити нову історію</h1>

      <EditStoryClient categories={categories} entity={entity} />
    </main>
  );
};

export default EditStoryPage;
