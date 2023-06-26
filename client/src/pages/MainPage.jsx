import React, { useContext, useEffect } from "react";
import "../assets/css/Main.css";

import FootMap from "../components/Main/FootMap";
import Carousel from "../components/Main/Carousel";
import FootTracer from "../components/FootTrace/FootTracer";
import Swal from "sweetalert2";
import { SessionContext } from "../contexts/SessionContext";

const MainPage = () => {
  // 세션 가져오기
  const { sessionUser, setSessionUser } = useContext(SessionContext);

  // 소개글
  useEffect(() => {
    if (sessionUser.email !== "") {
      if (sessionUser.level === 0) {
        Swal.fire({
          imageUrl: "/haeksim_intro.png",
          customClass: {
            container: "custom-swal-container",
            popup: "custom-swal-popup",
          },
        });
      }
    }
  }, [sessionUser]);

  return (
    <div className="mainpage">
      <div width="100px"></div>
      <div className="main_foottracer">
        <FootTracer />
      </div>
      {/* <Carousel /> */}
    </div>
  );
};

export default MainPage;
