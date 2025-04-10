import React from "react";
import "./Imagelinkform.css";

const Imagelinkform = ({ oninputchange, onbuttonsubmit }) => {
  return (
    <div>
      <p className="f3 ">
        {"this magic brain will detect faces in your pictures. give it a try!"}
      </p>
      <div className="center">
        <div className="center form pa3 br4 shadow-5">
          <input
            id="inpu"
            className="f3 pa3 pv3 w-70 center"
            type="text"
            onChange={oninputchange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onbuttonsubmit}
          >
            detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Imagelinkform;
