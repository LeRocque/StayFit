import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    });
    setUsername("");
    setPassword("");
    if (response.ok) {
      const returnedUserId = await response.json();
      setUserId(returnedUserId);
      navigate(`/home?userId=${userId}`);
    } else {
      // SHOW SIGNUP MODAL
    }
  };
  return (
    <div>
      <div>Welcome to Workout Tracker!</div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          name="username"
          placeholder="Enter your username"
          value={username}
          onChange={handleSetUsername}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handleSetPassword}
        />
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
