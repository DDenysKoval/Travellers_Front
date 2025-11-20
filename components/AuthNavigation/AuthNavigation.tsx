"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import ModalReuse from "../ModalReuse/ModaReuse";

type HeaderVariant = "default" | "hero";

interface AuthNavigationProps {
  variant?: HeaderVariant;
  showOnMobile?: boolean;
}

const AuthNavigation = ({
  variant = "default",
  showOnMobile = false,
}: AuthNavigationProps) => {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  // const isAuthenticated = true;
  // const user = {
  //   "name": "test",
  // }

  const router = useRouter();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const loginClass =
    variant === "hero"
      ? `${css.chip} ${css.chipLoginHero}`
      : `${css.chip} ${css.chipLoginDefault}`;

  const registerClass =
    variant === "hero"
      ? `${css.chip} ${css.chipRegisterHero}`
      : `${css.chip} ${css.chipRegisterDefault}`;

  const primaryClass =
    variant === "hero"
      ? `${css.chip} ${css.chipPrimaryHero}`
      : `${css.chip} ${css.chipPrimaryDefault}`;

  const avatarButtonClass =
    variant === "hero"
      ? `${css.avatarButton} ${css.avatarButtonHero}`
      : css.avatarButton;

  const userNameClass =
    variant === "hero" ? `${css.userName} ${css.userNameHero}` : css.userName;

  const logoutButtonClass =
    variant === "hero"
      ? `${css.logoutButton} ${css.logoutButtonHero}`
      : css.logoutButton;

  const logoutIconClass =
    variant === "hero"
      ? `${css.logoutIcon} ${css.logoutIconHero}`
      : `${css.logoutIcon} ${css.logoutIconDefault}`;

  const navClassName = showOnMobile ? `${css.nav} ${css.navMobile}` : css.nav;

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      closeLogoutModal();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    // === NOT AUTHENTICATED ===
    return (
      <nav className={navClassName}>
        <Link href="/auth/login" className={loginClass}>
          Вхід
        </Link>
        <Link href="/auth/register" className={registerClass}>
          Реєстрація
        </Link>
      </nav>
    );
  }

  // === AUTHENTICATED ===

  const userName = user?.name || "Користувач";

  return (
    <>
      <nav className={navClassName}>
        <Link href="/stories/create" className={primaryClass}>
          Опублікувати історію
        </Link>
        <div className={css.userBlock}>
          <button type="button" className={avatarButtonClass}>
            {user?.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={userName}
                width={28}
                height={28}
                className={css.avatarImage}
              />
            ) : (
              <span className={css.avatarInitials}>
                {userName.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

          <span className={userNameClass}>{userName}</span>

          <span className={css.userDivider} />

          <button
            type="button"
            onClick={openLogoutModal}
            className={logoutButtonClass}
            aria-label="Вийти"
          >
            <Image
              className={logoutIconClass}
              src="/logout.svg"
              alt="Вийти"
              width={20}
              height={20}
            />
          </button>
        </div>
      </nav>
      <ModalReuse
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="Ви точно хочете вийти?"
        message="Ми будемо сумувати за вами!"
        actions={[
          {
            label: "Вiдмiнити",
            onClick: closeLogoutModal,
          },
          {
            label: "Вийти",
            onClick: handleLogout,
            primary: true,
          },
        ]}
      />
    </>
  );
};

export default AuthNavigation;
