import React from 'react'
import Slider from 'react-slick';
import "../../assets/css/Main.css"



const SliderShow = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 2000
      };

  return (
    <div>
    <Slider {...settings}>
    <div className="slider-container">
    
    {/* <img src={require("../../assets/images/artists/abstral-official-bdlMO9z5yco-unsplash.jpg")} alt="Slide 1" />
    <img src={require("../../assets/images/artists/joecalih-UmTZqmMvQcw-unsplash.jpg")} alt="Slide 2" />
    <img src={require("../../assets/images/artists/soundtrap-rAT6FJ6wltE-unsplash.jpg")} alt="Slide 3" />
    <img src="path_to_image3.jpg" alt="Slide 4" />
    <img src="path_to_image3.jpg" alt="Slide 5" />
    <img src="path_to_image3.jpg" alt="Slide 6" />
    <img src="path_to_image3.jpg" alt="Slide 7" />
    <img src="path_to_image3.jpg" alt="Slide 8" /> */}
 
  </div>

    </Slider>
  </div>
  )
}

export default SliderShow