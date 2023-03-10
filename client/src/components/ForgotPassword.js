import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD } from "../gqloperations/mutations";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [forgotPassword, { error, loading, data }] =
    useMutation(FORGOT_PASSWORD);

  if (loading) return <h1>Loading</h1>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Submit = (e) => {
    e.preventDefault();
    forgotPassword({
      variables: {
        userSignin: formData,
      },
    });
  };
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}
      <h5>Forgot Password</h5>
      <form onSubmit={Submit}>
        <input
          type="email"
          placeholder="Type your email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Enter new password"
          name="password"
          onChange={handleChange}
          required
        />
        <Link to="/signup">
          <p>Dont have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Reset
        </button>
      </form>
    </div>
  );
}
