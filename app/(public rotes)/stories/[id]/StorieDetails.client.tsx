// "use client";

// import PopularStories from "@/components/PopularStories/PopularStories";
// import css from "./StorieDetails.module.css";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { useParams } from "next/navigation";
// import { fetchNoteById } from "@/lib/api/clientApi";
// import { useState } from "react";
// import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";
// import { useEffect } from "react";

// const StorieDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();
//   const queryClient = useQueryClient();
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     console.log("🆔 Story ID from URL:", id);
//   }, [id]);

//   const {
//     data: story,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["story", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });

//   // const mutation = useMutation({
//   //   // mutationFn: (storyId: string) => saveStoryById(storyId),
//   //   onSuccess: () => {
//   //     setSaved(true);
//   //     queryClient.invalidateQueries({ queryKey: ["story", id] });
//   //   },
//   // });
//   // const handleSave = () => {
//   //   if (!id) return;
//   //   mutation.mutate(id);
//   // };

//   if (isLoading) return <p>Loading...</p>;

//   if (error || !story) return <p>Some error..</p>;

//   return (
//     <div>
//       <h1 className={css.title}>{story.title}</h1>
//       <StoryIdDetails
//         story={story}
//         saved={saved}
//         saving={mutation.isPending}
//         onSave={handleSave}
//       />
//       <PopularStories />
//     </div>
//   );
// };

// export default StorieDetailsClient;

// "use client";

// import PopularStories from "@/components/PopularStories/PopularStories";
// // import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";
// import css from "./StorieDetails.module.css";
// import { useState } from "react";

// interface Props {
//   storyId: string;
// }

// export default function StorieDetailsClient({ storyId }: Props) {
//   const [saved, setSaved] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await fetch(`/api/stories/${storyId}/save`, { method: "POST" });
//       setSaved(true);
//     } catch (err) {
//       console.error("Не вдалося зберегти історію", err);
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div>
//       <StoryIdDetails
//         storyId={storyId}
//         saved={saved}
//         saving={saving}
//         onSave={handleSave}
//       />
//       <PopularStories />
//     </div>
//   );
// }

// "use client";

// // import PopularStories from "@/components/PopularStories/PopularStories";
// import css from "./StorieDetails.module.css";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import { useParams } from "next/navigation";
// import { fetchNoteById } from "@/lib/api/clientApi";
// import { useState } from "react";
// // import StoryIdDetails from "@/components/StoryIdDetails/StoryIdDetails";
// import { useEffect } from "react";

// const StorieDetailsClient = () => {
//   const { id } = useParams<{ id: string }>();

//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//     refetchOnMount: false,
//   });
//   if (isLoading) return <p>Завантаження...</p>;
//   if (error || !note) return <p>Помилка завантаження історії</p>;
//   return (
//     <div>
//       <h2>{note.title}</h2>
//     </div>
//   );
// };

// export default StorieDetailsClient;

"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import type { StoryWrapper } from "@/types/story";

const StorieDetailsClient = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Завантаження...</p>;
  if (error || !data) return <p>Помилка завантаження історії</p>;

  const story = data.data; // беремо саму історію

  return (
    <div>
      <h2>{story.title}</h2> {/* тут назва статті */}
    </div>
  );
};

export default StorieDetailsClient;
