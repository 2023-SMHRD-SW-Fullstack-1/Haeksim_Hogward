import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import "../assets/css/login.css";


 const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //로그인 버튼 클릭 
  const handleLogin = () => {
    
    //서버에서 가져온값과 연결 
    console.log('Email:', email);
    console.log('Password:', password);
  
    // e.preventDefault();
    // fetch('http://서버IP:3000/auth/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json;charset=utf-8' },
    //   body: JSON.stringify({
    //     email: userInput.email,
    //     password: userInput.password,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(data =>
    //     data.accessToken
    //       ? (goToMain(), window.localStorage.setItem('token', data.accessToken))
    //         // Token을 받았으면, 메인으로 이동 및 localStorage에 토큰 저장
    //       : alert('비밀번호가 잘못되었습니다!')
    //         // Token이 없으면, 비밀번호가 잘못되었다고 알려주기
    //   );
    
  };
   

  return (
    <div className='login-box'>
     
     <h1>WELCOME</h1>
      <form>
        <div className='user-box'>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required=""
            placeholder='이메일'
          />
          
        </div>
        <div className='user-box'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required=""
            placeholder='비밀번호'
          />
        </div>

        <div class="d-grid gap-2">
        <button type= "button" href="#" onClick={handleLogin} class="btn btn-dark btn btn-lg">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Login
        </button>
        </div>

      </form>
      
    </div>
  )
}

export default LoginPage