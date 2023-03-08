import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { SIGNUP_USER } from "../gqloperations/mutations";
import { Link } from "react-router-dom";
export default function Signup() {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  if (loading) return <h1>Loading</h1>;

  const hadleChange = (e) => {
    //spread is used to not destroy the existing value in the state
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //when user taps on signup button
  const Submit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };
  return (
    <div className="container">
      {error && <div className="red ">{error.message}</div>}
      {data && data.user && (
        <div className="green ">{data.user.firstName} is Signed Up</div>
      )}
      <h1>Sign Up</h1>
      <form onSubmit={Submit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={hadleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={hadleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={hadleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={hadleChange}
          required
        />
        <Link to="/login">
          <p>Already have an account ?</p>
        </Link>
        <button className="btn #673ab7 Black" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
