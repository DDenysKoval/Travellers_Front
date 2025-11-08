"use client"

import css from "./TagsMenu.module.css"
import { useState } from "react";
import Link from "next/link";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  
  const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo', "Ideas", "Travel", "Finance", "Health", "Important"];
  
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li className={css.menuItem} key={tag} onClick={ () => setIsOpen(false)}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>)}
    </div>
  );
};

export default TagsMenu;