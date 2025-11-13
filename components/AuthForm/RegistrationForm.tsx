"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "@/lib/api/clientApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId } from "react";
import toast from "react-hot-toast";
import styles from "./AuthForm.module.css";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface ErrorWithResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

export default function RegistrationForm() {
  const router = useRouter();
  const fieldId = useId();

  const validationSchema = Yup.object<RegisterRequest>({
    name: Yup.string().required("Обов’язкове поле"),
    email: Yup.string().email("Некоректна пошта").required("Обов’язкове поле"),
    password: Yup.string().min(6).required("Обов’язкове поле"),
  });

  const mutation = useMutation<unknown, ErrorWithResponse, RegisterRequest>({
    mutationFn: (values) => registerUser(values),
    onSuccess: () => {
      toast.success("Реєстрація успішна!");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Помилка реєстрації");
    },
  });

  const handleSubmit = (
    values: RegisterRequest,
    { setSubmitting }: FormikHelpers<RegisterRequest>
  ) => {
    mutation.mutate(values);
    setSubmitting(false);
  };

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

        <Formik<RegisterRequest>
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
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Реєстрація..." : "Зареєструватись"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
