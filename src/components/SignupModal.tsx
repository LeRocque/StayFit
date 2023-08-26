import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { SignupModalProps } from "../frontendTypes";

export const SignupModal = ({ handleModal }: SignupModalProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      handleModal();
    }
  };
  const handleModalKeyPress = (
    e: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (e.key === "Enter") {
      handleModal();
    }
  };

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
      if (response.ok) {
        setEmail("");
        setFirstName("");
        setLastName("");
        setAddress("");
        setUsername("");
        setPassword("");
        handleModal();
      } else if (response.status === 401) {
        alert("username already exists, please select another");
        setUsername("");
      } else if (response.status === 400) {
        alert("all fields required");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      id="signupModalContainer"
      onClick={handleModalClick}
      onKeyDown={handleModalKeyPress}
      role="button"
      tabIndex={0}
    >
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          className="search-input"
          name="email"
          placeholder="Enter your email address"
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
      </form>
    </div>
  );
};
