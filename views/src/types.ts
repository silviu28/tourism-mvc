export interface UserData {
  id?: number,
  username?: string,
  token?: string,
};

export interface CommentData {
  id: number,
  user: {
    username: string,
  },
  comment: string,
};

export interface Price {
  location: string;
  country: string;
  status: string;
  insurance: string;
  travelHost: string;
  priceLower?: number;
  priceUpper?: number;
};