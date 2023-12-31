import React, { useContext, useEffect, useRef, useState } from "react";
import "../../assets/css/AuthUserForm.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { SessionContext } from "../../contexts/SessionContext";

const AuthUserForm = ({ clickedLandmark, reren, setReren }) => {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const { sessionUser } = useContext(SessionContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLocOk, setIslocOk] = useState(false);
  const [isImgUploaded, setIsImgUploaded] = useState(false);
  // 현재 내 위치 정보 state
  const [uLat, setUlat] = useState(null);
  const [uLng, setUlng] = useState(null);

  // 이미지 업로드 검사(파일 업로드 안할시 인증하기 막음)
  const handleIsImgUploaded = () => {
    setIsImgUploaded(true);
  };

  // 사진 미리보기
  const saveImgFile = () => {
    handleIsImgUploaded();
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // 태그 갯수 제한

  const handleTagChange = (event, value) => {
    if (value.length <= 3) {
      setSelectedTags(value);
    }
  };

  // 현재 사용자 lat, lng 가져오기
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUlat(position.coords.latitude);
          setUlng(position.coords.longitude);
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
  }, []);

  // // 사용자 위치 vs 선택된 랜드마크 맞나 비교 알고리즘
  // // 반경 변수
  // const dis = 0.03;

  // // 비교 알고리즘 현재 위치 반경
  // const isValidLocation = (
  //   landmarkLat,
  //   landmarkLng,
  //   userLat,
  //   userLng,
  //   maxDistance
  // ) => {
  //   console.log(userLat);
  //   console.log(userLng);
  //   // 랜드마크와 유저 사이의 거리
  //   const distance = Math.sqrt(
  //     Math.pow(landmarkLat - userLat, 2) + Math.pow(landmarkLng - userLng, 2)
  //   );
  //   console.log("dis : ", distance);

  //   const radius = Math.sqrt(
  //     Math.pow(landmarkLat + maxDistance - landmarkLat, 2) +
  //       Math.pow(landmarkLng + maxDistance - landmarkLng, 2)
  //   );
  //   console.log("radius : ", radius);

  //   // return distance <= maxDistance;
  //   return maxDistance > distance;
  // };

  // 사용자 위치 vs 선택된 랜드마크 거리 비교 알고리즘
  // 반경 변수 (km)
  const dis = 5;
  // 비교 알고리즘 현재 위치 반경 (km 기준)
  const isValidLocation = (
    landmarkLat,
    landmarkLng,
    userLat,
    userLng,
    maxDistance
  ) => {
    // 위도, 경도를 라디안으로 변환
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const lat1 = toRadians(userLat);
    const lat2 = toRadians(landmarkLat);
    const deltaLat = toRadians(landmarkLat - userLat);
    const deltaLng = toRadians(landmarkLng - userLng);

    // Haversine Formula를 사용하여 거리 계산
    // 위도와 경도로 기술된, 구면 좌표계 상의 두 점 사이의 대원 거리를 구하는 공식.
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // 지구의 반지름(6371km)을 곱해서 거리를 계산

    return maxDistance > distance;
  };
  // 인증확인 버튼 핸들러
  const handleIsOk = (e) => {
    // 랜드마크가 인증반경 내부에 있으면 인증확인버튼 on
    e.preventDefault();
    console.log(isValidLocation);
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
      Swal.fire({
        icon: "success",
        title: "인증 위치 일치",
        text: "위치 확인 완료",
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "확인",
      });
    } else {
      // 테스트용 (인증 비활성화)
      setIslocOk(true);
      Swal.fire({
        icon: "error",
        title: "인증 위치 불일치",
        text: "올바른 위치에서 인증해주세요.",
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "확인",
      });
    }
    if (!isImgUploaded) {
      Swal.fire({
        icon: "error",
        title: "이미지 파일 첨부 오류",
        text: "인증 이미지를 첨부해주세요.",
        confirmButtonColor: "#e74c3c",
        confirmButtonText: "확인",
      });
      setIslocOk(false);
    }
  };

  // 태그 데이터
  const tagNames = [
    { title: "#관광지" },
    { title: "#여행" },
    { title: "#맛집" },
    { title: "#광주" },
    { title: "#화순" },
    { title: "#고기" },
    { title: "#밥" },
    { title: "#음식" },
  ];

  return (
    <form
      method="post"
      action="http://172.30.1.22:8087/hogward/insertboard"
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
      <label
        className="signup-profileImg-label"
        htmlFor="profileImg"
        style={{ color: "rgb(152, 128, 167)" }}
      >
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
          <TextField {...params} variant="standard" placeholder="#태그" />
        )}
      />
      {console.log("abcd", selectedTags.map((item) => item.title).toString())}
      <input
        type="hidden"
        name="b_tag"
        value={selectedTags.map((item) => item.title).toString()}
      />
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
      {/* 글 작성자 보내는용도 */}
      <input
        type="hidden"
        readOnly
        value={sessionUser.email}
        name="mem_email"
      />
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
        <button onClick={handleIsOk} className="btn btn-dark btn btn-lg">
          인증 위치 확인
        </button>
      )}
    </form>
  );
};

export default AuthUserForm;
