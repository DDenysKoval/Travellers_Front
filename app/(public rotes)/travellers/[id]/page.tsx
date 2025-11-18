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
    title: "Treveller Info",
    description: "Treveller Info",
    openGraph: {
      title: `Treveller Info`,
      description: "Treveller Info",
      url: "",
      images: [
        {
          url: "https://res.cloudinary.com/dsr7znzlu/image/upload/v1762789255/Podorozhnuky_kznt8n.webp",
          width: 1374,
          height: 916,
          alt: "Podorozhnuky logo",
        },
      ],
    },
  };
}

const TravellerDetails = async () => {
  return <TravellerDetailsClient />;
};

export default TravellerDetails;
