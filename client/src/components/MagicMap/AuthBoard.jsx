import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/AuthBoard.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
    console.log(board);
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

  // 테스트용

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
  const itemData = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
      title: "Hats",
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
      title: "Honey",
      author: "@arwinneil",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
      title: "Basketball",
    },
    {
      img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
      title: "Fern",
    },
    {
      img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
      title: "Mushrooms",
      rows: 2,
      cols: 2,
    },
    {
      img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
      title: "Tomato basil",
    },
    {
      img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
      title: "Sea star",
    },
    {
      img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
      title: "Bike",
      cols: 2,
    },
  ];
  const getOneOrTwo = () => {
    return Math.floor(Math.random() * 2) + 1;
  };
  return (
    <div className="authboard">
      <ImageList
        sx={{ width: 300, height: 260 }}
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
                121,
                item.board.rows,
                item.board.cols
              )}
              alt={item.board.b_title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};
