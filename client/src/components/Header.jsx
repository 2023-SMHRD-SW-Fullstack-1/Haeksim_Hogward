import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h2>
        <Link to="/">홈</Link>
      </h2>
        <h2>
          
          <Link to="/userfeed">대혁 유저피드</Link><br></br>
          <Link to="/myfeed">나의피드</Link>
        </h2>
      <h2>다운 작업공간</h2>
      <h2>
        <Link to="/magicmap">혁 작업공간</Link>
      </h2>
      <h2>다영 작업공간</h2>
    </div>
  );
};

export default Header;
