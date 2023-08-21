import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logoutUserActionCreator } from "../actions/actions";

const HomePage = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserWorkouts = async () => {
      try {
        const result = await fetch(`/workout/${userId}`);
        const workouts = await result.json();
        setUserWorkouts(workouts);
      } catch (err) {
        console.error(err);
      }
    };
    getUserWorkouts();
  }, [userId]);
  console.log("userWorkouts are:", userWorkouts);

  const handleLogout = () => {
    dispatch(logoutUserActionCreator());
  };

  return (
    <div>
      HomePage
      <button className="signupButton" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
