import React, { useEffect } from 'react';
import KakaoRound from '../../assets/img/KakaoRound.png'
import KakaoYellow from '../../assets/img/KakaoYellow.png'


const KakaoChatButton = () => {
  const kakaoSdkScript = document.createElement('script');
  kakaoSdkScript.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js';
  kakaoSdkScript.integrity = 'sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx';
  kakaoSdkScript.crossOrigin = 'anonymous';

  useEffect(() => {
    document.body.appendChild(kakaoSdkScript);
    kakaoSdkScript.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('b0966d50c42929c10dc69d4f3e5c7015'); // Enter the JavaScript key for the app you want to use
      }
    }
  }, []); // Empty dependency array means this effect runs once on mount.

  const chatChannel = () => {
    if (window.Kakao) {
      window.Kakao.Channel.chat({
        channelPublicId: '_WfyAG', // 카톡채널이름
      });
    }
  }

  return (
    <div >
      <a id="chat-channel-button" href="#" onClick={chatChannel}>
        <img src={KakaoYellow}
         width='50px' height='50px'  />
      </a>
    </div>
  );
}

export default KakaoChatButton;
