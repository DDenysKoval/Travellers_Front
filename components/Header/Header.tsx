import Link from "next/link"
import css from "./Header.module.css"
import TagsMenu from "../TagsMenu/TagsMenu";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import cssauth from "../AuthNavigation/AuthNavigation.module.css"

const Header = async () => {
  
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={cssauth.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={cssauth.navigationItem}>
            <TagsMenu/>
          </li>
          <AuthNavigation/>
        </ul>
      </nav>
    </header>
  )
}

export default Header;