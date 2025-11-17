import { nextServer } from "./api";
import { cookies } from "next/headers";
import { NotesHttpResponse } from "./clientApi";
import { StoryWrapper } from "@/types/story";
import axios from "axios";
import { Category } from "@/types/category";
import { Story } from "@/types/story";


export const getServerMe = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

// export const checkServerSession = async () => {
//   const cookieStore = await cookies();

//   const response = await nextServer.get("/auth/session", {
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
//   return response;
// };

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  try {
    const response = await nextServer.get("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchServerNotes = async (search: string, page: number, category: string | undefined) => {
  const cookieStore = await cookies()
  const params = {
    page,
    perPage: 12,
    category,
  }
  const headers = {
    Cookie: cookieStore.toString()
  }
  const response = await nextServer.get<NotesHttpResponse>("/notes", {
    params,
    headers,
  })
  return response.data;
}

export const fetchServerNotebyId = async (storieId: string) => {
  const cookieStore = await cookies()

  const response = await nextServer.get(`/notes/${storieId}`, {
    headers: {
      Cookie: cookieStore.toString()
    }
  })
  return response.data;
}

export const fetchServerUser = async () => {
  const cookieStore = await cookies();

  const response = await nextServer.get("/users/get-me", {
    headers: {
      Cookie: cookieStore.toString()
    }
  });

  return response.data.user;
};
export const fetchServerMyStories = async () => {
  const cookieStore = await cookies();

  const response = await nextServer.get("/stories/my", {
    headers: {
      Cookie: cookieStore.toString()
    }
  });

  return response.data.data;
};


export async function getCategories() {
  const response = await nextServer.get<Category[]>(`/categories`);
  return response.data;
}