import { Discipline } from "../../types/discipline";
import {
  DisciplineActions,
  DisciplineActionsType,
} from "../actions/disicplines.actions";

export const initialState = {
  disciplines: [] as Discipline[],
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
    case DisciplineActions.SUCCESS_GET_DISCIPLINES:
      return { ...state, disciplines: [...state.disciplines, action.payload] };
    default:
      return state;
  }
};
