import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { logoutUserActionCreator } from "../actions/actions";
import { useAppDispatch } from "../hooks";

const HomePage = () => {
  const { userId } = useParams();
  const [userWorkouts, setUserWorkouts] = useState([]);

  const dispatch = useAppDispatch();
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
