import StorieDetailsClient from "./StorieDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { fetchServerNotebyId } from "@/lib/api/serverApi";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const wrapper = await fetchServerNotebyId(id);
  const story = wrapper.data;

  return {
    title: `Story: ${story.title}`,
    description: "",
    openGraph: {
      title: `Story: ${story.title}`,
      description: "",
      // url: "`https://localhost:3000/stories/${id}`",
      images: [
        {
          url: "https://res.cloudinary.com/dsr7znzlu/image/upload/v1762789255/Podorozhnuky_kznt8n.webp ",
          width: 1440,
          height: 900,
          alt: "Podorozhnuky",
        },
      ],
    },
  };
}

const StorieDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNotebyId(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StorieDetailsClient />
    </HydrationBoundary>
  );
};

export default StorieDetails;
