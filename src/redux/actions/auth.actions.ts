import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "../../types/user.js";

export enum AuthActions {
  SIGN_UP = "SIGN_UP",
  SIGN_UP_REQUEST = "SIGN_UP_REQUEST",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_IN = "SIGN_IN",
  SIGN_IN_REQUEST = "SIGN_IN_REQUEST",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  AUTH_FAILED = "AUTH_FAILED",
  LOGOUT = "LOGOUT",
}

export const requestAuthSuccess = (type: AuthActions, payload?: any) => ({
  type,
  payload,
});
export const requestAuthFailed = (payload?: any) => ({
  type: AuthActions.AUTH_FAILED,
  payload,
});

export interface SignUpAction {
  type: AuthActions.SIGN_UP;
  payload: SignUpRequest;
}
export interface SignUpRequestAction {
  type: AuthActions.SIGN_UP_REQUEST;
}
export interface SignUpSuccessAction {
  type: AuthActions.SIGN_UP_SUCCESS;
  payload: SignUpResponse;
}
export interface SignInAction {
  type: AuthActions.SIGN_IN;
  payload: SignInRequest;
}
export interface SignInRequestAction {
  type: AuthActions.SIGN_IN_REQUEST;
}
export interface SignInSuccessAction {
  type: AuthActions.SIGN_IN_SUCCESS;
  payload: SignInResponse;
}
export interface FailedAction {
  type: AuthActions.AUTH_FAILED;
  payload: any;
}
export interface LogoutAction {
  type: AuthActions.LOGOUT;
}

export type AuthActionsTypes =
  | SignUpAction
  | SignUpSuccessAction
  | SignInAction
  | SignUpRequestAction
  | SignInRequestAction
  | LogoutAction
  | FailedAction
  | SignInSuccessAction;

export const signIn = (payload: SignInRequest) => ({
  type: AuthActions.SIGN_IN,
  payload,
});
export const signUp = (payload: SignUpRequest) => ({
  type: AuthActions.SIGN_UP,
  payload,
});
