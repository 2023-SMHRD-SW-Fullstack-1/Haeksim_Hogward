import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import "../../assets/css/Main.css"

const Carousel = () => {
 
   const settings = {
       dots: true,
       infinite : true,
       spped : 500,
       slidesToShow: 3,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed: 2000
   }

    return (
     <div className='carousel'>
       <Slider {...settings}>
          <div className='slider-space'>
           <img src={require("../../assets/img/moonauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
          <div>
          <img src={require("../../assets/img/riceauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
          <div>
          <img src={require("../../assets/img/moonauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
          <div>
          <img src={require("../../assets/img/riceauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
          <div>
          <img src={require("../../assets/img/moonauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
          <div>
          <img src={require("../../assets/img/riceauthmark.png")}  width="200" height="300" alt="Image" />
          </div>
       </Slider>
    </div>
  )
}

export default Carousel