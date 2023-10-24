import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LOCAL_STORAGE } from "../config/localStorage";
import Login from "../layouts/login/Login";
import Signup from "../layouts/login/Signup";
import {
  getUserFromFirestore,
  getUserLocal,
} from "../layouts/login/loginSlice";
import ManageEvents from "../layouts/manageEvent/ManageEvents";
import Profile from "../layouts/profile/Profile";
import UserHomePage from "../layouts/userHomePage/UserHomePage";
import Dashboard from "../layouts/dashboard/Dashboard";
import Test from "../layouts/dashboard/Test";
import CreateProjectForm from "../layouts/DemoDay/CreateProjectForm";
import ChooseProjects from "../layouts/DemoDay/ChooseProjects";
import DemodaypageComponant from "../layouts/DemodayPage/DemodaypageComponant";
import QrScan from "../layouts/verification/QRScanner";
import Verification from "../layouts/verification/Verification";
import { useAppDispatch } from "../store/store";
import { log } from "console";
import { USER_ROLES } from "../config/helper";
import CreateDemoDayEvent from "../layouts/DemoDay/CreateDemoDayEvent";
import ResetPassword from "../layouts/login/ResetPassword";
// import Dashboard from "../components/dashboard/Dashboard";
// import NotProtectedRoute from "./NotProtectedRoute";
// import EventDetail from "../components/event/EventDetail";
// import User from "../components/user/User";
// import ProtectedRoute from "./ProtectedRoute";
// import People from "../components/people/People";
// import CreateEditEvent from "../components/event/CreateEditEvent";
// import Settings from "../components/settings/Settings";
// import Authenticate from "../components/auth/Authenticate";

const Router = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = LOCAL_STORAGE.getUser();
    if (user) dispatch(getUserFromFirestore(user.userID));
    else {
      // window.location.href = "/login";
    }
    dispatch(getUserLocal());
    if (user === null || !user.email) {
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    if (user?.userRole !== "Admin") {
      if (
        window.location.pathname === "/dashboard" ||
        window.location.pathname === "/create-event" ||
        window.location.pathname === "/start-verification" ||
        window.location.pathname === "/demoday-choose-project"
      ) {
        window.location.href = "/home";
      }
    } else {
      if (window.location.pathname === "/profile") {
        window.location.href = "/home";
      }
    }

    return () => {};
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<UserHomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-event" element={<ManageEvents />} />
        <Route path="/events/:id?" element={<ManageEvents />} />
        <Route path="/start-verification" element={<Verification />} />
        <Route path="/qr-scanner" element={<QrScan />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dempday-create-project" element={<CreateProjectForm />} />
        <Route path="/demoday-choose-project" element={<ChooseProjects />} />
        <Route path="/demoday-page" element={<DemodaypageComponant />} />
        <Route
          path="/create-demo-day-event/:id?"
          element={<CreateDemoDayEvent />}
        />
        <Route path="/" element={<UserHomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
