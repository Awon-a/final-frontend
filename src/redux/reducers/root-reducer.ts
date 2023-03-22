import { combineReducers } from "redux";

import { planReducer } from "./academic-plans.reducer";
import { authReducer } from "./auth.reducer";
import { competenciesReducer } from "./competencies.reducer";
import { disciplineReducer } from "./disciplines-reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  disciplines: disciplineReducer,
  plans: planReducer,
  competencies: competenciesReducer,
});
