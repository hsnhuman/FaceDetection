import React from "react";

const Rank = ({ Name, entries }) => {
  return (
    <div>
      <div className="white f3">
        {`${Name}, your current entry count is ...`} {}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

export default Rank;
