import React from "react";

const Navigation = ({ onroutechange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <p
          onClick={() => onroutechange("Signout")}
          className="f3 link dim  black underline pa3 pointer"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
        }}
      >
        <p
          onClick={() => onroutechange("Register")}
          className="f3 link dim  black underline pa3 pointer"
        >
          Register
        </p>
        <p
          onClick={() => onroutechange("Signin")}
          className="f3 link dim  black underline pa3 pointer"
        >
          Sign in
        </p>
      </nav>
    );
  }
};

export default Navigation;
