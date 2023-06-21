import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/FootTracer.css";
import axios from "axios";
import FootLandmark from "./FootLandmark";
import Foot from "./Foot";
import FootContainer from "./FootContainer";

const FootTracer = () => {
  // 좌표 데이터 생성
  const [dataCoords, setDataCoords] = useState();
  // 지도 내 좌표 가져오기
  useEffect(() => {
    const url = "/foot_divcoords.json";
    axios.get(url).then((res) => {
      setDataCoords(res.data);
    });
  }, []);
  // 사용자 인증목록
  const [userAuth, setUserAuth] = useState([]);
  const [nowAuthCoords, setNowAuthCoords] = useState(null);
  useEffect(() => {
    const url = `http://172.30.1.22:8087/hogward/certifiedlandmarks/mem_email 01`;
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
        // let isInvolvedGwangju = () => {
        //   let result = false;
        //   // 인증 안된곳 모두 제거된 데이터배열
        //   const filteredNotAuth = res.data.filter(
        //     (item) => item.certifiedLandmark.AUTHCOUNT !== 0
        //   );
        //   filteredNotAuth.forEach((item, idx) => {
        //     if (
        //       item.certifiedLandmark.LM_DISTRICT === "동구" ||
        //       item.certifiedLandmark.LM_DISTRICT === "남구" ||
        //       item.certifiedLandmark.LM_DISTRICT === "서구" ||
        //       item.certifiedLandmark.LM_DISTRICT === "광산구" ||
        //       item.certifiedLandmark.LM_DISTRICT === "북구"
        //     ) {
        //       console.log(idx);
        //       filteredNotAuth.splice(idx, 1, {
        //         certifiedLandmark: {
        //           AUTHCOUNT: 1,
        //           LM_DISTRICT: "광주시",
        //         },
        //       });
        //       console.log("filt : ", filteredNotAuth);
        //       result = true;
        //     }
        //   });
        //   return result;
        // };
        // // 구 단위 다 제거, 구현안된 목포시 제거
        // const processedUserAuth = res.data
        //   .filter((item) => item.certifiedLandmark.AUTHCOUNT !== 0)
        //   .filter(
        //     (item) =>
        //       item.certifiedLandmark.LM_DISTRICT !== "동구" &&
        //       item.certifiedLandmark.LM_DISTRICT !== "남구" &&
        //       item.certifiedLandmark.LM_DISTRICT !== "서구" &&
        //       item.certifiedLandmark.LM_DISTRICT !== "광산구" &&
        //       item.certifiedLandmark.LM_DISTRICT !== "북구" &&
        //       item.certifiedLandmark.LM_DISTRICT !== "목포시"
        //   );
        // // 데이터에 광주 추가
        // if (isInvolvedGwangju() === true) {
        //   processedUserAuth.push({
        //     certifiedLandmark: {
        //       AUTHCOUNT: 1,
        //       LM_DISTRICT: "광주시",
        //     },
        //   });
        // }
        // // 좌표값도 추가하기
        // setUserAuth(processedUserAuth);

        // dataCoords 가공(인증된 좌표값 있는 데이터만 반환 )
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
  }, [dataCoords]);
  // 인증목록 발자국 모두 다 담고있는 객체
  // map 으로 다른인덱스값 힘드므로 따로 합침
  const makeFootContainer = () => {
    const containers = [];
    containers.push(<div key="start"></div>);
    // 초기 깃발
    console.log(nowAuthCoords);
    containers.push(
      <FootLandmark
        pingLeft={nowAuthCoords[0][0].divcoords.coords[0]}
        pingTop={nowAuthCoords[0][0].divcoords.coords[1]}
      />
    );

    for (let i = 0; i < nowAuthCoords.length - 1; i++) {
      containers.push(
        <div>
          <FootContainer
            key={`container${i}`}
            startCoords={nowAuthCoords[i][0].divcoords.coords}
            endCoords={nowAuthCoords[i + 1][0].divcoords.coords}
            conDelay={3 * i}
            divDelay={i}
          />
          <FootLandmark
            pingLeft={nowAuthCoords[i + 1][0].divcoords.coords[0]}
            pingTop={nowAuthCoords[i + 1][0].divcoords.coords[1]}
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
