"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import styles from "./AuthForm.module.css";
import { title } from "process";

interface LoginValues {
  email: string;
  password: string;
}

interface ApiError {
  message?: string;
}

export default function LoginForm() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Некоректна пошта").required("Обов’язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Обов’язкове поле"),
  });

  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ): Promise<void> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error: ApiError = await res.json();
        throw new Error(error.message || "Помилка входу");
      }

      toast.success("Вхід успішний!");
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Сталася невідома помилка");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.tabsWrapper}>
        <Link href="/auth/register" className={styles.tab}>
          Реєстрація
        </Link>
        <Link href="/auth/login" className={`${styles.tab} ${styles.active}`}>
          Вхід
        </Link>
      </div>

      <h2 className={styles.authTitle}>Вхід</h2>
      <p className={styles.authSubtitle}>Ласкаво просимо назад!</p>

      <Formik<LoginValues>
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formInfoInput}>
              <label>Пошта*</label>
              <Field
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                className={styles.input}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formInfoInput}>
              <label>Пароль*</label>
              <Field
                name="password"
                type="password"
                placeholder="********"
                className={styles.input}
              />
              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              Увійти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
