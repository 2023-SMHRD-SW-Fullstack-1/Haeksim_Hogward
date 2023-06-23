import axios from "axios";
import "../../assets/css/MagicMap.css";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  CustomOverlayMap,
  Polygon,
  Map,
  MapInfoWindow,
} from "react-kakao-maps-sdk";
import MapImageMarker from "./MapImageMarker";
import AuthMenu from "./AuthMenu";
import MarkerOverlay from "./MarkerOverlay";
import { SessionContext } from "../../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const MagicMap = () => {
  const nav = useNavigate();

  const [selectedThema, setSelectedThema] = useState(4);
  // 현재 선택된 랜드마크
  const [clickedLandmark, setClickedLandMark] = useState();
  // 세션값 가져오기
  const { sessionUser } = useContext(SessionContext);
  // 로그인 안할시 메인으로 보내기
  if (sessionStorage.getItem("user")) {
  } else {
    Swal.fire({
      icon: "error",
      title: "인증 정보 불일치",
      text: "로그인 해주세요.",
      confirmButtonColor: "#e74c3c",
      confirmButtonText: "확인",
    });
    nav("/");
  }
  // useEffect(() => {
  //   if (sessionUser.email === "") {
  //     Swal.fire({
  //       icon: "error",
  //       title: "인증 정보 불일치",
  //       text: "로그인 해주세요.",
  //       confirmButtonColor: "#e74c3c",
  //       confirmButtonText: "확인",
  //     });
  //     nav("/");
  //   } else {
  //     console.log("else : ", sessionUser.email);
  //   }
  // }, []);

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

  // 경계값 ref
  const districtRef = useRef([]);

  // 전체 랜드마크 카운트 state
  const [landmarkAllCount, setLandmarkAllCount] = useState([]);
  const [reren, setReren] = useState(true);

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

  // 전체 랜드마크 카운트 가져오는 함수
  const getAllLandmarkCount = () => {
    const url = "http://172.30.1.22:8087/hogward/landmark/count";
    axios.get(url).then((res) => {
      setLandmarkAllCount(res.data);
    });
  };
  useEffect(() => {
    getAllLandmarkCount();
  }, []);

  // 회원별 랜드마크 인증수 카운트
  const [memAuthCount, setMemAuthCount] = useState([]);

  const getMemberAuthCount = () => {
    console.log("a", sessionUser);
    console.log("bababab", sessionUser.email);
    // const url = `http://172.30.1.22:8087/hogward/certifiedlandmarks/${mem_email}`;
    if (sessionUser.email) {
      const url = `http://172.30.1.22:8087/hogward/certifiedlandmarks/${sessionUser.email}`;
      axios.get(url).then((res) => {
        setMemAuthCount(res.data);
      });
    }
  };
  useEffect(() => {
    if (sessionUser.email) {
      getMemberAuthCount();
    }
  }, [sessionUser]);

  const filteredMemSite = memAuthCount.filter(
    (item) => item.certifiedLandmark.AUTHCOUNT !== 0
  );
  // 구역 밝기 조절
  const handleDistrictBrightness = (name) => {
    // name = "영암군"...
    // console.log(filteredMemSite);
    let brightness = 0.8;
    // 알고리즘
    if (
      filteredMemSite.filter(
        (item) => item.certifiedLandmark.LM_DISTRICT === name
      ).length > 0
    ) {
      brightness = 0;
    }

    // name별 필터링
    // count data 가져와서 count(*) - count(인증내역) 별로 0.8~0까지 구현

    return brightness;
  };

  // 카카오맵 반응형 만들기
  const mapRef = useRef(null);
  const [cliWidth, setCliWidth] = useState(600);
  const [cliHeight, setCliHeight] = useState(600);
  const updateMapSize = () => {
    setCliWidth(mapRef.current.offsetWidth);
    setCliHeight(mapRef.current.offsetHeight);
  };
  useEffect(() => {
    updateMapSize();
    window.addEventListener("resize", updateMapSize);

    return () => {
      window.removeEventListener("resize", updateMapSize);
    };
  }, []);
  useEffect(() => {
    // 최대화 상태에서 창의 크기가 변경되면 카카오맵 크기를 업데이트
    const handleResize = () => {
      if (
        window.innerWidth === window.screen.width &&
        window.innerHeight === window.screen.height
      ) {
        updateMapSize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="magicmap" ref={mapRef}>
      <div className="magicmap_themabtn">
        <button
          onClick={() => setSelectedThema(3)}
          className="btn btn-dark btn btn-lg"
        >
          지도만 보기
        </button>
        <button
          onClick={() => setSelectedThema(0)}
          className="btn btn-dark btn btn-lg"
        >
          전체보기
        </button>
        <button
          onClick={() => setSelectedThema(1)}
          className="btn btn-dark btn btn-lg"
        >
          테마1 : 문화재
        </button>
        <button
          onClick={() => setSelectedThema(2)}
          className="btn btn-dark btn btn-lg"
        >
          테마2 : 밥집,카페
        </button>
      </div>
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
            // width: "100%",
            width: cliWidth,
            // width: 1400,
            height: cliHeight - 250,
            // height: mapRef.current.clientHeight + "px" || "600px",
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
                  <MapImageMarker
                    key={`imgmarker-${lm.lm_seq}`}
                    lm={lm}
                    memAuthCount={memAuthCount}
                  />
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
              // opacity 그대로 state로 변경
              fillOpacity={handleDistrictBrightness(area.name)}
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
          setReren={setReren}
          reren={reren}
        />
      </div>
    </div>
  );
};

export default MagicMap;
