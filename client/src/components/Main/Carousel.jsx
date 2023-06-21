import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios';
import '../../assets/css/Carousel.css'

const Carousel = () => {
   
  
  const [images, setImages] = useState([]);

  //이미지 가져오기 
  useEffect(() => {
   const url = "board.json";
   axios.get(url).then(res => {
      // console.log(res.data.map(item => item.board.b_file));
      const imageUrl = res.data.map(item => item.board.b_file);
      setImages(imageUrl)
   });
 }, []);
 
    
   const settings = {
       dots: true,
       infinite : true,
       spped : 500,
       slidesToShow: 4,
       slidesToScroll: 1,
       autoplay: true,
       autoplaySpeed: 2000
   }

    return (
     <div className='carousel'>
       <Slider {...settings}>
          {images.map((imageUrl, index) =>(
            <div key ={index}>
              <img src ={imageUrl} alt = "Image" width="350" height="300"/>
            </div>
          ))}
      
       </Slider>
    </div>
  )
}

export default Carousel



  // Axios : 비동기 통신 라이브러리 
  // (1) 설치 : npm i axios 
  // (2) import axios from axios 
  // (3) axios로 데이터 조회하기 
  
  // axios               : 비동기적으로 데이터를 요청 
  //      .get(url)      : get방식 / url에 있는 데이터 
  //      .then(()=>{})  : 데이터 조회 성공 시 
  //      .cathc(()=>{}) : 데이터 조회 실패 시 
  //      .then(()=>{})  : 항상 실행하는 것 

  // **axios로 데이터 전송하기 (백엔드에)
  // axios                         : 비동기적으로 데이터 전송 
  //       .post(url,{보낼데이터})  : 전송할 데이터, url
  //       .then(()=>{})  
  //       .cathc(()=>{})  
