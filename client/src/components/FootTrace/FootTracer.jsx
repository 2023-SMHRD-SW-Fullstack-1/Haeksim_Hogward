import React, { useContext, useEffect, useRef, useState } from "react";
import "../../assets/css/FootTracer.css";
import axios from "axios";
import FootLandmark from "./FootLandmark";
import Foot from "./Foot";
import FootContainer from "./FootContainer";
import { SessionContext } from "../../contexts/SessionContext";

const FootTracer = () => {
  // 세션 가져오기
  const { sessionUser } = useContext(SessionContext);
  // 좌표 데이터 생성
  const [dataCoords, setDataCoords] = useState();
  const [nowAuthCoords, setNowAuthCoords] = useState(null);

  // 지도 내 경계값 좌표 가져오기
  useEffect(() => {
    const url = "/foot_divcoords.json";
    axios.get(url).then((res) => {
      setDataCoords(res.data);
    });
  }, []);

  // 데이터 가공 및 사용자 인증목록 필터링 데이터 가져오는 함수
  useEffect(() => {
    if (sessionUser.email !== "") {
      const url = `http://172.30.1.22:8087/hogward/certifiedlandmarks/${sessionUser.email}`;
      // 데이터 가공(광주 합치기)
      // 광주 광역시 추가
      if (dataCoords !== undefined) {
        axios.get(url).then((res) => {
          // 광주 구단위로 이동, 구 제거 및 제거한 구에 광주시 데이터 추가
          const filteredNotAuth = res.data.filter(
            (item) => item.certifiedLandmark.AUTHCOUNT !== 0
          );
          filteredNotAuth.forEach((item, idx) => {
            if (
              item.certifiedLandmark.LM_DISTRICT === "동구" ||
              item.certifiedLandmark.LM_DISTRICT === "남구" ||
              item.certifiedLandmark.LM_DISTRICT === "서구" ||
              item.certifiedLandmark.LM_DISTRICT === "광산구" ||
              item.certifiedLandmark.LM_DISTRICT === "북구"
            ) {
              filteredNotAuth.splice(idx, 1, {
                certifiedLandmark: {
                  AUTHCOUNT: 1,
                  LM_DISTRICT: "광주시",
                },
              });
            }
          });

          let temp = [];
          filteredNotAuth.forEach((item) => {
            temp.push(
              dataCoords?.filter(
                (elem) =>
                  elem.divcoords.LM_DISTRICT ===
                  item.certifiedLandmark.LM_DISTRICT
              )
            );
          });
          setNowAuthCoords(temp);
        });
      }
    }
  }, [dataCoords]);

  // 인증목록 발자국 모두 다 담고있는 객체 함수
  const makeFootContainer = () => {
    const containers = [];
    containers.push(<div key="start"></div>);
    // 초기 깃발 생성
    containers.push(
      <FootLandmark
        pingLeft={nowAuthCoords[0][0].divcoords.coords[0]}
        pingTop={nowAuthCoords[0][0].divcoords.coords[1]}
      />
    );

    // 깃발 랜더링
    for (let i = 0; i < nowAuthCoords.length - 1; i++) {
      containers.push(
        <div>
          {/* 발자국 생성 */}
          <FootContainer
            key={`container${i}`}
            startCoords={nowAuthCoords[i][0].divcoords.coords}
            endCoords={nowAuthCoords[i + 1][0].divcoords.coords}
            divDelay={i}
          />
          <FootLandmark
            pingLeft={nowAuthCoords[i + 1][0].divcoords.coords[0]}
            pingTop={nowAuthCoords[i + 1][0].divcoords.coords[1]}
            divDelay={i}
          />
        </div>
      );
    }
    containers.push(<div key="end"></div>);
    return <>{containers}</>;
  };

  return (
    <div className="footContainer">
      <div id="wrap">
        {nowAuthCoords !== null &&
          nowAuthCoords.length > 0 &&
          makeFootContainer()}
      </div>
    </div>
  );
};

export default FootTracer;
