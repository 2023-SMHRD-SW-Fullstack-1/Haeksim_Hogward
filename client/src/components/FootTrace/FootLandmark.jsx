import React from "react";

const FootLandmark = ({ pingLeft, pingTop }) => {
  return (
    <>
      <img
        src="/ping.png"
        alt=""
        style={{
          position: "absolute",
          width: "40px",
          height: "50px",
          left: `${pingLeft - 17}px`,
          top: `${pingTop - 50}px`,
        }}
      />
    </>
  );
};

export default FootLandmark;
