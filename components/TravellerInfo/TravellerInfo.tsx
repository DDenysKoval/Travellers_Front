import { Owner } from "@/types/owner";
import css from "./TravellerInfo.module.css";
import Image from "next/image";

interface Props{
  owner:Owner
}

export default function TravellerInfo({owner}:Props) {
  return (
    <div className={css.userInfo}>
      <Image
        src={owner.avatarUrl}
        alt="User Avatar"
        width={199}
        height={199}
        className={css.avatar}
      />
      <div className={css.data}>
        <h3 className={css.name}>{owner.name}</h3>

        <p className={css.about}>
         {owner.description}
        </p>
      </div>
    </div>
  );
}
