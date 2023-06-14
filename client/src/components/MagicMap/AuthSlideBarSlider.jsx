import React from "react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "../../assets/css/AuthSideBarSlider.css";

// import required modules
import { EffectCreative } from "swiper";
const AuthSlideBarSlider = () => {
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
        modules={[EffectCreative]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img
            alt="close"
            width="100%"
            height="100%"
            src="http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
          ></img>
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AuthSlideBarSlider;
