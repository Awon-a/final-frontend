import { call, Effect, put, takeEvery } from "redux-saga/effects";

import { CompetencyAPI } from "../../apis/competency.api";
import {
  CompetencyActions,
  GetCompetenciesAction,
  GetCompetencyIndicatorsAction,
  requestCompetencyFailed,
  requestCompetencySuccess,
} from "../actions/competencies.actions";

function* getManyCompetenciesSaga(
  action: GetCompetenciesAction
): Generator<Effect, void> {
  try {
    yield put({ type: CompetencyActions.GET_COMPETENCIES_REQUEST });
    const competencies: any = yield call(CompetencyAPI.getAll, action.payload);
    yield put(
      requestCompetencySuccess(
        CompetencyActions.SUCCESS_GET_COMPETENCIES,
        competencies
      )
    );
  } catch (error: any) {
    yield put(requestCompetencyFailed());
  }
}

function* getCompetencyIndicatorsSaga(
  action: GetCompetencyIndicatorsAction
): Generator<Effect, void> {
  try {
    yield put({ type: CompetencyActions.GET_COMPETENCY_INDICATORS_REQUEST });
    const indicators: any = yield call(
      CompetencyAPI.getIndicatorsFor,
      action.payload
    );
    yield put(
      requestCompetencySuccess(
        CompetencyActions.GET_COMPETENCY_INDICATORS_SUCCESS,
        indicators.data
      )
    );
  } catch (error: any) {
    yield put(requestCompetencyFailed());
  }
}

export function* watcherCompetencySagas(): Generator<Effect, void> {
  yield takeEvery(CompetencyActions.GET_COMPETENCIES, getManyCompetenciesSaga);
  yield takeEvery(
    CompetencyActions.GET_COMPETENCY_INDICATORS,
    getCompetencyIndicatorsSaga
  );
}
