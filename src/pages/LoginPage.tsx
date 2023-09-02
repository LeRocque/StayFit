import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../slices/usersSlice";
import { SignupModal } from "../components/SignupModal";
import { useAppDispatch } from "../hooks";
import { ImagesState, ReturnedUserId } from "../frontendTypes";
import { setImages } from "../slices/workoutsSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getWorkoutImages = async () => {
      try {
        const result = await fetch("/workout/images");
        const images = (await result.json()) as ImagesState;

        dispatch(setImages(images));
      } catch (err) {
        console.error(err);
        setErrorMessage("An error occured fetching images");
      }
    };
    void getWorkoutImages();
  }, [dispatch]);

  const handleModal = (): void => {
    setShowSignupModal(!showSignupModal);
  };

  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
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
        const returnedUserId = (await response.json()) as ReturnedUserId;
        const returnedId = returnedUserId.user_id;
        dispatch(userLogin(username));
        navigate(`/home/${returnedId}`);
      } else if (response.status === 401) {
        alert("Invalid username or password");
      } else if (response.status === 400) {
        alert("both fields required");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occured while attempting to log in");
    }
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center  bg-gradient-to-br from-blue-200 via-blue-500 to-blue-700">
      <div className="mb-10 rounded-md bg-white p-4 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-blue-800">
          Welcome to Stay Fit!
        </h1>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
            <button
              className="close-button"
              onClick={() => setErrorMessage(null)}
            >
              Dismiss Error
            </button>
          </div>
        )}
        <form
          className="mb-5 mt-3 flex flex-col items-center justify-center rounded-lg bg-slate-400 px-3 py-10"
          onSubmit={handleSubmit}
        >
          <input
            className="search-input"
            type="text"
            required
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleSetUsername}
          />
          <input
            className="search-input"
            type="password"
            required
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleSetPassword}
          />
          <button className="button-theme" type="submit">
            Login
          </button>
        </form>
        <button
          className="button-theme"
          onClick={handleModal}
          data-testid="signup-button"
        >
          Signup
        </button>
      </div>
      {showSignupModal && <SignupModal handleModal={handleModal} />}
    </div>
  );
};

export default LoginPage;
