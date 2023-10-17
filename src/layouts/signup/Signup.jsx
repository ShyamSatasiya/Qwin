import React, { useState } from "react";
import "./Signup.css";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your signup logic here (e.g., sending data to an API)
    try {
      await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      // User created successfully
      console.log("User created successfully!");
    } catch (error) {
      // Handle error
      console.error("Error creating user:", error.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
