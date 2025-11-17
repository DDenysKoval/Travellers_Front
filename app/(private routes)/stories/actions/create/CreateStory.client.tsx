"use client";

import StoryForm from "@/components/StoryForm/StoryForm";
import { createStory } from "@/lib/api/clientApi";
import { CategoryProps } from "@/types/category";
import { NewStory } from "@/types/story";
// import { NewStory } from "@/types/story";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";


const CreateStoryClient = ({ categories }: CategoryProps) => {
    // const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: (formData: FormData) => createStory(formData),
        onSuccess: () => {
            // router.push(`/stories/storyId`)
        }
    })


    const handleSubmit = async (formData: FormData) => {


        mutate(formData)

    }


    return (
        <>
            <StoryForm categories={categories} onSubmit={handleSubmit} />

        </>
    );
};

export default CreateStoryClient
