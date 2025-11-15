"use client";

import Hero from "@/components/Hero/Hero";
import css from "./page.module.css";
import About from "@/components/About/About";
import PopularStories from "@/components/PopularStories/PopularStories";
import OurTravellers from "@/components/OurTravellers/OurTravellers";
import Join from "@/components/Join/Join";
import { useEffect } from "react";
// import { useAuthStore } from "@/lib/store/authStore";
import { getMe } from "@/lib/api/clientApi";
import { getServerMe } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function MainPage() {
  const { setIsAuthenticated, setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("api/users/get-me");
        const { user } = await res.json();
        setUser(user);
        setIsAuthenticated(!!user);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, [setUser, setIsAuthenticated]);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const { data } = await getServerMe(); // endpoint /api/me
  //       setUser(data.user); // User типу User
  //       setIsAuthenticated(true);
  //     } catch {
  //       setUser(null);
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   fetchUser();
  // }, [setUser, setIsAuthenticated]);
  // console.log(user);

  return (
    <main>
      <Hero />
      <About />
      <PopularStories />
      <OurTravellers />
      <Join />
    </main>
  );
}
