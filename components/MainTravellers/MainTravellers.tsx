"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./MainTravellers.module.css";
import { fetchUsers, UsersHttpResponse } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MainTravellers = () => {
  const router = useRouter();
  const page = 1;
  const perPage = 4;
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { data } = useQuery<UsersHttpResponse>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.data?.users) {
      if (page === 1) {
        setAllUsers(data.data.users);
      } else {
        setAllUsers((prev) => [...prev, ...data.data.users]);
      }
    }
  }, [data?.data?.users, page]);

  return (
    <section className={css.}>
      <div className="container">
        <h2 className={css.travellersPageTitle}>Наші Мандрівники</h2>
        <ul className={css.travellersList}>
          {allUsers.map((user: User) => (
            <li key={user._id} className={css.travellersCard}>
              <Image
                width={112}
                height={112}
                src={user.avatarUrl}
                alt={user.description || "Аватар користувача"}
                className={css.travellersAvatar}
              />
              <div className={css.cardContentWrapper}>
                <h3 className={css.travellersName}>
                  {user.name.trim().length > 17
                    ? user.name.slice(0, 16) + "..."
                    : user.name}
                </h3>
                <p className={css.travellersDescription}>
                  {user.description
                    ? user.description.length > 100
                      ? user.description.slice(0, 76) + "..."
                      : user.description
                    : "Опис відсутній"}
                </p>
                <button
                  className={css.travellersBtn}
                  onClick={() => router.push(`/profile/${user._id}`)}
                >
                  Переглянути профіль
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MainTravellers;
