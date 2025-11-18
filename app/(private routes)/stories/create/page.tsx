import css from "./CreateStoryPage.module.css";

import { Metadata } from "next";
import CreateStoryClient from "./CreateStory.client";
import { getCategories } from "@/lib/api/serverApi";
import CreateStoryClient from "./CreateStory.client";

// export const metadata: Metadata = {
//   title: "",
//   description: "",
//   openGraph: {
//     title: "",
//     description: "",
//     url: "",
//     images: [
//       {
//         url: "",
//         width: 1374,
//         height: 916,
//         alt: "",
//       },
//     ],
//   },
// };

const CreateStoryPage = async () => {
  const categories = await getCategories();
  return (
    <main className="container">
      <div className={css.stories}>
        <h1 className={css.title}>Створити нову історію</h1>
        <CreateStoryClient categories={categories} />
      </div>

    </main>
  );
};

export default CreateStoryPage;
