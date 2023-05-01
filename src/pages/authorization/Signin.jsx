import React from "react";
import { socket } from "../../socket";
import { loginUser } from "./authApi";
import { useDispatch } from "react-redux";
import { login } from "./authorizationSlice";

function Signin({ setToggle }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    console.log('formValues', formValues);
    handleLogin(formValues)
  }

  const handleLogin = (formValues) => {
    dispatch(login(formValues));
  }
  return (
    <div className="signup-form">
      <div className="container">
        <div className="header">
          <h1>Sign In to your Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <i className="fa-solid fa-user" />
            <input type="text" name="username" placeholder="Username" />
          </div>
          <div className="input">
            <i className="fa-solid fa-lock" />
            <input type="password" name="password" placeholder="Password" />
          </div>
          <input
            className="signup-btn"
            type="submit"
            value="SIGN IN"
          />
        </form>
        <p>Or sign in with</p>
        <div className="social-icons">
          <i className="fa-brands fa-facebook-f" />
          <i className="fa-brands fa-twitter" />
          <i className="fa-brands fa-google" />
        </div>
        <p>
          Dont have an account{" "}
          <a href="#" onClick={() => setToggle(true)}>
            sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
