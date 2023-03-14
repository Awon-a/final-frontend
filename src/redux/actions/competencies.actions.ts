import { PAGE_DEFAULT } from "../../common/constants/pagination.js";
import { Meta } from "../../common/interfaces/pagination.interface";
import {
  CreatePlan,
  GetManyPlans,
  Plan,
  UpdatePlan,
} from "../../types/academic-plan";

export enum PlanActions {
  CREATE_COMPETENCY = "CREATE_COMPETENCY",
  SUCCESS_CREATE_COMPETENCY = "SUCCESS_CREATE_COMPETENCY",
  UPDATE_COMPETENCY = "UPDATE_COMPETENCY",
  SUCCESS_UPDATE_COMPETENCY = "SUCCESS_UPDATE_COMPETENCY",
  GET_PLANS = "GET_PLANS",
  GET_PLANS_REQUEST = "GET_PLANS_REQUEST",
  SUCCESS_GET_PLANS = "SUCCESS_GET_PLANS",
  DELETE_COMPETENCY = "DELETE_COMPETENCY",
  SUCCESS_DELETE_COMPETENCY = "SUCCESS_DELETE_COMPETENCY",
  REQUEST_COMPETENCY_FAILED = "REQUEST_PLAN_FAILED",
  GET_ONE_COMPETENCY = "GET_ONE_COMPETENCY",
  GET_ONE_COMPETENCY_SUCCESS = "GET_ONE_COMPETENCY_SUCCESS",
}

export const requestPlanSuccess = (type: PlanActions, payload?: any) => ({
  type,
  payload,
});

export const requestPlanFailed = () => ({
  type: PlanActions.REQUEST_COMPETENCY_FAILED,
});
export interface CreatePlanAction {
  type: PlanActions.CREATE_COMPETENCY | PlanActions.SUCCESS_CREATE_COMPETENCY;
  payload: CreatePlan;
}

export interface UpdatePlanAction {
  type: PlanActions.UPDATE_COMPETENCY | PlanActions.SUCCESS_UPDATE_COMPETENCY;
  payload: UpdatePlan;
}

export interface DeletePlanAction {
  type: PlanActions.DELETE_COMPETENCY | PlanActions.SUCCESS_DELETE_COMPETENCY;
  payload: string;
}

export interface GetPlansAction {
  type: PlanActions.GET_PLANS;
  payload?: GetManyPlans;
}

export interface GetPlansSuccessAction {
  type: PlanActions.SUCCESS_GET_PLANS;
  payload: {
    data: Plan[];
    meta: Meta;
  };
}

export interface GetPlansRequestAction {
  type: PlanActions.GET_PLANS_REQUEST;
}

export type PlanActionsType =
  | CreatePlanAction
  | UpdatePlanAction
  | GetPlansAction
  | DeletePlanAction
  | GetPlansSuccessAction
  | GetPlansRequestAction;

export const updatePlan = (payload: UpdatePlan) => {
  return {
    type: PlanActions.UPDATE_COMPETENCY,
    payload,
  };
};

export const deletePlan = (payload: string) => {
  return {
    type: PlanActions.DELETE_COMPETENCY,
    payload,
  };
};

export const createPlan = (payload: CreatePlan) => {
  return {
    type: PlanActions.CREATE_COMPETENCY,
    payload,
  };
};

export const getPlans = (payload?: GetManyPlans) => {
  return {
    type: PlanActions.GET_PLANS,
    payload,
  };
};

export const getOnePlan = (payload: string) => {
  return {
    type: PlanActions.GET_ONE_COMPETENCY,
    payload,
  };
};
