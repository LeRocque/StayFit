import { Routes, Route, Navigate } from "react-router-dom";
import { RootState } from "./store";
import { lazy, Suspense } from "react";
import { useAppSelector } from "./hooks";
import "./style.css";

// utilize lazy and suspense to only load imported modules when needed (let user see our App faster)
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
          <div className="fixed top-1/2 left-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform rounded-lg border-2">
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

// function that will check if isAuthenticated state in our redux store is truthy before allowing access to HomePage, otherwise we will redirect the user to our LoginPage component
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
