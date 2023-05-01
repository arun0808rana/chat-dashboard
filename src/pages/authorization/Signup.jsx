import React from "react";

function Signup({setToggle}) {
  return (
    <div className="signup-form">
    <div className="container">
      <div className="header">
        <h1>Create an Account</h1>
      </div>
      <form>
        <div className="input">
          <i className="fa-solid fa-user" />
          <input type="text" placeholder="Username" />
        </div>
        <div className="input">
          <i className="fa-solid fa-envelope" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <i className="fa-solid fa-lock" />
          <input type="password" placeholder="Password" />
        </div>
        <input
          className="signup-btn"
          type="submit"
          value="SIGN UP"
        />
      </form>
      <p>Or sign up with</p>
      <div className="social-icons">
        <i className="fa-brands fa-facebook-f" />
        <i className="fa-brands fa-twitter" />
        <i className="fa-brands fa-google" />
      </div>
      <p>
        Already have an account{" "}
        <a href="#" onClick={() => setToggle(false)}>
          sign in
        </a>
      </p>
    </div>
  </div>
  );
}

export default Signup;
