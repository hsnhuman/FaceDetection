import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="relative center ma">
      <div className="absolute mt2">
        {imageUrl ? (
          <>
            <img
              id="inputimage"
              alt=""
              src={imageUrl}
              width="500px"
              height="auto"
            />
            {box && (
              <div
                className="bounding_box"
                style={{
                  left: box.leftCol,
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                }}
              ></div>
            )}
          </>
        ) : (
          <p>No image to display</p> // Optional: Show a message when no image is given
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
