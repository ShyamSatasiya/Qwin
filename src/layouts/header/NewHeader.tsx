import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE } from "../../config/localStorage";
import { USER_ROLES } from "../../config/helper";
import { getAuth } from "firebase/auth";

export default function NewHeader() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(LOCAL_STORAGE.getUserRole());
  const handleSignout = async () => {
    console.log("Signout");
    try {
      // Sign the user out using Firebase Authentication
      await getAuth().signOut();
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle signout error if needed
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function fetchUserRole() {
      const data = await localStorage.getItem("UserRole");
      console.log(data); // No need for 'await' here
      let newData;

      if (data !== null) {
        try {
          newData = JSON.parse(data);
          if (!newData) {
            console.log("Data is not a valid JSON object.");
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
          newData = null; // Set to null if parsing fails
        }
      } else {
        console.log("No User Role Found");
        // Handle the case where 'data' is null (e.g., item doesn't exist)
      }
      // Set userRole in the component's state
      setUserRole(newData?.UserRole || null);
    }
    fetchUserRole();
  }, []); // Run this effect only once

  if (userRole === null) {
    // Show a loading state until userRole is fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav id="sidebar-menu">
        <div className="avatar avatar-xl position-relative">
          <img
            src={require("../../assets/qwin-logo.jpg")}
            alt="profile_image"
            className="w-100 border-radius-lg shadow-sm"
          />
        </div>
        <div className="user-info">
          <h5 className="mb-1 color-white-imp" style={{ fontSize: "2em" }}>
            Qwin
          </h5>
          <p className="mb-0 font-weight-bold text-sm">By Quent</p>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <span className="nav-link alink" onClick={() => navigate("/home")}>
              <i
                className="fa-solid fa-list alink color-white-imp"
                style={{ fontSize: "18px" }}
              ></i>
              <span
                className="ms-1 color-white-imp"
                style={{ fontSize: "18px" }}
              >
                Events
              </span>
            </span>
          </li>
          {userRole === USER_ROLES.Professor ||
          userRole === USER_ROLES.Admin ? (
            <li className="nav-item">
              <span
                className="nav-link alink"
                onClick={() => navigate("https://uwin-demoday.vercel.app/")}
              >
                <i
                  className="fa-solid fa-id-card alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  DemoDay
                </span>
              </span>
            </li>
          ) : null}
          {userRole === USER_ROLES.Student ? (
            <li className="nav-item">
              <span
                className="nav-link alink"
                onClick={() =>
                  (window.location.href = "https://uwin-demoday.vercel.app/")
                }
              >
                <i
                  className="fa-solid fa-id-card alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  DemoDay
                </span>
              </span>
            </li>
          ) : null}

          {userRole === USER_ROLES.Admin ? (
            <li className="nav-item">
              <span
                className="nav-link alink"
                onClick={() => navigate("/create-event")}
              >
                <i
                  className="fa-solid fa-plus alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  Create
                </span>
              </span>
            </li>
          ) : null}
          {userRole === USER_ROLES.Student ? (
            <li className="nav-item">
              <span
                className="nav-link alink"
                onClick={() => navigate("/qr-scanner")}
              >
                <i
                  className="fa-solid navbar-icon fa-qrcode alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  Scan QR
                </span>
              </span>
            </li>
          ) : null}
          {userRole === USER_ROLES.Admin ? (
            <li className="nav-item">
              <span
                className="nav-link alink"
                onClick={() => navigate("/dashboard")}
              >
                <i
                  className="fa-solid navbar-icon fa-table alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  Dashboard
                </span>
              </span>
            </li>
          ) : null}
          {userRole === USER_ROLES.Student ? (
            <li className="nav-item">
              <span
                className="nav-link alink active"
                onClick={() => navigate("/profile")}
              >
                <i
                  className="fa-regular navbar-icon fa-user text-reset alink color-white-imp"
                  style={{ fontSize: "18px" }}
                ></i>
                <span
                  className="ms-1 color-white-imp"
                  style={{ fontSize: "18px" }}
                >
                  Profile
                </span>
              </span>
            </li>
          ) : null}
          <li className="nav-item">
            <span className="nav-link alink" onClick={handleSignout}>
              <i
                className="fa-solid fa-sign-out alink color-white-imp"
                style={{ fontSize: "18px" }}
              ></i>
              <span
                className="ms-1 color-white-imp"
                style={{ fontSize: "18px" }}
              >
                Sign Out
              </span>
            </span>
          </li>
        </ul>
      </nav>

      <div className="overlay"></div>
    </>
  );
}
