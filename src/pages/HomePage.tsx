import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [userWorkouts, setUserWorkouts] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("userId");
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
  return <div>HomePage</div>;
};

export default HomePage;
