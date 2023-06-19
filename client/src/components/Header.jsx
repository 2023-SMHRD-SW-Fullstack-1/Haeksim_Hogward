import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";

const Header = () => {
    
 
    return (
    <div>
      {/* 헤더 */}
      <nav class="navbar navbar-expand-lg" id = "main">
        <div class="container">
          <a href="/">
           로고 
          </a>


          <div class="collapse navbar-collapse">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">

              <li>
                <a class="nav-link click-scroll" href="/magicmap" id="text">
                  MAGIC MAP 
                </a>
              </li>

              <li>
                <a class="nav-link click-scroll" href="/footertracer"  id="text">
                  FOOTER TRACER
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/feed"  id="text">
                  FEED
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/userfeed"  id="text">
                  MYPAGE
                </a>
              </li>

              {/* 임시 전처리 작업공간 */}
              {/* <li class="nav-item">
                <a class="nav-link click-scroll" href="//module/getregion">
                  전처리(리전)
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll" href="/module/getcoords">
                  전처리(좌표)
                </a>
              </li> */}
            </ul>

            {/* class="btn custom-btn d-lg-block d-none" */}
            <a href="/join">
              회원가입
            </a>
           
            <span class="button-space"></span>
           
            <a href="/login">
              로그인
            </a>
            
            {/* <button type="button" class="btn btn-primary" href="/loin">로그인</button>
            <span class="button-space"></span>        
            <button type="button" class="btn btn-primary" href="/join">회원가입</button>  */}

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;