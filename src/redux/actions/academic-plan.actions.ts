import { CreatePlan, UpdatePlan } from "../../types/academic-plan";

export enum PlanActions {
  CREATE_PLAN = "CREATE_PLAN",
  SUCCESS_CREATE_PLAN = "SUCCESS_CREATE_PLAN",
  UPDATE_PLAN = "UPDATE_PLAN",
  SUCCESS_UPDATE_PLAN = "SUCCESS_UPDATE_PLAN",
  GET_PLANS = "GET_PLANS",
  SUCCESS_GET_PLANS = "SUCCESS_GET_PLANS",
  DELETE_PLAN = "DELETE_PLAN",
  SUCCESS_DELETE_PLAN = "SUCCESS_DELETE_PLAN",
  REQUEST_PLAN_FAILED = "REQUEST_PLAN_FAILED",
}

export const requestPlanSuccess = (type: PlanActions, payload?: any) => ({
  type,
  payload,
});

export const requestPlanFailed = () => ({
  type: PlanActions.REQUEST_PLAN_FAILED,
});
export interface CreatePlanAction {
  type: PlanActions.CREATE_PLAN | PlanActions.SUCCESS_CREATE_PLAN;
  payload: CreatePlan;
}

export interface UpdatePlanAction {
  type: PlanActions.UPDATE_PLAN | PlanActions.SUCCESS_UPDATE_PLAN;
  payload: UpdatePlan;
}

export interface DeletePlanAction {
  type: PlanActions.DELETE_PLAN | PlanActions.SUCCESS_DELETE_PLAN;
  payload: string;
}

export interface GetPlansAction {
  type: PlanActions.GET_PLANS | PlanActions.SUCCESS_GET_PLANS;
  payload?: string;
}

export type PlanActionsType =
  | CreatePlanAction
  | UpdatePlanAction
  | GetPlansAction
  | DeletePlanAction;

export const updatPlan = (payload: UpdatePlan) => {
  return {
    type: PlanActions.UPDATE_PLAN,
    payload,
  };
};

export const deletePlan = (payload: string) => {
  return {
    type: PlanActions.DELETE_PLAN,
    payload,
  };
};

export const createPlan = (payload: CreatePlan) => {
  return {
    type: PlanActions.CREATE_PLAN,
    payload,
  };
};

export const getPlans = () => {
  return {
    type: PlanActions.GET_PLANS,
  };
};
