"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const maxSymbols = 150;
  const defaultAvatar = "/Default_Avatar.webp";
  const [description, setDescription] = useState("");
  const [symbolsLeft, setSymbolsLeft] = useState(maxSymbols);
  const [avatarPreview, setAvatarPreview] = useState("/Default_Avatar.webp");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleFileDelete = () => {
    setAvatarPreview(defaultAvatar);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDescription(text);
    setSymbolsLeft(maxSymbols - text.length);
  };

  useEffect(() => {
    const descriptionAdded = description.trim().length > 0;
    const avatarAdded = avatarPreview !== defaultAvatar;
    setIsButtonActive(descriptionAdded || avatarAdded);
  }, [description, avatarPreview]);

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Давайте познайомимось ближче</h1>
      <div>
        <p className={css.text}>Аватар</p>
        <div className={css.avatarwrapper}>
          <Image
            className={css.avatar}
            src={avatarPreview}
            alt="default-avatar"
            width={117}
            height={117}
          />
          {avatarPreview === defaultAvatar ? (
            <label className={css.load}>
              Завантажити фото
              <input
                className={css.hiddeninput}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <button
              className={css.delete}
              type="button"
              onClick={handleFileDelete}
            >
              Видалити фото
            </button>
          )}
        </div>
        <p className={css.text}>Короткий опис</p>
        <textarea
          className={css.textarea}
          name="description"
          id="description"
          placeholder="Розкажіть більше про вас"
          value={description}
          maxLength={maxSymbols}
          onChange={handleTextChange}
        ></textarea>
        <p
          className={`${css.symbolsleft} ${symbolsLeft <= 20 ? css.warning : ""}`}
        >
          Лишилось символів: {symbolsLeft}
        </p>
        <button
          className={`${css.button} ${isButtonActive ? css.active : ""}`}
          type="submit"
          disabled={!isButtonActive}
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
