export type Category = {
  _id: string;
  name: string;
};
export type OwnerId = {
  _id: string;
  name: string;
  avatarUrl: string;
};
export type Story = {
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
  stories: Story[];
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
