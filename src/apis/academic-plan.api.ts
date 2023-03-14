import { AxiosResponse } from "axios";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../common/constants/pagination";
import { $api } from "../http/http";
import { CreatePlan, GetManyPlans, Plan } from "../types/academic-plan";

export class PlansAPI {
  private static PLANS_URL = "/academic-plans";

  public static async createOne(
    dto: CreatePlan
  ): Promise<AxiosResponse<Plan["id"]>> {
    const response = await $api.post(PlansAPI.PLANS_URL, dto);
    return response.data;
  }

  public static async getAll(
    query?: GetManyPlans
  ): Promise<AxiosResponse<Plan[]>> {
    const params = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      ...query,
    };
    const response = await $api.get(PlansAPI.PLANS_URL, { params });
    return response.data;
  }

  public static async getOne(id: string): Promise<AxiosResponse<Plan>> {
    const response = await $api.get(PlansAPI.PLANS_URL + `/${id}`);
    return response.data;
  }
}
