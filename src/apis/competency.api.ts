import axios, { AxiosResponse } from "axios";

import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../common/constants/pagination";
import { $api } from "../http/http";
import {
  Competency,
  CompetencyIndicators,
  CreateOneCompetency,
  GetCompetencyIndicators,
  GetManyCompetencies,
} from "../types/competencies";

export class CompetencyAPI {
  private static COMPETENCIES_URL = "/competencies";

  public static async createOne(
    dto: CreateOneCompetency
  ): Promise<AxiosResponse<{ id: Competency["id"] }>> {
    const response = await $api.post(CompetencyAPI.COMPETENCIES_URL, dto);
    return response.data;
  }

  public static async getAll(
    query?: GetManyCompetencies
  ): Promise<AxiosResponse<{ data: Competency[] }>> {
    const params = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      ...query,
    };
    const response = await $api.get(CompetencyAPI.COMPETENCIES_URL, { params });
    return response.data;
  }

  public static async getIndicatorsFor({
    id,
    ...query
  }: GetCompetencyIndicators): Promise<AxiosResponse<CompetencyIndicators>> {
    const params = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      ...query,
    };
    const response = await $api.get(
      CompetencyAPI.COMPETENCIES_URL + `${id}/indicators`,
      { params }
    );

    return response.data;
  }
}
