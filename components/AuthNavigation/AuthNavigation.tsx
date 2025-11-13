"use client";



import { logout } from "@/lib/api/clientApi";

import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ModalReuse from "../ModalReuse/ModaReuse";



const AuthNavigation = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const handleLogout = async () => {
    try {
      await logout()
      close()
      router.push('/login')
      router.refresh()
    }
    catch (error) {
      console.error(error)
    }
    
  }
  return <nav>
    <button onClick={handleLogout}>Logout</button>
    <ModalReuse isOpen={isOpen} onClose={close} title={"Logout"} message={"Are you sure you want to logout?"} actions={[{
            label: "Cancel",
            onClick: close,
          },
          {
            label: "Logout",
            onClick: handleLogout,
            primary: true,
          },]} />
  </nav>;
};

export default AuthNavigation;
