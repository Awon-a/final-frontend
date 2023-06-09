import { Effect, call, put, takeEvery } from "redux-saga/effects";
import { PlansAPI } from "../../apis/academic-plan.api";
import { CreatePlan } from "../../types/academic-plan";
import {
  CreatePlanAction,
  GetOnePlanAction,
  GetPlansAction,
  PlanActions,
  requestPlanFailed,
  requestPlanSuccess,
} from "../actions/academic-plan.actions";

function* getPlansSaga(action: GetPlansAction): Generator<Effect, void> {
  try {
    yield put({ type: PlanActions.GET_PLANS_REQUEST });
    const response = yield call(PlansAPI.getAll, action.payload);
    yield put(requestPlanSuccess(PlanActions.SUCCESS_GET_PLANS, response));
  } catch (error: any) {
    yield put(requestPlanFailed());
  }
}

function* getOnePlanSaga(action: GetOnePlanAction): Generator<Effect, void> {
  try {
    yield put({ type: PlanActions.GET_ONE_PLAN_REQUEST });
    const planInfo: any = yield call(PlansAPI.getOne, action.payload.id);

    yield put(
      requestPlanSuccess(PlanActions.GET_ONE_PLAN_SUCCESS, planInfo.data)
    );
  } catch (error: any) {
    yield put(requestPlanFailed());
  }
}

function* createPlanSaga(action: CreatePlanAction): Generator<Effect, void> {
  try {
    const newPlan: CreatePlan = {
      ...action.payload,
    };
    const createdPlan = yield call(PlansAPI.createOne, newPlan);
    yield put(requestPlanSuccess(PlanActions.SUCCESS_CREATE_PLAN, createdPlan));
  } catch (error: any) {
    yield put(requestPlanFailed());
  }
}

export function* watcherPlanSagas(): Generator<Effect, void> {
  yield takeEvery(PlanActions.GET_PLANS, getPlansSaga);
  yield takeEvery(PlanActions.CREATE_PLAN, createPlanSaga);
  yield takeEvery(PlanActions.GET_ONE_PLAN, getOnePlanSaga);
}
