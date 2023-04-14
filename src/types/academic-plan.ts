import { Meta } from "../common/interfaces/pagination.interface";

export enum Attestations {
  Exam,
  Credit,
  DiffCredit,
  CourseWork,
  CourseProject,
}
export enum Blocks {
  Required,
  Elective,
  Practice,
  SFE,
}

export interface Discipline {
  id: string;
  name: string;
  codeDepartment: string;
  labH: number;
  practiceH: number;
  lectureH: number;
  iwsH: number;
  examPrep: number;
  attestation: Attestations;
  numSemester: number;
  block: Blocks;
}

export interface PlanWithInfo {
  id: string;
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
  disciplines: Discipline[];
}

export interface Plan {
  id: string;
  userId: string;
  nameDirection: string;
  year: number;
  educationLevel: string;
  semCount: number;
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
    plan: PlanWithInfo;
  };
}

export const EnumEducationLevelNameMapper = {
  0: "Бакалавриат",
  1: "Магистратура",
  2: "Специалитет",
} as {
  [key: string]: string;
};

export const AttestationNameMapper = {
  0: "эк",
  1: "зч",
  2: "дзч",
  3: "кр",
  4: "кп",
} as {
  [key: string]: string;
};

export const BlocksNameMapper = {
  0: "Дисциплины",
  1: "Факультативы",
  2: "Практики",
  3: "ГИА",
} as {
  [key: string]: string;
};
