import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { RootState } from "./store";
import { useAppSelector } from "./hooks";
import "./style.css";

const App = () => {
  return (
    <div
      id="root-app"
      className="background-red m-0 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 p-0"
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home/:userId" element={<ProtectedRoute />} />
      </Routes>
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
