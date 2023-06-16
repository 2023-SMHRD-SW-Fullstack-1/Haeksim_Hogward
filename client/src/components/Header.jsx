import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  return (

     <div>
        {/* 헤더 */}
        <nav class="navbar navbar-expand-lg .bg-black">
            <div class="container" >
                <a class="navbar-brand">
                    <Link to= "/"> Hogward </Link>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to ="/" >홈</Link></a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to ="/magicmap">마법지도</Link></a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/feed">피드</Link></a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/userfeed">마이페이지</Link></a>
                        </li>

                       {/* 임시 전처리 작업공간 */}
                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/module/getregion">전처리(리전)</Link></a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link click-scroll"><Link to="/module/getcoords">전처리(좌표)</Link></a>
                        </li>

                    </ul>
                 
                    <a href="ticket.html" class="btn custom-btn d-lg-block d-none">회원가입</a>
                    <span class="button-space"></span>
                    <a href="ticket.html" class="btn custom-btn d-lg-block d-none">로그인</a>
                </div>
            </div>
        </nav>

     </div>

  );
};

export default Header;
