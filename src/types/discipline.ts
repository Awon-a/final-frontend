import { Meta } from "../common/interfaces/pagination.interface.js";

export interface Discipline {
  id: string;
  name: string;
  codeDepartment: string;
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
  };
}
