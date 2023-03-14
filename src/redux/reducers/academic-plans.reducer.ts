import { Meta } from "../../common/interfaces/pagination.interface.js";
import { Plan } from "../../types/academic-plan";
import { PlanActions, PlanActionsType } from "../actions/academic-plan.actions";

export const initialState = {
  loading: false,
  plans: [] as Plan[],
  plansMeta: {
    totalItems: 0,
  } as Meta,
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
      return {
        ...state,
        plans: action.payload.data,
        plansMeta: { ...action.payload.meta },
        loading: false,
      };
    case PlanActions.GET_PLANS:
      return { ...state, loading: true };
    default:
      return state;
  }
};
