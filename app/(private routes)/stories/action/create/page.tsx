import css from "./CreateStoriePage.module.css";
import { Metadata } from "next";
import StorieForm from "@/components/StorieForm/StorieForm";

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

const CreateStoriePage = async () => {
  return (
    <main>
      Create storie page
      <StorieForm />
    </main>
  );
};

export default CreateStoriePage;
