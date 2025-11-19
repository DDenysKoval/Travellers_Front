import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import Image from "next/image";
import { Story } from "@/types/story";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  changeFavoriteCountInStory,
  addFavoriteToStoryResponse,
  addStoryToFavourite,
  addStoryToFavouriteResponse,
  deleteStoryFromFavourite,
} from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import ModalReuse from "../ModalReuse/ModaReuse";

interface Props {
  story: Story;
}

export default function TravellersStoriesItem({ story }: Props) {
  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);
  const { isAuthenticated, user, setUser } = useAuthStore();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsFavourite(user.favorites.includes(story._id));
    }
  }, [user, story._id]);

  const addStoryToFavouriteMutation = useMutation<
    [addStoryToFavouriteResponse, addFavoriteToStoryResponse],
    AxiosError<{ error: string }>,
    { storieId: string; qty: string }
  >({
    mutationFn: async ({ storieId, qty }) => {
      const results = await Promise.all([
        addStoryToFavourite(storieId),
        changeFavoriteCountInStory(storieId, qty),
      ]);
      return results;
    },
    onSuccess: ([_, patchedStory]) => {
      if (!user) return;
      setUser({
        ...user,
        favorites: [...user.favorites, story._id],
      });
      setFavoriteCount(patchedStory.data.favoriteCount);
      setIsFavourite(!isFavourite);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Сталася помилка");
    },
  });

  const deleteStoryFromFavouriteMutation = useMutation<
    [{ message: string }, addFavoriteToStoryResponse],
    AxiosError<{ error: string }>,
    { storieId: string; qty: string }
  >({
    mutationFn: async ({ storieId, qty }) => {
      const results = await Promise.all([
        deleteStoryFromFavourite(storieId),
        changeFavoriteCountInStory(storieId, qty),
      ]);
      return results;
    },
    onSuccess: ([_, patchedStory]) => {
      if (!user) return;

      setUser({
        ...user,
        favorites: user.favorites.filter((item) => item !== story._id),
      });

      setFavoriteCount(patchedStory.data.favoriteCount);
      setIsFavourite(!isFavourite);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error ?? "Сталася помилка");
    },
  });

  const handleLogin = async () => {
    router.push("/auth/login");
  };
  const handleRegister = async () => {
    router.push("/auth/register");
  };

  const handleClick = () => {
    if (isAuthenticated) {
      if (isFavourite) {
        deleteStoryFromFavouriteMutation.mutate({
          storieId: story._id,
          qty: String(Number(favoriteCount) - 1),
        });
      } else {
        addStoryToFavouriteMutation.mutate({
          storieId: story._id,
          qty: String(Number(favoriteCount) + 1),
        });
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <div className={css.storyCard}>
      <Image
        src={story.img}
        alt="Photo of place"
        width={421}
        height={280}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={css.avatar}
      />
      <div className={css.infoBlock}>
        <div className={css.regionCountryStory}>
          <p className={css.storyCountry}>
            {story.category ? story.category.name : ""}
          </p>
          <h4 className={css.storyHeading}>{story?.title || ""}</h4>
          <p className={css.storyText}>{story?.article || ""}</p>
        </div>

        <div className={css.favouriteInfo}>
          <Image
            src={
              story.ownerId?.avatarUrl
                ? story.ownerId.avatarUrl
                : "https://res.cloudinary.com/dsr7znzlu/image/upload/v1762709153/Default_Avatar_om76t3.webp"
            }
            alt="User Avatar"
            width={48}
            height={48}
            className={css.photoTraveller}
          />

          <div>
            <p className={css.name}>{story.ownerId?.name || ""}</p>
            <div className={css.datecontainer}>
              <p className={css.data}>
                {story.date.split("T")[0]} • {favoriteCount}
              </p>
              <svg width="16" height="16">
                <use href="/icons.svg#icon-bookmark"></use>
              </svg>
            </div>
          </div>
        </div>
        <div className={css.buttons}>
          <Link
            className={`${css.buttonEfect} ${css.link}`}
            href={`/stories/${story._id}`}
          >
            Переглянути статтю
          </Link>
          <button
            className={`${css.favorButton} ${css.buttonEfect} ${isFavourite ? css.favorButtonPush : ""}`}
            onClick={handleClick}
          >
            <svg className={isFavourite ? css.icon : ""} width="24" height="24">
              <use href="/icons.svg#icon-bookmark"></use>
            </svg>
            {addStoryToFavouriteMutation.isPending && (
              <div className={css.loader}></div>
            )}
            {deleteStoryFromFavouriteMutation.isPending && (
              <div className={css.loader}></div>
            )}
          </button>
        </div>
        <ModalReuse
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          title="Помилка під час збереження"
          message="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису зареєструйтесь"
          actions={[
            {
              label: "Увійти",
              onClick: handleLogin,
            },
            {
              label: "Зареєструватись",
              onClick: handleRegister,
              primary: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
