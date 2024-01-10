import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { UserToken } from "../../Token/UserToken";
import UserService from "../../Service/UserService";
import PhoneService from "../../Service/PhoneService";
import NameService from "../../Service/NameService";
import AuthService from "../../Service/AuthService";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [secondaryPhoneError, setSecondaryPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [user_type, setUser_type] = useState<string>("general");
  const {
    authorised,
    setAuthorised,
    userId,
    setUserId,
    userType,
    setUserType,
  } = useContext(UserToken);

  let navigate = useNavigate();
  useEffect(() => {
    if (authorised === "true") {
      navigate("/home");
    }
  }, [authorised]);

  const handleSignup = () => {
    const emailCheckerURL =
      "http://localhost:8080/api/users/search/findUserByEmail?email=" + email;
    let uniqueEmail: boolean = false;
    const fetchEmail = async () => {
      const response = await fetch(emailCheckerURL);
      if (response.status === 200) {
        setEmailError("Email already exists");
      } else {
        setEmailError("");
        uniqueEmail = true;
      }
    };
    fetchEmail().then(() => {
      if (uniqueEmail) {
        let user = {
          email: email,
          address: address,
          password: password,
        };
        UserService.signup(user).then((response) => {
          let phoneOne = {
            phoneNumber: phone,
            userId: response.data,
          };
          PhoneService.insert(phoneOne).then((response_phone_one) => {
            let auth = {
              user: response.data,
              type: user_type,
            };
            AuthService.insert(auth).then((response_auth) => {
              let name = {
                firstName: firstName,
                lastName: lastName,
                user: response.data,
              };
              NameService.insert(name).then((response_name) => {
                if (secondaryPhone !== "") {
                  let phoneTwo = {
                    phoneNumber: secondaryPhone,
                    userId: response.data,
                  };
                  PhoneService.insert(phoneTwo).then();
                }
                setUserId(response.data.userId.toString());
                setUserType(user_type);
                setAuthorised("true");
              });
            });
          });
        });
      }
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one letter, one number, and be at least 4 characters long"
      );
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== "" &&
      password.trim() !== "" &&
      emailError === "" &&
      passwordError === "" &&
      firstNameError === "" &&
      lastNameError === "" &&
      phoneError === "" &&
      addressError === ""
    );
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    if (e.target.value.trim() === "") {
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (e.target.value.trim() === "") {
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.trim() === "") {
      setPhoneError("Phone number is required");
    } else {
      setPhoneError("");
    }
  };

  const handleSecondaryPhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondaryPhone(e.target.value);
    setSecondaryPhoneError("");
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim() === "") {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };

  return (
    <div className="flex justify-center items-center background_image_login overflow-y-auto">
      <div className="w-1/3 bg-black bg-opacity-75 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-white">Sign Up</h2>

        <div className="mb-4">
          <div className="flex">
            <div className="mr-2 flex-grow">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  firstNameError ? "border-red-500" : ""
                }`}
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              {firstNameError && (
                <p className="text-red-500 text-xs italic">{firstNameError}</p>
              )}
            </div>
            <div className="flex-grow">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  lastNameError ? "border-red-500" : ""
                }`}
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
              {lastNameError && (
                <p className="text-red-500 text-xs italic">{lastNameError}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              emailError ? "border-red-500" : ""
            }`}
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
          />
          {emailError && (
            <p className="text-red-500 text-xs italic">{emailError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              phoneError ? "border-red-500" : ""
            }`}
            id="phone"
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={handlePhoneChange}
          />
          {phoneError && (
            <p className="text-red-500 text-xs italic">{phoneError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="secondaryPhone"
          >
            Secondary Phone <span className="text-green-400">(Optional)</span>
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              secondaryPhoneError ? "border-red-500" : ""
            }`}
            id="secondaryPhone"
            type="text"
            placeholder="Enter your secondary phone number"
            value={secondaryPhone}
            onChange={handleSecondaryPhoneChange}
          />
          {secondaryPhoneError && (
            <p className="text-red-500 text-xs italic">{secondaryPhoneError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              addressError ? "border-red-500" : ""
            }`}
            id="address"
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
          />
          {addressError && (
            <p className="text-red-500 text-xs italic">{addressError}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              passwordError ? "border-red-500" : ""
            }`}
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
          {passwordError && (
            <p className="text-red-500 text-xs italic">{passwordError}</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`${
              isFormValid()
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleSignup}
            disabled={!isFormValid()}
          >
            Sign Up
          </button>
          <p className="text-white text-sm">
            Already registered?{" "}
            <Link to="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
