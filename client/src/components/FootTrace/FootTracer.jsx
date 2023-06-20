import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/FootTracer.css";
import axios from "axios";

const FootTracer = () => {
  // 좌표에 따른 발자국 각도 잡는함수
  // 세타 = 역탄젠트(a/h)
  const calculateAngle = (startCoords, endCoords) => {
    let a = startCoords[0];
    // 380 : height 크기
    let b = 400 - startCoords[1];

    let c = endCoords[0];
    let d = 400 - endCoords[1];

    let h = d - b;
    let w = c - a;
    let wDivh = h / w;
    let degreeRadian = Math.atan(wDivh);
    let degree = degreeRadian * (180 / Math.PI);
    if (endCoords[0] - startCoords[0] < 0) degree += 180;
    return degree;
  };

  // 발자국
  const Foot = ({ coordLeft, coordTop, delay, startCoords, endCoords }) => {
    console.log(delay);

    return (
      <>
        {endCoords[0] - startCoords[0] < 0 ? (
          <div>
            {/* 반대좌표시작 */}
            <img
              className="left"
              src="/foot2.svg"
              alt="footprint"
              style={{
                left: `${startCoords[0] + coordLeft}px`,
                top: `${startCoords[1] - coordTop}px`,

                animationDelay: `${delay}s`,
                transform: `rotateX(180deg) rotateZ(${
                  90 + calculateAngle(startCoords, endCoords)
                }deg)`,
              }}
            />
            <img
              className="right"
              src="/foot2.svg"
              alt="footprint"
              style={{
                left: `${startCoords[0] + coordLeft}px`,
                top: `${startCoords[1] - coordTop - 10}px`,
                animationDelay: `${delay + 0.1}s`,
                transform: `rotateZ(${
                  90 - calculateAngle(startCoords, endCoords)
                }deg)`,
              }}
            />
          </div>
        ) : (
          <div>
            {/* 정방향 */}
            <img
              className="left"
              src="/foot2.svg"
              alt="footprint"
              style={{
                left: `${startCoords[0] + coordLeft}px`,
                top: `${startCoords[1] - coordTop - 10}px`,
                animationDelay: `${delay}s`,
                transform: `rotateX(180deg) rotateZ(${
                  90 + calculateAngle(startCoords, endCoords)
                }deg)`,
              }}
            />
            <img
              className="right"
              src="/foot2.svg"
              alt="footprint"
              style={{
                left: `${startCoords[0] + coordLeft - 10}px`,
                top: `${startCoords[1] - coordTop}px`,
                animationDelay: `${delay + 0.1}s`,
                transform: `rotateZ(${
                  90 - calculateAngle(startCoords, endCoords)
                }deg)`,
              }}
            />
          </div>
        )}
      </>
    );
  };

  // 발자국 모음
  const FootContainer = ({ startCoords, endCoords, divDelay }) => {
    const distance = Math.sqrt(
      Math.pow(endCoords[0] - startCoords[0], 2) +
        Math.pow(endCoords[1] - startCoords[1], 2)
    );
    const count = distance / 30;
    // const count = 16;
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push(
        <Foot
          coordLeft={(i * (endCoords[0] - startCoords[0])) / count - 25}
          coordTop={(i * (startCoords[1] - endCoords[1] + 20)) / count}
          delay={divDelay * 3 + i * 0.3}
          startCoords={startCoords}
          endCoords={endCoords}
        />
      );
    }
    return <div>{items}</div>;
  };
  // 좌표 데이터 생성
  const [dataCoords, setDataCoords] = useState();
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
        let isInvolvedGwangju = () => {
          let result = false;
          res.data.forEach((item) => {
            if (
              item.certifiedLandmark.LM_DISTRICT === "동구" ||
              item.certifiedLandmark.LM_DISTRICT === "남구" ||
              item.certifiedLandmark.LM_DISTRICT === "서구" ||
              item.certifiedLandmark.LM_DISTRICT === "광산구" ||
              item.certifiedLandmark.LM_DISTRICT === "북구"
            ) {
              return (result = true);
            }
          });
          return result;
        };
        const processedUserAuth = res.data
          .filter((item) => item.certifiedLandmark.AUTHCOUNT !== 0)
          .filter(
            (item) =>
              item.certifiedLandmark.LM_DISTRICT !== "동구" &&
              item.certifiedLandmark.LM_DISTRICT !== "남구" &&
              item.certifiedLandmark.LM_DISTRICT !== "서구" &&
              item.certifiedLandmark.LM_DISTRICT !== "광산구" &&
              item.certifiedLandmark.LM_DISTRICT !== "북구" &&
              item.certifiedLandmark.LM_DISTRICT !== "목포시"
          );
        if (isInvolvedGwangju) {
          processedUserAuth.push({
            certifiedLandmark: {
              AUTHCOUNT: 1,
              LM_DISTRICT: "광주시",
            },
          });
        }
        // 좌표값도 추가하기
        setUserAuth(processedUserAuth);

        // dataCoords 가공(인증된 좌표값 있는 데이터만 반환 )
        let temp = [];
        processedUserAuth.forEach((item) => {
          temp.push(
            dataCoords?.filter(
              (elem) =>
                elem.divcoords.LM_DISTRICT ===
                item.certifiedLandmark.LM_DISTRICT
            )
          );
        });
        setNowAuthCoords(temp);
        // console.log(temp[0][0].divcoords.coords);
      });
    }
  }, [dataCoords]);
  // 인증목록 직접 만들기
  const makeFootContainer = () => {
    const containers = [];
    containers.push(<div key="start"></div>);

    for (let i = 0; i < nowAuthCoords.length - 1; i++) {
      containers.push(
        <FootContainer
          key={`container${i}`}
          startCoords={nowAuthCoords[i][0].divcoords.coords}
          endCoords={nowAuthCoords[i + 1][0].divcoords.coords}
          conDelay={3 * i}
          divDelay={i}
        />
      );
    }
    containers.push(<div key="end"></div>);
    return <>{containers}</>;
  };

  return (
    <div className="footContainer">
      <div id="wrap">{nowAuthCoords !== null && makeFootContainer()}</div>
    </div>
  );
};

export default FootTracer;
