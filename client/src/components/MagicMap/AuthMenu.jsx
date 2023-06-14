import React, { useEffect, useRef } from "react";
import "../../assets/css/AuthMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import AuthSlideBarSlider from "./AuthSlideBarSlider";

// 지도페이지 우측 인증사이드바
const AuthMenu = ({ isOpen, setIsOpen, clickedLandmark }) => {
  const authRef = useRef();
  // 사이드 On/Off 구현
  useEffect(() => {
    if (isOpen) authRef.current.classList.add("authactive");
    else authRef.current.classList.remove("authactive");
  }, [isOpen]);
  // 사이드바 처음 숨기기
  useEffect(() => {
    authRef.current.style.right =
      -authRef.current.offsetParent.offsetWidth / 2 + "px";
  }, []);

  return (
    <div className="authmenu" ref={authRef}>
      <div className="authmenu_slider">
        <AuthSlideBarSlider clickedLandmark={clickedLandmark} />
      </div>
      <div
        className="authmenu_rightmark_container"
        onClick={() => setIsOpen(false)}
      >
        <FontAwesomeIcon icon={faAngleRight} className="authmenu_rightmark" />
      </div>
    </div>
  );
};

export default AuthMenu;
