import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import AuthProvider from "./context/auth-context";
import AdminPage from "./pages/admin-page/admin-page";
import Layout from "./components/layout/layout";
import ProfilePage from "./pages/profile-page/profile-page";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <BrowserRouter>
      <MantineProvider defaultColorScheme="light">
        <ModalsProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/profile" />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="admin" element={<AdminPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </ModalsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};

export default App;
