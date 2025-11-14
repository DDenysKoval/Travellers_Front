// import Image from "next/image";
// import css from "./StoryIdDetails.module.css";

// interface Props {
//   story: {
//     title: string;
//     img?: string;
//     ownerId: string;
//     category: string;
//     date: string;
//     description?: string;
//   };
//   saved: boolean;
//   saving: boolean;
//   onSave: () => void;
// }

// export default function StoryDetails({ story, saved, saving, onSave }: Props) {
//   return (
//     <div className={css.wrapper}>
//       <h1 className={css.title}>{story.title}</h1>
//       <div className={css.meta}>
//         <span className={css.owner}>Автор статті: {story.ownerId}</span>
//         <span className={css.date}>
//           {/* Опубліковано: {new Date(story.date).toLocaleDateString()} */}
//         </span>
//         <span className={css.category}>{story.category}</span>
//       </div>

//       {story.img && (
//         <div className={css.imageWrapper}>
//           <Image
//             src={story.img}
//             alt={story.title}
//             width={800}
//             height={500}
//             className={css.image}
//             priority
//           />
//         </div>
//       )}

//       <p className={css.description}>{story.description}</p>

//       <div className={css.saveBlock}>
//         <h2 className={css.saveTitle}>Збережіть собі історію</h2>
//         <p className={css.saveDescription}>
//           Вона буде доступна у вашому профілі у розділі збережене.
//         </p>
//         <button
//           className={css.saveButton}
//           onClick={onSave}
//           disabled={saving || saved}
//         >
//           {saved ? "Збережено" : "Зберегти"}
//         </button>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import css from "./StoryIdDetails.module.css";

interface Props {
  story?: {
    title: string;
    img?: string;
    ownerId: string;
    category: string;
    date: string;
    description?: string;
  };
  saved: boolean;
  saving: boolean;
  onSave: () => void;
}

export default function StoryDetails({ story, saved, saving, onSave }: Props) {
  if (!story) return <p>Could not fetch story details.</p>; // захист від undefined

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>{story.title}</h1>
      <div className={css.meta}>
        <span className={css.owner}>Автор статті: {story.ownerId}</span>
        {/* <span className={css.date}>
          Опубліковано: {new Date(story.date).toLocaleDateString()}
        </span> */}
        <span className={css.category}>{story.category}</span>
      </div>

      {story.img && (
        <div className={css.imageWrapper}>
          <Image
            src={story.img}
            alt={story.title}
            width={800}
            height={500}
            className={css.image}
            priority
          />
        </div>
      )}

      <p className={css.description}>{story.description}</p>

      <div className={css.saveBlock}>
        <h2 className={css.saveTitle}>Збережіть собі історію</h2>
        <p className={css.saveDescription}>
          Вона буде доступна у вашому профілі у розділі збережене.
        </p>
        <button
          className={css.saveButton}
          onClick={onSave}
          disabled={saving || saved}
        >
          {saved ? "Збережено" : "Зберегти"}
        </button>
      </div>
    </div>
  );
}
