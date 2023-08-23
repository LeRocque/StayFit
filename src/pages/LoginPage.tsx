import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserActionCreator } from "../actions/actions";
import { SignupModal } from "../components/SignupModal";
import { useAppDispatch } from "../hooks";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleModal = () => {
    setShowSignupModal(!showSignupModal);
  };

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      setUsername("");
      setPassword("");
      if (response.ok) {
        const returnedUserId = await response.json();
        const returnedId = returnedUserId.user_id;
        dispatch(loginUserActionCreator(username));
        navigate(`/home/${returnedId}`);
      } else if (response.status === 401) {
        alert("Invalid username or password");
      } else if (response.status === 400) {
        alert("both fields required");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="my-0 mx-auto w-1/4">
      <div
        id="login-container"
        className="my-10 w-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-900 p-7 text-center"
      >
        <div>Welcome to Workout Tracker!</div>
        <form
          className="mb-10 flex flex-col items-center justify-center rounded-lg bg-slate-400 p-5 shadow-lg"
          onSubmit={handleSubmit}
        >
          <input
            className="m-1 text-lg"
            type="text"
            required
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleSetUsername}
          />
          <input
            className="m-1 text-lg"
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleSetPassword}
          />
          <button
            className="m-2 rounded-full bg-white py-2 px-4 font-bold text-blue-400 hover:text-blue-800"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="rounded-full bg-white py-2 px-4 font-bold text-blue-400 hover:text-blue-800"
          onClick={handleModal}
        >
          Signup
        </button>
      </div>
      {showSignupModal && <SignupModal handleModal={handleModal} />}
    </div>
  );
};
