import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../config/IntialiseFirebase';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { handleLoginFlow, loginWithMicrosoft } from "./loginSlice";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSignup =  async () => {
    // Simulate a signup request to your backend for user registration.
    // Replace this with actual registration logic.
    const { name, email, password } = formData;

    try {
            // Step 1: Create a new user account in Firebase Authentication
            // const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            // console.log('userCredential', userCredential);
            // Step 2: Save user data to Firestore
            dispatch(handleLoginFlow(email,password));
            }
         catch (error) {
            console.error('Error signing up:', error);
            alert('Registration failed. Please try again.');
        }
};

  return (
    <div className='home'>
      <div className="fname">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="email">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="password">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {/* <span className="btn bg-light mt-3" style={{ fontSize: "1.5em" }}>
        Sign Up
      </span> */}
      <span
        className="btn bg-light mt-3"
        style={{ fontSize: "1.5em" }}
        onClick={handleSignup}
      >
        Signup
      </span>
    </div>
  );
};

export default Signup;
