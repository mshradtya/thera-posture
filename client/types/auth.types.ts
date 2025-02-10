export interface DecodedToken {
  username: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
  _id: string;
}

export interface AuthState {
  token: string | null;
  authenticated: boolean;
  username: string | null;
  email: string | null;
  role: string | null;
  userId?: string | null;
}

export interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  isLoading: boolean;
}

export interface AuthResponse {
  error?: boolean;
  msg?: string;
  token?: string;
  decoded?: DecodedToken;
}
