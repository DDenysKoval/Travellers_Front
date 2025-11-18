"use client";

import { Metadata } from "next";
import Categories from "@/components/Categories/Categories";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

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

// export default function StoriesByCategory({ params }: Props) {

//   return (
//     <main>
//       <section>
//         <Categories onSelect={handleCategoryChange} />
//       </section>
//     </main>
//   );
// }
