import css from "./CreateStoryPage.module.css";

import { Metadata } from "next";
import CreateStoryClient from "./CreateStory.client";
import { getCategories } from "@/lib/api/serverApi";
// import { getCategories } from "@/lib/api/serverApi";

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

// const categories = [
//   {
//     "_id": "68fb50c80ae91338641121f0",
//     "name": "Азія"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f1",
//     "name": "Гори"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f2",
//     "name": "Європа"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f3",
//     "name": "Америка"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f4",
//     "name": "Африка"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f6",
//     "name": "Пустелі"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f7",
//     "name": "Балкани"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f8",
//     "name": "Кавказ"
//   },
//   {
//     "_id": "68fb50c80ae91338641121f9",
//     "name": "Океанія"
//   }
// ];


const CreateStoriePage = async () => {
  let categories = []
  categories = await getCategories();

  console.log(categories);


  return (
    <main className={`container ${css.stories}`}>
      <h1 className={css.title}>Створити нову історію</h1>

      <CreateStoryClient categories={categories} />
    </main>
  );
};

export default CreateStoriePage;


