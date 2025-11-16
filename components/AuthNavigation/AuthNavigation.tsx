"use client";

import { logout } from "@/lib/api/clientApi";

import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalReuse from "../ModalReuse/ModaReuse";
import { useAuthStore } from "@/lib/store/authStore";

const AuthNavigation = () => {
  const router = useRouter();
  const { clearIsAuthenticated, isAuthenticated, user } = useAuthStore();
  // const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated)
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      close();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className={css.nav}>
      <button onClick={open}>Logout</button>
      <div className={css.modalReuse}>
        <ModalReuse
          isOpen={isOpen}
          onClose={close}
          title={"Ви точно хочете вийти?"}
          message={"Ми будемо сумувати за вами!"}
          actions={[
            {
              label: "Вiдмiнити",
              onClick: close,
            },
            {
              label: "Вийти",
              onClick: handleLogout,
              primary: true,
            },
          ]}
        />
      </div>
    </nav>
  );
};

export default AuthNavigation;
