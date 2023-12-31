import React, { ChangeEvent, FormEvent, useState } from "react";
import { SignupModalProps } from "../frontendTypes";

export const SignupModal = ({ handleModal }: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // functions to update state with current values inputted by user in our form
  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handleSetFirstName = (e: ChangeEvent<HTMLInputElement>): void => {
    setFirstName(e.target.value);
  };
  const handleSetLastName = (e: ChangeEvent<HTMLInputElement>): void => {
    setLastName(e.target.value);
  };
  const handleSetAddress = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };
  const handleSetUsername = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // if user clicks enter on modal div, we will close the modal
  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleModal();
    }
  };

  // function that will make fetch request to our signup endpoint. We will send the state values that hold the user inputted email, firstName, lastName, address, username, and password in our body
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          address: address,
          username: username,
          password: password,
        }),
      });
      // if user was successfully created we will update the values for the states related to the form fields with an empty string (reset the form). If we get back a 401 we will alert the user that the inputted username already exists and we will reset the username field. If we get back a 400 we will alert the user that all fields are required
      if (response.ok) {
        setEmail("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setUsername("");
        setPassword("");
        handleModal();
        alert("Thank you for signing up! Please login");
      } else if (response.status === 401) {
        alert("username already exists, please select another");
        setUsername("");
      } else if (response.status === 400) {
        alert("all fields required");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred while attempting to sign up");
    }
  };

  // we will create and render a div that will contain our form. If an error occurs we will render a div to describe the error to the user (this will also include a button to remove the message for the user). Our form will have input fields for email, firstName, lastName, address, username, and password. They will all be text inputs
  return (
    <div
      className="position-fixed fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-opacity-90 bg-gradient-to-br from-blue-200 via-blue-500 to-blue-700"
      onKeyDown={handleModalKeyPress}
      role="button"
      tabIndex={0}
    >
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
        className="signup-form"
        onSubmit={handleSubmit}
        data-testid="signup-form"
      >
        <input
          type="text"
          required
          className="search-input"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleSetEmail}
        />
        <input
          type="text"
          required
          className="search-input"
          name="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={handleSetFirstName}
        />
        <input
          type="text"
          required
          className="search-input"
          name="lastName"
          placeholder="Enter your last name"
          value={lastName}
          onChange={handleSetLastName}
        />
        <input
          type="text"
          required
          className="search-input"
          name="address"
          placeholder="Enter your address"
          value={address}
          onChange={handleSetAddress}
        />
        <input
          type="text"
          required
          className="search-input"
          name="username"
          placeholder="Enter a username"
          value={username}
          onChange={handleSetUsername}
        />
        <input
          type="password"
          required
          className="search-input"
          name="password"
          placeholder="Enter a password"
          value={password}
          onChange={handleSetPassword}
        />
        <button className="button-theme" type="submit">
          Submit
        </button>
        <button
          className="button-theme"
          type="button"
          onClick={() => handleModal()}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
