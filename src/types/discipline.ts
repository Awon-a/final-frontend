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
