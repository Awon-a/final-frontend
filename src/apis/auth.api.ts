import { AxiosResponse } from "axios";
import { $api } from "../http/http";
import { PlanWithInfo } from "../types/academic-plan";
import { SignInRequest, SignInResponse } from "../types/user";

export class AuthAPI {
  private static AUTH_URL = "/auth";

  public static async signIn(
    dto: SignInRequest
  ): Promise<AxiosResponse<SignInResponse>> {
    const response = await $api.post(AuthAPI.AUTH_URL + "/sign-in", dto);
    console.log({ headers: response.headers });
    return response.data;
  }

  public static async getOne(id: string): Promise<AxiosResponse<PlanWithInfo>> {
    const response = await $api.get(AuthAPI.AUTH_URL + `/${id}`);
    return response.data;
  }
}
