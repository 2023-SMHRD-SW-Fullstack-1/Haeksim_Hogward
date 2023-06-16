import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";



const Header = () => {
  return (



     <div>
        {/* 헤더 */}
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand">
                <a class="navbar-brand" href="/">
                    HOGWARD
                </a>
                </a>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                        <li class="nav-item">
                            <a class="nav-link click-scroll" href = "/">HOME</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href = "/magicmap">MAGIC MAP</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll" href="/feed">FEED</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll">MYPAGE</a>
                        </li>

                       {/* 임시 전처리 작업공간 */}
                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/module/getregion">전처리(리전)</Link></a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/module/getcoords">전처리(좌표)</Link></a>
                        </li>

                    </ul>
                 
                    <a href="/join" class="btn custom-btn d-lg-block d-none">회원가입</a>
                    <span class="button-space"></span>
                    <a href="/login" class="btn custom-btn d-lg-block d-none">로그인</a>
                </div>
            </div>
        </nav>

     </div>

  );
};

export default Header;
