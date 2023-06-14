import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import "../../assets/css/MarkerOverlay.css";

const MarkerOverlay = ({ lm, setClickedLandMark, setIsOpen }) => {
  // 마커 위 오버레이창
  console.log(lm);
  return (
    <CustomOverlayMap
      position={{ lat: lm.t_landmark.lat, lng: lm.t_landmark.lng }}
      yAnchor={1}
    >
      <div className="markercustomoverlay">
        <div
          className="makercust_cl"
          onClick={() => {
            setClickedLandMark(lm);
            setIsOpen(true);
          }}
        >
          <span className="title">{lm.t_landmark.lm_name}</span>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default MarkerOverlay;
