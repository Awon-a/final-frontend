import { call, Effect, put, takeEvery } from "redux-saga/effects";
import { AuthAPI } from "../../apis/auth.api";
import {
  AuthActions,
  requestAuthFailed,
  requestAuthSuccess,
  SignInAction,
} from "../actions/auth.actions";
import Cookie from "js-cookie";
import * as cookie from "cookie";

function* signInSaga(action: SignInAction): Generator<Effect, void> {
  try {
    yield put({ type: AuthActions.SIGN_IN_REQUEST });
    const response: any = yield call(AuthAPI.signIn, action.payload);
    Cookie.set("Authorization", `${response.tokens.atToken}`, {
      path: "/",
      expires: 1,
    });
    Cookie.set("Refresh", `${response.tokens.rtToken}`, {
      path: "/",
      expires: 7,
    });
    yield put(requestAuthSuccess(AuthActions.SIGN_IN_SUCCESS, response));
  } catch (error: any) {
    yield put(requestAuthFailed());
  }
}

export function* watcherAuthSagas(): Generator<Effect, void> {
  yield takeEvery(AuthActions.SIGN_IN, signInSaga);
}
