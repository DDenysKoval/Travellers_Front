"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import styles from "./AuthForm.module.css";
import { useId } from "react";

interface RegistrationValues {
  name: string;
  email: string;
  password: string;
}

interface ApiError {
  message?: string;
}

export default function RegistrationForm() {
  const router = useRouter();
  const fieldId = useId();

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Мінімум 2 символи").required("Обов’язкове поле"),
    email: Yup.string().email("Некоректна пошта").required("Обов’язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Обов’язкове поле"),
  });

  const handleSubmit = async (
    values: RegistrationValues,
    { setSubmitting }: FormikHelpers<RegistrationValues>
  ): Promise<void> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error: ApiError = await res.json();
        throw new Error(error.message || "Помилка реєстрації");
      }

      toast.success("Реєстрація успішна!");
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
    <div className={styles.authWrapper}>
      <div className={styles.tabsWrapper}>
        <Link
          href="/auth/register"
          className={`${styles.tab} ${styles.active}`}
        >
          Реєстрація
        </Link>
        <Link href="/auth/login" className={styles.tab}>
          Вхід
        </Link>
      </div>

      <h2 className={styles.authTitle}>Реєстрація</h2>
      <p className={styles.authSubtitle}>
        Раді вас бачити у спільноті мандрівників!
      </p>

      <Formik<RegistrationValues>
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formInfoInput}>
              <label className={styles.label} htmlFor={`${fieldId}-name`}>
                Ім&apos;я та Прізвище*
              </label>
              <Field
                name="name"
                placeholder="Ваше ім'я та прізвище"
                className={styles.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.formInfoInput}>
              <label className={styles.label} htmlFor={`${fieldId}-email`}>
                Пошта*
              </label>
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
              <label className={styles.label} htmlFor={`${fieldId}-password`}>
                Пароль*
              </label>
              <Field
                name="password"
                type="password"
                placeholder="********"
                className={styles.input}
              />
              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              Зареєструватись
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
