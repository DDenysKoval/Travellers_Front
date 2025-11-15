import TravellerDetailsClient from "./TravellerDetails.client";
// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
import { Metadata } from "next";

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

const TravellerDetails = async () => {
  return <TravellerDetailsClient />;
};

export default TravellerDetails;
