import { useEffect, useState } from "react"
import { useAppSelector } from "../../store/store"
import EventCard from "../eventsList/EventCard"
import EventList from "../eventsList/EventsList"
import NewHeader from "../header/NewHeader"
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

export default function UserHomePage() {
  const navigate = useNavigate();
  const [selectedView, setSeletectedView] = useState<"event" | "myEvent">(
    "event"
  );
  const user = useAppSelector((state) => state.login);
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
  useEffect(() => {
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
  }, []);
  return (
    <div className="home-page-background">
      <div>
        <NewHeader />
      </div>

      <span
        className="btn bg-light mt-3"
        style={{ fontSize: "1.5em" }}
        onClick={handleSignout}
      >
        Sign Out{" "}
      </span>

      {/* {isAdmin() ? null : (
        <div className="button-container">
          <button
            id={`upcoming-events-btn`}
            className={`${selectedView === "event" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("event")}
          >
            Events
          </button>
          <div className="separator"></div>
          <button
            id={`my-events-btn`}
            className={`${selectedView === "myEvent" ? "button-active" : ""}`}
            onClick={(e) => setSeletectedView("myEvent")}
          >
            My Bookings
          </button>
        </div>
      )} */}

      {selectedView === "event" ? (
        <EventList />
      ) : (
        <div>
          {user.user_events ? (
            user.user_events.map((event) => (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <h1>No Registered Events</h1>
          )}
        </div>
      )}
    </div>
  );
}
