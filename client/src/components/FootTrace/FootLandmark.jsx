import React, { useEffect, useState } from "react";

// 인증 위치 깃발
const FootLandmark = ({ pingLeft, pingTop, divDelay }) => {
  const [showImage, setShowImage] = useState(true);
  let cnt = 1;

  // 랜드마크 깃발 딜레이 주는 함수(완벽알고리즘 아니라 일단 주석)

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowImage(true);
  //     cnt++;
  //   }, 3600 + divDelay * 3000 + cnt * 0.3);
  //   // divDelay * 3 + i * 0.3

  //   return () => clearTimeout(timeout);
  // }, []);

  return (
    <>
      {showImage && (
        <img
          src="/authping.png"
          alt=""
          style={{
            position: "absolute",
            width: "40px",
            height: "50px",
            left: `${pingLeft - 17}px`,
            top: `${pingTop - 35}px`,
          }}
        />
      )}
    </>
  );
};

export default FootLandmark;
