"use client"
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import css from "./TravellersList.module.css";
import { fetchUsers, UsersHttpResponse } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import Image from "next/image"
const TravellersList = () => {
  const [page, setPage] = useState(1)
  const [perPage] = useState(4);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { data, isLoading } = useQuery<UsersHttpResponse>({
    queryKey: ["users", page, perPage],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (data?.data?.users) {
      setAllUsers((prev:User[]) => [...prev, ...data.data.users])
    }
}, [data]);


  const onLoadMore = () => {
    setPage((prev: number) => prev + 1)
  }

  return (<div className={css.travellersDiv}>
    <ul className={css.travellersList}>
    {allUsers.map((user: User) => (
      <li key={user._id} className={css.travellersCard}> 
        <div className={css.imgWrapper}>
        <Image width={112} height={112} src={user.avatarUrl} alt={user.description} className={css.travellersAvatar} />
        </div>
        <div className={css.cardContentWrapper}>
        <h3 className={css.travellersName}>{user.name.trim()}</h3>
        <p className={css.travellersDescription}>{user.description ? user.description.length > 100 ? user.description.slice(0, 62) + "..." : user.description : "Опис відсутній" }</p>
        <div className={css.BtnWrapper}>
            <button className={css.travellersBtn}>Переглянути профіль</button>
            </div>
          </div>
      </li>
    ))}
    </ul>
    
    {
      !isLoading && Array.isArray(data?.data?.users)
      && data?.data?.users.length > 0
      && <div  className={css.LoadMoreBtnWrapper}>
    <button onClick={onLoadMore}  className={css.LoadMoreBtn}>Показати ще</button>
  </div>
    }

  </div>
  )
};

export default TravellersList;
