export interface UserData {
  id?: number,
  username?: string,
};

interface KeyAccesible {
  [key: string]: unknown;
}

export interface CommentData extends KeyAccesible {
  id: number,
  user: {
    username: string,
  },
  comment: string,
  likes?: number
};

export interface Price extends KeyAccesible {
  id?: number;
  country: string;
  isAvailable: boolean;
  travelHost: string;
  priceLower?: number;
  priceUpper?: number;
};

export interface Feedback extends KeyAccesible {
  id?: number;
  feedback: string;
};

export interface Image extends KeyAccesible {
  id?: number;
  src: string;
};

export type AdminPanelItem = Price | Feedback | Image | Notification;

export interface Notification extends KeyAccesible {
  id?: number,
  category: string,
  duration: number,
  title: string,
  content: string
};

export interface ReceivedNotification extends Notification {
  id: number
};

export interface ClientsideNotification extends ReceivedNotification {
  read: boolean
};

export interface PagedQuery<T> {
  content: T[],
  totalCount: number,
  totalPages: number,
  currentPage: number
};

export interface BaseBlogPost extends KeyAccesible {
  id: number,
  title: string,
  description?: string,
  html: string,
};

export interface BlogPost extends BaseBlogPost {
  id: number,
  date: string,
  likes: number,
  adminId: number,
  archived: boolean
};

export interface BlogPagedQuery {
  blogPosts: BlogPost[],
  totalCount: number,
  totalPages: number,
  currentPage: number
};

export const EMPTY_PAGE: BlogPagedQuery = {
  blogPosts: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 0,
}