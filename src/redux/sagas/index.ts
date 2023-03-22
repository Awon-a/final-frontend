import { all, Effect } from "redux-saga/effects";
import { watcherPlanSagas } from "./academic-plan.saga";
import { watcherCompetencySagas } from "./competencies.saga";
import { watcherDisciplineSagas } from "./disciplines.saga";
import { watcherAuthSagas } from "./auth.saga";

export default function* rootSaga(): Generator<Effect, void> {
  yield all([
    watcherAuthSagas(),
    watcherPlanSagas(),
    watcherDisciplineSagas(),
    watcherCompetencySagas(),
  ]);
}
