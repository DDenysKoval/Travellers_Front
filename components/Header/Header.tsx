"use client";

import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import { useAuthStore } from "../../lib/store/authStore"; 
import MobileMenu from "../MobileMenu/MobileMenu"; 

type HeaderVariant = "default" | "hero";

interface HeaderProps {
  variant?: HeaderVariant;
}
// const isAuthenticated = true;

const Header = ({ variant = "default" }: HeaderProps) => {
  const { isAuthenticated } = useAuthStore();
  // const  isAuthenticated  = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  
    const menuButtonClassName =
    variant === "hero"
      ? `${css.menuButton} ${css.menuButtonHero}`
      : `${css.menuButton} ${css.menuButtonDefault}`;


 const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);


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

            <Link href="/" className={navLinkClassName}>
              Головна
            </Link>

            <Link href="/stories" className={navLinkClassName}>
              Історії
            </Link>

            <Link href="/travellers" className={navLinkClassName}>
              Мандрівники
            </Link>

            {isAuthenticated && (
              <Link
                href="/profile"
                className={navLinkClassName}
              >
                Мій Профіль
              </Link>
            )}
          </nav>

            <div className={css.rightBlock}>
              <AuthNavigation variant={variant} />

              <button
                type="button"
                className={menuButtonClassName}
                onClick={toggleMenu}
                aria-label="Відкрити меню"
              >
                <Image
                    src="/menu.svg"          
                    alt="Подорожники"
                    width={24}
                    height={24}
                    className={css.logoIcon}
                  />
              </button>
            </div>
        </div>
      </div>

{/* {isMenuOpen && (
        <div className={css.mobileMenuOverlay}>
          <div className={css.mobileMenu}>
            <div className={css.mobileHeader}>
              <Link href="/" className={logoClassName} onClick={toggleMenu}>
                <Image
                  src="/plant.svg"
                  alt="Подорожники"
                  width={22}
                  height={22}
                  className={css.logoIcon}
                />
                <span className={css.logoTextModal}>Подорожники</span>
              </Link>
              <button
                type="button"
                className={css.closeButton}
                onClick={toggleMenu}
                aria-label="Закрити меню"
              >
                ✕
              </button>
            </div>

            <nav className={css.mobileNav}>
              <Link href="/" onClick={toggleMenu}>
                Головна
              </Link>
              <Link href="/stories" onClick={toggleMenu}>
                Історії
              </Link>
              <Link href="/travellers" onClick={toggleMenu}>
                Мандрівники
              </Link>

              {isAuthenticated && (
                <Link href="/profile" onClick={toggleMenu}>
                  Мій Профіль
                </Link>
              )}
            </nav>

            <div className={css.mobileAuth}>
             <AuthNavigation variant="default" showOnMobile /> 
            </div>
          </div>
        </div>
      )} */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isAuthenticated={isAuthenticated}
        variant={variant}
        logoClassName={logoClassName}
      />
    </header>
  );
};

export default Header;
