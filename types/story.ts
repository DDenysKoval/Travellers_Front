export interface StoryId {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  ownerId?: string;
  date: string;
  favoriteCount: number;
}

export interface StoryWrapper {
  status: number;
  message: string;
  data: StoryId;
}
