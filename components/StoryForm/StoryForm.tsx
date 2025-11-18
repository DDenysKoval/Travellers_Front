"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import css from "./StoryForm.module.css";
import { Category } from "@/types/category";
import { Story } from "@/types/story";
import Link from "next/link";

type Props = {
  categories: Category[];
  entity?: Story;
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function StorieForm({ categories, entity, onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();

  const [formDataOld, setFormDataOld] = useState({
    title: entity?.title ?? "",
    img: entity?.img ?? "",
    article: entity?.article ?? "",
    category: entity?.category ? entity?.category.name : null,
  });

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormDataOld((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataOld((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormDataOld((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (formData: FormData) => {
    await onSubmit(formData);
  };

  return (
    <form action={handleSubmit}>
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
            ) : formDataOld.img ? (
              <Image
                src={formDataOld.img}
                alt="Image"
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

            {}

            <input
              ref={fileInputRef}
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id={`img-${fieldId}`}
            />

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
            <input
              type="text"
              name="title"
              id={`title-${fieldId}`}
              value={formDataOld.title}
              onChange={handleChangeInput}
              placeholder="Введіть заголовок історії"
              className={css.input}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`category-${fieldId}`} className={css.subtitle}>
              Категорія
            </label>
            <select
              onChange={handleChangeSelect}
              name="category"
              id={`category-${fieldId}`}
              className={`${css.select} ${css.input}`}
            >
              {formDataOld.category ? (
                <option value={formDataOld.category}>
                  {formDataOld.category}
                </option>
              ) : (
                <option value="">Категорія</option>
              )}
              {categories &&
                categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`article-${fieldId}`} className={css.subtitle}>
              Текст історії
            </label>
            <textarea
              name="article"
              id={`article-${fieldId}`}
              placeholder="Ваша історія тут"
              rows={9}
              className={`${css.textarea} ${css.article}`}
              onChange={handleChangeText}
              value={formDataOld.article}
            ></textarea>
          </div>
        </div>
        <div className={css.form}>
          <button type="submit" className={css.btnSubmit}>
            Зберегти
          </button>
          <Link href="/" className={css.btnCancel}>
            Відмінити
          </Link>
        </div>
      </div>
    </form>
  );
}
