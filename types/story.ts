export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category | null;
  author: User | null;
  date: string;
  favoriteCount: number;
}

export interface StoryWrapper {
  status: number;
  message: string;
  data: StoryId;
}

export interface User {
  _id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Category {
  _id: string;
  name: string;
}

export interface StoryId {
  category: {
    _id: string;
    name: string;
  };
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}