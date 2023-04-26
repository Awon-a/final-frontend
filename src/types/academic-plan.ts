import { Meta } from "../common/interfaces/pagination.interface";

export enum PlanStatus {
  Formattable,
  Executable,
  Archival,
}

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
  competencies: [];
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
export const PlanStatusMapper = {
  0: "оформляемый",
  1: "исполняемый",
  2: "архивный",
} as {
  [key: string]: string;
};
export const PlanBaseEduMapper = {
  0: "среднее (полное) общее",
  1: "среднее профессиональное",
  2: "высшее I степени",
  3: "высшее II степени",
};
export const PlanTrainingFromMapper = {
  0: "Очная форма обучения",
  1: "Очно-заочная форма обучения",
  2: "Заочная форма обучения",
} as { [key: string]: string };
export const PlanDegreeMapper = {
  0: "Бакалавриат",
  1: "Магистратура",
  2: "Специалитет",
} as {
  [key: string]: string;
};
export const PlanLoadsToAttestationMapper = {
  Зачет: Attestations.Credit,
  "Дифф. зачет": Attestations.DiffCredit,
  Экзамен: Attestations.Exam,
  "Курсовая работа": Attestations.CourseWork,
  "Курсовой проект": Attestations.CourseProject,
} as unknown as {
  [key: string]: string;
};
export const PlanAttestationToSymbolsMapper = {
  [Attestations.DiffCredit]: "*",
  [Attestations.Credit]: "",
  [Attestations.Exam]: "",
  [Attestations.CourseWork]: "р",
  [Attestations.CourseProject]: "п",
};
