"use client";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return (
    <TanStackProvider>
      <AuthProvider>
        <main>
          подорожники
          {loading ? <div>Loading...</div> : children}
          подорожники 2025
        </main>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default AuthLayout;
