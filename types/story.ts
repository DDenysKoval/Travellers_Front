export interface StoryId {
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
  username: string;
  email?: string;
  avatar?: string;
}

export interface Category {
  _id: string;
  name: string;
}
