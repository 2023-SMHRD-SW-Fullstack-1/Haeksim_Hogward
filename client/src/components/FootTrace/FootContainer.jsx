import Foot from "./Foot";

// 발자국 모음(map 돌리기 위함)
const FootContainer = ({ startCoords, endCoords, divDelay }) => {
  // 좌표 사이 거리 구하기
  const distance = Math.sqrt(
    Math.pow(endCoords[0] - startCoords[0], 2) +
      Math.pow(endCoords[1] - startCoords[1], 2)
  );
  // 적정한 수의 카운트 계산하기
  const count = distance / 30;
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
export default FootContainer;
