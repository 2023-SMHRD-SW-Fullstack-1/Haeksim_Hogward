import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
  return (
    <div>
      {/* 헤더 */}
      <nav class="navbar navbar-expand-lg .bg-black">
        <div class="container">
          <a href="/">HOGWARD</a>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <li>
                <a class="nav-link click-scroll" href="/">
                  HOME
                </a>
              </li>

              <li>
                <a class="nav-link click-scroll" href="/magicmap">
                  MAGIC MAP
                </a>
              </li>

              <li>
                <a class="nav-link click-scroll" href="/foottracer">
                  FOOTER TRACER
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/feed">
                  FEED
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/userfeed">
                  MYPAGE
                </a>
              </li>

              {/* 임시 전처리 작업공간 */}
              <li class="nav-item">
                <a class="nav-link click-scroll" href="//module/getregion">
                  전처리(리전)
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/module/getcoords">
                  전처리(좌표)
                </a>
              </li>
            </ul>

            <a href="/join" class="btn custom-btn d-lg-block d-none">
              회원가입
            </a>
            <span class="button-space"></span>
            <a href="/login" class="btn custom-btn d-lg-block d-none">
              로그인
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
