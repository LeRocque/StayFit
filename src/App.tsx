import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { RootState } from "./store";
import { useAppSelector } from "./hooks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<ProtectedRoute />} />
    </Routes>
  );
};

const ProtectedRoute = () => {
  console.log("ProtectedRoute called");
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.users.isAuthenticated
  );
  console.log("isAuthenticated:", isAuthenticated);
  if (isAuthenticated) {
    return <HomePage />;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default App;
