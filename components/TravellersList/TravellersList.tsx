"use client"
import { useQuery, keepPreviousData} from "@tanstack/react-query";
import css from "./TravellersList.module.css";
import { fetchUsers, UsersHttpResponse } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import Image from "next/image"
import { useRouter } from "next/navigation";

interface TravellersListProps{
  limit?: number
}
const TravellersList = ({ limit }: TravellersListProps) => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [initialCount, setInitialCount] = useState(4);

    useEffect(() => {
      const width = window.innerWidth;
      let count = 12
      if (width < 1439) {
        count = 8
      }

      setInitialCount(limit ? Math.min(limit, count): count)
  }, [limit])
  
 const perPage = page === 1 ? initialCount : 4;

  const { data, isLoading } = useQuery<UsersHttpResponse>({
    queryKey: ["users", page, perPage],
    queryFn: () => fetchUsers(page, perPage),
    placeholderData: keepPreviousData,
  })


useEffect(() => {
  if (data?.data?.users) {
    setAllUsers(prev => {
      const newUsers = data.data.users.filter(user => !prev.some(prev => prev._id === user._id));
      return [...prev, ...newUsers];
    });
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
            <button className={css.travellersBtn} onClick={()=>{router.push(`/profile/${user._id}`)}}>Переглянути профіль</button>
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
