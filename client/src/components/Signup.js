import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { SIGNUP_USER } from "../gqloperations/mutations";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn";
export default function Signup() {
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [Score, setScore] = useState(0);
  useEffect(() => {
    const Score = zxcvbn(String(password));
    setScore(Score.score);
  }, [password]);

  const [signupUser, { data, loading, error }] = useMutation(SIGNUP_USER);
  if (loading) return <h1>Loading</h1>;

  const Submit = (e) => {
    e.preventDefault();
    if (Score <= 3) {
      alert(
        "Password should be min 8 characters and should have alteast 1 uppercase and special character"
      );
    } else
      signupUser({
        variables: {
          userNew: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
          },
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
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <PasswordStrengthBar password={password} />
        <Link to="/login">
          <p>Already have an account ?</p>
        </Link>
        <Link to="/forgotpassword">
          <p>Forgot Password ?</p>
        </Link>
        <button
          className="btn #673ab7 Black"
          type="submit"
          disabled={password.length < 8}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
