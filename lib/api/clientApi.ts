
import { nextServer } from "./api";
import { StorieListResponseData, StoryWrapper, TagListResponse } from "@/types/story";
import { User } from "@/types/user";
import { NewStory, Story } from "@/types/story";
import { Owner } from "@/types/owner";
// import { Category } from "@/types/category";
// import axios from "axios";

// export const testServer = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: true,
// });

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateUserRequest {
  username: string;
}

export interface NotesHttpResponse {
  // notes: Note[]; треба додати правильну типізацію
  totalPages: number;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: {
    _id: string;
    name: string;
    avatarUrl: string;
    articlesAmount: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    favorites: string[];
  };
}

export interface UsersHttpResponse {
  data: {
    users: User[],
  }
}




export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<RegisterResponse>(
    "/auth/register",
    data
  );

  console.log(response.data);

  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post("/auth/login", data);
  return response.data;
};

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session");
  return response.data.success;
};

export const getMe = async () => {
  const response = await nextServer.get("/users/get-me");
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await nextServer.post("/auth/logout");
  return response.data;
};

export const updateMe = async (body: UpdateUserRequest) => {
  const response = await nextServer.patch("/users/get-me", body);
  return response.data;
};

export async function fetchNotes(
  search: string,
  page: number,
  category?: string
) {
  try {
    const response = await nextServer.get<NotesHttpResponse>("/stories", {
      params: {
        page,
        perPage: 12,
        ...(category && { category }),
      },
    });
    return response.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export async function createStory(formData: FormData) {
  try {
    const response = await nextServer.post<Story>("/stories", formData, {
    });

    console.log("CREATED", response.data)
    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}


export async function patchStory(id: string, formData: FormData) {
  try {
    const response = await nextServer.patch<Story>(`/stories/${id}`, formData, {
    });

    console.log(response)
    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}



export async function deleteNote(storieId: string) {
  try {
    const response = await nextServer.delete(`/stories/${storieId}`);
    return response.data;
  } catch {
    throw new Error("Delete task failed");
  }
}

export async function fetchNoteById(storieId: string): Promise<StoryWrapper> {
  try {
    const response = await nextServer.get(`/stories/${storieId}`);
    return response.data;
  } catch {
    throw new Error("Could not fetch note details.");
  }
}

export async function addToFavourites(storieId: string): Promise<StoryWrapper> {
  try {
    const response = await nextServer.post<StoryWrapper>(
      `/users/favourites/${storieId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error saving story: ", error);
    throw new Error("Add story to favourites failed");
  }
}

export async function fetchUsers(page: number = 1, perPage: number = 12): Promise<UsersHttpResponse> {
  const response = await nextServer.get<UsersHttpResponse>("/travellers", {
    params: {
      page,
      perPage,
    },
  }
  )

  return {
    data: {
      users: response.data.data.users,
    }
  }
}
// Функція для Профіль мондрівника публічний

export interface OwnerStoriesHttpResponse {
  data: {
    owner: Owner;
    stories: Story[];
    page: number;
    perPage: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    totalPages: number;
  };
}

export async function fetchOwnerStories(
  page: number,
  perPage: number,
  id: string
) {
  try {
    const response = await nextServer.get<OwnerStoriesHttpResponse>(
      `/travellers/${id}`,
      {
        params: {
          page,
          perPage,
        },
      }
    );

    // console.log(response.data);

    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export interface addStoryToFavouriteResponse {
  status: number;
  message: string;
  data: Story;
}

export async function addStoryToFavourite(storieId: string) {
  try {
    const response = await nextServer.post<addStoryToFavouriteResponse>(
      `/users/favourites/${storieId}`,
      {}
    );

    // console.log(response.data);

    return response.data;
  } catch {
    throw new Error("Post task failed");
  }
}

export async function deleteStoryFromFavourite(storieId: string) {
  try {
    const response = await nextServer.delete<{ message: string }>(
      `/users/favourites/${storieId}`
    );

    // console.log(response.data);

    return response.data;
  } catch {
    throw new Error("Delete task failed");
  }
}

export interface addFavoriteToStoryResponse {
  status: number;
  message: number;
  data: Story;
}

export async function changeFavoriteCountInStory(
  storieId: string,
  qty: string
) {
  try {
    const response = await nextServer.patch<addFavoriteToStoryResponse>(
      `/stories/${storieId}`,
      {
        favoriteCount: qty,
      }
    );

    // console.log(response.data);

    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}

export async function fetchStories(page: number, perPage: number, category?: string, type?: 'popular' ) {
  try {
    const response = await nextServer.get("/stories", {
      params: {
        page,
        perPage,
        ...(category && { category }),
        ...(type && {type}),
      },
    })
    console.log(response.data);
    
    return response.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export async function getCategories() {
  try {
    const response = await nextServer.get<{ data: TagListResponse }>("/categories")
    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}