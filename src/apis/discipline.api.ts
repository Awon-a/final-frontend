import { AxiosResponse } from "axios";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "../common/constants/pagination";
import { Meta } from "../common/interfaces/pagination.interface.js";
import { $api } from "../http/http";
import {
  Competency,
  GetManyCompetenciesByDiscipline,
} from "../types/competencies.js";
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

  public static async getCompetenciesById({
    disciplineId,
    ...query
  }: GetManyCompetenciesByDiscipline): Promise<
    AxiosResponse<{ data: Competency[]; meta: Meta }>
  > {
    const params = {
      page: PAGE_DEFAULT,
      limit: LIMIT_DEFAULT,
      ...query,
    };
    const response = await $api.get(
      DisciplineAPI.DISICPLINE_URL + `/${disciplineId}/competencies`,
      { params }
    );
    return response.data;
  }
}
