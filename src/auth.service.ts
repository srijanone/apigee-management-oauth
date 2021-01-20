import axios, { AxiosInstance } from "axios";
import * as qs from "querystring";
import { IAccessToken, IError } from "./auth.interface";

export default class AuthService {
  private username: string;
  private password: string;
  private loginUrl: string;
  private axios: AxiosInstance;

  constructor(
    username: string,
    password: string,
    loginUrl: string,
    oauthUsername: string,
    oauthPassword: string
  ) {
    this.username = username;
    this.password = password;
    this.loginUrl = loginUrl;
    const authHeader = Buffer.from(
      `${oauthUsername}:${oauthPassword}`,
      "utf-8"
    ).toString("base64");

    this.axios = axios.create({
      baseURL: this.loginUrl,
      headers: {
        Authorization: `Basic ${authHeader}`,
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  }

  getAccessToken(): Promise<IAccessToken | IError> {
    const formData: string = qs.stringify({
      username: this.username,
      password: this.password,
      grant_type: "password",
    });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.post("/token", formData);
        const data = response.data;

        resolve({
          accessToken: data.access_token,
          expiresIn: data.expires_in,
          refreshToken: data.refresh_token,
        });
      } catch (error) {
        error = error.response.data;

        reject({
          error: error.error,
          message: error.error_description,
        });
      }
    });
  }

  refreshAccessToken(refreshToken: string): Promise<IAccessToken | IError> {
    const formData: string = qs.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.axios.post("/token", formData);
        const data = response.data;

        resolve({
          accessToken: data.access_token,
          expiresIn: data.expires_in,
          refreshToken: data.refresh_token,
        });
      } catch (error) {
        error = error.response.data;

        reject({
          error: error.error,
          message: error.error_description,
        });
      }
    });
  }
}
