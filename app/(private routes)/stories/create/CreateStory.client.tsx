"use client";

import StoryForm from "@/components/StoryForm/StoryForm";
import { createStory } from "@/lib/api/clientApi";
import { Category } from "@/types/category";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

const CreateStoryClient = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => createStory(formData),
    onSuccess: (storyId) => {
      // console.log(storyId);

      router.push(`/stories/${storyId}`);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    mutate(formData);
  };

  return (
    <>
      <StoryForm categories={categories} onSubmit={handleSubmit} />
    </>
  );
};

export default CreateStoryClient;
