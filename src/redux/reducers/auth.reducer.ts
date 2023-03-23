import { User } from "../../types/user";
import { AuthActions, AuthActionsTypes } from "../actions/auth.actions";

export const initialState = {
  isAuthenticated: false,
  user: {} as User,
  loading: false,
  aToken: "",
  rToken: "",
  error: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActionsTypes
): typeof initialState => {
  switch (action.type) {
    case AuthActions.SIGN_IN_REQUEST:
      console.log("SIGN IN REQUEST", { action });
      return { ...state, loading: true };
    case AuthActions.SIGN_IN_SUCCESS:
      console.log("SIGN IN SUCCESS", { action });
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        aToken: action.payload.tokens.atToken,
        rToken: action.payload.tokens.rtToken,
      };
    case AuthActions.SIGN_UP_REQUEST:
      return { ...state, loading: true };
    case AuthActions.SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        aToken: action.payload.tokens.atToken,
        rToken: action.payload.tokens.rtToken,
      };
    case AuthActions.LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};
