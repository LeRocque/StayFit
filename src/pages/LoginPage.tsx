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

  // useEffect hook that will trigger on initial page load and any time dispatch is called
  useEffect(() => {
    // function that will make a fetch request to our '/workout/images' endpoint. The backend will interact with the workout API and return workout images to us. We will then store these images in our redux store via the setImages action creator
    const getWorkoutImages = async () => {
      try {
        const result = await fetch("/workout/images");
        const images = (await result.json()) as ImagesState;

        dispatch(setImages(images));
      } catch (err) {
        // if there is an error fetching images from the API we will log it and notify the user
        console.error(err);
        setErrorMessage("An error occured fetching images");
      }
    };
    void getWorkoutImages();
  }, [dispatch]);

  // function that will update showSignupModals boolean value with its opposite
  const handleModal = (): void => {
    setShowSignupModal(!showSignupModal);
  };

  // function that will update username state with the text inputted by the user in our form
  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };
  // function that will update password state with the text inputted by the user in our form
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // function that will make a fetch request to our '/user/login' endpoint. We will send the username and password state in our body to the backend. The backend will attempt to login the user with their provided credentials. We will then update username and password state back to its original empty string value
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
      // if the user is successfully logged in we will send their username to our redux store via the userLogin action creator and we will redirect the user to the '/home/userId' endpoint. If the user was not successfully logged in we will alert them of an invalid username or password if the response code is 401, or we will alert them that both fields are required if the response code is 400
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
      // if an error occurs we will log it and notify the user of this error
      console.error(err);
      setErrorMessage("An error occured while attempting to log in");
    }
  };

  // we will create and render a div that serve as the landing page for our App! If there is an errorMessage we will render a div that contains that message as well as a button to dismiss the error message.
  // we will create a render a form that will contain text inputs for a username and password as well as a login button that will trigger our handleSubmit function to send the user inputted name and password to the backend.
  // we will also create a signup button that will show our SignupModal when clicked.
  // Finally we will include a div that contains two paragraphs of text to let the user know that this app is completely free of charge, and that they should signup or login to begin!
  return (
    <div className="flex h-screen flex-col items-center justify-center  bg-gradient-to-br from-blue-200 via-blue-500 to-blue-700">
      <div className="mb-10 rounded-md bg-white p-4 text-center shadow-lg">
        <h1 className="mb-7 font-semibold text-blue-800 md:text-xl lg:text-xl xl:text-2xl">
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
          className="mb-5 mt-3 flex flex-col items-center justify-center rounded-lg bg-slate-400 px-1 py-5"
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
        <div className="lg:text-md mt-4 text-center md:mt-8 md:text-sm xl:text-lg">
          <p className="lg:text-md text-base font-semibold text-blue-600 md:text-sm xl:text-lg">
            This app is completely free of charge
          </p>
          <p className="lg:text-md mt-2 text-base font-semibold text-blue-600 md:text-sm xl:text-lg">
            Login or Signup to begin
          </p>
        </div>
      </div>
      {showSignupModal && <SignupModal handleModal={handleModal} />}
    </div>
  );
};

export default LoginPage;
