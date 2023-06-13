import axios from "axios";
import "../assets/css/MagicMap.css";
import React, { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Polygon,
  Map,
  MapInfoWindow,
} from "react-kakao-maps-sdk";

const MagicMap = () => {
  const [areas, setAreas] = useState([]);

  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [clickedArea, setClickedArea] = useState();

  const getDistrictAPI = () =>
    axios.get("converted-district.json").then((res) => setAreas(res.data));

  useEffect(() => {
    getDistrictAPI();
  }, []);

  return (
    <div className="magicmap">
      <Map // 지도를 표시할 Container
        id={`map`}
        center={{
          // 지도의 중심좌표
          lat: 35.156108,
          lng: 126.835141,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "450px",
        }}
        level={10} // 지도의 확대 레벨
        draggable={false} // 지도 드래그 막기
        options={{
          scrollwheel: false, // 마우스 휠로 확대와 축소 비활성화
          disableDoubleClickZoom: true, // 더블 클릭으로 확대 비활성화
        }}
        onMouseMove={(_map, mouseEvent) =>
          setMousePosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
          })
        }
      >
        {areas.map((area, index) => (
          <Polygon
            key={`area-${area.name}`}
            path={area.path}
            strokeWeight={2}
            strokeColor={"#ffffff"}
            strokeOpacity={0.8}
            fillColor={area.isMouseover ? "#09f" : "#474747"}
            fillOpacity={0.9}
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
            <div className="area">{areas.find((v) => v.isMouseover).name}</div>
          </CustomOverlayMap>
        )}
        {clickedArea && (
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
        )}
      </Map>
    </div>
  );
};

export default MagicMap;
