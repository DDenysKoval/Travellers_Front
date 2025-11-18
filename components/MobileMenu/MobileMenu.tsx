"use client";

import Link from "next/link";
import Image from "next/image";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "../MobileMenu/MobileMenu.module.css";
import { logout } from "@/lib/api/clientApi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalReuse from "../ModalReuse/ModaReuse";

type HeaderVariant = "default" | "hero";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  variant?: HeaderVariant;
  logoClassName: string;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  variant = "default",
  logoClassName,
}: MobileMenuProps) => {
  //  Scroll
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow || "";
    };
  }, [isOpen]);

  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeLogoutModal();
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.mobileMenuOverlay} onClick={onClose}>
      <div className={css.mobileMenu} onClick={(e) => e.stopPropagation()}>
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
            <Image
              src="/cross.svg"
              alt="Подорожники"
              width={14}
              height={14}
              className={css.crossIcon}
            />
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

              <div className={css.profileRow}>
                <div className={css.profileAvatar} />
                <span className={css.profileName}>Імʼя</span>
                <div
                  className={css.profileLogoutIcon}
                  onClick={openLogoutModal}
                  aria-label="Вийти"
                >
                  <Image src="/logout.svg" alt="Вийти" width={20} height={20} />
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={css.secondaryButton}
                onClick={onClose}
              >
                Вхід
              </Link>
              <Link
                href="/auth/register"
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
      <ModalReuse
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="Ви точно хочете вийти?"
        message="Ми будемо сумувати за вами!"
        actions={[
          { label: "Вiдмiнити", onClick: closeLogoutModal },
          { label: "Вийти", onClick: handleLogout, primary: true },
        ]}
      />
    </div>
  );
};

export default MobileMenu;
