import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/AuthUserForm.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

const AuthUserForm = ({ clickedLandmark, reren, setReren }) => {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  // 현재 위치 기반 인증여부 확인
  const [isLocOk, setIslocOk] = useState(false);

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 태그 갯수 제한
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (event, value) => {
    if (value.length <= 3) {
      setSelectedTags(value);
    }
  };

  // 현재 내 위치 정보 state
  const [uLat, setUlat] = useState(null);
  const [uLng, setUlng] = useState(null);

  // 현재 사용자 lat, lng 가져오기
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUlat(position.coords.latitude);
          setUlng(position.coords.longitude);
          console.log("lat : ", position.coords.latitude);
          console.log("lng : ", position.coords.longitude);
        },
        (error) => {
          console.error("위치 정보를 가져올 수 없습니다.", error);
        }
      );
    } else {
      console.error("위치 정보를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    getUserLocation();
    console.log(clickedLandmark);
  }, []);

  // 사용자 위치 vs 선택된 랜드마크 맞나 비교 알고리즘
  // 스마트인재 개발원 = {lat : 35.149926, lng : 126.919749}
  // 반지름 : 코사마트조대점 : {lat :35.145027, lng : 126.924962}
  // 반경 변수
  const dis = 0.006;

  // 비교 알고리즘 현재 위치 반경
  const isValidLocation = (
    landmarkLat,
    landmarkLng,
    userLat,
    userLng,
    maxDistance
  ) => {
    const distance = Math.sqrt(
      Math.pow(landmarkLat - userLat, 2) + Math.pow(landmarkLng - userLng, 2)
    );
    const radius = Math.sqrt(
      Math.pow(landmarkLat + maxDistance - landmarkLat, 2) +
        Math.pow(landmarkLng + maxDistance - landmarkLng, 2)
    );

    return distance <= radius;
  };

  // 인증확인 버튼 핸들러
  const handleIsOk = (e) => {
    // 랜드마크가 인증반경 내부에 있으면 인증확인버튼 on
    e.preventDefault();
    if (
      isValidLocation(
        clickedLandmark.t_landmark.lat,
        clickedLandmark.t_landmark.lng,
        uLat,
        uLng,
        dis
      )
    ) {
      setIslocOk(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "인증 위치 불일치",
        text: "올바른 위치에서 인증해주세요.",
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "확인",
      });
    }
  };

  // 태그 데이터
  const tagNames = [
    { title: "#관광지" },
    { title: "#여행" },
    { title: "#맛집" },
    { title: "#광주" },
    { title: "#목포" },
    { title: "#화순" },
    { title: "#고기" },
    { title: "#밥" },
    { title: "#음식" },
  ];

  return (
    <form
      method="post"
      action="http://172.30.1.20:8087/hogward/insertboard"
      className="authform"
      encType="multipart/form-data"
    >
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
        name="b__file"
      />

      {/* 글 제목 */}
      <TextField
        label="제목"
        id="outlined-size-small"
        defaultValue=""
        size="small"
        name="b_title"
      />
      {/* 글 내용 */}
      <TextField
        id="outlined-multiline-static"
        label="내용"
        multiline
        rows={4}
        defaultValue=""
        name="b_content"
      />
      {/* 글 태그 */}
      <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        options={tagNames}
        getOptionLabel={(option) => option.title}
        value={selectedTags}
        onChange={handleTagChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="#태그"
            name="b_tag"
          />
        )}
      />
      {/* <Autocomplete
        multiple
        id="size-small-standard-multi"
        size="small"
        options={tagNames}
        getOptionLabel={(option) => option.title}
        value={selectedTags}
        onChange={(event, newValue) => {
          const updatedTags = newValue.map((option) => option.title);
          setBTag(updatedTags); // b_tag 업데이트
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="#태그"
            name="b_tag"
          />
        )}
      /> */}
      <input type="hidden" name="b_tag" value={handleTagChange} />
      {/* 글 인증장소*/}
      <input
        type="hidden"
        readOnly
        value={clickedLandmark.t_landmark.lm_name || ""}
        name="b_loc"
      />
      {/* 위도 */}
      <input type="hidden" readOnly value={uLat || 0} name="lat" />
      {/* 경도 */}
      <input type="hidden" readOnly value={uLng || 0} name="lng" />

      {/* 글 작성자 x  이메일*/}
      {/* 테스트용 */}
      <input type="hidden" readOnly value="mem_email 01" name="mem_email" />
      {/* 랜드마크 식별자 */}
      <input
        type="hidden"
        readOnly
        value={clickedLandmark.t_landmark.lm_seq || 0}
        name="lm_seq"
      />
      {isLocOk ? (
        <Button
          variant="outlined"
          color="error"
          type="submit"
          onClick={() => setReren(!reren)}
        >
          인증하기
        </Button>
      ) : (
        // 테스트용
        <Button variant="outlined" color="error" type="submit">
          인증하기
        </Button>
        // 찐
        // <Button variant="outlined" color="error" onClick={handleIsOk}>
        //   인증 위치 확인
        // </Button>
      )}
    </form>
  );
};

export default AuthUserForm;
