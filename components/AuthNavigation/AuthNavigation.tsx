"use client"

import Link from "next/link"
import css from "./AuthNavigation.module.css"
import { useAuthStore } from "@/lib/store/authStore"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api/clientApi"

const AuthNavigation = () => {
  const { isAuthenticated, user } = useAuthStore()
  const clearIsAutenticated = useAuthStore(
    (state)=>state.clearIsAuthenticated,
  )
  const router = useRouter()
  
  const handleLogout = async () => {
    await logout()
    clearIsAutenticated()
    router.push("/sign-in")
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
          </li>
          
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username.trim().length !== 0 ? user?.username : user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
    
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
        )
      }
    </>
  )
}

export default AuthNavigation;