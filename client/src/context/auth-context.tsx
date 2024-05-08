import { FC, ReactNode, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUser from "../models/IUser";
import authService from "../services/auth-service";

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContext {
  token: string;
  user: IUser | null;
  login: (data: object) => void;
  logout: () => void;
}

type loginData = {
  email: string;
  password: string;
};

export const AuthContext = createContext<IAuthContext>({
  token: "",
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") ?? "");
  const navigate = useNavigate();

  const login = async (data: loginData) => {
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
        navigate("/admin"); // TODO
        return;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error("ERROooooR:", err); // TODO:
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

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
