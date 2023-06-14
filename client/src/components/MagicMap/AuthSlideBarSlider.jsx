import React from "react";
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

const AuthSlideBarSlider = ({ clickedLandmark }) => {
  const images = [
    clickedLandmark?.t_landmark.lm_photo1,
    clickedLandmark?.t_landmark.lm_photo2,
    clickedLandmark?.t_landmark.lm_photo3,
  ];

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
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <img alt="close" width="100%" height="100%" src={item}></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AuthSlideBarSlider;
