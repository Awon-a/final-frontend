import { Meta } from "../../common/interfaces/pagination.interface.js";
import {
  Competency,
  GetManyCompetenciesByDiscipline,
} from "../../types/competencies.js";
import {
  CreateDiscipline,
  Discipline,
  GetManyDisciplines,
  UpdateDiscipline,
} from "../../types/discipline";

export enum DisciplineActions {
  CREATE_DISCIPLINE = "CREATE_DISCIPLINE",
  SUCCESS_CREATE_DISCIPLINE = "SUCCESS_CREATE_DISCIPLINE",
  UPDATE_DISCIPLINE = "UPDATE_DISCIPLINE",
  SUCCESS_UPDATE_DISCIPLINE = "SUCCESS_UPDATE_DISCIPLINE",
  GET_DISCIPLINES = "GET_DISCIPLINES",
  GET_DISCIPLINES_REQUEST = "GET_DISCIPLINES_REQUEST",
  SUCCESS_GET_DISCIPLINES = "SUCCESS_GET_DISCIPLINES",
  DELETE_DISCIPLINE = "DELETE_DISCIPLINE",
  SUCCESS_DELETE_DISCIPLINE = "SUCCESS_DELETE_DISCIPLINE",
  REQUEST_DISCIPLINE_FAILED = "REQUEST_DISCIPLINE_FAILED",
  GET_COMPETENCIES_BY_DISCIPLINE = "GET_COMPETENCIES_BY_DISCIPLINE",
  SUCCESS_GET_COMPETENCIES_BY_DISCIPLINE = "SUCCESS_GET_COMPETENCIES_BY_DISCIPLINE",
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

export interface FailedAction {
  type: DisciplineActions.REQUEST_DISCIPLINE_FAILED;
  payload?: any;
}

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

export interface GetDisciplinesAction {
  type: DisciplineActions.GET_DISCIPLINES;
  payload?: GetManyDisciplines;
}

export interface GetDisciplinesRequestAction {
  type: DisciplineActions.GET_DISCIPLINES_REQUEST;
}

export interface GetDisciplinesSuccessAction {
  type: DisciplineActions.SUCCESS_GET_DISCIPLINES;
  payload: {
    data: Discipline[];
    meta: Meta;
  };
}

export interface GetCompetenciesByDisciplineAction {
  type: DisciplineActions.GET_COMPETENCIES_BY_DISCIPLINE;
  payload: GetManyCompetenciesByDiscipline;
}

export interface GetCompetenciesByDisciplineSuccessAction {
  type: DisciplineActions.SUCCESS_GET_COMPETENCIES_BY_DISCIPLINE;
  payload: {
    data: Competency[];
    meta: Meta;
  };
}

export type DisciplineActionsType =
  | CreateDisciplineAction
  | UpdateDisciplineAction
  | GetDisciplinesAction
  | GetDisciplinesRequestAction
  | GetDisciplinesSuccessAction
  | FailedAction
  | DeleteDisciplineAction
  | GetCompetenciesByDisciplineAction
  | GetCompetenciesByDisciplineSuccessAction;

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

export const getDisciplines = (payload?: GetManyDisciplines) => {
  return {
    type: DisciplineActions.GET_DISCIPLINES,
    payload,
  };
};

export const getCompetenciesByDiscipline = (
  payload: GetManyCompetenciesByDiscipline
) => {
  return {
    type: DisciplineActions.GET_COMPETENCIES_BY_DISCIPLINE,
    payload,
  };
};
