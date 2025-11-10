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
  return {
    title: "",
    description: "",
    openGraph: {
      title: `"`,
      description: "",
      url: "",
      images: [
        {
          url: "",
          width: 0,
          height: 0,
          alt: "",
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
