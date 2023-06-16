import React, { useRef, useState } from "react";
import "../../assets/css/AuthUserForm.css";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
const AuthUserForm = () => {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 태그 데이터
  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
    {
      title: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { title: "The Good, the Bad and the Ugly", year: 1966 },
    { title: "Fight Club", year: 1999 },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      title: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { title: "Forrest Gump", year: 1994 },
    { title: "Inception", year: 2010 },
    {
      title: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
  ];

  return (
    <div>
      <form method="get" action="#" className="authform">
        {/* 폼에서 보내야 할것 */}
        {/* 글 사진 */}
        <img
          src={imgFile ? imgFile : `previewimg.png`}
          alt="프로필 이미지"
          className="authform_preview"
        />
        <label className="signup-profileImg-label" htmlFor="profileImg">
          인증사진 추가하기
        </label>
        <input
          className="signup-profileImg-input"
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
        />

        {/* 글 제목 */}
        <TextField
          label="제목"
          id="outlined-size-small"
          defaultValue=""
          size="small"
        />
        {/* 글 내용 */}
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          defaultValue=""
        />
        {/* 글 태그 */}
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[13]]}
          renderInput={(params) => (
            <TextField {...params} variant="standard" placeholder="#태그" />
          )}
        />
        {/* 내 데이터에서 보냄 */}
        {/* 글 인증장소 x*/}
        {/* 위도 x*/}
        {/* 경도 x*/}
        {/* 글 작성자 x  이메일*/}
        {/* 랜드마크 식별자 x*/}
        <Button variant="outlined" color="error" type="submit">
          인증하기
        </Button>
      </form>
    </div>
  );
};

export default AuthUserForm;
