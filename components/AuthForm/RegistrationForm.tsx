"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Link from "next/link";
import { useId } from "react";
import styles from "./AuthForm.module.css";

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

  const registerMutation = useMutation({
    mutationFn: async (values: RegistrationValues) => {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error: ApiError = await res.json();
        throw new Error(error.message || "Помилка реєстрації");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Реєстрація успішна!");
      router.push("/");
    },

    onError: (err: unknown) => {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Сталася невідома помилка");
      }
    },
  });

  async function handleSubmit(
    values: RegistrationValues,
    { setSubmitting }: FormikHelpers<RegistrationValues>
  ): Promise<void> {
    await registerMutation.mutateAsync(values);
    setSubmitting(false);
  }

  return (
    <div className="container">
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
          {({ errors, touched, values }) => (
            <Form className={styles.form}>
              <div className={styles.formInfoInput}>
                <label htmlFor={`${fieldId}-name`} className={styles.label}>
                  Ім’я та Прізвище*
                </label>
                <Field
                  id={`${fieldId}-name`}
                  name="name"
                  placeholder="Ваше ім’я та прізвище"
                  className={`
            ${styles.input}
            ${touched.name && errors.name ? styles.inputError : ""}
            ${values.name ? styles.inputFilled : ""}
          `}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formInfoInput}>
                <label htmlFor={`${fieldId}-email`} className={styles.label}>
                  Пошта*
                </label>
                <Field
                  id={`${fieldId}-email`}
                  name="email"
                  type="email"
                  placeholder="hello@podorozhnyky.ua"
                  className={`
            ${styles.input}
            ${touched.email && errors.email ? styles.inputError : ""}
            ${values.email ? styles.inputFilled : ""}
          `}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.formInfoInput}>
                <label htmlFor={`${fieldId}-password`} className={styles.label}>
                  Пароль*
                </label>
                <Field
                  id={`${fieldId}-password`}
                  name="password"
                  type="password"
                  placeholder="********"
                  className={`
            ${styles.input}
            ${touched.password && errors.password ? styles.inputError : ""}
            ${values.password ? styles.inputFilled : ""}
          `}
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
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? "Реєстрація..."
                  : "Зареєструватись"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
