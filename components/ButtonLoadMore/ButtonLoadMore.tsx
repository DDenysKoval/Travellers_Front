"use client";
import { useEffect, useState } from "react";
import css from "./ButtonLoadMore.module.css";
import { fetchUsers, UsersHttpResponse } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

interface TravellersListProps {
  limit?: number;
}

const ButtonLoadMore = ({ limit }: TravellersListProps) => {
  const [page, setPage] = useState(1);
  const [initialCount, setInitialCount] = useState(12);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    let count = 12;
    if (width < 1439) {
      count = 8;
    }

    setInitialCount(limit ? Math.min(limit, count) : count);
  }, [limit]);

  const perPage = page === 1 ? initialCount : 4;

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
    <>
      {isLoading && <p className={css.loadingText}>Loading, please wait...</p>}

      {!isLoading &&
        Array.isArray(data?.data?.users) &&
        data?.data?.users.length > 0 && (
          <div className={css.LoadMoreBtnWrapper}>
            <button onClick={onLoadMore} className={css.LoadMoreBtn}>
              Показати ще
            </button>
          </div>
        )}
    </>
  );
};

export default ButtonLoadMore;
