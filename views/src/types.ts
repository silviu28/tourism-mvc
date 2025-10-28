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