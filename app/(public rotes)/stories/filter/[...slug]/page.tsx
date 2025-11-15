import { Metadata } from "next";
import StoriesClient from "./Stories.client";
import Categories from "@/components/Categories/Categories";
import Pagination from "@/components/Pagination/Pagination";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "",
    description: "",
    openGraph: {
      title: "",
      description: "",
      url: "",
      images: [
        {
          url: "",
          width: 0,
          height: 0,
          alt: "1",
        },
      ],
    },
  };
}

export default async function StoriesByCategory({ params }: Props) {
  return (
    <main>
      <section>
        <Categories />
        <StoriesClient />
        <Pagination />
      </section>
    </main>
  );
}
