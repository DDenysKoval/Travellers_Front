export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category | null;
  author: User | null;
  date: string;
  favoriteCount: number;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
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
  _id: string;
  img: string;
  title: string;
  article: string;
  category: {
    _id: string;
    name: string;
  };
  author: User | null;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl: string;
  };
  date: string;
  favoriteCount: number;
}

export interface NewStory {
  img: File,
  title: string,
  article: string,
  category: string,
};

export type StorieListResponse = {
  status: number;
  message: string;
  data: {
    stories: Story[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type StorieListResponseData = {
  data: {
    data: []
  }
}

export type Tag = {
  _id: string;
  name: string;
};

export type TagListResponse = {
  data: Tag[],
  message: string,
  status: number,
}