import { APIUrl } from "../constants/url.config";
import { LoginReq, LoginRes } from "../dtos/auth.dto";
import httpClient from "../utils/httpClient";

export class AuthService {
  async login(data: LoginReq) {
    // try {
    const response = await httpClient.post<LoginRes>(APIUrl.auth.login, data);
    return response.data;
    // } catch (error) {
    //   throw error;
    // }
  }
}

const authService = new AuthService();
export default authService;
