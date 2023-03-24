export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface Tokens {
  atToken: string;
  rtToken: string;
}

export interface SignUpResponse {
  tokens: Tokens;
  user: User;
}

export interface SignInResponse {
  tokens: Tokens;
  user: User;
}

export interface AuthState {
  auth: {
    loading: boolean;
    isAuthenticated: boolean;
    error: any;
    aToken: string;
    rToken: string;
    user: User;
  };
}
