"use client";

import Link from "next/link";
import Image from "next/image";
import { logout } from "@/lib/api/clientApi";

import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

type HeaderVariant = "default" | "hero";

interface AuthNavigationProps {
  variant?: HeaderVariant;
}

const AuthNavigation = ({ variant = "default" }: AuthNavigationProps) => {
  const router = useRouter();
  const { clearIsAuthenticated, isAuthenticated, user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

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


  if (!isAuthenticated) {
    return (
      <nav className={css.nav}>
        <Link href="/auth/login" className={loginClass}>
          Вхід
        </Link>
        <Link href="/auth/register" className={registerClass}>
          Реєстрація
        </Link>
      </nav>
    );
  }


  const userName = user?.name ?? "Імʼя";
  const avatarUrl = user?.avatarUrl ?? "/avatar-placeholder.svg";

  return (
    <nav className={css.nav}>
      <Link href="/stories/create" className={primaryClass}>
        Опублікувати історію
      </Link>

      <button type="button" className={css.avatarButton}>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
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

      <span className={css.userName}>{userName}</span>

      <button
        type="button"
        className={css.logoutButton}
        onClick={handleLogout}
        aria-label="Вийти"
      >
        <Image src="/logout.svg" alt="Вийти" width={20} height={20} />
      </button>
    </nav>
  );
};

export default AuthNavigation;

