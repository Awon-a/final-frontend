import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../apis/auth.api";
import {
  AuthActions,
  requestAuthFailed,
  requestAuthSuccess,
  SignInAction,
  SignUpAction,
} from "../actions/auth.actions";

function* signInSaga(action: SignInAction): Generator<Effect, void> {
  try {
    yield put({ type: AuthActions.SIGN_IN_REQUEST });
    const response: any = yield call(AuthAPI.signIn, action.payload);

    localStorage.setItem("Authorization", response.tokens.atToken);
    localStorage.setItem("Refresh", response.tokens.rtToken);
    yield put(requestAuthSuccess(AuthActions.SIGN_IN_SUCCESS, response));
  } catch (error: any) {
    yield put(requestAuthFailed(error.response?.data?.message));
  }
}

function* signUpSaga(action: SignUpAction): Generator<Effect, void> {
  try {
    yield put({ type: AuthActions.SIGN_UP_REQUEST });
    const response: any = yield call(AuthAPI.signUp, action.payload);
    localStorage.setItem("Authorization", response.tokens.atToken);
    localStorage.setItem("Refresh", response.tokens.rtToken);
    yield put(requestAuthSuccess(AuthActions.SIGN_UP_SUCCESS, response));
  } catch (error: any) {
    console.log({ error });
    yield put(requestAuthFailed(error.response?.data?.message));
  }
}

export function* watcherAuthSagas(): Generator<Effect, void> {
  yield takeEvery(AuthActions.SIGN_IN, signInSaga);
  yield takeEvery(AuthActions.SIGN_UP, signUpSaga);
}
