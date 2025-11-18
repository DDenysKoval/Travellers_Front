"use client";

import { getCategories } from "@/lib/api/clientApi";
import { TagListResponse } from "@/types/story";
import css from "./Categories.module.css";
import { useEffect, useState } from "react";

const Categories = ({
  onSelect,
}: {
  onSelect: (id: string | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tags, setTags] = useState<TagListResponse>();

  const handleSelect = (id: string | null) => {
    setSelectedId(id);
    onSelect(id);
  };

  useEffect(() => {
    getCategories().then(setTags);
  }, []);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      {isMobile ? (
        <div className={css.categoryDiv}>
          <p className={css.category}>Категорії</p>
          <button onClick={toggle} className={css.menuButton}>
            Всі історії
            {isOpen ? (
              <svg className={css.iconKeyboardArrow} width="12" height="7">
                <use href="/icons.svg#icon-keyboard_arrow_up"></use>
              </svg>
            ) : (
              <svg className={css.iconKeyboardArrow} width="12" height="7">
                <use href="/icons.svg#icon-keyboard_arrow_down"></use>
              </svg>
            )}
          </button>
          {isOpen && (
            <ul onClick={() => setIsOpen(false)} className={css.menuList}>
              <li onClick={() => handleSelect(null)} className={css.menuItem}>
                Всі історії
              </li>
              {tags?.data?.map((tag) => (
                <li
                  key={tag._id}
                  className={css.menuItem}
                  onClick={() => handleSelect(tag._id)}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className={css.menuList}>
          <li
            onClick={() => handleSelect(null)}
            className={`${css.menuItem} ${selectedId === null ? css.active : ""}`}
          >
            Всі історії
          </li>
          {tags?.data?.map((tag) => (
            <li
              key={tag._id}
              className={`${css.menuItem} ${
                selectedId === tag._id ? css.active : ""
              }`}
              onClick={() => handleSelect(tag._id)}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
