import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h2>
        <Link to="/">홈</Link>
      </h2>
      <h2>대혁 작업공간</h2>
      <h2>다운 작업공간</h2>
      <h2>
        <Link to="/magicmap">혁 작업공간</Link>
      </h2>
      <h2>다영 작업공간</h2>
      {/* 임시 전처리 작업공간 */}
      <h2>
        <Link to="/module/getregion">전처리(리전)</Link>
        <Link to="/module/getcoords">전처리(좌표)</Link>
      </h2>
    </div>
  );
};

export default Header;
