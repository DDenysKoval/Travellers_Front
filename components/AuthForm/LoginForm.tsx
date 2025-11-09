"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import "./AuthForm.module.css";

interface Values {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Некоректна пошта").required("Обов’язкове поле"),
    password: Yup.string()
      .min(6, "Мінімум 6 символів")
      .required("Обов’язкове поле"),
  });

  const handleSubmit = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Помилка входу");
      }

      toast.success("Вхід успішний!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="tabs">
        <Link href="/register" className="tab">
          Реєстрація
        </Link>
        <button className="tab active">Вхід</button>
      </div>

      <h2 className="auth-title">Вхід</h2>
      <p className="auth-subtitle">Ласкаво просимо назад!</p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label>Пошта*</label>
              <Field
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label>Пароль*</label>
              <Field name="password" type="password" placeholder="********" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              Увійти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
