"use client"

import css from "./SignUpPage.module.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ApiError } from "@/app/api/api"
import { register, SignUpRequest } from "@/lib/api/clientApi"
import { useAuthStore } from "@/lib/store/authStore"


const SignUp = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const setUser = useAuthStore((state) => state.setUser)
  
  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as unknown as SignUpRequest;

      const response = await register(data)
      if (response) {
        setUser(response)
        router.push("/profile")
      } else {
        setError("Invalid email or password")
      }

    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
    }
  }
  
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>Error</p>}
      </form>
    </main>
  )
}

export default SignUp;