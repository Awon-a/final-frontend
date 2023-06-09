import { Effect, call, put, takeEvery } from "redux-saga/effects";
import { DisciplineAPI } from "../../apis/discipline.api";

import { CreateDiscipline } from "../../types/discipline";
import {
  CreateDisciplineAction,
  DisciplineActions,
  requestDisciplineSuccess,
  requestDisciplineFailed,
  GetDisciplinesAction,
  GetCompetenciesByDisciplineAction,
} from "../actions/disicplines.actions";

function* createDisciplineSaga(
  action: CreateDisciplineAction
): Generator<Effect, void> {
  try {
    const newDiscipline: CreateDiscipline = {
      codeDepartment: action.payload.codeDepartment,
      name: action.payload.name,
    };
    const createdDiscipline = yield call(
      DisciplineAPI.createOne,
      newDiscipline
    );
    yield put(
      requestDisciplineSuccess(
        DisciplineActions.SUCCESS_CREATE_DISCIPLINE,
        createdDiscipline
      )
    );
  } catch (error: any) {
    yield put(requestDisciplineFailed());
  }
}

function* getDisciplinesSaga(
  action: GetDisciplinesAction
): Generator<Effect, void> {
  try {
    yield put({ type: DisciplineActions.GET_DISCIPLINES_REQUEST });
    const disciplines = yield call(DisciplineAPI.getAll, action.payload);
    yield put(
      requestDisciplineSuccess(
        DisciplineActions.SUCCESS_GET_DISCIPLINES,
        disciplines
      )
    );
  } catch (error: any) {
    yield put(requestDisciplineFailed());
  }
}

function* getComptenciesByDiscipline(
  action: GetCompetenciesByDisciplineAction
): Generator<Effect, void> {
  try {
    const competencies = yield call(
      DisciplineAPI.getCompetenciesById,
      action.payload
    );
    yield put(
      requestDisciplineSuccess(
        DisciplineActions.SUCCESS_GET_COMPETENCIES_BY_DISCIPLINE,
        competencies
      )
    );
  } catch (error: any) {
    yield put(requestDisciplineFailed());
  }
}

export function* watcherDisciplineSagas(): Generator<Effect, void> {
  yield takeEvery(DisciplineActions.CREATE_DISCIPLINE, createDisciplineSaga);
  yield takeEvery(DisciplineActions.GET_DISCIPLINES, getDisciplinesSaga);
  yield takeEvery(
    DisciplineActions.GET_COMPETENCIES_BY_DISCIPLINE,
    getComptenciesByDiscipline
  );
}
