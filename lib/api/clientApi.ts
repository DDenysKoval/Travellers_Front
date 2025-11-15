import { User } from "@/types/user";
import { nextServer } from "./api";
import { Story } from "@/types/story";
import { Owner } from "@/types/owner";

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

export interface UsersHttpResponse {
  data: {
    users: User[],
  }
}

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post("/auth/register", data);
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
  const response = await nextServer.get("/users/getme");
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await nextServer.post("/auth/logout");
  return response.data;
};

export const updateMe = async (body: UpdateUserRequest) => {
  const response = await nextServer.patch("/users/getme", body);
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

export async function createNote(newStorie: string) {
  try {
    const response = await nextServer.post("/notes", newStorie);
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

export async function fetchNoteById(storieId: string) {
  try {
    const response = await nextServer.get(`/stories/${storieId}`);
    return response.data;
  } catch {
    throw new Error("Could not fetch note details.");
  }
}

export async function fetchUsers(page: number = 1, perPage: number = 12 ): Promise<UsersHttpResponse> {
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

    console.log(response.data);

    return response.data.data;
  } catch {
    throw new Error("Fetch tasks failed");
  }
}
