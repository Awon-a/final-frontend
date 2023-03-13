import { Plan } from "../../types/academic-plan";
import { PlanActions, PlanActionsType } from "../actions/academic-plan.actions";

export const initialState = {
  plans: [] as Plan[],
};

export const planReducer = (state = initialState, action: PlanActionsType) => {
  switch (action.type) {
    case PlanActions.SUCCESS_CREATE_PLAN:
      return { ...state, plans: [...state.plans, action.payload] };
    case PlanActions.SUCCESS_UPDATE_PLAN:
      return {
        ...state,
        plans: state.plans.map((plan) => {
          if (plan.id === action.payload.id) {
            return { ...plan, ...action.payload };
          }
          return plan;
        }),
      };
    case PlanActions.SUCCESS_DELETE_PLAN:
      return {
        ...state,
        plans: state.plans.filter((plan) => plan.id !== action.payload),
      };
    case PlanActions.SUCCESS_GET_PLANS:
      return { ...state, plans: [...state.plans, action.payload] };
    default:
      return state;
  }
};
