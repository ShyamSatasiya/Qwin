import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { handleLoginFlow } from "./loginSlice";
import logo from "../../assets/logo.png"; // Import your logo image
import { auth } from "../../config/IntialiseFirebase";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);
    // Add your signup logic here (e.g., sending data to an API)
    if (formData.password === formData.confirmPassword) {
      try {
        await dispatch(
          handleLoginFlow(formData.name, formData.email, formData.password)
        );
        // User created successfully

        console.log("User created successfully!");
        navigate("/home");

        // window.location.href = "/home";
      } catch (error) {
        // Handle error
        console.error("Error creating user:", error);
      }
    } else {
      alert("Passwords do not match");
    }
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div className="text-center">
                <img
                  src={logo}
                  alt="Logo"
                  className="mb-4"
                  style={{ maxWidth: "100px" }}
                />
              </div>
              <h2 className="card-title text-center">Signup</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary mt-3">Sign Up</button>
                </div>
              </form>
              <div className="mt-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#cb0c9f" }}>
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
