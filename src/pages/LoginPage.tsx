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
    <div className="h-100 my-0 mx-auto flex w-1/4">
      <div id="login-container" className="m-10 w-full p-7 text-center">
        <div className="text-slate-600">Welcome to Workout Tracker!</div>
        <form
          className="mb-10 mt-3 flex flex-col items-center justify-center rounded-lg bg-slate-600 px-3 py-10"
          onSubmit={handleSubmit}
        >
          <input
            className="mb-5 block w-60"
            type="text"
            required
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleSetUsername}
          />
          <input
            className="mb-5 block w-60"
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleSetPassword}
          />
          <button
            className="m-2 rounded-full bg-blue-600 py-2 px-4 font-bold text-white hover:opacity-50"
            type="submit"
          >
            Login
          </button>
        </form>
        <button
          className="m-2 rounded-full bg-blue-600 py-2 px-4 font-bold text-white hover:opacity-50"
          onClick={handleModal}
        >
          Signup
        </button>
      </div>
      {showSignupModal && <SignupModal handleModal={handleModal} />}
    </div>
  );
};
