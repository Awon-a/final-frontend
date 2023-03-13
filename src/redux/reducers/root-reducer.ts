import { combineReducers } from "redux";

import { planReducer } from "./academic-plans.reducer";
import { disciplineReducer } from "./disciplines-reducer";

export const rootReducer = combineReducers({
  disciplines: disciplineReducer,
  plans: planReducer,
});
