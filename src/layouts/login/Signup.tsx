import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../config/IntialiseFirebase';


const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            // Step 2: Save user data to Firestore
            if (userCredential.user != null) {
                await firestore.collection('users').doc(userCredential.user.uid).set({
                    name: name,
                    email: email,
                });

                // If registration is successful, you can navigate the user to the home page.
                navigate('/home');
            }
        } catch (error) {
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
