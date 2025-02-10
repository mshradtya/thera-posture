import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { ActivityIndicator, View } from "react-native";
import {
  AuthContextType,
  AuthState,
  DecodedToken,
  AuthResponse,
} from "../types/auth.types";
import { TOKEN_KEY } from "../constants/config";
import api, { setAuthToken } from "@/services/api.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const initialAuthState: AuthState = {
  token: null,
  authenticated: false,
  username: null,
  email: null,
  role: null,
  userId: null,
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const checkTokenExpiration = (decoded: DecodedToken): boolean => {
    if (!decoded.exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  };

  const loadToken = async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);

        if (!checkTokenExpiration(decoded)) {
          await logout();
          return;
        }

        setAuthToken(token);
        setAuthState({
          token,
          authenticated: true,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          userId: decoded._id,
        });
      }
    } catch (error) {
      console.error("Error loading token:", error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });
      return { ...response.data, error: false };
    } catch (error: any) {
      return {
        error: true,
        msg: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await api.post("/user/login", { username, password });
      const { token } = response.data;

      const decoded = jwtDecode<DecodedToken>(token);

      if (!checkTokenExpiration(decoded)) {
        throw new Error("Token expired");
      }

      setAuthToken(token);
      await SecureStore.setItemAsync(TOKEN_KEY, token);

      setAuthState({
        token,
        authenticated: true,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
        userId: decoded._id,
      });

      return { error: false, token, decoded };
    } catch (error: any) {
      return {
        error: true,
        msg: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      setAuthToken(null);
      setAuthState(initialAuthState);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
        register,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
