"use client";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import styles from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <TanStackProvider>
      <AuthProvider>
        <main className={styles.authLayout}>
          <header className={styles.authHeader}>Подорожники</header>

          <div className={styles.authContainer}>{children}</div>

          <footer className={styles.authFooter}>© 2025 Подорожники</footer>
        </main>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default AuthLayout;
