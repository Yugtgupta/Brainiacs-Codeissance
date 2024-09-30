import React, { useContext, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";

const RegistrationPageMentor = () => {
  const [formData, setFormData] = useState({
    name: "laks",
    lName: "ch",
    email: "sam@gmail.com",
    password: "sdfghjk",
    contactNumber: "234567",
    address: "sdfghjk",
    city: "xcv",
    dob: "30-09-2000",
    educationLevel: "5",
    preferredSubjects: "sdfg",
    // mentorId: "",
    // academicPerformance: "",
    // forumPosts: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const appDispatch = useContext(DispatchContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("first");

    try {
      const response = await Axios.post(
        "http://localhost:4000/register-mentor",
        {
          ...formData,
        }
      );

      console.log("second");

      if (response.status === 200) {
        setSuccessMessage("Registration successful!");
        appDispatch({ type: "login", data: response.data });
        console.log("SUCCESS");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
      console.log("ERROR", error);
      setSuccessMessage("");
    }
  };

  return (
    <div className="registration-page">
      <div className="form-container">
        <h2 className="text-3xl font-bold mb-6">Mentor Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-10">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              id="lName"
              name="lName"
              value={formData.lName}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="educationLevel">Education Level</label>
            <select
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="preferredSubjects">Preferred Subjects</label>
            <input
              type="text"
              id="preferredSubjects"
              name="preferredSubjects"
              value={formData.preferredSubjects}
              onChange={handleChange}
              required
            />
          </div> */}

          <button type="submit" className="submit-button">
            Register
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

export default RegistrationPageMentor;
