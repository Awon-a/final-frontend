import { all, Effect } from "redux-saga/effects";
import { watcherPlanSagas } from "./academic-plan.saga";
import { watcherDisciplineSagas } from "./disciplines.saga";

export default function* rootSaga(): Generator<Effect, void> {
  yield all([watcherPlanSagas(), watcherDisciplineSagas()]);
}
