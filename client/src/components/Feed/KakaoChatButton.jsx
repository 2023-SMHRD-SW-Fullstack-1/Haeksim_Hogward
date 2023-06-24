import React, { useEffect } from 'react';

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
        <img src="https://t1.daumcdn.net/crms/symbol_img/symbol_%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1%EC%B1%84%EB%84%90%EA%B4%80%EB%A6%AC%EC%9E%90.png"
          width='100px'alt="Kakao Talk chat button" />
      </a>
    </div>
  );
}

export default KakaoChatButton;
