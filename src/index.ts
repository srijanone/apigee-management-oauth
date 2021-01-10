import { IAccessToken, IError } from "./auth.interface";
import AuthService from "./auth.service";

export default class Apigee {
  private apigee: AuthService;
  constructor(username: string, password: string) {
    this.apigee = new AuthService(username, password);
  }

  public async getAccessToken(): Promise<IAccessToken | IError> {
    return this.apigee.getAccessToken();
  }

  public async refreshAccessToken(
    refreshToken: string
  ): Promise<IAccessToken | IError> {
    return this.apigee.refreshAccessToken(refreshToken);
  }
}
