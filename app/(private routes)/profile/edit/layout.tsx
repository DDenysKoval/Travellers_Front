"use client";

import AuthProfileEditProvider from "@/components/AuthProfileEditProvider/AuthProfileEditProvider";
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
        <main style={{ backgroundColor: "var(--bg-color-auth)" }}>
          <AuthProfileEditProvider>
            {loading ? <div>Loading...</div> : children}
          </AuthProfileEditProvider>
        </main>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default AuthLayout;
