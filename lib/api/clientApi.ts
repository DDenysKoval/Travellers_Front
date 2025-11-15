import { nextServer } from "./api";
// import { Storie } from "@/types/story";
import { Owner } from "@/types/owner";
import { StorieListResponse, Tag, Storie } from "@/types/stories";

export async function fetchStories(page: number, perPage: number, category?: string, type?: 'popular' ) {
  try {
    const response = await nextServer.get<{ data: StorieListResponse }>("/stories", {
      params: {
        page,
        perPage,
        ...(category && { category }),
        ...(type && {type}),
      },
    })
    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export async function getCategory() {
  try {
    const response = await nextServer.get<{ data: Tag }>("/categories")
    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}

export const getFavorite = async () => {
  const response = nextServer.get("/users/favorites")
  return response
} 

export const addFavorite = async (storieId: string) => {
  const response = nextServer.post(`/users/favorites${storieId}`)
  return response
} 

export const deleteFavorite = async (storieId: string) => {
  const response = nextServer.delete(`users/favorites${storieId}`)
  return response
} 
//////////////////////////////////////////////////////////

export interface RegisterRequest {
  email: string,
  password: string,
}

export interface LoginRequest {
  email: string,
  password: string,
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

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post("/auth/register", data)
  return response.data;
}

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post("/auth/login", data)
  return response.data;
}

export const checkSession = async () => {
  const response = await nextServer.get<CheckSessionRequest>("/auth/session")
  return response.data.success;
}

export const getMe = async () => {
  const response = await nextServer.get("/users/get-me")
  return response.data;
}

export const logout = async ():Promise<void> => {
  const response = await nextServer.post("/auth/logout")
  return response.data;
}

export const updateMe = async (body: UpdateUserRequest)=>{
  const response = await nextServer.patch("/users/getme", body)
  return response.data;
}

export async function createNote(newStorie:string) {
  try {
    const response = await nextServer.post("/notes", newStorie)
    return response.data;
  } catch {
    throw new Error("Create task failed");
  }
}

export async function deleteNote(storieId: string) {
  try {
    const response = await nextServer.delete(`/stories/${storieId}`)
    return response.data;
  } catch {
    throw new Error("Delete task failed");
  }
}

export async function fetchNoteById(storieId:string) {
  try {
    const response = await nextServer.get(`/stories/${storieId}`)
    return response.data;
  } catch {
    throw new Error("Could not fetch note details.");
  }
}

// Функція для Профіль мондрівника публічний



export interface OwnerStoriesHttpResponse {
  data: {
    owner: Owner;
    stories: Storie[];
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

    console.log(response.data);

    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}