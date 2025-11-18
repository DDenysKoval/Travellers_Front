"use client";

import StoryForm from "@/components/StoryForm/StoryForm";
import { createStory } from "@/lib/api/clientApi";
import { Category } from "@/types/category";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
// import * as yup from "yup";

// const createStoryValidationSchema = yup.object({
//     img: yup
//         .mixed()
//         .test('fileRequired', 'Виберіть зображення', (value) => {
//             return value instanceof File || value instanceof FileList;
//         })
//         .test('fileType', 'Допустимі тільки зображення (JPG, PNG, GIF)', (value) => {
//             if (!value) return false;
//             const file = value instanceof FileList ? value[0] : value;
//             const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//             return allowedTypes.includes(file?.type || '');
//         }),
//     title: yup.string().required("Назва обов'язкова").min(3, "Мінімум 3 символи"),
//     article: yup.string().required("Опис обов'язковий").min(10, "Мінімум 10 символів"),
//     category: yup.string().required("Виберіть категорію"),

// });

const CreateStoryClient = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => createStory(formData),
    onSuccess: (response) => {
      const storyId = response._id;

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
