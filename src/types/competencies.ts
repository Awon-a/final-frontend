export interface Competency {
  id: string;
  name: string;
}

export interface GetManyCompetencies {
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}

export interface GetManyCompetenciesByDiscipline {
  disciplineId: string;
  page?: number;
  limit?: number;
  filter?: {
    [prop: string]: string;
  };
}
