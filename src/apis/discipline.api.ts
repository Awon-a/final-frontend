import { AxiosResponse } from "axios";
import { $api } from "../http/http";
import { CreateDiscipline, Discipline } from "../types/discipline";

export class DisciplineAPI {
  private static DISICPLINE_URL = "/disciplines";

  public static async createOne(
    dto: CreateDiscipline
  ): Promise<AxiosResponse<Discipline["id"]>> {
    const response = await $api.post(DisciplineAPI.DISICPLINE_URL, dto);
    return response.data;
  }

  public static async getAll(): Promise<AxiosResponse<Discipline[]>> {
    const response = await $api.get(DisciplineAPI.DISICPLINE_URL);
    return response.data;
  }
}
