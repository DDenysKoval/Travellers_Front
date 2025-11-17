"use client";
import { useId, useRef, useState } from "react";
import Image from "next/image";
import css from "./StoryForm.module.css"
import { Category } from "@/types/category";
import { NewStory } from "@/types/story";


type Props = {
  categories: Category[],
  onSubmit: (formData: FormData) => Promise<void | NewStory>
};

export default function StorieForm({ categories, onSubmit }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();

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

  }

  return <form action={handleSubmit} >
    <div className={css.box}>

      <div className={`${css.form} ${css.formFirstItem}`}>


        <div className={css.formGroup}>

          <label htmlFor={`img-${fieldId}`} className={css.subtitle}>Обкладинка статті</label>

          {preview ? (
            <Image src={preview} alt="Preview" className={css.previewImage} width={335} height={223} />
          ) : (

            <picture>

              <source srcSet="/Default_Story-desktop.webp" media="(min-width: 1140px)" />
              <source srcSet="/Default_Story-tablet.webp" media="(min-width: 768px)" />
              <img src="/Default_Story-mobile.webp" alt="Default image" className={css.previewImage} />

            </picture>

          )}

          <input ref={fileInputRef}
            type="file"
            name="img"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }} id={`img-${fieldId}`} />

          <button
            onClick={handleButtonClick}
            type="button"
            className={css.uploadButton}
          >
            Завантажити фото
          </button>

        </div>

        <div className={css.formGroup}>
          <label htmlFor={`title-${fieldId}`} className={css.subtitle}>Заголовок</label>
          <input type="text" name="title" id={`title-${fieldId}`} placeholder="Введіть заголовок історії" className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`category-${fieldId}`} className={css.subtitle}>Категорія</label>
          <select name="category" id={`category-${fieldId}`} className={`${css.select} ${css.input}`}>
            <option value="" >Категорія</option>
            {categories?.map((category) => (<option key={category._id} value={category._id} >{category.name}</option>))}
          </select>
        </div>

        {/* <div className={css.formGroup}>
      <label htmlFor={`short-article-${fieldId}`} className={css.subtitle}>Короткий опис</label>
      <textarea name="short-article" id={`short-article-${fieldId}`} placeholder="Введіть короткий опис історії" rows={8} className={`${css.textarea} ${css.textareaShort}`}></textarea>
      <p>Лишилось символів: ${3}</p>
    </div> */}

        <div className={css.formGroup}>
          <label htmlFor={`article-${fieldId}`} className={css.subtitle}>Текст історії</label>
          <textarea name="article" id={`article-${fieldId}`} placeholder="Ваша історія тут" rows={9} className={`${css.textarea} ${css.article}`}></textarea>
        </div>
      </div>
      <div className={css.form}>
        <button type="submit" className={css.btnSubmit}>Зберегти</button>
        <button type="button" className={css.btnCancel}>Відмінити</button>
      </div>
    </div>




  </form >
}
