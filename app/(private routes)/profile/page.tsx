
import Image from "next/image"
import css from "./ProfilePage.module.css"
import Link from "next/link"
import { Metadata } from "next"
import { getServerMe } from "@/lib/api/serverApi"

export const metadata: Metadata = {
  title: "User Profile",
  description: "User Profile Page",
  openGraph: {
    title: "User Profile",
    description: "User Profile Page",
    url: "https://notehub.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1374,
        height: 916,
        alt: "NoteHub logo"
      },
    ],
  }
}

const Profile = async () => {
  const user = await getServerMe()

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
          Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {user.username}
          </p>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  )
}

export default Profile;