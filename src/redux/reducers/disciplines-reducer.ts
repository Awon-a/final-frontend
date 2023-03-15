import { Meta } from "../../common/interfaces/pagination.interface";
import { Competency } from "../../types/competencies";
import { Discipline } from "../../types/discipline";
import {
  DisciplineActions,
  DisciplineActionsType,
} from "../actions/disicplines.actions";

export const initialState = {
  disciplines: [] as Discipline[],
  loading: false,
  disciplinesMeta: {
    totalItems: 0,
  } as Meta,
  competencies: [] as Competency[],
  competenciesMeta: {
    totalItems: 0,
  } as Meta,
};
export const disciplineReducer = (
  state = initialState,
  action: DisciplineActionsType
) => {
  switch (action.type) {
    case DisciplineActions.SUCCESS_CREATE_DISCIPLINE:
      return { disciplines: [...state.disciplines, action.payload] };
    case DisciplineActions.SUCCESS_UPDATE_DISCIPLINE:
      return {
        disciplines: state.disciplines.map((discipline) => {
          if (discipline.id === action.payload.id) {
            return { ...discipline, ...action.payload };
          }
          return discipline;
        }),
      };
    case DisciplineActions.SUCCESS_DELETE_DISCIPLINE:
      return {
        ...state,
        disciplines: state.disciplines.filter(
          (discipline) => discipline.id !== action.payload
        ),
      };
    case DisciplineActions.GET_DISCIPLINES_REQUEST:
      return { ...state, loading: true };
    case DisciplineActions.SUCCESS_GET_DISCIPLINES:
      return {
        ...state,
        disciplines: action.payload.data,
        disciplinesMeta: action.payload.meta,
        loading: false,
      };
    case DisciplineActions.SUCCESS_GET_COMPETENCIES_BY_DISCIPLINE:
      return {
        ...state,
        loading: false,
        competencies: action.payload.data,
        competenciesMeta: action.payload.meta,
      };
    case DisciplineActions.REQUEST_DISCIPLINE_FAILED:
      return state;
    default:
      return state;
  }
};
