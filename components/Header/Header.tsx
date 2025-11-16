import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";
import Image from "next/image";


type HeaderVariant = "default" | "hero";

interface HeaderProps {
  variant?: HeaderVariant;
}
const isAuth = true;

const Header = ({ variant = "default" }: HeaderProps) => {
  const headerClassName =
    variant === "hero"
      ? `${css.header} ${css.headerHero}`
      : `${css.header} ${css.headerDefault}`;

  const logoClassName =
    variant === "hero"
      ? `${css.logo} ${css.logoHero}`
      : `${css.logo} ${css.logoDefault}`;

  const navLinkClassName =
    variant === "hero"
      ? `${css.navLink} ${css.navLinkHero}`
      : `${css.navLink} ${css.navLinkDefault}`;
  
  

  return (
    <header className={headerClassName}>
      <div className="container">
        <div className={css.inner}>
          <Link href="/" className={logoClassName}>
              <Image
                src="/plant.svg"          
                alt="Подорожники"
                width={22}
                height={22}
                className={css.logoIcon}
              />
            <span className={css.logoText}>Подорожники</span>
          </Link>

          <nav className={css.nav}>
            <a href="#home" className={navLinkClassName}>
              Головна
            </a>
            <a href="#stories" className={navLinkClassName}>
              Історії
            </a>
            <a href="#travellers" className={navLinkClassName}>
              Мандрівники
            </a>
            {isAuth && (
              <Link
                href="/profile"
                className={navLinkClassName}
              >
                Мій Профіль
              </Link>
            )}
          </nav>

          <AuthNavigation variant={variant} />
        </div>
      </div>
    </header>
  );
};

export default Header;
