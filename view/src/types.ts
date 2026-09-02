export interface UserData {
  id?: number,
  username?: string,
};

export interface CommentData {
  id: number,
  user: {
    username: string,
  },
  comment: string,
  likes?: number
};

export interface Price {
  id?: number;
  country: string;
  isAvailable: boolean;
  travelHost: string;
  priceLower?: number;
  priceUpper?: number;
};

export interface Feedback {
  id?: number;
  feedback: string;
};

export interface Image {
  id?: number;
  src: string;
};

export type AdminPanelItem = Price | Feedback | Image | Notification;

export interface Notification {
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

export interface BaseBlogPost {
  id: number,
  title: string,
  description?: string,
  html: string,
};

export interface BlogPost extends BaseBlogPost {
  id: number,
  date: string,
  likes: number,
  adminId: number
};