"use client";

import Link from "next/link";
import Image from "next/image";
import css from "./AuthNavigation.module.css";

type HeaderVariant = "default" | "hero";

interface AuthNavigationProps {
  variant?: HeaderVariant;
}

const isAuth = true;

const user = {
  name: "Імʼя",
  avatarUrl: "/avatar-placeholder.svg", 
};

const AuthNavigation = ({ variant = "default" }: AuthNavigationProps) => {
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
  
  if (!isAuth) {
    // === NOT AUTHENTICATED ===
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

  // === AUTHENTICATED ===
  return (
    <nav className={css.nav}>

      <Link
        href="/stories/create"
        className={primaryClass}
      >
        Опублікувати історію
      </Link>

      <button type="button" className={css.avatarButton}>
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={28}
            height={28}
            className={css.avatarImage}
          />
        ) : (
          <span className={css.avatarInitials}>
            {user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      <span className={css.userName}>{user.name}</span>

      <button
        type="button"
        className={css.logoutButton}
        onClick={() => {
          console.log("logout");
        }}
        aria-label="Вийти"
      >
        <Image
          src="/logout.svg"
          alt="Вийти"
          width={20}
          height={20}
        />
      </button>
    </nav>
  );
};

export default AuthNavigation;

