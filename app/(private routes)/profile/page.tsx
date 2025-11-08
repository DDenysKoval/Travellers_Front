import css from "./ProfilePage.module.css";
import { Metadata } from "next";

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
        width: 0,
        height: 0,
        alt: "",
      },
    ],
  },
};

const Profile = async () => {
  return <main>profile page</main>;
};

export default Profile;
