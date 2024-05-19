import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/layout";
import AdminPage from "../pages/admin-page/admin-page";
import ProfilePage from "../pages/profile-page/profile-page";
import MainPage from "../pages/main-page/main-page";
import CreateArticle from "../pages/create-article/create-article";
import React from "react";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="articles">
          <Route index element={<Navigate to="articles/create" />} />
          <Route path="create" element={<CreateArticle />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
