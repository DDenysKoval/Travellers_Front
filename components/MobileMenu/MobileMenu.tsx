"use client";

import Link from "next/link";
import Image from "next/image";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "../MobileMenu/MobileMenu.module.css";
import { logout } from "@/lib/api/clientApi";

type HeaderVariant = "default" | "hero";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  variant?: HeaderVariant;
  logoClassName: string;
}


const handleLogout = async () => {
    try {
      await logout();
      // clearIsAuthenticated();
      close();
    } catch (error) {
      console.error(error);
    }
};
  

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  variant = "default",
  logoClassName,
}: MobileMenuProps) => {
  if (!isOpen) return null;



  return (
    <div className={css.mobileMenuOverlay}>
      <div className={css.mobileMenu}>
        <div className={css.mobileHeader}>
          <Link href="/" className={logoClassName} onClick={onClose}>
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
            onClick={onClose}
            aria-label="Закрити меню"
          >
            ✕
          </button>
        </div>

        <nav className={css.mobileNav}>
          <Link href="/" onClick={onClose}>
            Головна
          </Link>
          <Link href="/stories" onClick={onClose}>
            Історії
          </Link>
          <Link href="/travellers" onClick={onClose}>
            Мандрівники
          </Link>

          {isAuthenticated && (
            <Link href="/profile" onClick={onClose}>
              Мій Профіль
            </Link>
          )}
        </nav>

        <div className={css.mobileAuth}>
          {isAuthenticated ? (
            <>

              <Link
                href="/stories/create" 
                className={css.primaryButton}
                onClick={onClose}
              >
                Опублікувати історію
              </Link>


              <div
                className={css.profileRow}
              >
                <div className={css.profileAvatar} />
                <span className={css.profileName}>Імʼя</span>
                          <div
                            className={css.profileLogoutIcon}
                            onClick={handleLogout}
                            aria-label="Вийти"
                          >
                            <Image
                              src="/logout.svg"
                              alt="Вийти"
                              width={20}
                              height={20}
                            />
                          </div>
              </div>
            </>
          ) : (

            <>
              <Link
                href="/login"
                className={css.secondaryButton}
                onClick={onClose}
              >
                Вхід
              </Link>
              <Link
                href="/register"
                className={css.primaryButton}
                onClick={onClose}
              >
                Реєстрація
              </Link>
            </>
            // <AuthNavigation variant={variant} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

