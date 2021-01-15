export interface IAccessToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface IError {
  error: string;
  message: string;
}
