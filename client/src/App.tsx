import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import LoginForm from "./forms/login-form";
import AuthProvider from "./context/auth-context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/private-route";
import Dashboard from "./components/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider defaultColorScheme="light">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<PrivateRoute />}>
              <Route path="/admin" element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
