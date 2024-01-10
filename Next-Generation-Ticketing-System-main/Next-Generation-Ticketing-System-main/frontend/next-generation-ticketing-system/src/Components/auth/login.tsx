import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Token/UserToken";
import UserService from "../../Service/UserService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const {
    authorised,
    userId,
    userType,
    setAuthorised,
    setUserId,
    setUserType,
  } = useContext(UserToken);

  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "true") {
      navigate("/home");
    }
  }, [authorised]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must contain at least one alphabet and one number, and be at least 4 characters long"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let user = {
      email: email,
      password: password,
    };

    UserService.login(user).then((response) => {
      if (response.data === false) {
        setEmailError("Email or password is incorrect");
        setEmail("");
        setPasswordError("Email or password is incorrect");
        setPassword("");
      } else {
        UserService.findUserByEmail(email).then((res) => {
          let tempUserId = res.data._links.self.href.split("/").pop();
          setUserId(tempUserId.toString());
          UserService.findByUser(tempUserId).then((resp) => {
            setUserType(resp.data._embedded.auths[0].type);
            setAuthorised("true");
          });
        });
      }
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;
    return passwordRegex.test(password);
  };

  const isButtonDisabled =
    !email || !password || !!emailError || !!passwordError;

  return (
    <div className="flex justify-center items-center h-screen background_image_login">
      <div className="w-1/3 bg-black bg-opacity-75 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-white font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                emailError ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {emailError && (
              <p className="text-red-500 text-xs italic">{emailError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-white font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                passwordError ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`bg-blue-500 text-white rounded px-4 py-2 font-bold ${
                isButtonDisabled ? "bg-gray-500 cursor-not-allowed" : ""
              }`}
              disabled={isButtonDisabled}
            >
              Login
            </button>
            <p className="text-white text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
