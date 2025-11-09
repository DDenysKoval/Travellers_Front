"use client";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <TanStackProvider>
      <AuthProvider>
        <main className="auth-layout">
          <header className="auth-header">Подорожники</header>
          {children}
          <footer className="auth-footer">Подорожники 2025</footer>
        </main>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default AuthLayout;
