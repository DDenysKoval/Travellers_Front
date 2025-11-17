// import css from "./ProfilePage.module.css";
import { Metadata } from "next";
// import { fetchServerUser, fetchServerMyStories } from "@/lib/api/serverApi";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
// import TravellersStories from "@/components/TravellersStories/TravellersStories";
import Link from "next/link";
import TravellersStoriesPaginated from "@/components/TravellersStories/TravellersStoriesPaginated";
export const metadata: Metadata = {
  title: "",
  description: "",
  openGraph: {
    title: "",
    description: "",
    url: "",
    images: [
      {
        url: "",
        width: 0,
        height: 0,
        alt: "",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = {
    _id: "691918cab01e8dcb3d70b2e3",
    name: "matvey",
    email: "matvey@gmail.com",
    avatarUrl:
      "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
    articlesAmount: 0,
    description: "Hi my name is matvey. I will share my storie soon",
    favorites: [],
    createdAt: "2025-11-16T00:20:26.838Z",
    updatedAt: "2025-11-16T00:20:26.838Z",
  };
  const myStories = [
    {
      _id: "6913b9481740355bf95d6f82",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Моя подорож у Карпати",
      article: "Гори, водоспади і пригоди на кожному кроці.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 0,
      date: "2025-11-11T22:31:36.886Z",
    },
    {
      _id: "6913b9481740355bf95d6f83",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Поїздка до Одеси",
      article: "Море, пляж, теплий вітер і найсмачніша їжа.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 3,
      date: "2025-10-05T14:12:45.221Z",
    },
    {
      _id: "6913b9481740355bf95d6f84",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Відпочинок у Львові",
      article: "Кава, старовинні вулички та магічна атмосфера.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 1,
      date: "2025-09-21T11:05:10.112Z",
    },
    {
      _id: "6913b9481740355bf95d6f85",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Прогулянка Києвом",
      article: "Поділ, Хрещатик, Майдан — найкрасивіші місця столиці.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 5,
      date: "2025-11-02T18:40:55.010Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
    {
      _id: "6913b9481740355bf95d6f87",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Поїздка до Вінниці",
      article: "Фонтани, прогулянки та приємна компанія.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 0,
      date: "2025-08-15T16:22:10.999Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
    {
      _id: "6913b9481740355bf95d6f86",
      img: "https://ftp.goit.study/img/travel-blog/68498236a100312bea079017.webp",
      title: "Подорож до Буковелю",
      article: "Катання на лижах, гарячий чай та неймовірні краєвиди.",
      category: { _id: "68fb50c80ae91338641121f1", name: "Travel" },
      ownerId: {
        _id: user._id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      favoriteCount: 2,
      date: "2025-12-01T09:17:33.552Z",
    },
  ];

  return (
    <div>
      {/* <TravellerInfo owner={user} />
      <h2>мої історії</h2>
      {myStories.length === 0 ? (
       <div>
          <p>У вас ще немає історій.</p>
          <Link href="/stories/action/create" className="btn-primary">
            Опублікувати історію
          </Link>
        </div>
      ) : (   <TravellersStoriesPaginated stories={myStories} />
      )} */}
    </div>
  );
}
