import { nextServer } from "./api";
import { cookies } from "next/headers";
import { NotesHttpResponse } from "./clientApi";
import { StoryWrapper } from "@/types/story";

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const fetchServerNotes = async (
  search: string,
  page: number,
  category: string | undefined
) => {
  const cookieStore = await cookies();
  const params = {
    page,
    perPage: 12,
    category,
  };
  const headers = {
    Cookie: cookieStore.toString(),
  };
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
    headers,
  });
  return response.data;
};

export const fetchServerNotebyId = async (
  storieId: string
): Promise<StoryWrapper> => {
  const cookieStore = await cookies();

  const response = await nextServer.get(`/stories/${storieId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};
