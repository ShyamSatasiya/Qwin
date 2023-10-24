import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../config/IntialiseFirebase";
import logo from "../../assets/logo.png"; // Import your logo image
import { UserDetails, initialUserProfile } from "../profile/profileSlice";
import { getUserFromFirestore } from "./loginSlice";
import { useAppDispatch } from "../../store/store";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoggin = async () => {
    const { email, password } = formData;
    try {
      // Sign in the user using Firebase Authentication
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (userCredential?.user) {
        const user: UserDetails = { ...initialUserProfile };
        user.email = userCredential.user.email || "";
        user.userID = userCredential.user.uid;

        // Now you have the user details in the 'user' object
        await localStorage.setItem("user", JSON.stringify(user));
        await dispatch(getUserFromFirestore(user.userID));
        navigate("/home");
        // await localStorage.setItem("UserRole", JSON.stringify(user.userRole));
        // window.location.href = "/home";

        // You can navigate the user to the home page
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  const navigateToSignup = () => {
    navigate("/signup");
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
              <h2 className="card-title text-center">Login</h2>
              <form>
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
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary" // Button color set to blue
                    onClick={handleLoggin}
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-3 ">
                <p>
                  Don't Have an account?{" "}
                  <Link to="/signup" style={{ color: "#cb0c9f" }}>
                    Sign up
                  </Link>
                </p>
                <p>
                  Forgot your password?{" "}
                  <Link to="/reset-password" style={{ color: "#cb0c9f" }}>
                    Reset Password
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

export default Login;
