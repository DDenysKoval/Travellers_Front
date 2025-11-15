"use client";

import { getCategory } from "@/lib/api/clientApi";
import css from "./Categories.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = getCategory();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id) {
      params.set("category", id);
    } else {
      params.delete("category"); // "Всі історії"
    }

    router.push(`/stories?${params.toString()}`);
    setIsOpen(false);

    return (
      <div className={css.menuContainer}>
        {isMobile ? (
          <>
            <p className={css.category}>Категорії</p>
            <button onClick={toggle} className={css.menuButton}>
              Всі історії ▾
            </button>
            {isOpen && (
              <ul className={css.menuList}>
                <li
                  key="All"
                  onClick={() => handleSelect(null)}
                  className={css.menuItem}
                >
                  Всі історії
                </li>
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    className={css.menuItem}
                    onClick={() => handleSelect(tag.id)}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <ul className={css.menuList}>
            <li
              key="All"
              onClick={() => handleSelect(null)}
              className={css.menuItem}
            >
              Всі історії
            </li>
            {tags.map((tag) => (
              <li
                key={tag.id}
                className={css.menuItem}
                onClick={() => handleSelect(tag.id)}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
};

export default Categories;
