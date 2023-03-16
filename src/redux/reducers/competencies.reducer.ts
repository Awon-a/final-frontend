import { Meta } from "../../common/interfaces/pagination.interface";
import { Competency, CompetencyIndicators } from "../../types/competencies";
import {
  CompetencyActions,
  CompetencyActionsType,
} from "../actions/competencies.actions";

export const initialState = {
  competencies: [] as Competency[],
  competenciesMeta: {
    totalItems: 0,
  } as Meta,
  loading: false,
  indicators: [] as CompetencyIndicators[],
};

export const competenciesReducer = (
  state = initialState,
  action: CompetencyActionsType
) => {
  switch (action.type) {
    case CompetencyActions.GET_COMPETENCIES_REQUEST:
      return { ...state, loading: true };
    case CompetencyActions.SUCCESS_GET_COMPETENCIES:
      return {
        ...state,
        competencies: action.payload.data,
        competenciesMeta: action.payload.meta,
        loading: false,
      };
    case CompetencyActions.GET_COMPETENCY_INDICATORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CompetencyActions.GET_COMPETENCY_INDICATORS_SUCCESS:
      return {
        ...state,
        indicators: action.payload.data,
        indicatorsMeta: action.payload.meta,
      };
    case CompetencyActions.REQUEST_COMPETENCY_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};
