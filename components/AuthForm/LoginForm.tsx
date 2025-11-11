"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import styles from "./AuthForm.module.css";

interface LoginValues {
  email: string;
  password: string;
}

interface ApiError {
  message: string;
}

export default function LoginForm() {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Некоректна пошта").required("Обов’язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Обов’язкове поле"),
  });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginValues) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error: ApiError = await res.json();
        throw new Error(error.message || "Помилка входу");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Вхід успішний!");
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
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ): Promise<void> {
    await loginMutation.mutateAsync(values);
    setSubmitting(false);
  }

  return (
    <div className="container">
      <div className={styles.authWrapper}>
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
          {({ errors, touched, values }) => (
            <Form className={styles.form}>
              <div className={styles.formInfoInput}>
                <label htmlFor="email" className={styles.label}>
                  Пошта*
                </label>
                <Field
                  id="email"
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
                <label htmlFor="password" className={styles.label}>
                  Пароль*
                </label>
                <Field
                  id="password"
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
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Входимо..." : "Увійти"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
