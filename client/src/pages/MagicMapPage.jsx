import { useState } from "react";
import MagicMap from "../components/MagicMap/MagicMap";

const MagicMapPage = () => {
  // 사용자의 테마선택
  const [selectedThema, setSelectedThema] = useState(0);
  // 현재 선택된 랜드마크
  const [clickedLandmark, setClickedLandMark] = useState({});
  return (
    <div>
      <div>
        <button onClick={() => setSelectedThema(0)}>전체보기</button>
        <button onClick={() => setSelectedThema(1)}>테마1 : 문화재</button>
        <button onClick={() => setSelectedThema(2)}>테마2 : 밥집,카페</button>
      </div>
      <MagicMap
        selectedThema={selectedThema}
        clickedLandmark={clickedLandmark}
        setClickedLandMark={setClickedLandMark}
      />
      <div>
        <p>현재 선택된 데이터</p>
        lat : {clickedLandmark?.lat}
        lng : {clickedLandmark?.lm_name}
      </div>
    </div>
  );
};

export default MagicMapPage;
