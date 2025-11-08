"use client"

import Image from "next/image"
import css from "./EditProfilePage.module.css"
import { getMe, updateMe } from "@/lib/api/clientApi"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/authStore"


const EditProfile = () => {
  const [username, setUsername] = useState("")
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? "")
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedUser = await updateMe({ username })
    setUser(updatedUser)
    router.push("/profile")
  }

  const handleBack = () => {
    router.back()
  }


  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar ?? "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: { user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleBack}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

export default EditProfile