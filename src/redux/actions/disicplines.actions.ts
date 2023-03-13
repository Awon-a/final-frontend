import {
  CreateDiscipline,
  Discipline,
  UpdateDiscipline,
} from "../../types/discipline";

export enum DisciplineActions {
  CREATE_DISCIPLINE = "CREATE_DISCIPLINE",
  SUCCESS_CREATE_DISCIPLINE = "SUCCESS_CREATE_DISCIPLINE",
  UPDATE_DISCIPLINE = "UPDATE_DISCIPLINE",
  SUCCESS_UPDATE_DISCIPLINE = "SUCCESS_UPDATE_DISCIPLINE",
  GET_DISCIPLINES = "GET_DISCIPLINES",
  SUCCESS_GET_DISCIPLINES = "SUCCESS_GET_DISCIPLINES",
  DELETE_DISCIPLINE = "DELETE_DISCIPLINE",
  SUCCESS_DELETE_DISCIPLINE = "SUCCESS_DELETE_DISCIPLINE",
  REQUEST_DISCIPLINE_FAILED = "REQUEST_DISCIPLINE_FAILED",
}

export const requestDisciplineSuccess = (
  type: DisciplineActions,
  payload?: any
) => ({
  type,
  payload,
});

export const requestDisciplineFailed = () => ({
  type: DisciplineActions.REQUEST_DISCIPLINE_FAILED,
});

export interface CreateDisciplineAction {
  type:
    | DisciplineActions.CREATE_DISCIPLINE
    | DisciplineActions.SUCCESS_CREATE_DISCIPLINE;
  payload: Discipline;
}

export interface UpdateDisciplineAction {
  type:
    | DisciplineActions.UPDATE_DISCIPLINE
    | DisciplineActions.SUCCESS_UPDATE_DISCIPLINE;
  payload: UpdateDiscipline;
}

export interface DeleteDisciplineAction {
  type:
    | DisciplineActions.DELETE_DISCIPLINE
    | DisciplineActions.SUCCESS_DELETE_DISCIPLINE;
  payload: string;
}

export interface GetDisciplineAction {
  type:
    | DisciplineActions.GET_DISCIPLINES
    | DisciplineActions.SUCCESS_GET_DISCIPLINES;
  payload?: string;
}

export type DisciplineActionsType =
  | CreateDisciplineAction
  | UpdateDisciplineAction
  | GetDisciplineAction
  | DeleteDisciplineAction;

export const updateDiscipine = (payload: UpdateDiscipline) => {
  return {
    type: DisciplineActions.UPDATE_DISCIPLINE,
    payload,
  };
};

export const deleteDiscipline = (payload: string) => {
  return {
    type: DisciplineActions.DELETE_DISCIPLINE,
    payload,
  };
};

export const createDiscipline = (payload: CreateDiscipline) => {
  return {
    type: DisciplineActions.CREATE_DISCIPLINE,
    payload,
  };
};

export const getDisciplines = () => {
  return {
    type: DisciplineActions.GET_DISCIPLINES,
  };
};
