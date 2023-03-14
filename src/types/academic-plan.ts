import { Meta } from "../common/interfaces/pagination.interface.js";

export interface Discipline {
  id: string;
  name: string;
  codeDepartment: string;
}

export interface Plan {
  id: string;
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
  disciplines: Discipline[];
}

export interface CreatePlan {
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
}

export interface UpdatePlan {
  id: string;
  nameDirection?: string;
  year?: number;
  educationLevel?: string;
  semCount?: number;
}

export interface DeletePlan {
  id: string;
}

export interface GetOnePlan {
  id: string;
}

export interface GetManyPlans {
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface PlanState {
  // имя редьюсера
  plans: {
    plans: Plan[]; // state в этом редьюсере
    loading: boolean;
    plansMeta: Meta;
  };
}

export const EnumEducationLevelNameMapper = {
  0: "Бакалавриат",
  1: "Магистратура",
  2: "Специалитет",
} as {
  [key: string]: string;
};
