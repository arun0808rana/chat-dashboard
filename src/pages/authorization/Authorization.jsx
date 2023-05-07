import React, { useEffect } from "react";
import { useState } from "react";
import "./Authorization.css";
import Signup from "./Signup";
import Signin from "./Signin";

function Authorization() {
  const [toggle, setToggle] = useState(false);
  return (
    <>
    {toggle ? (
        <Signup setToggle={setToggle} />
      ) : (
        <Signin setToggle={setToggle} />
      )}
    </>
  );
}

export default Authorization;
