import css from "./TravellerInfo.module.css";
import Image from "next/image";

export default function TravellerInfo() {
  return (
    <div className={css.userInfo}>
      <Image
        src="https://ftp.goit.study/img/harmoniq/users/6881563901add19ee16fd009.webp"
        alt="User Avatar"
        width={199}
        height={199}
        className={css.avatar}
      />
      <div className={css.data}>
        <h3 className={css.name}>Анастасія Олійник</h3>

        <p className={css.about}>
          Люблю активні подорожі та дослідження нових місць. Ділюся практичними
          порадами та маршрутами для мандрівників.
        </p>
      </div>
    </div>
  );
}
