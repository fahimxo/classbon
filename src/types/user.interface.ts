export interface User {
  token: string;
  refreshToken: string;
}

export interface UserToken {
  mobile?: string;
  picture?: string;
  fullName?: string;
  exp: number;
  accessToken: string;
}

export interface UserSession extends UserToken {}
