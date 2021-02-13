import axios, { AxiosInstance } from "axios";
import * as qs from "querystring";
import { IAccessToken, IError } from "./auth.interface";
import { getAuthHeader } from "./util";

export default class AuthService {
  private axios: AxiosInstance;
  constructor(
    private username: string,
    private password: string,
    private loginUrl: string,
    oauthUsername: string,
    oauthPassword: string
  ) {
    this.axios = axios.create({
      baseURL: this.loginUrl,
      headers: {
        Authorization: `Basic ${getAuthHeader(oauthUsername, oauthPassword)}`,
        Accept: "application/json;charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
  }

  async getAccessToken(): Promise<IAccessToken | IError> {
    const formData: string = qs.stringify({
      username: this.username,
      password: this.password,
      grant_type: "password",
    });
    try {
      const response = await this.axios.post("/token", formData);
      const data = response.data;

      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
      };
    } catch (error) {
      error = error.response.data;
      return {
        error: error.error,
        message: error.error_description,
      };
    }
  }

  async refreshAccessToken(
    refreshToken: string
  ): Promise<IAccessToken | IError> {
    const formData: string = qs.stringify({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    });

    try {
      const response = await this.axios.post("/token", formData);
      const data = response.data;

      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
      };
    } catch (error) {
      error = error.response.data;

      return {
        error: error.error,
        message: error.error_description,
      };
    }
  }
}
