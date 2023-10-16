import React, { useEffect, useState } from 'react';
import { handleLogin } from './loginSlice';
import { useAppDispatch } from '../../store/store';
import { UserDetails, initialUserProfile } from '../profile/profileSlice';
import { auth } from '../../config/IntialiseFirebase';

// export default function Login() {
//   const auth = getAuth();
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const loading = useAppSelector((state) => state.commonData.loading);

//   // const microsoftLogin = () => {
//   //   // set login true in Local Storage
//   //   LOCAL_STORAGE.isLoading(true);
//   //   dispatch(handleLoginFlow());
//   // };

//   // return (
//   //   <div className="home">
//   //     {loading ? <Loading /> : null}
//   //     <div className="logo">
//   //       <img
//   //         src={require("../../assets/logo.png")}
//   //         alt="University of Windsor"
//   //       />
//   //     </div>
//   //     {/* <div className="home-qwin-logo">
//   //       <img src={require("../../assets/qwin-logo.jpg")} alt="Qwin Logo" />
//   //     </div> 
//   //     <div className="home-intro">
//   //       Note <br /> Use Your University Microsoft Account To Login <br /> Please Allow Location Permission
//   //     </div>
//   //     <button onClick={microsoftLogin} type="button">
//   //       Login
//   //     </button> */}
//   //     <br />
//   //     <div className="loginfield-username">
//   //       <input type="text" placeholder="Username" />
//   //     </div>
//   //     <div className="loginfield-password">
//   //       <input type="password" placeholder="Password" />
//   //     </div>
//   //     <span className="btn bg-light mt-3"
//   //       style={{ fontSize: "1.5em" }}>Forgot Password?</span>
//   //     <span
//   //       className="btn bg-light mt-3"
//   //       style={{ fontSize: "1.5em" }}
//   //       onClick={()=>navigate('/home')}>
//   //       Login
//   //     </span>
//   //   </div>
//   // );
// }


const Login = () => {
      const [formData, setFormData] = useState({
        email: '',
        password: '',
  });

  const dispatch = useAppDispatch();
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

const handleLoggin = async () => {
  const { email, password } = formData;
  try {
    // Sign in the user using Firebase Authentication
    const userCredential = await auth.signInWithEmailAndPassword(email, password);

    if (userCredential.user) {
      const user: UserDetails = { ...initialUserProfile };
      user.email = userCredential.user.email || "";
      user.userID = userCredential.user.uid;

      // Now you have the user details in the 'user' object
      console.log(user);
      window.location.href = "/home";
      // You can navigate the user to the home page

    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Login failed. Please check your credentials.');
  }
};


return (
  <div className='home'>
    <div className="logo">
      <img
      src={require("../../assets/logo.png")}
      alt="University of Windsor"
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
    <span className="btn bg-light mt-3" style={{ fontSize: "1.5em" }}>
      Forgot Password?
    </span>
    <span
      className="btn bg-light mt-3"
      style={{ fontSize: "1.5em" }}
      onClick={handleLoggin}>
      Login
    </span>
  </div>
    );
  };

// export default Login;
export default Login;


