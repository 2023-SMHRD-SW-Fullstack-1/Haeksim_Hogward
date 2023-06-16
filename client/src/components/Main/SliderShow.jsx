import React from 'react'
import Slider from 'react-slick';
import "../../assets/css/Main.css"

//import {CgPlayButtonO} from 'react-icons/cg'

/* 
   1. npm install react-slick 설치 
   2. 로그인한 사용자의 데이터베이스 게시글 저장된 값을 가져오는 Componet 만들기
   3. React Slick 설정  
       - props로  Settings 라는 type을 받는다 
       - slider componet의 옵션 지정 
         (왼쪽 오른쪽 화살표표시, 자동으로 slider 넘김 , 몇개의 component 보여줄것인지)
   4. React Slick 적용 
*/



const SliderShow = () => {
   
  // 3. React Slick 설정 
  
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    autoplay: true,
    autoplaySpeed: 2000
    prevArrow: (
      <CgPlayButtonO pos="left">
        <MdArrowBackIos />
      </CgPlayButtonO>
    ),
    nextArrow: (
      <CgPlayButtonO pos="right">
        <MdArrowForwardIos />
      </CgPlayButtonO>
    ),
  };

  return (
    // 4. React Slick 적용 
    <div>
      <div>
        <Slider {...settings}>
          <div className='slider-img'>
            <img src=" " alt="Slide 1" />
          </div>
        </Slider>
       </div>

       <div>
        <Slider {...settings}>
          <div className='slider-img'>
            <img src=" " alt="Slide 1" />
          </div>
        </Slider>
       </div>

       <div>
        <Slider {...settings}>
          <div className='slider-img'>
            <img src=" " alt="Slide 1" />
          </div>
        </Slider>
       </div>
    </div>
  )
}

export default SliderShow