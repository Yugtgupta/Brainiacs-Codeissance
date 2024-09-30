import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const appDispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "http://localhost:4000/login-student", // Replace with your login endpoint
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        appDispatch({ type: "login", data: response.data });
        setErrorMessage("");
        console.log(successMessage);
      }
    } catch (error) {
      setErrorMessage("Failed to login. Please check your credentials.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="registration-page h-[100svh]">
      <div className="form-container">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
          <Link
            to="/"
            className="submit-button bg-transparent text-black mt-3 w-fit"
          >
            Go Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
