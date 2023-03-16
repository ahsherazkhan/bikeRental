import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <nav>
      <div className="nav-wrapper #212121 black ">
        {token ? (
          <>
            <Link to="/" className="brand-logo">
              Riderent
            </Link>
            <ul id="nav-mobile" className="right ">
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/bookings">Bookings</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button
                  className="red btn"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul id="nav-mobile" className="right ">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}
