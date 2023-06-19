import React, { useEffect, useRef } from "react";
import "../../assets/css/AuthMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AuthSlideBarSlider from "./AuthSlideBarSlider";
import { AuthBoard } from "./AuthBoard";

import AuthUserForm from "./AuthUserForm";

// 지도페이지 우측 인증사이드바
const AuthMenu = ({ isOpen, setIsOpen, clickedLandmark, reren, setReren }) => {
  const authRef = useRef();
  // 사이드 On/Off 구현
  useEffect(() => {
    if (isOpen) {
      authRef.current.classList.add("authactive");
    } else {
      authRef.current.classList.remove("authactive");
      setOpen(false);
    }
  }, [isOpen]);
  // 사이드바 처음 숨기기
  useEffect(() => {
    authRef.current.style.right =
      -authRef.current.offsetParent.offsetWidth / 2 + "px";
  }, []);

  // 인증하기 창 관련
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="authmenu" ref={authRef}>
      {/* 닫는버튼 */}
      <div
        className="authmenu_rightmark_container"
        onClick={() => setIsOpen(false)}
      >
        <FontAwesomeIcon icon={faAngleRight} className="authmenu_rightmark" />
      </div>
      {/* 인증버튼 클릭시 */}
      {open ? (
        // 인증탭
        <div className="authtab">
          <div className="authtab_innercontainer">
            <AuthUserForm
              clickedLandmark={clickedLandmark}
              reren={reren}
              setReren={setReren}
            />
          </div>
        </div>
      ) : (
        // 설명탭
        <div>
          <div className="authmenu_slider">
            <AuthSlideBarSlider clickedLandmark={clickedLandmark} />
          </div>
          {/* 제목, 주소 */}
          <div className="authmenu_des">
            <p>{clickedLandmark?.t_landmark.lm_name}</p>
            <p>{clickedLandmark?.t_landmark.lm_addr}</p>
          </div>
          <div className="authmenu_authen">
            <button onClick={handleClickOpen}>인증</button>
          </div>
          <div className="authmenu_authboard">
            <AuthBoard clickedLandmark={clickedLandmark} />
          </div>
        </div>
      )}
      {/* 슬라이드 */}
    </div>
  );
};

export default AuthMenu;
