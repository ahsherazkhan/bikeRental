import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import Home from "./components/Home";
import Bookings from "./components/Bookings";
import OtherUserProfile from "./components/OtherUserProfile";
import ForgotPassword from "./components/ForgotPassword";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreatePost /> },
  { path: "/login", element: <Login /> },
  { path: "/bookings", element: <Bookings /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:userid", element: <OtherUserProfile /> },
  { path: "/forgotpassword", element: <ForgotPassword /> },
];
