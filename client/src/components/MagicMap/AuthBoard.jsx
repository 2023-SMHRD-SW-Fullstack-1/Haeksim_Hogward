import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AuthBoard.css";

export const AuthBoard = ({ clickedLandmark }) => {
  // seq 넘버 가져오기 프론트에서 필터링할때 사용
  const lm_seq = clickedLandmark?.t_landmark.lm_seq;
  // 2
  const [board, setBoard] = useState();
  // 게시판에 선택된 랜드마크에 해당하는번호의 게시글 가져오는 함수
  const getSelectedBoard = () => {
    // 나중에 선택된 랜드마크에 해당하는 게시글 가져오는 url 로 변경 or 내가 필터링
    const url = "board.json";
    axios.get(url).then((res) => setBoard(res.data));
  };
  useEffect(() => {
    getSelectedBoard();
  }, []);
  return (
    <div className="authboard">
      {board?.map((item, index) => (
        <div key={index} className="authboard_item">
          <img src={item.board.b_file} width="100%" height="100%" alt="" />
        </div>
      ))}
    </div>
  );
};
