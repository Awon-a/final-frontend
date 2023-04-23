import { Meta } from "../common/interfaces/pagination.interface.js";

export interface Competency {
  id: string;
  name: string;
  code: string;
}

export interface GetManyCompetencies {
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface CreateOneCompetency {
  name: string;
  code: string;
}

export interface UpdateOneCompetency {
  name?: string;
  code?: string;
}

export interface DeleteOneCompetency {
  id: string;
}

export interface GetManyCompetenciesByDiscipline {
  disciplineId: string;
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface CompetencyIndicators {
  id: string;
  code: string;
  name: string;
}

export interface GetCompetencyIndicators {
  id: string;
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface CompetencyState {
  competencies: {
    competencies: Competency[];
    loading: boolean;
    competenciesMeta: Meta;
    competency: Competency;
    createId: string;
    indicators: CompetencyIndicators[];
    indicatorsMeta: Meta;
  };
}
