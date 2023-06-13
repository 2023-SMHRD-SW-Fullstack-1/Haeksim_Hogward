import React, { useEffect, useRef } from "react";
import "../../assets/css/AuthMenu.css";

const AuthMenu = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    if (isOpen) authRef.current.classList.add("authactive");
  }, [isOpen]);

  const authRef = useRef();
  useEffect(() => {
    authRef.current.style.right =
      -authRef.current.offsetParent.offsetWidth / 2 + "px";
  }, []);
  return <div className="authmenu" ref={authRef}></div>;
};

export default AuthMenu;
