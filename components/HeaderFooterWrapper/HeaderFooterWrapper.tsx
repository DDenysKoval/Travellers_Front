"use client";

import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";

interface HeaderFooterWrapperProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function HeaderFooterWrapper({
  children,
  modal,
}: HeaderFooterWrapperProps) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "profile/edit";

  return (
    <>
      {!isAuthPage && <Header />}
      <main>
        {children}
        {modal}
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}
