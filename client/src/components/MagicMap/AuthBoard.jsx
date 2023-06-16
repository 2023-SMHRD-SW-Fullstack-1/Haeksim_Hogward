import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../assets/css/AuthBoard.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { debounce } from "lodash";

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
  useEffect(() => {
    console.log(getOneOrTwo());
  }, [board]);
  //srcset
  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  const rowscols = [
    {
      rows: 2,
      cols: 2,
    },
    {},
    {},
    {
      cols: 2,
    },
    {
      cols: 2,
    },
    {
      rows: 2,
      cols: 2,
    },
    {},
    {},
    {
      rows: 2,
      cols: 2,
    },
    {},
    {},
    {
      cols: 2,
    },
  ];

  // 1또는 2 가져오는 함수
  const getOneOrTwo = () => {
    return Math.floor(Math.random() * 2) + 1;
  };

  // 박스 사이즈 resize이벤트용(반응형)
  const [boxSize, setBoxSize] = useState(0);
  const authboardRef = useRef();

  // 리사이즈시 사이즈 변경함수 디바운스처리
  const handleResize = debounce(() => {
    setBoxSize(authboardRef.current.offsetWidth);
  }, 1000);

  // board 크기 반응형으로 조절
  // resize 이벤트리스너 처리
  useEffect(() => {
    window.addEventListener("resize", () => handleResize);
    return () => {
      // clean up
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="authboard" ref={authboardRef}>
      <ImageList
        sx={{ width: { boxSize }, height: 260 }}
        variant="quilted"
        cols={4}
        rowHeight={90}
      >
        {board?.map((item, index) => (
          <ImageListItem
            key={item.board.b_seq}
            cols={rowscols[index % 12].cols || 1}
            rows={rowscols[index % 12].rows || 1}
          >
            <img
              {...srcset(
                item.board.b_file,
                220,
                rowscols[index % 12].cols || 1,
                rowscols[index % 12].rows || 1
              )}
              alt={item.board.b_seq}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
