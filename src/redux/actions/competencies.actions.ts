import { Meta } from "../../common/interfaces/pagination.interface";

import {
  Competency,
  CompetencyIndicators,
  CreateOneCompetency,
  GetCompetencyIndicators,
  GetManyCompetencies,
  UpdateOneCompetency,
} from "../../types/competencies";

export enum CompetencyActions {
  CREATE_COMPETENCY = "CREATE_COMPETENCY",
  SUCCESS_CREATE_COMPETENCY = "SUCCESS_CREATE_COMPETENCY",
  UPDATE_COMPETENCY = "UPDATE_COMPETENCY",
  SUCCESS_UPDATE_COMPETENCY = "SUCCESS_UPDATE_COMPETENCY",
  GET_COMPETENCIES = "GET_COMPETENCIES",
  GET_COMPETENCIES_REQUEST = "GET_COMPETENCIES_REQUEST",
  SUCCESS_GET_COMPETENCIES = "SUCCESS_GET_COMPETENCIES",
  DELETE_COMPETENCY = "DELETE_COMPETENCY",
  SUCCESS_DELETE_COMPETENCY = "SUCCESS_DELETE_COMPETENCY",
  REQUEST_COMPETENCY_FAILED = "REQUEST_COMPETENCY_FAILED",
  GET_ONE_COMPETENCY = "GET_ONE_COMPETENCY",
  GET_ONE_COMPETENCY_SUCCESS = "GET_ONE_COMPETENCY_SUCCESS",
  GET_COMPETENCY_INDICATORS = "GET_COMPETENCY_INDICATORS",
  GET_COMPETENCY_INDICATORS_REQUEST = "GET_COMPETENCY_INDICATORS_REQUEST",
  GET_COMPETENCY_INDICATORS_SUCCESS = "GET_COMPETENCY_INDICATORS_SUCCESS",
}

export const requestCompetencySuccess = (
  type: CompetencyActions,
  payload?: any
) => ({
  type,
  payload,
});

export const requestCompetencyFailed = () => ({
  type: CompetencyActions.REQUEST_COMPETENCY_FAILED,
});

export interface UpdateCompetencyAction {
  type:
    | CompetencyActions.UPDATE_COMPETENCY
    | CompetencyActions.SUCCESS_UPDATE_COMPETENCY;
  payload: UpdateOneCompetency;
}

export interface DeleteCompetencyAction {
  type:
    | CompetencyActions.DELETE_COMPETENCY
    | CompetencyActions.SUCCESS_DELETE_COMPETENCY;
  payload: string;
}

export interface GetCompetenciesAction {
  type: CompetencyActions.GET_COMPETENCIES;
  payload?: GetManyCompetencies;
}

export interface GetCompetenciesSuccessAction {
  type: CompetencyActions.SUCCESS_GET_COMPETENCIES;
  payload: {
    data: Competency[];
    meta: Meta;
  };
}

export interface GetCompetenciesRequestAction {
  type: CompetencyActions.GET_COMPETENCIES_REQUEST;
}

export interface GetCompetencyIndicatorsAction {
  type: CompetencyActions.GET_COMPETENCY_INDICATORS;
  payload: GetCompetencyIndicators;
}

export interface GetCompetencyIndicatorsRequestAction {
  type: CompetencyActions.GET_COMPETENCY_INDICATORS_REQUEST;
  payload: GetCompetencyIndicators;
}

export interface GetCompetencyIndicatorsSuccessAction {
  type: CompetencyActions.GET_COMPETENCY_INDICATORS_SUCCESS;
  payload: {
    data: CompetencyIndicators[];
    meta: Meta;
  };
}

export type CompetencyActionsType =
  | UpdateCompetencyAction
  | GetCompetenciesAction
  | DeleteCompetencyAction
  | GetCompetenciesSuccessAction
  | GetCompetenciesRequestAction
  | GetCompetencyIndicatorsAction
  | GetCompetencyIndicatorsRequestAction
  | GetCompetencyIndicatorsSuccessAction
  | GetCompetenciesRequestAction;

export const updateCompetency = (payload: UpdateOneCompetency) => {
  return {
    type: CompetencyActions.UPDATE_COMPETENCY,
    payload,
  };
};

export const deleteCompetency = (payload: string) => {
  return {
    type: CompetencyActions.DELETE_COMPETENCY,
    payload,
  };
};

export const createCompetency = (payload: CreateOneCompetency) => {
  return {
    type: CompetencyActions.CREATE_COMPETENCY,
    payload,
  };
};

export const getCompetencies = (payload?: GetManyCompetencies) => {
  return {
    type: CompetencyActions.GET_COMPETENCIES,
    payload,
  };
};

export const getOneCompetency = (payload: string) => {
  return {
    type: CompetencyActions.GET_ONE_COMPETENCY,
    payload,
  };
};
