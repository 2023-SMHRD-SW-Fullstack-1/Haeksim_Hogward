import axios from "axios";
import "../../assets/css/MagicMap.css";
import React, { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Polygon,
  Map,
  MapInfoWindow,
} from "react-kakao-maps-sdk";
import MapImageMarker from "./MapImageMarker";
import AuthMenu from "./AuthMenu";
import MarkerOverlay from "./MarkerOverlay";

const MagicMap = ({ selectedThema, clickedLandmark, setClickedLandMark }) => {
  // 시군구 경계값 좌표
  const [areas, setAreas] = useState([]);

  // 랜드마크 데이터
  const [landmarks, setLandMarks] = useState([]);
  const [newLandMarks, setNewLandMarks] = useState([]);

  // 카카오맵 관련 state
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });

  // 클리이벤트 state
  const [clickedArea, setClickedArea] = useState();

  // sidebar onoff state
  const [isOpen, setIsOpen] = useState(false);

  // 경계값 데이터 가져오는 함수
  const getDistrictAPI = () =>
    axios.get("converted-district.json").then((res) => setAreas(res.data));

  // 랜드마크 데이터 가져오는 함수
  const getLandMarksAPI = () => {
    // setLandMarks(res.data)
    axios
      .get("http://172.30.1.22:8087/hogward/alllandmark")
      .then((res) => setLandMarks(res.data));
  };

  // 경계값 데이터 가져오기
  useEffect(() => {
    getDistrictAPI();
  }, []);

  // 랜드마크 데이터 가져오기
  useEffect(() => {
    getLandMarksAPI();
  }, [areas]);

  // 테마별 새로운 인증목록배열 구현
  useEffect(() => {
    if (selectedThema !== 0) {
      setNewLandMarks(
        landmarks.filter((item) => item.t_landmark.them_seq === selectedThema)
      );
    }
  }, [selectedThema]);

  return (
    <div className="magicmap">
      <div className="kakaomap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{
            // 지도의 중심좌표
            lat: 34.862417,
            lng: 126.794141,
          }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "600px",
          }}
          level={11} // 지도의 확대 레벨
          // draggable={false} // 지도 드래그 막기
          // options={{
          //   scrollwheel: false, // 마우스 휠로 확대와 축소 비활성화
          //   disableDoubleClickZoom: true, // 더블 클릭으로 확대 비활성화
          // }}
          maxLevel={11}
          onMouseMove={(_map, mouseEvent) =>
            setMousePosition({
              lat: mouseEvent.latLng.getLat(),
              lng: mouseEvent.latLng.getLng(),
            })
          }
        >
          {/* 맵 마커 생성 */}
          {selectedThema === 0
            ? landmarks?.map((lm, index) => (
                <>
                  <MapImageMarker key={`imgmarker-${lm.lm_seq}`} lm={lm} />
                  <MarkerOverlay
                    key={`overlay-${lm.lm_seq}`}
                    lm={lm}
                    clickedLandmark={clickedLandmark}
                    setClickedLandMark={setClickedLandMark}
                    setIsOpen={setIsOpen}
                  />
                </>
              ))
            : newLandMarks.map((lm, index) => (
                <>
                  <MapImageMarker key={`imgmarker-${lm.lm_seq}`} lm={lm} />
                  <MarkerOverlay
                    key={`overlay-${lm.lm_seq}`}
                    lm={lm}
                    clickedLandmark={clickedLandmark}
                    setClickedLandMark={setClickedLandMark}
                    setIsOpen={setIsOpen}
                  />
                </>
              ))}
          {/* 경계구현 */}
          {areas.map((area, index) => (
            <Polygon
              key={`area-${area.name}`}
              path={area.path}
              strokeWeight={2}
              strokeColor={"#ffffff"}
              strokeOpacity={0.8}
              fillColor={area.isMouseover ? "#09f" : "#474747"}
              fillOpacity={0.8}
              onMouseover={() =>
                setAreas((prev) => [
                  ...prev.filter((_, i) => i !== index),
                  {
                    ...prev[index],
                    isMouseover: true,
                  },
                ])
              }
              onMouseout={() =>
                setAreas((prev) => [
                  ...prev.filter((_, i) => i !== index),
                  {
                    ...prev[index],
                    isMouseover: false,
                  },
                ])
              }
              onClick={(polygon, mouseEvent) =>
                setClickedArea({
                  position: {
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                  },
                  area: Math.floor(polygon.getArea()),
                  name: area.name,
                })
              }
            />
          ))}
          {areas.findIndex((v) => v.isMouseover) !== -1 && (
            <CustomOverlayMap position={mousePosition}>
              <div className="area">
                {areas.find((v) => v.isMouseover).name}
              </div>
            </CustomOverlayMap>
          )}
          {/* 지역 클릭 이벤트 */}
          {/* {clickedArea && (
            <MapInfoWindow position={clickedArea.position}>
              <img
                alt="close"
                width="14"
                height="13"
                src="http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setClickedArea(null)}
              ></img>
              <div className="info">
                <div className="title">{clickedArea.name}</div>
                <div className="size">
                  총 면적 : 약 {clickedArea.area})m<sup>2</sup>
                </div>
              </div>
            </MapInfoWindow>
          )} */}
        </Map>

        <AuthMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          clickedLandmark={clickedLandmark}
        />
      </div>
    </div>
  );
};

export default MagicMap;
