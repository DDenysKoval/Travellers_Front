"use client";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProfileEditProvider from "@/components/AuthProfileEditProvider/AuthProfileEditProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
        <AuthProfileEditProvider>
          <main style={{ backgroundColor: "#fff" }}>
            {loading ? <div>Loading...</div> : children}
          </main>
        </AuthProfileEditProvider>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default AuthLayout;
