import React, { useEffect, useState } from "react";
// import Swiper core and required modules

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { EffectCreative, Navigation, Pagination } from "swiper";

import "../../assets/css/AuthSideBarSlider.css";
import axios from "axios";

const AuthSlideBarSlider = ({ clickedLandmark }) => {
  // 선택된 랜드마크에 해당하는 사진
  const [clImage, setClImages] = useState([]);

  // 선택된 랜드마크에 해당하는 사진 불러오기
  useEffect(() => {
    if (clickedLandmark !== undefined) {
      const url = `http://172.30.1.22:8087/hogward/alllandmark/photo/${clickedLandmark.t_landmark.lm_seq}`;
      axios.get(url).then((res) => {
        setClImages([
          res.data.t_landmark.lm_photo1,
          res.data.t_landmark.lm_photo2,
          res.data.t_landmark.lm_photo3,
        ]);
      });
    }
  }, [clickedLandmark]);

  return (
    <div>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        // 좌우 네비게이션 버튼
        navigation={true}
        pagination={{
          // 파지네이션
          dynamicBullets: true,
        }}
        modules={[EffectCreative, Navigation, Pagination]}
        loop={true}
        className="mySwiper2"
      >
        {clImage?.map((item, index) => (
          <SwiperSlide key={index}>
            <img
              alt="close"
              width="100%"
              height="100%"
              src={"data:image/;base64," + item}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthSlideBarSlider;
