import { useState } from "react";
import MagicMap from "../components/MagicMap/MagicMap";

const MagicMapPage = () => {
  // 사용자의 테마선택
  const [selectedThema, setSelectedThema] = useState(4);
  // 현재 선택된 랜드마크
  const [clickedLandmark, setClickedLandMark] = useState();
  return (
    <div>
      <div>
        <button onClick={() => setSelectedThema(3)}>지도만 보기</button>
        <button onClick={() => setSelectedThema(0)}>전체보기</button>
        <button onClick={() => setSelectedThema(1)}>테마1 : 문화재</button>
        <button onClick={() => setSelectedThema(2)}>테마2 : 밥집,카페</button>
      </div>
      <MagicMap
        selectedThema={selectedThema}
        clickedLandmark={clickedLandmark}
        setClickedLandMark={setClickedLandMark}
      />
    </div>
  );
};

export default MagicMapPage;
