import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleLogin = () => {
    // Simulate a login request to your backend for user authorization.
    // Replace this with actual authentication logic.
    const { email, password } = formData;

    // Check if email and password are valid (e.g., by sending a request to your server).
    if (email === 'demo' && password === 'password') {
      // If credentials are valid, you can navigate the user to the home page.
      navigate('/home'); // Use navigate to change routes
    } else {
      // If credentials are not valid, you can display an error message.
      alert('Invalid email or password');
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
        onClick={handleLogin}
      >
        Login
      </span>
    </div>
  );
};

export default Login;