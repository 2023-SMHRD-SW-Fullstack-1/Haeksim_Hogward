import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

const MapImageMarker = ({ lm, setClickedLandMark, setIsOpen }) => {
  return (
    <MapMarker // 마커를 생성합니다
      position={{
        // 마커가 표시될 위치입니다
        lat: lm.lat,
        lng: lm.lng,
      }}
      image={{
        src: lm.lm_photo, // 마커이미지의 주소입니다
        size: {
          width: 64,
          height: 69,
        }, // 마커이미지의 크기입니다
        options: {
          offset: {
            x: 27,
            y: 69,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
      onClick={() => {
        setClickedLandMark(lm);
        setIsOpen(true);
      }}
    />
  );
};

export default MapImageMarker;
