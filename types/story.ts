export type Category = {
  _id: string;
  name: string;
};
export type OwnerId = {
  _id: string;
  name: string;
  avatarUrl: string;
};
export type Storie = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: OwnerId;
  date: string;
  favoriteCount: number;
};

export type StorieWithFavorite = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: OwnerId;
  date: string;
  favoriteCount: number;
  isFavorited: boolean;
}

export type StorieListResponse = {
  stories: Storie[];
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
};

export type Tag = {
  _id: string;
  name: string;
};

export type TagListResponse = {
  data: Tag[],
  message: string,
  status: number,
}

export type Favorite = {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: Category;
  ownerId: OwnerId;
  date: string;
  favoriteCount: number;
};

export type favoriteResponse = {
  data: Favorite[],
  message: string,
  status: number,
}
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
