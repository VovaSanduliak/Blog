import { FC, ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUser from "../models/IUser";
import authService from "../services/auth-service";

interface AuthProviderProps {
  children: ReactNode;
}

interface loginData {
  email: string;
  password: string;
}

export interface IAuthContext {
  user: IUser | null;
  token: string;
  login: (data: loginData) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  token: "",
  user: null,
  login: async () => {},
  logout: () => {},
  loading: false,
  error: null,
});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (data: loginData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("response:");
      const response = await authService.login(data.email, data.password);
      console.log("response:", response);

      if (response.data) {
        setUser(response.data.user);
        console.log("USER: ", user);
        setToken(response.data.accessToken);
        console.log("TOKEN: ", token);
        localStorage.setItem("accessToken", response.data.accessToken);
        setLoading(false);
        // navigate("/"); // TODO
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error"); // Установка помилки
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      authService.logout();
      setUser(null);
      setToken("");
      localStorage.removeItem("accessToken");
      navigate("/"); // TODO
    } catch (err) {
      console.error(err);
    }
  };

  const value = { user, token, login, logout, loading, error };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
