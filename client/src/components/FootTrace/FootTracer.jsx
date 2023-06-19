import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/FootTracer.css";
import axios from "axios";

const FootTracer = () => {
  // 발자국
  const Foot = ({ coordLeft, coordTop, delay }) => {
    return (
      <>
        <img
          class="left"
          src="/footprint.svg"
          alt="footprint"
          style={{
            left: `${coordLeft + 10}px`,
            top: `${400 - coordTop - 15}px`,
            animationDelay: `${delay}s`,
          }}
        />
        <img
          class="right"
          src="/footprint.svg"
          alt="footprint"
          style={{
            left: `${coordLeft}px`,
            top: `${400 - coordTop}px`,
            animationDelay: `${delay + 0.5}s`,
          }}
        />
      </>
    );
  };

  // 발자국 모음
  const FootContainer = ({ startCoords, endCoords }) => {
    const count = 8;
    const items = [];
    for (let i = 1; i <= count; i++) {
      items.push(
        <Foot
          coordLeft={i * Math.abs((endCoords[0] - startCoords[0]) / count) - 25}
          coordTop={i * Math.abs((startCoords[1] - endCoords[1] + 20) / count)}
          delay={i * 1}
        />
      );
    }
    return <div>{items}</div>;
  };
  const [coords, setCoords] = useState([396, 101]);
  // 좌표 데이터 생성
  const [dataCoords, setDataCoords] = useState();
  useEffect(() => {
    const url = "/foot_divcoords.json";
    axios.get(url).then((res) => {
      console.log(res.data);
      setDataCoords(res.data);
    });
  }, []);
  // 한곳에 도착한후 최소한의 각도 계산

  return (
    <div className="footContainer">
      sdf
      <div id="wrap">
        {/* <div class="name">FF</div> */}
        <div>
          <FootContainer startCoords={[0, 380]} endCoords={[396, 101]} />
        </div>
      </div>
    </div>
  );
};

export default FootTracer;
