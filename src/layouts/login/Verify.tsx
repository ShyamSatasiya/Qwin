import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { getAuth } from 'firebase/auth';


export default function Verify() { 
      const fetchUser = async () => {
        try {
          // Use localStorage.getItem with await and handle the promise
          const user = await localStorage.getItem("user");
  
          // Check if 'user' exists and has an email property
          if (user) {
            const parsedUser = JSON.parse(user);
            if (parsedUser.email) {
              // User has an email, you can continue with your logic
            } else {
              // Redirect to the login page if email is missing
              window.location.href = "/login";
            }
          } else {
            // Redirect to the login page if 'user' is missing
            window.location.href = "/login";
          }
        } catch (error) {
          // Handle errors, e.g., display an error message or log the error
          console.error("Error fetching user:", error);
        }
      };
  
      fetchUser();
    }
