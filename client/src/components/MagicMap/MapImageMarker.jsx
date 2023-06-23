import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import moonimage from "../../assets/img/moonauthmark.png";
import babimage from "../../assets/img/riceauthmark.png";
import lockmark from "../../assets/img/lockmark.png";
import unlockmark from "../../assets/img/unlockmark.png";

const MapImageMarker = ({ lm }) => {
  // 지도 안의 마커 생성
  return (
    <MapMarker // 마커를 생성합니다
      position={{
        // 마커가 표시될 위치입니다
        lat: lm.t_landmark.lat,
        lng: lm.t_landmark.lng,
      }}
      image={{
        // src: lm.t_landmark.lm_photo1, // 마커이미지의 주소입니다
        src: lm.t_landmark.them_seq === 1 ? moonimage : babimage,
        size: {
          // 마커이미지의 크기
          width: 30,
          height: 40,
        },
        options: {
          offset: {
            x: 27,
            y: 69,
          }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
        },
      }}
    />
  );
};

export default MapImageMarker;
