import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/layout";
import AdminPage from "../pages/admin-page/admin-page";
import ProfilePage from "../pages/profile-page/profile-page";
import MainPage from "../pages/main-page/main-page";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
