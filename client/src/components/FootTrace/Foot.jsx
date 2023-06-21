// 발자국 각 객체
const Foot = ({ coordLeft, coordTop, delay, startCoords, endCoords }) => {
  // 시작 좌표 ~ 끝 좌표 사이의 각도 구하기(발자국rotate위해서)
  // 세타 = 역탄젠트(h/w)
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
  return (
    <>
      {endCoords[0] - startCoords[0] < 0 ? (
        <div>
          {/* 역방향 */}
          {/* 왼발 */}
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
          {/* 오른발 */}
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
          {/* 왼발 */}
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
          {/* 오른발 */}
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

export default Foot;
