"use client";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./TravellersList.module.css";
import { fetchUsers, UsersHttpResponse } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TravellersListProps {
  limit?: number;
}
const TravellersList = ({ limit }: TravellersListProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [width, setWidth] = useState(375);

  let perPage = width < 1440 ? 8 : 12;

  if (limit === 4) {
    perPage = 4;
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, isLoading } = useQuery<UsersHttpResponse>({
    queryKey: ["users", page, perPage],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.data?.users) {
      setAllUsers((prev) => {
        const newUsers = data.data.users.filter(
          (u) => !prev.some((p) => p._id === u._id)
        );
        return [...prev, ...newUsers];
      });
    }
  }, [data]);

  const onLoadMore = () => {
    setPage((prev: number) => prev + 1);
  };

  return (
    <div className={css.travellersDiv}>
      <ul className={css.travellersList}>
        {allUsers.map((user: User) => (
          <li key={user._id} className={css.travellersCard}>
            <Image
              width={112}
              height={112}
              src={user.avatarUrl}
              alt={user.description}
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
                onClick={() => {
                  router.push(`/users/${user._id}`);
                }}
              >
                Переглянути профіль
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isLoading && <p className={css.loadingText}>Loading, please wait...</p>}

      {(width > 768 || (limit !== 4 && width < 768)) && (
        <button onClick={onLoadMore} className={css.LoadMoreBtn}>
          Показати ще
        </button>
      )}
    </div>
  );
};

export default TravellersList;
