export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
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


export interface NewStory {
  img: string,
  title: string,
  article: string,
  category: string,
}