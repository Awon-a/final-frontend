import { AxiosResponse } from "axios";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../common/constants/pagination";
import { $api } from "../http/http";
import {
  CreateDiscipline,
  Discipline,
  GetManyDisciplines,
} from "../types/discipline";

export class DisciplineAPI {
  private static DISICPLINE_URL = "/disciplines";

  public static async createOne(
    dto: CreateDiscipline
  ): Promise<AxiosResponse<Discipline["id"]>> {
    const response = await $api.post(DisciplineAPI.DISICPLINE_URL, dto);
    return response.data;
  }

  public static async getAll(
    query?: GetManyDisciplines
  ): Promise<AxiosResponse<Discipline[]>> {
    const params = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      ...query,
    };
    const response = await $api.get(DisciplineAPI.DISICPLINE_URL, { params });
    return response.data;
  }
}
