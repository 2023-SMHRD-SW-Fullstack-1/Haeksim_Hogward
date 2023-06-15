import React from 'react'
import "../../assets/css/Main.css"
import SliderShow from "./SliderShow"


const FootMap = () => {
  return (
    <div>
    
      {/* 홈  */}
      <section class="hero-section" id="section_1">
        <div>
            <div class="section-overlay"></div>

            <div class="container d-flex justify-content-center align-items-center">
  
  
                <div class="row bg-warning">
                    <div class="col-12 mt-auto mb-5 text-center">
                        <h1 class="text-white mb-5"> 발자국지도 사진 </h1>
                    </div>
                </div>

            </div>


            <div class="container d-flex justify-content-center align-items-center">
  
  
             <div class="row bg-warning">
             <div class="col-12 mt-auto mb-5 text-center">
            
             <SliderShow/>
              </div>
            </div>

           </div>
            
           </div>

 
         </section>
    </div>
  )
}

export default FootMap