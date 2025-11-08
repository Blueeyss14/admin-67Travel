import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const AuthPage = lazy(() => import("../features/Auth/views/AuthPage"));
const AdminNavigation = lazy(() => import("../features/common/views/AdminNavigation"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin-navigation" element={<AdminNavigation />} />
      </Routes>
    </Suspense>
  );
};
export default AppRoutes;
