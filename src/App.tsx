import React, { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "./store";
import { lazy, Suspense } from "react";
import { useAppSelector } from "./hooks";
import "./style.css";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

const App = () => {
  return (
    <div
      id="root-app"
      className="m-0 h-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 p-0"
    >
      <Suspense
        fallback={
          <div className="loading-pane">
            <h2 className="loader">🏋️</h2>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home/:userId" element={<ProtectedRoute />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.users.isAuthenticated,
  );
  if (isAuthenticated) {
    return <HomePage />;
  } else {
    alert("You must be logged in to view that page");
    return <Navigate to={"/"} />;
  }
};

export default App;
