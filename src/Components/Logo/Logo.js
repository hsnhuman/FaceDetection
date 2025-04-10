import React from "react";
import Tilt from "react-parallax-tilt";
import "./Logo.css";
import brain from "./Brain 2.png";
const Logo = () => {
  return (
    <div className="ma4 mt0 ">
      <Tilt
        className="br2 shadow-2"
        options={{ max: 25 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="pa 3">
          <img alt="brain" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};
export default Logo;
