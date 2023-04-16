import { Meta } from "../common/interfaces/pagination.interface";
import { Competency } from "./competencies";

export interface Discipline {
  id: string;
  name: string;
  codeDepartment: string;
  competencies: Competency[];
}

export interface CreateDiscipline {
  name: string;
  codeDepartment: string;
}

export interface UpdateDiscipline {
  id: string;
  name?: string;
  codeDepartment?: string;
}

export interface GetManyDisciplines {
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface DisciplineState {
  disciplines: {
    disciplines: Discipline[]; // state в этом редьюсере
    loading: boolean;
    disciplinesMeta: Meta;
    competencies: Competency[];
    competenciesMeta: Meta;
  };
}
