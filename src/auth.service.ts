import axios, { AxiosInstance } from "axios";
import * as qs from "querystring";
import { IAccessToken, IError } from "./auth.interface";

export default class AuthService {
  private username: string;
  private password: string;
  private axios: AxiosInstance;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;

    this.axios = axios.create({
      baseURL: "https://login.apigee.com/oauth",
      headers: {
        Authorization: "Basic ZWRnZWNsaTplZGdlY2xpc2VjcmV0",
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
}
