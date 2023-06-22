import React from "react";
import "../assets/css/Main.css";

import FootMap from "../components/Main/FootMap";
import Carousel from "../components/Main/Carousel";
import FootTracer from "../components/FootTrace/FootTracer";

const MainPage = () => {
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
