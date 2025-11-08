export interface Note {
  content: string;
  id: string;
  tag: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewNote {
  content: string;
  tag: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

