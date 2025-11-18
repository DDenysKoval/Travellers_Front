"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import css from "./StoryForm.module.css";
import { Category } from "@/types/category";
import { NewStory, Story } from "@/types/story";
import Link from "next/link";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  categories: Category[];
  entity?: Story;
  onSubmit: (formData: FormData) => Promise<void>;
};



const StoryValidationSchema = Yup.object({
  img: Yup.mixed()
    .nullable()
    .test('fileRequired', 'Виберіть зображення', (value) => {
      return value instanceof File || value instanceof FileList;
    })
    .test('fileType', 'Допустимі тільки зображення (JPG, PNG, GIF)', (value) => {
      if (!value) return true; // Пропускаємо перевірку типу якщо файл не вибрано (перший test обробить)
      const file = value instanceof FileList ? value[0] : value;
      if (!(file instanceof File)) return false;
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      return allowedTypes.includes(file.type);
    }),
  title: Yup.string().required("Назва обов'язкова").min(3, "Мінімум 3 символи"),
  article: Yup.string().required("Опис обов'язковий").min(10, "Мінімум 10 символів"),
  category: Yup.string().required("Виберіть категорію"),

});




export default function StorieForm({ categories, entity, onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(entity?.img ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();

  const initialValues: NewStory = {
    img: null,
    title: entity?.title ?? "",
    category: entity?.category?._id ?? "",
    article: entity?.article ?? ""
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("img", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (values: NewStory, formikHelper: FormikHelpers<NewStory>) => {
    console.log(values);

    const formData = new FormData();
    if (values.img) {
      formData.append("img", values.img);
    }
    formData.append("title", values.title);
    formData.append("category", values.category);
    formData.append("article", values.article);

    await onSubmit(formData);
    setPreview(null);
    formikHelper.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={StoryValidationSchema}>
      {({ setFieldValue, isValid, dirty }) => (
        <Form>
          <div className={css.box}>
            <div className={`${css.form} ${css.formFirstItem}`}>
              <div className={css.formGroup}>
                <label htmlFor={`img-${fieldId}`} className={css.subtitle}>
                  Обкладинка статті
                </label>

                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    className={css.previewImage}
                    width={335}
                    height={223}
                  />
                ) : (
                  <picture>
                    <source
                      srcSet="/Default_Story-desktop.webp"
                      media="(min-width: 1140px)"
                    />
                    <source
                      srcSet="/Default_Story-tablet.webp"
                      media="(min-width: 768px)"
                    />
                    <img
                      src="/Default_Story-mobile.webp"
                      alt="Default image"
                      className={css.previewImage}
                    />
                  </picture>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                  style={{ display: "none" }}
                  id={`img-${fieldId}`}
                />
                <ErrorMessage name="img" component="span" className={css.error} />

                <button
                  onClick={handleButtonClick}
                  type="button"
                  className={css.uploadButton}
                >
                  Завантажити фото
                </button>
              </div>

              <div className={css.formGroup}>
                <label htmlFor={`title-${fieldId}`} className={css.subtitle}>
                  Заголовок
                </label>
                <Field
                  type="text"
                  name="title"
                  id={`title-${fieldId}`}
                  placeholder="Введіть заголовок історії"
                  className={css.input}
                />
                <ErrorMessage name="title" component="span" className={css.error} />
              </div>

              <div className={css.formGroup}>
                <label htmlFor={`category-${fieldId}`} className={css.subtitle}>
                  Категорія
                </label>
                <Field
                  as="select"
                  name="category"
                  id={`category-${fieldId}`}
                  className={`${css.select} ${css.input}`}
                >
                  <option value="">Категорія</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="span" className={css.error} />
              </div>

              <div className={css.formGroup}>
                <label htmlFor={`article-${fieldId}`} className={css.subtitle}>
                  Текст історії
                </label>
                <Field
                  as="textarea"
                  name="article"
                  id={`article-${fieldId}`}
                  placeholder="Ваша історія тут"
                  rows={9}
                  className={`${css.textarea} ${css.article}`}
                />
                <ErrorMessage name="article" component="span" className={css.error} />
              </div>
            </div>
            <div className={css.form}>
              <button
                type="submit"
                className={`${css.btnSubmit} ${isValid && dirty ? css.btnSubmitValid : ''}`}
              >
                Зберегти
              </button>
              <Link href="/" className={css.btnCancel}>
                Відмінити
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
