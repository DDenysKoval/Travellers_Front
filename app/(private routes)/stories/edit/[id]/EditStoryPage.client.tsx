"use client";

import StoryForm from "@/components/StoryForm/StoryForm";
import { patchStory } from "@/lib/api/clientApi";
import { Category } from "@/types/category";
import { Story } from "@/types/story";
// import { NewStory } from "@/types/story";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EditStoryClient = ({
  categories,
  entity,
}: {
  categories: Category[];
  entity: Story;
}) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => patchStory(id, formData),
    onSuccess: (storyId) => {


      router.push(`/stories/${storyId}`);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    mutate(formData);
  };

  return (
    <>
      <StoryForm
        categories={categories}
        entity={entity}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default EditStoryClient;
