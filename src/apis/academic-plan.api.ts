import { AxiosResponse } from "axios";
import { $api } from "../http/http";
import { CreatePlan, Plan } from "../types/academic-plan";

export class PlansAPI {
  private static PLANS_URL = "/disciplines";

  public static async createOne(
    dto: CreatePlan
  ): Promise<AxiosResponse<Plan["id"]>> {
    const response = await $api.post(PlansAPI.PLANS_URL, dto);
    return response.data;
  }

  public static async getAll(): Promise<AxiosResponse<Plan[]>> {
    const response = await $api.get(PlansAPI.PLANS_URL);
    return response.data;
  }

  public static async getOne(id: string): Promise<AxiosResponse<Plan>> {
    const response = await $api.get(PlansAPI.PLANS_URL + `${id}`);
    return response.data;
  }
}
