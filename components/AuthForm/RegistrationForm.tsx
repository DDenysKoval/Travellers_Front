"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";

interface Values {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().min(2, "Мінімум 2 символи").required("Обов’язкове поле"),
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Помилка реєстрації");
      }

      toast.success("Реєстрація успішна!");
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
        <button className="tab active">Реєстрація</button>
        <Link href="/login" className="tab">
          Вхід
        </Link>
      </div>

      <h2 className="auth-title">Реєстрація</h2>
      <p className="auth-subtitle">Раді вас бачити у спільноті мандрівників!</p>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <label>Ім’я та Прізвище*</label>
              <Field name="name" placeholder="Ваше ім’я та прізвище" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

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
              Зареєструватись
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
